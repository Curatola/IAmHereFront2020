import { browser, by, element } from 'protractor';

export class LoginPage {
  [x: string]: any;
  navigateTo() {
    return browser.get('/login');
  }

  getParagraphText() {
    return element(by.deepCss('app-root ion-content')).getText();
  }

  getEmailTextbox() {
    return element(by.name('email'));
   }
  getPasswordTextbox() {
    return element(by.name('password'));
   }
}
