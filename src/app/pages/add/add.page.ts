import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Game } from 'src/app/model/game';
import { GamesService } from 'src/app/services/games.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  @Input('data') data: Game;
  private fields: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private gamesServices: GamesService,
    private uiService: UiService,
    private modalController: ModalController
  ) {

  }

  ngOnInit() {
    this.fields = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      rating: [''],
      score: ['']
    })
  }

  async addForm() {
    if (!this.fields.valid) return;
    await this.uiService.showLoading();
    try {
      if (!this.data) {
        await this.gamesServices.addGame({
          title: this.fields.get('title').value,
          description: this.fields.get('description').value,
          rating: this.fields.get('rating').value,
          score: this.fields.get('score').value
        })
        this.fields.reset("");
        this.uiService.showToast("Successful insertion");
      }
    } catch(err) {
      console.error(err);
      this.uiService.showToast("Something was wrong","danger");
    } finally {
      this.uiService.hideLoading();
      this.modalController.dismiss({
        title: this.fields.get('title').value,
        description: this.fields.get('description').value,
        rating: this.fields.get('rating').value,
        score: this.fields.get('score').value
      });
    }
  }
}
