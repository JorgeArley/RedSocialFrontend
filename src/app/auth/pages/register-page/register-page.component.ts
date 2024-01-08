import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  public edit: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute
  ){}

  public formRegister: FormGroup = this.fb.group({
    user:     ['', [ Validators.required, Validators.minLength(1) ]],
    fullName: ['', [ Validators.required, Validators.minLength(1) ]],
    email:    ['', [ Validators.required, Validators.email ]],
    age:      ['', [ Validators.required, Validators.minLength(1) ]],
    password: ['', [ Validators.required, Validators.minLength(6) ]],
  });


  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;

    this.edit = true;
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.usuarioService.getUserById(id)),
      ).subscribe((user:any) => {
        if (!user) {
          return this.router.navigateByUrl('auth/login');
        }
        this.formRegister.reset(user.user);
        return;
      });
    }

  onRegister() {
    if (this.edit) {
      const { password, ...rest  } = this.formRegister.value;
      this.usuarioService.updateUser(rest, localStorage.getItem('uid') ?? '')
      .subscribe({
        next: (resp) => this.router.navigate(['/posts/list']),
        error: (message) => {
          Swal.fire('Error', message.error.msg, 'error');
        }
      })
      return;
    }

    this.usuarioService.postUser(this.formRegister.value)
      .subscribe({
        next: (resp) => this.router.navigateByUrl('/'),
        error: (message) => {
          Swal.fire('Error', message.error.msg, 'error');
        }
      })
  }
}
