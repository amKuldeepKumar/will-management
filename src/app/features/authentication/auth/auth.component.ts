import { Component } from '@angular/core';
import { AuthformComponent } from "../authform/authform.component";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [AuthformComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

}
