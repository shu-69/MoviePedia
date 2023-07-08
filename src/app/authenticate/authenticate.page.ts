import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SetOverlaysWebViewOptions, StatusBar } from '@capacitor/status-bar';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.page.html',
  styleUrls: ['./authenticate.page.scss'],
})
export class AuthenticatePage implements OnInit {

  showPassword: Boolean = false;

  isLoading: Boolean = false;

   loginForm: FormGroup = this.formBuilder.group({
    username: ['shu@bcs.in', [Validators.required]],
    password: ['shu', Validators.required],
    rememberMe: [false]
  });

  constructor(private storage: Storage, private formBuilder: FormBuilder, private nav: NavController, private authService: AuthService) { }

  ngOnInit() {
  }

    ionViewWillEnter() {

    let options: SetOverlaysWebViewOptions = {
      overlay: true
    }

    StatusBar.setOverlaysWebView(options)

  }

  processGoogleLogin() {
    
    this.authService.processGoogleAuth();

  }

  processFacebookLogin() {
    
    this.authService.processFacebookAuth();

  }

  submit() {

    if(this.loginForm.valid){

      this.isLoading = true;

      if(this.loginForm.controls['rememberMe'].value){

        this.saveLoginDetails(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value);
        
      }

      this.nav.navigateRoot('intro');

    }else {
      

    }

  }

  saveLoginDetails(username: string, password: string) {

    alert('Saving Login Details')

    this.storage.set('username', username);
    this.storage.set('password', password);

  }

}
