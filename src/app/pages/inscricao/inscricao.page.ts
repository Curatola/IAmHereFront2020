import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../service/request.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ValidatorMessages } from '../../validator-messages';
import { NavController, ToastController, LoadingController, Events } from '@ionic/angular';
import { NavParamsService } from '../../service/nav-params.service';

@Component({
  selector: 'app-inscricao',
  templateUrl: './inscricao.page.html',
  styleUrls: ['./inscricao.page.scss'],
})
export class InscricaoPage implements OnInit {
  form: FormGroup;
  msgs = ValidatorMessages.msgs;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParamsService,
    private requests: RequestService,
    private toast: ToastController,
    private loader: LoadingController,
    public events: Events,
    private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      codTurma: new FormControl('', Validators.required),
      senhaTurma: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4)]))
    });
  }

  async confirmar() {
    const loadingDialog = await this.loader.create({ message: 'Fazendo inscrição...', spinner: 'crescent' });
    await loadingDialog.present();

    try {
      const codTurma = this.form.get('codTurma').value;
      const senhaTurma = this.form.get('senhaTurma').value;

      const resp = await this.requests.post('/inscricao/turma/' + codTurma, { senhaTurma: senhaTurma });

      const t = await this.toast.create({
        message: resp.sucesso,
        duration: 3000
      });

      t.present();

      this.events.publish('refresh turmas');
      this.navCtrl.pop();

    } catch (error) {
      await this.requests.requestErrorPageHandler(error, this.toast, this.navCtrl);
    } finally {
      await loadingDialog.dismiss();
    }
  }

  ngOnInit() {
  }

}
