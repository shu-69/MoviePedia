import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { App } from '@capacitor/app';
import { GoogleAuthProvider, FacebookAuthProvider, UserCredential, signInWithPopup, getAuth } from 'firebase/auth';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { environment } from 'src/environments/environment';
// import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public angularAuth: AngularFireAuth) { 

    // firebase.initializeApp(environment.firebase);

  }

  async getLoggedInUser() {

    // 

    // return await firebase.auth().currentUser;

    return await this.angularAuth.currentUser;

  }

  async processEmailPasswordRegistrtion(email: string, password: string) {

    return await this.angularAuth.createUserWithEmailAndPassword(email, password);

  }

  async processEmailPasswordAuth(email: string, password: string) {

    return await this.angularAuth.signInWithEmailAndPassword(email, password);

  }

  async processGoogleAuth() : Promise<any> {

    // firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential('', '365412329971-3snttj4n2hvgb2bade7r31sbtb1u5l0t.apps.googleusercontent.com'));

    let auth = getAuth();

    // const googleSignup = async (auth: any, provider: any) => {

    //     await signInWithPopup(auth, provider)
    
    // };

    return await this.angularAuth.signInWithPopup(new GoogleAuthProvider());
    // return await signInWithPopup(auth, new GoogleAuthProvider());
  }

  async processFacebookAuth(): Promise<any> {

    // signInWithPopup(auth, new GoogleAuthProvider())

    const facebookSignup = async (auth: any, provider: any) => {
      try {
        await signInWithPopup(auth, provider).then(result => console.log(result));
      } catch (error) {
        console.log(error);
      }
    };

    let auth = getAuth();

    facebookSignup(auth, new FacebookAuthProvider())

    // return this.angularAuth.signInWithPopup(new FacebookAuthProvider());

  }

  async sendPasswordResetMail(userMail: string) {

    return await this.angularAuth.sendPasswordResetEmail(userMail);

  }

}
