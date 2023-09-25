import { Injectable } from '@angular/core';
import { AngularFireAuth ,} from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/user.model';
import { getAuth } from "@angular/fire/auth"
import { updateProfile } from 'firebase/auth';
import { UtilsService } from './utils.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  firestore: any;

  constructor(
    private auth : AngularFireAuth,
    private db:AngularFirestore,
    private utilsSvc:UtilsService
  ) { }


  login(user:User){
    return this.auth.signInWithEmailAndPassword(user.email, user.password)
  }

  signUp(user:User){
    return this.auth.createUserWithEmailAndPassword(user.email, user.password)
  }

  updateUser(user:any){
    const auth = getAuth();
    return updateProfile(auth.currentUser,user)
  }

  getAuthState(){
    return this.auth.authState
  }

  async signOut(){
    await this.auth.signOut()
    this.utilsSvc.routerLink('/auth')
    localStorage.removeItem('user')
  } 


  getSubcollection(subcollectionName :string){
    return this.db.collection(subcollectionName).valueChanges({idField : 'id'})
  }
  
  getCountlikes(subcollectionName :string){
    return this.db.collection(subcollectionName).valueChanges()
  }
  addSubcollection( subcollectionName :string , object:any){
    return this.db.collection(subcollectionName).add(object)
  }

  updateDocument(path:string , object:any){
    return this.db.doc(path).update(object)
  }

  deleteDocument(path:string){
    return this.db.doc(path).delete()
  }
}
