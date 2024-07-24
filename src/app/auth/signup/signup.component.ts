import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';


function passwordMatchValidator(control: AbstractControl) {

  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  if (password === confirmPassword) {
    return null;
  }

  return { passwordNotMatch: true }
}

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  imports: [ReactiveFormsModule, RouterLink]
})
export class SignupComponent {

  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email]
    }),
    passwords: new FormGroup({
      password: new FormControl('', {
        validators: [Validators.minLength(6), Validators.required]
      }),
      confirmPassword: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)]
      }),
    }, {
      validators: [passwordMatchValidator]
    }),
    firstName: new FormControl('', {
      validators: [Validators.required]
    }),
    lastName: new FormControl('', {
      validators: [Validators.required]
    }),
    address: new FormGroup({
      street: new FormControl('', {
        validators: [Validators.required]
      }),
      city: new FormControl('', {
        validators: [Validators.required]
      }),
      number: new FormControl('', {
        validators: [Validators.required]
      }),
      postalCode: new FormControl('', {
        validators: [Validators.required]
      }),
    }),
    role: new FormControl<'student' | 'teacher' | 'employee' | 'founder' | 'other'>('student', {
      validators: [Validators.required]
    }),
    source: new FormArray([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
    ]),
    agree: new FormControl(false, {
      validators: [Validators.requiredTrue]
    })
  })


  get passwordError() {

    if (this.form.controls.passwords.controls.password.errors?.["minlength"]) {
      return "Password must be at least 6 characters long"
    }

    if (this.form.controls.passwords.controls.password.errors?.["required"]
      && this.form.controls.passwords.dirty) {
      return "Password is required"
    }
    if (this.form.controls.passwords.errors?.["passwordNotMatch"]) {
      return "Passwords do not match"
    }

    return null;
  }

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.authService.signUp(this.form.value.email!, this.form.value.passwords?.password!);
    this.router.navigate(['/login']);

  }

}
