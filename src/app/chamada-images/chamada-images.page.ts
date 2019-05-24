import { Component, OnInit, ViewChild } from '@angular/core';
import { NavParamsService } from '../nav-params.service';
import { RequestService } from '../request.service';
import { Turma } from 'src/models/turma';
import { Chamada } from 'src/models/chamada';
import { NavController, ToastController, IonSlides } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-chamada-images',
  templateUrl: './chamada-images.page.html',
  styleUrls: ['./chamada-images.page.scss'],
})
export class ChamadaImagesPage implements OnInit {

  ngOnInit() {
  }

  turma: Turma;
  chamada: Chamada;
  filenames: Array<string>;
  url: string = AuthService.API_URL;

  @ViewChild(IonSlides) slides: IonSlides;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParamsService,
    private requests: RequestService,
    private toast: ToastController,
    ) {
    this.turma = navParams.get("turma");
    this.chamada = navParams.get("chamada");
    this.filenames = Array();

    this.getFilenamesImg();
  }

  event(data){
    if (data.type === "swipe"){
      this.slides.lockSwipes(true);
    } else if (data.type === "touchend") {
      this.slides.lockSwipes(false);
    }
  }

  async getFilenamesImg() {
    try{
      let resp = await this.requests.get("img/filename/turma/"+this.turma.id+"/chamada/"+this.chamada.id);
      resp.forEach(elem => {
        this.filenames.push(elem);
      });
    } catch (error) {
      await this.requests.requestErrorPageHandler(error, this.toast, this.navCtrl);
    }
  }

}
