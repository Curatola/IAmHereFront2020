import { Injectable } from '@angular/core';
import { RequestService } from './request.service';
import { LoadingController, ToastController, NavController, AlertController } from '@ionic/angular';
import { AuthService } from './auth.service';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class SyncronizationService {
  private key = 'syncKey123456789';

  constructor(
    private navCtrl: NavController,
    private requests: RequestService,
    private loader: LoadingController,
    private toast: ToastController,
    private alertCtrl: AlertController,
    private auth: AuthService
  ) { }

  isSync(): boolean {
    return JSON.parse(localStorage.getItem('isSync'));
  }

  setAccount(loginAcademico: string, senhaAcademico: string) {
    localStorage.setItem('loginAcademico', loginAcademico);
    localStorage.setItem('senhaAcademico', this.encryptUsingAES256(senhaAcademico));
  }

  removeAccount() {
    localStorage.removeItem('loginAcademico');
    localStorage.removeItem('senhaAcademico');
  }

  hasAccount(): boolean {
    if (localStorage.getItem('loginAcademico') && localStorage.getItem('senhaAcademico')) {
      return true;
    }

    return false;
  }

  getAccount(): { loginAcademico: string, senhaAcademico: string } {
    const loginAcademico = localStorage.getItem('loginAcademico');
    const senhaAcademico = this.decryptUsingAES256(localStorage.getItem('senhaAcademico'));

    return { loginAcademico, senhaAcademico };
  }

  setIsSync(isSync: boolean) {
    localStorage.setItem('isSync', String(isSync));
  }

  async checkIsSync() {
    const resp = await this.requests.get('/academico/sincronizar');
    localStorage.setItem('isSync', resp.isSync);
  }

  async sincronizar(loginAcademico: string, senhaAcademico: string): Promise<boolean> {

    return new Promise<boolean>(async (resolve) => {
      const loadingDialog = await this.loader.create({ message: 'Sincronizando...', spinner: 'crescent' });
      await loadingDialog.present();

      let sucesso = false;
      try {
        const resp = await this.requests.post('/academico/sincronizar', { loginAcademico, senhaAcademico });

        if (resp.sucesso) {
          sucesso = true;

          const t = await this.toast.create({
            message: resp.sucesso,
            duration: 3000
          });

          t.present();
        } else {
          const t = await this.toast.create({
            message: resp.warning,
            duration: 3000
          });

          t.present();
        }
      } catch (error) {
        await this.requests.requestErrorPageHandler(error, this.toast, this.navCtrl);
      } finally {
        await loadingDialog.dismiss();
      }

      this.setIsSync(sucesso);
      resolve(sucesso);
    });
  }

  private async perguntarDesejaSincronizar(): Promise<boolean> {
    return new Promise<boolean>(async (resolve) => {
      const alert = await this.alertCtrl.create({
        header: 'Deseja sincronizar as chamadas?',
        message: 'Existem chamadas não sincronizadas com o acadêmico',
        buttons: [
          {
            text: 'Não',
            role: 'cancel',
            handler: () => resolve(false)
          },
          {
            text: 'Sim',
            handler: () => resolve(true)
          }
        ]
      });
      alert.present();
    });
  }

  async makeSync(perguntarDesejaSync: boolean = true): Promise<boolean> {
    // Retorna true se será feita sincronização e false caso contrário

    // Se o usuário for professor
    if (this.auth.getUserType() === AuthService.PROFESSOR) {

      // Se não estiver com todas chamadas sincronizadas
      if (!this.isSync()) {
        let isToSync = true;

        // Se for pra perguntar se deseja sincronizar e responder sim
        if (perguntarDesejaSync && !await this.perguntarDesejaSincronizar()) {
          isToSync = false;
        }

        if (isToSync) {
          this.verifyAccountAndSync();
        }

        return isToSync;
      } else {
        // Avisa que já sincronizou tudo
        const alert = await this.alertCtrl.create({
          header: 'Todas as chamadas estão sincronizadas!',
          buttons: [
            {
              text: 'Ok',
              role: 'cancel',
            }
          ]
        });
        alert.present();
      }

    }

    return false;
  }

  private verifyAccountAndSync() {
    // Se a conta dele estiver salva
    if (this.hasAccount()) {
      // Carrega a conta e manda sincronizar
      const account = this.getAccount();
      this.sincronizar(account.loginAcademico, account.senhaAcademico);
    } else {
      // Senão manda pra tela que pede a conta
      this.navCtrl.navigateForward('/sincronizador');
    }
  }

  private encryptUsingAES256(senha: string) {
    const key = CryptoJS.enc.Utf8.parse(this.key);
    const iv = CryptoJS.enc.Utf8.parse(this.key);
    const encrypted = CryptoJS.AES.encrypt(
      senha, key, {
        keySize: this.key.length,
        iv: iv,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });
    return encrypted.toString();
  }
  private decryptUsingAES256(cyptoSenha: string) {
    const key = CryptoJS.enc.Utf8.parse(this.key);
    const iv = CryptoJS.enc.Utf8.parse(this.key);

    const decrypted = CryptoJS.AES.decrypt(
      cyptoSenha, key, {
        keySize: this.key.length,
        iv: iv,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}
