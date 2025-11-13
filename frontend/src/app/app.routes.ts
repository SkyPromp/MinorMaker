import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VragenlijstComponent } from './vragenlijst/vragenlijst.component';
import { KlantenLijstComponent } from './klanten-lijst/klanten-lijst.component';
import { VraagComponent } from './vraag/vraag.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: DashboardComponent },
  { path: 'start-vraag', component: VraagComponent },
  { path: 'vragenlijst', component: VragenlijstComponent },
  { path: 'klantenlijst', component: KlantenLijstComponent }
];
