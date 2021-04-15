import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;
@Injectable({
  providedIn: 'root'
})
export class GeneralServiceService {
  loading;
  constructor(private loadingController: LoadingController, private toastController: ToastController) { }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      spinner: "bubbles",
      message: 'loading...',
      translucent: true,
      cssClass:"loadingClass",
      backdropDismiss: false
    });
    await this.loading.present();
    return true;
  }

  async hideLoading(){
    await this.loading.dismiss();
    return true;
  }

  async presetnToastR(text: string,boton,time=3000) {
		const toast = await this.toastController.create({
			message: text,
			duration: time,
			buttons: [{text:boton}],
			cssClass:'redToast',
		});
		await toast.present();
	}

  async presetnToastV(text: string,boton,time=3000) {
		const toast = await this.toastController.create({
			message: text,
			duration: time,
			buttons: [{text:boton}],
			cssClass:'greenToast',
		});
		await toast.present();
	}

  async setStorage(name,data){
		await Storage.set({
      key:name,
      value: JSON.stringify(data)
    })
    return true;
	}

  async getStorage(name) {
    const ret = await Storage.get({ key:name });
    const data = JSON.parse(ret.value);
    return data;
  }
}
