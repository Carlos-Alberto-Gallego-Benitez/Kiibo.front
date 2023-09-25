import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, AlertOptions, LoadingController, LoadingOptions, ModalController, ModalOptions, ToastController, ToastOptions } from '@ionic/angular';
import { async } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private loadingController: LoadingController,
    private router : Router,
    private toastController: ToastController,
    private alertController: AlertController,
    private modalController: ModalController
  ) { }


  async presentLoading(opts?:LoadingOptions) {
    const loading = await this.loadingController.create(opts);
    await loading.present();
  }

  async dismmissLoading(){
    return await this.loadingController.dismiss()
  }

  setElementInLocalstorage(key:string, element:any){
    return localStorage.setItem(key, JSON.stringify(element))
  }

  getElementFromLocalStorage(key:string){
    return JSON.parse(localStorage.getItem(key))
  }
 

  async presentToast(opts:ToastOptions) {
    const toast = await this.toastController.create(opts);
    toast.present();
  }
  routerLink(url:string){
    return this.router.navigateByUrl(url)
  }

  async presentAlert(opts:AlertOptions) {
    const alert = await this.alertController.create(opts);
  
    await alert.present();
  }

  async presentModal(opts:ModalOptions) {
    const modal = await this.modalController.create(opts);
  
    await modal.present();
    const { data } = await modal.onWillDismiss();

    if(data){
      return data;
    }
  }
  
  dismissModal(data?:any){
    this.modalController.dismiss(data);
  }

  
}
