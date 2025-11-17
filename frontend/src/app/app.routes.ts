import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VragenlijstComponent } from './vragenlijst/vragenlijst.component';
import { KlantenLijstComponent } from './klanten-lijst/klanten-lijst.component';
import { VraagComponent } from './vraag/vraag.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import {NoteComponent} from "./note/note.component";

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: DashboardComponent },
  { path: 'questionaire', component: VraagComponent },
  { path: 'vragenlijst', component: VragenlijstComponent },
  { path: 'klantenlijst', component: KlantenLijstComponent },
  { path: 'note', component: NoteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
