import { Component, OnInit, ViewChild } from '@angular/core';
import { NavParamsService } from '../../service/nav-params.service';
import { RequestService } from '../../service/request.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ValidatorMessages } from '../../validator-messages';
import { TurmasPage } from '../turmas/turmas.page';
import { Turma } from 'src/models/turma';
import { NavController, LoadingController, ToastController, IonInput } from '@ionic/angular';
import { ConfirmSenhaValidator } from 'src/app/confirm-senha-validator';

@Component({
  selector: 'app-editar-turma',
  templateUrl: './editar-turma.page.html',
  styleUrls: ['./editar-turma.page.scss'],
})
export class EditarTurmaPage implements OnInit {
  @ViewChild('senhaInput') senhaInput: IonInput;

  form: FormGroup;
  msgs = ValidatorMessages.msgs;

  turmasPage: TurmasPage;

  turma: Turma;
  enableSenha: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParamsService,
    private formBuilder: FormBuilder,
    private requests: RequestService,
    private loader: LoadingController,
    private toast: ToastController
    ) {
    this.turma = navParams.get('turma');
    this.turmasPage = this.navParams.get('turmasPage');

    this.form = this.formBuilder.group({
      nome: new FormControl(this.turma.nome, Validators.compose([Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-Z0-9 ]+$')])),
      ano: new FormControl(this.turma.ano, Validators.required),
      semestre: new FormControl(this.turma.semestre, Validators.required),
      senhaTurma: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4)])),
      confirmSenhaTurma: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4)]))
    },  { validator: ConfirmSenhaValidator.isMatching });

    this.form.get('senhaTurma').disable();
    this.form.get('confirmSenhaTurma').disable();
  }

  ngOnInit() {
  }

  change() {
    const senhaControl = this.form.get('senhaTurma');
    const confirmControl = this.form.get('confirmSenhaTurma');
    if (this.enableSenha) {
      senhaControl.enable();
      confirmControl.enable();
      setTimeout(() => {
        this.senhaInput.setFocus();
      }, 50);
    } else {
      senhaControl.disable();
      confirmControl.disable();
    }
  }

  async editar() {
    const loadingDialog = await this.loader.create({ message: 'Salvando alterações, aguarde...', spinner: 'crescent' });
    await loadingDialog.present();

    const nome = this.form.get('nome').value;
    const ano = this.form.get('ano').value;
    const semestre = this.form.get('semestre').value;
    const senhaTurma = this.form.get('senhaTurma');

    const data = { nome, ano, semestre};

    if (senhaTurma.enabled) {
      data['senha'] = senhaTurma.value;
    }

    try {
      const resp = await this.requests.put('/turma/' + this.turma.id, data);

      const t = await this.toast.create({
        message: resp.sucesso,
        duration: 3000
      });

      t.present();

      this.turma.nome = nome;
      this.turma.ano = ano;
      this.turma.semestre = semestre;

      this.turmasPage.ordenarTurmas();
      this.navCtrl.pop();

    } catch (error) {
      await this.requests.requestErrorPageHandler(error, this.toast, this.navCtrl);
    } finally {
      loadingDialog.dismiss();
    }
  }

}
