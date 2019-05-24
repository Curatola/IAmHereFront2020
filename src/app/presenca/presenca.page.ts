import { Component, OnInit } from '@angular/core';
import { NavParamsService } from '../nav-params.service';
import { RequestService } from '../request.service';
import { Presenca } from 'src/models/presenca';
import { Turma } from 'src/models/turma';
import { Chamada } from 'src/models/chamada';
import { NavController, LoadingController, ToastController, AlertController } from '@ionic/angular';
import { Aluno } from 'src/models/aluno';
import { LoginPage } from '../login/login.page';

@Component({
  selector: 'app-presenca',
  templateUrl: './presenca.page.html',
  styleUrls: ['./presenca.page.scss'],
})
export class PresencaPage implements OnInit {

  ngOnInit() {
  }

  presentes: Array<Presenca>
  ausentes: Array<Presenca>
  turma:Turma
  chamada: Chamada;
  conteudo: string;
  qtdPessoasReconhecidas: number;
  comparecimento:string = 'areAusentes'

  constructor(public navCtrl: NavController,
    public navParams: NavParamsService,
    public requests: RequestService,
    private loader: LoadingController,
    public toast: ToastController,
    //public popoverCtrl: PopoverController,
    public alertCtrl: AlertController
  ) {
    this.presentes = new Array();
    this.ausentes = new Array();

    this.turma=navParams.get('turma');
    this.chamada=navParams.get('chamada');

    this.conteudo = this.chamada.conteudo;
    this.load()
  }

  /*
  popoverDeslogar(event) {
    this.popoverCtrl.create(PopoverNavPage, {"turma": this.turma, "chamada": this.chamada})
      .present({ ev: event });
  }
  */

  async getConteudo(){
    const prompt = await this.alertCtrl.create({
      header: 'Assuntos Tratados',
      message: "Descreva os assuntos abordados.",
      inputs: [
        {
          name: 'conteudo',
          placeholder: 'Conteúdo',
          value:this.conteudo
        },
      ],
      buttons: [
        {
          text: 'Ok',
          handler: data => {
            this.conteudo=data.conteudo
          }
        }
      ]
    });
    prompt.present();
  }

  showImages(){
    this.navParams.setParams({"turma": this. turma, "chamada": this.chamada});
    this.navCtrl.navigateForward("/chamada-images");
  }

  async load() {
    let loadingDialog = await this.loader.create({ message: 'Carregando Presencas...', spinner: 'crescent' });
    await loadingDialog.present();

    try {
      let resp = await this.requests.get('turma/'+this.turma.id+'/chamada/'+this.chamada.id);

      this.presentes = new Array();
      this.ausentes = new Array();
      resp.presencas.forEach(elem => {
        if(elem.is_presente){
          this.presentes.push(new Presenca(elem.id, elem.is_presente, new Aluno(elem.aluno.id, elem.aluno.nome)));
        }
        else{
          this.ausentes.push(new Presenca(elem.id, elem.is_presente, new Aluno(elem.aluno.id, elem.aluno.nome)));
        }
      })

      this.qtdPessoasReconhecidas = resp.qtdPessoasReconhecidas
    } catch (error) {
      await this.requests.requestErrorPageHandler(error, this.toast, this.navCtrl);
    } finally {
      await loadingDialog.dismiss();
    }
  }

  async done(){
    let presencas: any[] = this.presentes.filter((presenca: any, index,presencas: Presenca[]) => {return presenca.isPresent});
    presencas = presencas.concat(this.ausentes.filter((presenca: any, index,presencas: Presenca[]) => {return presenca.isPresent}));
    let alunosPresentesId: any[] = presencas.map((presenca: any, index,presencas: Presenca[]) => {return presenca.aluno.id});

    let loadingDialog = await this.loader.create({ message: 'Editando a chamada...', spinner: 'crescent' });
    await loadingDialog.present();

    try{
      let resp = await this.requests.put("turma/"+this.turma.id+"/chamada/"+this.chamada.id,
        {
          "presentes":alunosPresentesId,
          "conteudo":this.conteudo
        });

      let t = await this.toast.create({
        message: resp.sucesso,
        duration: 3000
      });
      
      t.present();
      this.chamada.conteudo = this.conteudo;
      
      this.navCtrl.pop();
    } catch (error) {
      await this.requests.requestErrorPageHandler(error, this.toast, this.navCtrl);
    } finally {
      await loadingDialog.dismiss();
    }
  }

}
