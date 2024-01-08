import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})
export class LayoutPageComponent {

  public uid:string = '';

  public sidebarItems = [
    { label: 'Publicaciones', icon: 'view_module', url: './auth' },
    { label: 'Nueva publicación', icon: 'playlist_add', url: '/posts/new/' }
  ];

  constructor(private router: Router,
              private authService: AuthService) {}


  ngOnInit(): void {
    this.uid = localStorage.getItem('uid') || '';
  }

  editUser() {
    this.router.navigate(['/auth/account/edit', this.uid])
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/auth/login'])
  }

}
