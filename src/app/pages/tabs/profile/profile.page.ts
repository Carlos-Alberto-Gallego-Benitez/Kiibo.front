import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user = {
    name:'armando'
  } as User
  constructor(
    private firebaseSvc: FirebaseService,
    private utilsSvc : UtilsService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getUser()
  }



  getUser(){
    return this.user = this.utilsSvc.getElementFromLocalStorage('user')
  }

  signOut(){
    this.utilsSvc.presentAlert(
      {
        header: 'Cerrar sesión',
        message: '¿Quieres cerrar sesión?',
        mode:'ios',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
          }, {
            text: 'Si, cerrar',
            handler: () => {
              this.firebaseSvc.signOut()
            }
          }
        ]
      }
    )
  }

}
