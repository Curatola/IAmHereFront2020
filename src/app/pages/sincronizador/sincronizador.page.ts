import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ValidatorMessages } from 'src/app/validator-messages';
import { SyncronizationService } from 'src/app/service/syncronization.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-sincronizador',
  templateUrl: './sincronizador.page.html',
  styleUrls: ['./sincronizador.page.scss'],
})
export class SincronizadorPage implements OnInit {

  form: FormGroup;
  msgs = ValidatorMessages.msgs;

  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private sync: SyncronizationService
  ) {
      this.form = this.formBuilder.group({
        loginAcademico: new FormControl('', Validators.required),
        senhaAcademico: new FormControl('', Validators.required),
        remember: new FormControl(false)
      });
  }

  ngOnInit() {
  }

  async sincronizar() {
    const loginAcademico = this.form.get('loginAcademico').value;
    const senhaAcademico = this.form.get('senhaAcademico').value;
    const remember = this.form.get('remember').value;

    const sucesso = await this.sync.sincronizar(loginAcademico, senhaAcademico);
    if (sucesso) {
      if (remember) {
        this.sync.setAccount(loginAcademico, senhaAcademico);
      }

      this.navCtrl.pop();
    }
  }

}
