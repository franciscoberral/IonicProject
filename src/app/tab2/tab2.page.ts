import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Browser } from '@capacitor/browser';
import { GamesService } from '../services/games.service';
import { UiService } from '../services/ui.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  constructor(
  ) {
    
  }

  async openBrowser() {
    await Browser.open({ url: 'https://www.imdb.com'});
    Browser.addListener('browserFinished', () => {
      console.log('browser finished');
    })
  }

  async closeBrowser() {
    await Browser.close();
    Browser.close();
  }
}
