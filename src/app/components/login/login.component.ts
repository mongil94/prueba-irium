import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  templateUrl: 'login.component.html',
  standalone: true,
  styleUrls: ['login.component.scss'],
  imports: [
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
  ],
})
export class LoginComponent {
  public loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
}
