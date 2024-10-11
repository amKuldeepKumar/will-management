import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TextinputComponent } from "./components/input/textinput/textinput.component";
import { FormControl, Validators } from '@angular/forms';
import { SelectinputComponent } from "./components/input/selectinput/selectinput.component";
import { RadioinputComponent } from "./components/input/radioinput/radioinput.component";
import { AuthComponent } from "./features/authentication/auth/auth.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TextinputComponent, SelectinputComponent, RadioinputComponent, AuthComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
   PERSON_TITLES_OPTIONS = [
    { label: 'Mr.', value: 'mr' },
    { label: 'Ms.', value: 'ms' },
    { label: 'Mrs.', value: 'mrs' },
    { label: 'Miss', value: 'miss' },
    { label: 'Dr.', value: 'dr' },
    { label: 'Prof.', value: 'prof' },
    { label: 'Mx.', value: 'mx' }
];


MARITIAL_STATUS_OPTIONS = [
  { label: 'Married', value: 'married' },
  { label: 'Civil Partner', value: 'civil_partner' },
  { label: 'Divorced or former Civil Partner', value: 'divorced' },
  { label: 'Single', value: 'single' },
  { label: 'Widowed', value: 'widowed' },
  { label: 'Cohabiting', value: 'cohabiting' },
  { label: 'Separated', value: 'separated' }
];


  
  name='Kuldeep kumar Angular';
  email = "kuldeep@insonix.com"
  title='ms'

  onEmailChange(e:Event){
    console.log(e,);
    
  }
}
