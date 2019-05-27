import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController, PopoverController } from '@ionic/angular';
import { NavParamsService } from 'src/app/nav-params.service';
import { AuthService } from 'src/app/auth.service';
import { RequestService } from 'src/app/request.service';

@Component({
  selector: 'app-popover-nav',
  templateUrl: './popover-nav.component.html',
  styleUrls: ['./popover-nav.component.scss'],
})
export class PopoverNavComponent implements OnInit {

  ngOnInit() {}

  is_logoff: any;
  //turma: Turma;
  //chamada: Chamada;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParamsService,
    public auth: AuthService,
    private popoverController: PopoverController,
    private loader: LoadingController,
    public toast: ToastController,
    private requests: RequestService,
    //private imgLoader: ImageLoader,
    ) {
      this.is_logoff = navParams.get("is_logoff");
      //this.turma = navParams.get("turma");
      //this.chamada = navParams.get("chamada");
  }

  async logoff() {
    let loadingDialog = await this.loader.create({ message: 'Fazendo logoff...', spinner: 'crescent' });
    await loadingDialog.present();
    try{
      await this.auth.deslogar();

      await this.popoverController.dismiss();
      await this.navCtrl.navigateRoot('/')
    } catch (error) {
      await this.popoverController.dismiss();
      await this.requests.requestErrorPageHandler(error, this.toast, this.navCtrl);
    } finally {
      await loadingDialog.dismiss();
    }
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
