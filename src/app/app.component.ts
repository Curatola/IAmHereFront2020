import { AuthService } from "./auth.service";
import { Component } from "@angular/core";

import { Platform, ToastController } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { RequestService } from "./request.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html"
})
export class AppComponent {
  constructor(
    platform: Platform,
    //private imgLoaderConfig: ImageLoaderConfig,
    private toast: ToastController,
    //public deep: Deeplinks,
    private requests: RequestService,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public auth: AuthService
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      statusBar.overlaysWebView(false);
      splashScreen.hide();

      let logged: boolean = this.auth.userIsLogged();

      //if (logged) this.rootPage = TurmasPage;
      //else this.rootPage = LoginPage;

      //this.imgLoaderConfig.setImageReturnType("base64");

      /*this.deep
        .route({
          "/confirm_email/:token": LoginPage,
          "/reset_senha/:token": NovaSenhaPage
        })
        .subscribe(
          match => {
            this.handle_deeplink(match);
          },
          nomatch => {
            console.log("no match", nomatch);
          }
        );
    });*/
    });
  }

  /*async handle_deeplink(match: DeeplinkMatch) {
    try {
      if (this.auth.userIsLogged()) {
        this.toast
          .create({
            message: "Faça logout primeiro!",
            duration: 3000
          })
          .present();

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

        this.toast
          .create({
            message: msg,
            duration: 3000
          })
          .present();
      } else if (match.$link.path.split("/")[1] == "reset_senha") {
        this.nav.push(NovaSenhaPage, { token: match.$args.token });
      }
    } catch (error) {
      await this.requests.requestErrorPageHandler(
        error,
        this.toast,
        this.nav,
        LoginPage
      );
    }
  }*/
}
