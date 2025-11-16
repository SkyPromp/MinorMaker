import { Component } from '@angular/core';
import {Router, RouterModule, RouterOutlet } from '@angular/router';
import { VraagComponent } from "./vraag/vraag.component";
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, VraagComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';

  constructor(private router : Router) {

  }

  isActiveRoute(route : string) :boolean {
    return this.router.isActive(route, true);
  }

}
