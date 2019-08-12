import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { File } from '@ionic-native/file/ngx';
import { ComponetsModule } from './components/componets.module';
import { IonicImageLoader } from 'ionic-image-loader';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { CanDeactivateGuard } from './can-deactivate.guard';
import { FCM } from '@ionic-native/fcm/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib_1.__decorate([
        NgModule({
            declarations: [AppComponent],
            entryComponents: [],
            imports: [
                BrowserModule,
                IonicModule.forRoot(),
                AppRoutingModule,
                HttpClientModule,
                FormsModule,
                ReactiveFormsModule,
                ComponetsModule,
                IonicImageLoader.forRoot()
            ],
            providers: [
                StatusBar,
                SplashScreen,
                File,
                WebView,
                Deeplinks,
                FCM,
                LocalNotifications,
                CanDeactivateGuard,
                CookieService,
                { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
            ],
            bootstrap: [AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map