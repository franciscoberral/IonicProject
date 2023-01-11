import { Injectable } from '@angular/core';
import {
  AngularFirestore, AngularFirestoreCollection,
  DocumentSnapshot,Query, QueryDocumentSnapshot
} from '@angular/fire/compat/firestore'
import { Game } from '../model/game';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  private lastDoc : QueryDocumentSnapshot<any>;
  private dbPath: string = 'games';
  private dbRef: AngularFirestoreCollection<any>
  constructor(private db: AngularFirestore) {
    this.dbRef = this.db.collection(this.dbPath);
  }
  
  public async addGame(game: Game): Promise<Game> {
      const {id, ...g} = game;
      let newGame = await this.dbRef.add(g);
      game.id = newGame.id;
      return game;
  }

  public removeGame(id): Promise<void> {
    return this.dbRef.doc(id).delete();
  }

  public async updateGame(game):Promise<void> {
    if(!game.id) return;
    const {id, ...n} = game;
    await this.dbRef.doc(game.id).set(n);
  }
 
  public async getGames(refreshing?:boolean):Promise<Game[]> {
    let games: Game[] = []
    let r;
    if (refreshing || this.lastDoc == null) {
      this.lastDoc = null;
      r = await this.dbRef.ref.orderBy('title').limit(8).get();
    } else {
      r = await this.dbRef.ref.orderBy('title').startAfter(this.lastDoc).limit(4).get();
    }
    r.docs.forEach(d => {
      this.lastDoc = d;
      games.push({id: d.id, ...d.data()});
    })
    return games;
  }
}
