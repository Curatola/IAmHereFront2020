import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, IonContent, NavController, LoadingController, ToastController, ActionSheetController } from '@ionic/angular';
import { NavParamsService } from '../nav-params.service';
import { RequestService } from '../request.service';
import { AuthService } from '../auth.service';
import { CameraService } from '../camera.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ValidatorMessages } from '../validator-messages';
import { IonicImageLoaderComponent } from 'ionic-image-loader';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
})
export class PerfilUsuarioPage implements OnInit {

  ngOnInit() {
  }

  @ViewChild(IonContent) content: IonContent;
  @ViewChild(IonSlides) slides: IonSlides;

  form: FormGroup;
  msgs = ValidatorMessages.msgs;

  userType: string;
  enableSenha: boolean;

  url: string = AuthService.API_URL;
  email: string;

  imgsLoaded: boolean = false;

  filenames: Array<string> = new Array();

  constructor(public navCtrl: NavController,
      public navParams: NavParamsService,
      private formBuilder: FormBuilder,
      private requests: RequestService,
      public authProvider: AuthService,
      private loader: LoadingController,
      private toast: ToastController,
      private actionSheetCtrl: ActionSheetController,
      private camera: CameraService,
    ) {
      this.form = this.formBuilder.group({
        nome: new FormControl("",Validators.compose([Validators.required, Validators.minLength(4), Validators.pattern("^[a-zA-Z\u00C0-\u024F ]+$")])),
        senha: new FormControl("",Validators.compose([Validators.required, Validators.minLength(6)]))
      });

      this.form.get("senha").disable();
      this.userType = authProvider.getUserType();

      if (this.userType === "Aluno") this.form.addControl("matricula", new FormControl("", Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z0-9 ]+$")])),)

      this.load();
  }

  async getFilenamesImg(){
    try{
      let resp = await this.requests.get("img/filename/aluno");
      resp.forEach(elem => {
        this.filenames.push(elem);
      });
    } catch (error) {
      await this.requests.requestErrorPageHandler(error, this.toast, this.navCtrl);
    }
  }

  onImgClick(img: IonicImageLoaderComponent){
    //TODO
  }

  async onImageLoad(){
    if (this.imgsLoaded) this.slides.slideTo(await this.slides.length() - 1);
  }

  async load(){
    let loadingDialog = await this.loader.create({ message: 'Carregando Perfil, aguarde...', spinner: 'crescent' });
    await loadingDialog.present();
    
    if (this.userType == "Aluno") this.getFilenamesImg();

    try{
      let resp = await this.requests.get("perfil");
      this.form.get("nome").setValue(resp.nome);
      this.email = resp.email

      if (this.userType === "Aluno") this.form.get("matricula").setValue(resp.matricula);

    } catch (error) {
      await this.requests.requestErrorPageHandler(error, this.toast, this.navCtrl);
    } finally {
      await loadingDialog.dismiss();
    }
    
  }

  change(){
    let senhaControl = this.form.get("senha");
    if (this.enableSenha) {
      senhaControl.enable();
      setTimeout(() => this.content.scrollToBottom(),500);
    }
    else senhaControl.disable();
  }

  async editar(){
    let loadingDialog = await this.loader.create({ message: 'Salvando alterações, aguarde...', spinner: 'crescent' });
    await loadingDialog.present();

    let nome = this.form.get("nome").value;
    let senha = this.form.get("senha");

    let data = {"nome": nome}

    if (senha.enabled) data["senha"] = senha.value
    if (this.form.get("matricula")) data["matricula"] = this.form.get("matricula").value;
    
    try{
      let resp = await this.requests.put(this.authProvider.getUserType().toLowerCase(), data);
      
      let t = await this.toast.create({
        message: resp.sucesso,
        duration: 3000
      }); 
      
      t.present();
      
    } catch (error) {
      await this.requests.requestErrorPageHandler(error, this.toast, this.navCtrl);
    } finally {
      await loadingDialog.dismiss();
    }
  }

  async apagarFoto(){
    if (this.filenames.length == 1) {
      let t = await this.toast.create({
        message: "Você deve ter pelo menos 1 foto cadastrada!",
        duration: 3000
      });
      
      t.present();

      return;
    }

    let loadingDialog = await this.loader.create({ message: 'Apagando foto, aguarde...', spinner: 'crescent' });
    await loadingDialog.present();

    try{
      let filename = this.filenames[ await this.slides.getActiveIndex()];
      
      let resp = await this.requests.delete("img/aluno/" + filename);
      
      let t = await this.toast.create({
        message: resp.sucesso,
        duration: 3000
      });
      
      t.present();

      this.filenames = this.filenames.filter((elem) => elem != filename);
      this.slides.slidePrev();
      
    } catch (error) {
      await this.requests.requestErrorPageHandler(error, this.toast, this.navCtrl);
    } finally {
      await loadingDialog.dismiss();
    }
  }

  async addNewPhoto() {
    let actionSheet = await this.actionSheetCtrl.create({
      header: 'Selecione o modo',
      buttons: [
        {
          text: 'Camera',
          handler: () => {
            this.camera.takePicture()
              .then((imageData) => this.upload(imageData))
              .catch((error) => console.log(error))
          }
        },
        {
          text: 'Galeria',
          handler: () => {
            this.camera.getFromGallery()
              .then((imageData) => this.upload(imageData))
              .catch((error) => console.log(error))
          }
        }
      ]
    });

    actionSheet.present();
  }

  async upload(imageData){
    let loadingDialog = await this.loader.create({ message: 'Cadastrando, aguarde...', spinner: 'crescent' });
    await loadingDialog.present();
    try{
      let resp = await this.requests.uploadFile(imageData, "img/aluno", {}, "PUT");
      resp.filenames.forEach(elem => {
        this.filenames.push(elem);
      });

      let t = await this.toast.create({
        message: resp.sucesso,
        duration: 3000
      }); 
      
      t.present();

      this.imgsLoaded = true;
    } catch (error) {
      await this.requests.requestErrorPageHandler(error, this.toast, this.navCtrl);
    } finally {
      await loadingDialog.dismiss()
    }
  }

}
