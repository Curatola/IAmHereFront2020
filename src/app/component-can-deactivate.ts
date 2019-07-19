import { HostListener } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

export abstract class ComponentCanDeactivate {
    isToDoBack = true;
    ignore = false;

    constructor(
        public alertCtrl: AlertController,
        public navCtrl: NavController
    ) {
    }

    canDeactivate(): boolean {
        return this.isToDoBack || this.ignore;
    }

    async confirm() {
        const alert = await this.alertCtrl.create({
            header: 'Deseja mesmo sair?',
            message: 'As alterações feitas serão perdidas!',
            buttons: [
                {
                    text: 'Sim',
                    handler: () => {
                        this.isToDoBack = true;
                        this.navCtrl.pop();
                    }
                },
                {
                    text: 'Não',
                    role: 'cancel'
                }
            ]
        });

        await alert.present();
    }

    @HostListener('window:beforeunload', ['$event'])
    unloadHandler($event: any) {
        if (!this.canDeactivate()) {
            $event.returnValue = true;
        }
    }
}