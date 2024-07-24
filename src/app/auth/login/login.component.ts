import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [ReactiveFormsModule, RouterLink]
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required],

    }),
    password: new FormControl('', {
      validators: [Validators.minLength(6), Validators.required],

    })
  })

  constructor(private authService: AuthService, private router: Router) { }

  get emailIsInvalid() {
    return (
      this.form.controls.email.touched &&
      this.form.controls.email.invalid &&
      this.form.controls.email.dirty
    )
  }
  get passwordIsInvalid() {
    return (
      this.form.controls.password.touched &&
      this.form.controls.password.invalid &&
      this.form.controls.password.dirty
    )
  }


  onSubmit() {
    if (this.form.valid) {
      const loggedIn = this.authService.login(this.form.value.email!, this.form.value.password!);
      if (!loggedIn) {
        alert('Invalid email or password');
      } else {
        alert('Successfully logged in');
        this.router.navigate(['']);
      }
    }
  }
}