import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { first } from 'rxjs';
import { LoginService } from 'src/app/services/login/login.service';

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
    MatButtonModule,
  ],
})
export class LoginComponent {
  constructor(private loginService: LoginService) {
    0;
  }

  public loginForm = new FormGroup({
    email: new FormControl('', { nonNullable: true }),
    password: new FormControl('', { nonNullable: true }),
  });

  public login() {
    this.loginService
      .goLogin({
        email: this.loginForm.controls.email.value,
        password: this.loginForm.controls.password.value,
      })
      .pipe(first())
      .subscribe();
  }
}
