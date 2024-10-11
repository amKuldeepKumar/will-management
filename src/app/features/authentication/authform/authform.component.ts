import { Component, inject, NgZone } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardContent, MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TextinputComponent } from "../../../components/input/textinput/textinput.component";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment.prod';
const loginAction = {
  GOOGLE: 'google',
  FACEBOOK: 'facebook'
};
@Component({
  selector: 'app-authform',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, CommonModule, MatInputModule, MatCardModule, MatCardContent, MatButtonModule, ReactiveFormsModule, TextinputComponent],
  templateUrl: './authform.component.html',
  styleUrl: './authform.component.scss'
})
export class AuthformComponent {
  router = inject(Router);
  

  popupWidth = 500;
  popupHeight = 600;
  currentTab = 'REGISTER'

  constructor( private fb: FormBuilder, private ngZone: NgZone) {
   
  }

  getPopupFeatures(): string {
    const left = (window.screen.width - this.popupWidth) / 2;
    const top = (window.screen.height - this.popupHeight) / 2;
    return `width=${this.popupWidth},height=${this.popupHeight},top=${top},left=${left}`;
  }


  private getUserInfo(accessToken: string, action: string): void {
    const urls = {
      [loginAction.GOOGLE]: 'https://www.googleapis.com/oauth2/v2/userinfo',
      [loginAction.FACEBOOK]: `https://graph.facebook.com/me?access_token=${accessToken}&fields=id,name,email`,
    };

    fetch(urls[action], {
      headers: action === loginAction.GOOGLE ? { Authorization: `Bearer ${accessToken}` } : {},
    })
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((userInfo) => this.handleUserInfo(userInfo, action))
      .catch((error) => {
        console.error('Error fetching user info:', error);
       
      });
  }

  private handleAuthPopup(popup: Window | null, action: string): void {
    const pollTimer = window.setInterval(() => {
      try {
        if (popup && popup.closed) {
          window.clearInterval(pollTimer);
        }

        if (popup && popup.location.href.includes(environment.REDIRECT_URL)) {
          const urlParams = new URLSearchParams(popup.location.hash.substring(1));

          const accessToken = urlParams.get('access_token');
          console.log(accessToken);

          if (accessToken) {
            window.clearInterval(pollTimer);
            popup.close();
            this.getUserInfo(accessToken, action);
          }
        }
      } catch (error) {
      }
    }, 1000);
  }

  private handleUserInfo(userInfo: any, action: string): void {
    this.ngZone.run(() => {
      console.log(userInfo);
      
      // this.authStateService.googleLogin({
      //   name: userInfo.name,
      //   googleId: userInfo.id,
      //   email: userInfo.email,
      //   photoUrl: userInfo.picture
      // });

     
    });
  }

 

  signInWithFacebook(): void {
    const facebookAuthUrl = `https://www.facebook.com/v11.0/dialog/oauth?client_id=${environment.FACEBOOK_APP_ID}&redirect_uri=${environment.REDIRECT_URL}&response_type=token&scope=email,public_profile`;
    const popup = window.open(facebookAuthUrl, '_blank', this.getPopupFeatures());
    this.handleAuthPopup(popup, loginAction.FACEBOOK);
  }

  signInWithGoogle(): void {
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${environment.GOOGLE_CLIENT_ID}&redirect_uri=${environment.REDIRECT_URL}&response_type=token&scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email&prompt=select_account`;
    const popup = window.open(googleAuthUrl, '_blank', this.getPopupFeatures());
    this.handleAuthPopup(popup, loginAction.GOOGLE);
  }
  handleChange(event: Event) {
    const target = event.target as HTMLInputElement; 
    const { name, value } = target;
    console.log(name, value);
   
  }

  changeForm(prps: string) {
    this.currentTab = prps;
  }


  handleAction(){

    
  }
 

}
