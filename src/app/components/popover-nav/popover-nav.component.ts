import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController, PopoverController, AlertController } from '@ionic/angular';
import { NavParamsService } from 'src/app/service/nav-params.service';
import { AuthService } from 'src/app/service/auth.service';
import { RequestService } from 'src/app/service/request.service';
import { Chamada } from 'src/models/chamada';

@Component({
  selector: 'app-popover-nav',
  templateUrl: './popover-nav.component.html',
  styleUrls: ['./popover-nav.component.scss'],
})
export class PopoverNavComponent implements OnInit {

  ngOnInit() {}

  isLogoff: any;
  isGoPerfil: boolean;
  //turma: Turma;
  chamada: Chamada;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParamsService,
    public auth: AuthService,
    private popoverController: PopoverController,
    private loader: LoadingController,
    public toast: ToastController,
    private requests: RequestService,
    private alertCtrl: AlertController,
    //private imgLoader: ImageLoader,
    ) {
      this.isLogoff = navParams.get("is_logoff");
      this.isGoPerfil = navParams.get("isGoPerfil");
      //this.turma = navParams.get("turma");
      //this.chamada = navParams.get("chamada");
  }

  async logoff(){
    let alert = await this.alertCtrl.create({
      header: 'Confirme!',
      message: 'Deseja mesmo fazer logoff?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
        },
        {
          text: 'Sim',
          handler: () => {
            this.commitLogoff();
          }
        }
      ]
    });
    alert.present();
  }

  download() {

  }

  async commitLogoff() {
    let loadingDialog = await this.loader.create({ message: 'Fazendo logoff...', spinner: 'crescent' });
    await loadingDialog.present();
    try{
      await this.auth.deslogar();

      await this.popoverController.dismiss();
      await this.navCtrl.navigateRoot('/login')
    } catch (error) {
      await this.popoverController.dismiss();
      await this.requests.requestErrorPageHandler(error, this.toast, this.navCtrl);
    } finally {
      await loadingDialog.dismiss();
    }
  }

  async goPerfil() {
    this.popoverController.dismiss();
    this.navCtrl.navigateForward('/perfil-usuario');
  }

  /*
  private b64toBlob (b64Data, contentType='', sliceSize=512){
    b64Data = b64Data.split(',')[1]
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
     for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
       const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
       const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
     const blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }

  async download(){
    let loadingDialog = this.loader.create({ content: 'Carregando foto...', spinner: 'crescent' });
    await loadingDialog.present();
    try{
      let base64 = await this.imgLoader.getImagePath(AuthProvider.API_URL + "img/turma/" + this.turma.id + "/chamada/" + this.chamada.id);
      let blob =  this.b64toBlob(base64,"image/jpeg")
      
      let elem = document.createElement('img');
      elem.src = URL.createObjectURL(blob);
      let imagem = this.imgCtrl.create(elem);
      imagem.present();
    }catch(error){
      this.toast.create({
        message: "Erro ao carragar a foto",
        duration: 3000
      })
    }finally{
      await loadingDialog.dismiss();
    }
  }
  */


}
