import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, FacebookAuthProvider, UserCredential} from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public angularAuth: AngularFireAuth) { }

  async processGoogleAuth() : Promise<any> {

    return this.angularAuth.signInWithPopup(new GoogleAuthProvider());
    
  }

  async processFacebookAuth() : Promise<any> {

    return this.angularAuth.signInWithPopup(new FacebookAuthProvider());

  }

}
