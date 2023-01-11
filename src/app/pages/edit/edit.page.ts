import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Game } from 'src/app/model/game';
import { GamesService } from 'src/app/services/games.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  @Input('data') data: Game;
  private fields: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private gamesService: GamesService,
    private uiService: UiService,
    private modalController: ModalController
  ) {
   
  }

  ngOnInit() {
    this.fields = this.formBuilder.group({
      title: [this.data.title, [Validators.required, Validators.minLength(3)]],
      description: [this.data.description],
      rating: [this.data.rating],
      score: [this.data.score]
    })
  }

  async editForm(){
    if (!this.fields.valid) return;
    await this.uiService.showLoading();
    try {
      await this.gamesService.updateGame({
        id: this.data.id,
        title: this.fields.get('title').value,
        description: this.fields.get('description').value,
        rating: this.fields.get('rating').value,
        score: this.fields.get('score').value
      });
      this.uiService.showToast("Successful update");
    } catch(err) {
      console.error(err);
      this.uiService.showToast("Something was wrong","danger");
    } finally {
      this.uiService.hideLoading();
      this.modalController.dismiss({
        id: this.data.id,
        title: this.fields.get('title').value,
        description: this.fields.get('description').value,
        rating: this.fields.get('rating').value,
        score: this.fields.get('score').value
      });
    }
  }
}
