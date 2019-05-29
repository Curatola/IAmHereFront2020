import { Component, OnInit } from '@angular/core';
import { NavParamsService } from '../../service/nav-params.service';
import { RequestService } from '../../service/request.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ValidatorMessages } from '../../validator-messages';
import { Turma } from 'src/models/turma';
import { TurmasPage } from '../turmas/turmas.page';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';

@Component({
  selector: 'app-criar-turma',
  templateUrl: './criar-turma.page.html',
  styleUrls: ['./criar-turma.page.scss'],
})
export class CriarTurmaPage implements OnInit {
  ngOnInit() {
  }

  form: FormGroup;
  msgs = ValidatorMessages.msgs;
  turmas: Array<Turma>
  turmasPage: TurmasPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParamsService,
    private formBuilder: FormBuilder,
    private requests: RequestService,
    private loader: LoadingController,
    private toast: ToastController
    ) {

      this.turmas = this.navParams.get("turmas");
      this.turmasPage = this.navParams.get("turmasPage");
      
      this.form = this.formBuilder.group({
        nome: new FormControl("",Validators.compose([Validators.required, Validators.minLength(4), Validators.pattern("^[a-zA-Z0-9\u00C0-\u024F ]+$")])),
        ano: new FormControl("", Validators.required),
        semestre: new FormControl("", Validators.compose([Validators.required, Validators.max(2), Validators.min(1)])),
        senhaTurma: new FormControl("",Validators.compose([Validators.required, Validators.minLength(4)]))
    })
  }

  async criar(){
    let loadingDialog = await this.loader.create({ message: 'Cadastrando, aguarde...', spinner: 'crescent' });
    await loadingDialog.present();

    let nome = this.form.get("nome").value;
    let ano = this.form.get("ano").value;
    let semestre = this.form.get("semestre").value;
    let senhaTurma = this.form.get("senhaTurma").value;

    let data = {"nome": nome,"ano": ano, "semestre": semestre, "senha": senhaTurma} 

    try{
      let resp = await this.requests.post("turma", data);
      
      let t = await this.toast.create({
        message: resp.sucesso,
        duration: 3000
      });
      
      t.present();

      this.turmas.push(new Turma(resp.id, nome, ano, semestre));
      this.turmasPage.ordenarTurmas();
      this.navCtrl.pop();
      
    } catch (error) {
      await this.requests.requestErrorPageHandler(error, this.toast, this.navCtrl);
    } finally {
      await loadingDialog.dismiss();
    }
  }
  
}
