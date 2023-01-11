import { Component } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { initializeApp } from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
  ) {
    this.initializeApp();
  }
  
async initializeApp() {
  await SplashScreen.show({
    showDuration: 3000,
    autoHide: true,
  });
}
}
