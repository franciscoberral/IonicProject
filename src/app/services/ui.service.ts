import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private loading: HTMLIonLoadingElement;
  constructor(private loadingController: LoadingController,
    private toastController: ToastController) { 

    }

  public async showLoading(msg?) {
    if (this.loading) return;
    this.loading = await this.loadingController.create({
      message: msg
    });
    await this.loading.present();
  }

  public async hideLoading() {
    if (!this.loading) return;
    await this.loading.dismiss();
    this.loading = null;
  }

  public async showToast(msg,color='success', position:'bottom' | 'top'='bottom') {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      animated:true,
      position: position,
      color:color
    });
    await toast.present();
  }

  async showToastOptions(msg, callBackFn) {
    const toast = await this.toastController.create({
      message: msg,
      position: "top",
      color: "danger",
      duration: 3000,
      buttons: [{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {callBackFn()}
      }]
    });
    await toast.present();
  }
}
