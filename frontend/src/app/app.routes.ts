import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VragenlijstComponent } from './vragenlijst/vragenlijst.component';
import { KlantenLijstComponent } from './klanten-lijst/klanten-lijst.component';
import { VraagComponent } from './vraag/vraag.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: DashboardComponent },
  { path: 'start-vraag', component: VraagComponent },
  { path: 'vragenlijst', component: VragenlijstComponent },
  { path: 'klantenlijst', component: KlantenLijstComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
