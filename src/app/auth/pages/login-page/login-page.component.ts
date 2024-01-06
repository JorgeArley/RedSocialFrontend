import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ){}

  public myForm: FormGroup = this.fb.group({
    email:    ['', [ Validators.required, Validators.email ]],
    password: ['', [ Validators.required, Validators.minLength(6) ]],
  });


  onLogin() {
    const { email, password } = this.myForm.value;

    this.authService.login(email,password)
    .subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: (message) => {
        Swal.fire('Error','Credenciales incorrectas', 'error');
      }
    })

  }

}
