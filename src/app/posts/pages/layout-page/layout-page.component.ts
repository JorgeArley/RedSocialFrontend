import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})
export class LayoutPageComponent {
  public sidebarItems = [
    { label: 'Posts', icon: 'label', url: './posts' }
  ];

  constructor(private router: Router) {}

  onLogout() {
    console.log("salida del logout")
    this.router.navigate(['/auth/login'])
  }

}
