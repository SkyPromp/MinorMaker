import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import { VraagComponent } from "./vraag/vraag.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, VraagComponent, DashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
