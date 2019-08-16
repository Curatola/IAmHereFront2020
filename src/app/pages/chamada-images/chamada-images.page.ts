import { Component, OnInit, ViewChild } from '@angular/core';
import { NavParamsService } from '../../service/nav-params.service';
import { RequestService } from '../../service/request.service';
import { Turma } from 'src/models/turma';
import { Chamada } from 'src/models/chamada';
import { NavController, ToastController, IonSlides } from '@ionic/angular';
import { AuthService } from '../../service/auth.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-chamada-images',
  templateUrl: './chamada-images.page.html',
  styleUrls: ['./chamada-images.page.scss'],
})
export class ChamadaImagesPage implements OnInit {
  turma: Turma;
  chamada: Chamada;
  filenames: Array<string>;
  url: string = AuthService.API_URL;

  @ViewChild(IonSlides) slides: IonSlides;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParamsService,
    private requests: RequestService,
    private toast: ToastController,
    private statusBar: StatusBar
    ) {
    this.turma = navParams.get('turma');
    this.chamada = navParams.get('chamada');

    this.statusBar.hide();

    this.getFilenamesImg();
  }

  event(data) {
    if (data.type === 'swipe') {
      this.slides.lockSwipes(true);
    } else if (data.type === 'touchend') {
      this.slides.lockSwipes(false);
    }
  }

  showStatusBar() {
    this.statusBar.show();
  }

  async getFilenamesImg() {
    try {
      const resp = await this.requests.get('/img/filename/turma/'+this.turma.id+'/chamada/'+this.chamada.id);
      this.filenames = Array();
      resp.forEach(elem => {
        this.filenames.push(elem);
      });
    } catch (error) {
      await this.requests.requestErrorPageHandler(error, this.toast, this.navCtrl);
    }
  }

  ngOnInit() {
  }
}
