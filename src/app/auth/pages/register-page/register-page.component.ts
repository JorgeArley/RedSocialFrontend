import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService
  ){}

  public formRegister: FormGroup = this.fb.group({
    user:     ['', [ Validators.required, Validators.minLength(1) ]],
    fullName: ['', [ Validators.required, Validators.minLength(1) ]],
    email:    ['', [ Validators.required, Validators.email ]],
    age:      ['', [ Validators.required, Validators.minLength(1) ]],
    password: ['', [ Validators.required, Validators.minLength(6) ]],
  });

  onRegister() {
    this.usuarioService.postUser(this.formRegister.value)
      .subscribe({
        next: (resp) => this.router.navigateByUrl('/'),
        error: (message) => {
          Swal.fire('Error', message.error.msg, 'error');
        }
      })
  }

}
