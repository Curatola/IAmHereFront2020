import { AuthService } from "./service/auth.service";
import { Component } from "@angular/core";

import { Platform, ToastController, NavController } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { RequestService } from "./service/request.service";
import { Router } from '@angular/router';
import { ImageLoaderConfigService } from 'ionic-image-loader';
import { Deeplinks, DeeplinkMatch } from '@ionic-native/deeplinks/ngx';
import { NavParamsService } from './service/nav-params.service';

@Component({
  selector: "app-root",
  templateUrl: "app.component.html"
})
export class AppComponent {
  constructor(
    platform: Platform,
    private imgLoaderConfig: ImageLoaderConfigService,
    private toast: ToastController,
    private nav: NavController,
    private navParams: NavParamsService,
    public deep: Deeplinks,
    private requests: RequestService,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public auth: AuthService,
    private router: Router
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      statusBar.overlaysWebView(false);
      splashScreen.hide();

      let logged: boolean = this.auth.userIsLogged();

      if (logged) this.router.navigate(["turmas"])
      else this.router.navigate(["login"])

      this.imgLoaderConfig.setImageReturnType("base64");

      this.deep.route({
        "/confirm_email/:token":'/login',
        "/reset_senha/:token":"/nova-senha",
      }).subscribe(
        match => {
          this.handle_deeplink(match);
        },
        nomatch => {
          console.log("no match", nomatch);
        }
      );
    });
  }

  async handle_deeplink(match: DeeplinkMatch) {
    try {
      if (this.auth.userIsLogged()) {
        let t = await this.toast.create({
          message: "Faça logout primeiro!",
          duration: 3000
        });

        t.present();

        return;
      }

      if (match.$link.path.split("/")[1] == "confirm_email") {
        let resp = await this.requests.put(
          "confirm_email",
          { token: match.$args.token },
          false
        );
        let msg: string = "";
        if (resp.sucesso) msg = resp.sucesso;
        else if (resp.warning) msg = resp.warning;

        let t = await this.toast.create({
          message: msg,
          duration: 3000
        })
        t.present();
      } else if (match.$link.path.split("/")[1] == "reset_senha") {
        this.navParams.setParams({ token: match.$args.token })
        this.nav.navigateForward('/nova-senha');
      }
    } catch (error) {
      await this.requests.requestErrorPageHandler(error,this.toast,this.nav);
    }
  }
}
