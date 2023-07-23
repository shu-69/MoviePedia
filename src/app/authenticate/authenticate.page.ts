import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SetOverlaysWebViewOptions, StatusBar } from '@capacitor/status-bar';
import { IonButton, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from '../services/auth.service';
import { SwiperComponent } from 'swiper/angular';
import { GeneralService } from '../services/general.service';
import { ISODateString } from '@capacitor/core';
@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.page.html',
  styleUrls: ['./authenticate.page.scss'],
})
export class AuthenticatePage implements OnInit {

  showPassword: Boolean = false;
  showPasswordForRegistration: Boolean = true;

  isSigningIn: Boolean = false; oolean = false
  isSigningUp: Boolean = false;

  isLoading: Boolean = false;

  passwordResetMailSent : Boolean = false;

  loginForm: FormGroup = this.formBuilder.group({
    email: ['shu@bcs.in', [Validators.required]],
    password: ['shu', Validators.required],
    rememberMe: [true]
  });

  registrationForm: FormGroup = this.formBuilder.group({
    name: ['Shubham', [Validators.required]],
    phone: ['+917979958673', [Validators.required]],
    email: ['shu@bcs.in', [Validators.required]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
    password_confirm: ['123456',],
  });

  constructor(private storage: Storage, private formBuilder: FormBuilder, private nav: NavController, private authService: AuthService,
    private generalServices: GeneralService) { }

  ngOnInit() {


  }

  ionViewWillEnter() {

    let options: SetOverlaysWebViewOptions = {
      overlay: true
    }

    StatusBar.setOverlaysWebView(options)

  }

  async processEmailPasswordLogin() {

    if(this.isSigningIn)
      return

    if (this.loginForm.valid) {

      this.isSigningIn = true;

      await this.authService.processEmailPasswordAuth(this.loginForm.controls['email'].value,
        this.loginForm.controls['password'].value).then((data) => {

          if (this.loginForm.controls['rememberMe'].value) {
            this.generalServices.saveLoginDetails(this.loginForm.controls['email'].value, this.loginForm.controls['password'].value);
          }

          this.isSigningIn = false;

          this.nav.navigateRoot('home')

        }).catch((error) => {

          this.isSigningIn = false;
          console.error(error)

          let errorCode = error.code;

          switch (errorCode) {

            case 'auth/wrong-password': {

              this.generalServices.showToast('Password doesn\'t matched!', 'bottom', 'ios');

              return;

            }

            case 'auth/user-not-found': {

              this.generalServices.showToast('User not found!', 'bottom', 'ios');

              return;

            }

            default: {

              this.generalServices.showToast('Login failed!', 'bottom', 'ios')

            }

          }

        })

    }

  }

  async processGoogleLogin() {

    await this.authService.processGoogleAuth().then((data) => {

      console.log(data)

    }).catch((error) => {

      console.error(error)

    })

  }

  processFacebookLogin() {

    this.authService.processFacebookAuth();

  }

  async processEmailPasswordRegistration() {

    if (this.registrationForm.valid) {

      if (this.registrationForm.controls['password'].value == this.registrationForm.controls['password_confirm'].value) {

        this.isSigningUp = true;

        this.authService.processEmailPasswordRegistrtion(this.registrationForm.controls['email'].value, this.registrationForm.controls['password'].value).then(async (data) => {

          console.log(data)

          const user = data.user;

          if (user) {
            try {
              await user.updateProfile({
                displayName: this.registrationForm.controls['name'].value
              });
              // await user.updatePhoneNumber(this.registrationForm.controls['phone'].value); // TODO
            } catch (e) {
              console.error(e)
            }
          }

          // this.authService.processEmailPasswordAuth(this.registrationForm.controls['email'].value, this.registrationForm.controls['password'].value).then((data) => {}).catch((error) => { })

          this.generalServices.saveLoginDetails(this.registrationForm.controls['email'].value, this.registrationForm.controls['password'].value);

          this.isSigningUp = false;

          this.nav.navigateRoot('home')

        }).catch((error) => {

          this.isSigningUp = false;
          console.error(error)

          if (error.code === 'auth/email-already-in-use') {

            this.generalServices.showToast('Email already exist! Login instead.', 'bottom', 'ios');

            return

          }

          this.generalServices.showToast('Sign Up failed!', 'bottom', 'ios');

        })

      } else {

        this.generalServices.showToast('Password doesn\'t matched', 'bottom', 'ios');

      }

    } else {

      if (this.registrationForm.controls['name'].invalid) {

        this.generalServices.showToast('Name required', 'bottom', 'ios');

        return;

      }

      if (this.registrationForm.controls['phone'].invalid) {

        this.generalServices.showToast('Phone required', 'bottom', 'ios');

        return;

      }

      if (this.registrationForm.controls['email'].invalid) {

        this.generalServices.showToast('Email required', 'bottom', 'ios');

        return;

      }

      if (this.registrationForm.controls['password'].invalid) {

        if (this.registrationForm.controls['password'].value.length == 0) {

          this.generalServices.showToast('Password required', 'bottom', 'ios');

          return;

        }

        if (this.registrationForm.controls['password'].value.length < 6) {

          this.generalServices.showToast('Password should be at least of 6 characters', 'bottom', 'ios');

          return;

        }

      }

    }

  }

  async sendPasswordResetMail(userMail: string) {

    this.passwordResetMailSent = false;

    await this.authService.sendPasswordResetMail(userMail).then((data) => {

      this.passwordResetMailSent = true;

    }).catch((error) => {

      const errorCode = error.code;

      console.error(errorCode)

      switch(errorCode) {

        case 'auth/invalid-email' : {

          this.generalServices.showToast('Enter a valid email.', 'bottom', 'ios');

          return

        }

        case 'auth/user-not-found' : {

          this.generalServices.showToast('Email is not registered.', 'bottom', 'ios');

          return

        }

        default : {

          this.generalServices.showToast('Email sending failed!', 'bottom', 'ios');

        }

      }      

    })

  }

  skip() {

    this.storage.set('loggin-skipped', true);
    this.nav.navigateRoot('home');

  }

}
