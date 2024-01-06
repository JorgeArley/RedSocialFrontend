import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})
export class LayoutPageComponent {
  public sidebarItems = [
    { label: 'Posts', icon: 'label', url: './posts' }
  ];

  constructor(private router: Router,
              private authService: AuthService) {}

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/auth/login'])
  }

}
