import { Component, OnInit, ViewChild } from '@angular/core';
import { NavParamsService } from '../nav-params.service';
import { RequestService } from '../request.service';
import { IonInfiniteScroll, NavController, LoadingController, ToastController } from '@ionic/angular';
import { Turma } from 'src/models/turma';
import { LoginPage } from '../login/login.page';

@Component({
  selector: 'app-presenca-turma',
  templateUrl: './presenca-turma.page.html',
  styleUrls: ['./presenca-turma.page.scss'],
})
export class PresencaTurmaPage implements OnInit {

  ngOnInit() {
  }

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  presencas: Array<PresencasTurma>;
  page: number = 1;
  turma: Turma;

  constructor(public navCtrl: NavController,
      public navParams: NavParamsService,
      public requests: RequestService,
      private loader: LoadingController,
      public toast: ToastController
     ) {
    this.turma = navParams.get("turma");
    
    this.load()
  }

  async load() {
    let loadingDialog = await this.loader.create({ message: 'Carregando Chamadas...', spinner: 'crescent' });
    await loadingDialog.present();
    await this.doInfinit(this.infiniteScroll);
    await loadingDialog.dismiss();
  }

  async doInfinit(infiniteScroll: IonInfiniteScroll) {
    try {
      let resp = await this.requests.get("turma/" + this.turma.id + "/presencas/pag/" + this.page);
      if (!this.presencas) this.presencas = new Array();
      resp.presencas.forEach(elem => {
        this.presencas.push(new PresencasTurma(elem.isPresente, elem.dateHour));
      })
  
      if (!resp.hasMorePages) {
        infiniteScroll.disabled = true;
      } else {
        this.page++;
      }
    } catch (error) {
      await this.requests.requestErrorPageHandler(error, this.toast, this.navCtrl);
    }

    infiniteScroll.complete();
  }

}

class PresencasTurma {
  isPresente: boolean
  dateHour: number
  dateStr: string
  dateShort: string 
  timeStr: string

  constructor (isPresente: boolean, dateHour: number){
    this.isPresente = isPresente; 
    this.dateHour = dateHour;
    this.dateStr = this.getDateStr();
    this.dateShort = this.getDateShort();
    this.timeStr = this.getTimeStr();
  }

  getDateStr(){
    let options={month:'long',day:'2-digit'}
    return new Date(this.dateHour * 1000).toLocaleDateString('pt-BR',options);
}

  getTimeStr(){
      let options={hour:'2-digit',minute:'2-digit'}
      return new Date(this.dateHour * 1000).toLocaleTimeString('pt-BR',options);
  }
  getDateShort(){
      let options={month:'2-digit',day:'2-digit'}
     return new Date(this.dateHour).toLocaleDateString('pt-BR',options);
  }

}
