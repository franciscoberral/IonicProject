import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PERSISTENCE_SETTINGS } from '@angular/fire/compat/firestore';
import { InfiniteScrollCustomEvent, IonInfiniteScroll, ModalController } from '@ionic/angular';
import { Game } from '../model/game';
import { AddPage } from '../pages/add/add.page';
import { EditPage } from '../pages/edit/edit.page';
import { GamesService } from '../services/games.service';
import { UiService } from '../services/ui.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  @ViewChild('infinitescroll') infinitescroll : ElementRef;
  public games: Game[] = [];
  public searchedGames;
  constructor(private gamesService: GamesService,
    private uiService: UiService,
    private modalController: ModalController) {
      
  }

  async ngOnInit() {
    await this.uiService.showLoading();
    this.games = await this.gamesService.getGames(true);
    this.searchedGames = this.games;
    this.uiService.hideLoading();
  }

  public async addGame() {
    const modal = await this.modalController.create({
      component: AddPage,
      componentProps:{}
    });
    await modal.present();
  }

  public deleteGame(game) {
    game.hided = true;
    
    const timeout = setTimeout(() => {
      this.gamesService.removeGame(game.id);
      this.games = this.games.filter(n => n.id != game.id);
    }, 5000);
    this.uiService.showToastOptions("Undo", () => {
      clearTimeout(timeout);
      game.hided = undefined;
    });
  }

  public async editGame(game: Game) {
    const modal = await this.modalController.create({
      component: EditPage,
      componentProps:{data: game}
    });
    await modal.present();

    const {data, role} = await modal.onWillDismiss();
    if(!role){
      this.searchedGames = this.searchedGames.map((e) => {
        if (e.id == data.id) {
          return data;
        } else {
          return e;
        }
      })
    }
  }

  public async loadGames(event) {
    this.searchedGames = await this.gamesService.getGames(true);
    event.target.complete();
  }

  public async loadMoreGames(event) {
    let newGames: Game[] = await this.gamesService.getGames();
    this.searchedGames = this.searchedGames.concat(newGames);
    (event as InfiniteScrollCustomEvent).target.complete();
  }
  
  public search(event) {
    const text = event.target.value;
    this.searchedGames = this.games;
    if (text && text.trim() != '') {
      this.searchedGames = this.searchedGames.filter(g => {
        return (g.title.toLowerCase().indexOf(text.toLowerCase()) > -1);
      })
    }
  }
}
