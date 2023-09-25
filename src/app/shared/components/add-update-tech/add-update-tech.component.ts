import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ItemReorderEventDetail } from '@ionic/angular';
import { Techn } from 'src/app/models/techn.model';

import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-add-update-tech',
  templateUrl: './add-update-tech.component.html',
  styleUrls: ['./add-update-tech.component.scss'],
})
export class AddUpdateTechComponent  implements OnInit {
  @Input() tech:Techn;
  user = {} as User

  form = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('',[Validators.required, Validators.minLength(4)]),
    description: new FormControl('',[Validators.required, Validators.minLength(4)]),
    comments: new FormControl([],[Validators.required, Validators.minLength(1)])
  })
  constructor(
    private firebaseSvc: FirebaseService,
    private utilsSvc : UtilsService
  ) { }

  ngOnInit() {
    if(this.tech){
      this.form.setValue(this.tech)
      this.form.updateValueAndValidity()
    }
     this.user = this.utilsSvc.getElementFromLocalStorage('user')
    
  }
  submit(){
    if(this.form.valid){
      if(this.tech){
        this.updateTechn()
      }else{
        this.createTechn()
      }
    }
  }
  
    createTechn(){
    let path = `users/${this.user.uid}`;
    this.utilsSvc.presentLoading()
    delete this.form.value.id;

    this.firebaseSvc.addSubcollection('tecnologias',this.form.value).then(res =>{
      this.utilsSvc.dismissModal({success:true});
      this.utilsSvc.presentToast({
        message:' Tecnologia creada exitosamente',
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
  updateTechn(){
    let path = `tecnologias/${this.tech.id}`;
    this.utilsSvc.presentLoading()
    delete this.form.value.id;

    this.firebaseSvc.updateDocument(path, this.form.value).then(res =>{
      this.utilsSvc.dismissModal({success:true});
      this.utilsSvc.presentToast({
        message:' Tecnologia actualizada exitosamente',
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
  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    this.form.value.comments = ev.detail.complete(this.form.value.comments); 
    this.form.updateValueAndValidity();
  }

  removeItem(index:number){
    this.form.value.comments.splice(index, 1);
    this.form.controls.comments.updateValueAndValidity();
  }

  createCommentAlert(){
    this.utilsSvc.presentAlert({
      header: 'Nuevo comentario',
      backdropDismiss: false,
      inputs:[
        {
          name:'name',
          type:"textarea",
          placeholder:"Ingrese un nuevo comentario"
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        }, {
          text: 'Agregar',
          handler: (res) => {
            res.name

            let coment:any = {name: res.name}
            this.form.value.comments.push(coment)
            this.form.controls.comments.updateValueAndValidity();
          }
        }
      ]
    })
  }
}
