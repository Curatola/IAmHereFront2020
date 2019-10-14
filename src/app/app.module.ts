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
import { ComponentsModule } from './components/components.module';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { CanDeactivateGuard } from './can-deactivate.guard';
import { FCM } from '@ionic-native/fcm/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { HttpClientModule } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { SyncronizationService } from './service/syncronization.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule
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
    SyncronizationService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
