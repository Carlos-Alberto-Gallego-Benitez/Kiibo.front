import { Component, OnInit } from '@angular/core';
import { Techn } from "src/app/models/techn.model"
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { User } from 'src/app/models/user.model';
import { AddUpdateTechComponent } from 'src/app/shared/components/add-update-tech/add-update-tech.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  Techn:Techn[] = [];
  countLike:Array<any> = [];
  user = {
    name:'armando'
  } as User
  constructor(
    private firebaseSvc : FirebaseService,
    private utilsSvc: UtilsService
  ) { }
  getUser(){
    return this.user = this.utilsSvc.getElementFromLocalStorage('user')
  }

  confirmDeleteTechn(tech:Techn){
    this.utilsSvc.presentAlert(
      {
        header: 'Eliminar Tecnologia',
        message: '¿Quieres Eliminar Tecnologia?',
        mode:'ios',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
          }, {
            text: 'Si, Eliminar',
            handler: () => {
              this.deleteTech(tech)
            }
          }
        ]
      }
    )
  }
  countLikes(){
    let sub = this.firebaseSvc.getCountlikes('countlikes').subscribe({
      next:(res:Techn[]) =>{
        this.countLike = res;
        console.log("this.countLike ",this.countLike )
        sub.unsubscribe()
      }
    })
  }



  toggleLike(tech) {
    tech.liked = !tech.liked;
  }
   
  deleteTech(tech:Techn){
    let path = `users/${this.user.uid}/tecnologias/${tech.id}`;
    this.utilsSvc.presentLoading()
   

    this.firebaseSvc.deleteDocument(path).then(res =>{
    
      this.utilsSvc.presentToast({
        message:' Tecnologia eliminada exitosamente',
        color:'success',
        icon:'checkmark-circle-outline',
        duration:1500
      })
      this.utilsSvc.dismmissLoading()
    },error =>{
      this.utilsSvc.presentToast({
        message:error,
        color:'warning',
        icon:'alert-circle-outline',
        duration:5000
      })
      this.utilsSvc.dismmissLoading()
    })
  }
  ngOnInit() {
   this.countLikes()
  }
  ionViewWillEnter(){
    this.getTechn()
  }
  async addOrUpdateTech(tech?:Techn){
    let res = await  this.utilsSvc.presentModal({
      component:AddUpdateTechComponent,
      componentProps: {tech},
      cssClass:'add-update-modal'
    })
    if(res && res.success){
      this.getTechn()
    }
  }

  getTechn(){
    // let user:User = this.utilsSvc.getElementFromLocalStorage('user')
    // console.log("user",user)
    // let path = `users/${user.uid}`
   let sub = this.firebaseSvc.getSubcollection('tecnologias').subscribe({
      next:(res:Techn[]) =>{
        this.Techn = res;
        console.log("this.Techn",this.Techn)
        sub.unsubscribe()
      }
    })
  }

}
