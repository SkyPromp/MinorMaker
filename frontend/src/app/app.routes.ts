import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VragenlijstComponent } from './vragenlijst/vragenlijst.component';
import { KlantenLijstComponent } from './klanten-lijst/klanten-lijst.component';
import { VraagComponent } from './vraag/vraag.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import {NoteComponent} from "./note/note.component";
import { VraaglijstDetailsComponent } from './vraaglijst-details/vraaglijst-details.component';
import {UserSelectComponent} from "./user-select/user-select.component";
import {QuestionsSelectComponent} from "./questions-select/questions-select.component";

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: DashboardComponent },
  { path: 'questionaire', component: VraagComponent },
  { path: 'vragenlijst', component: VragenlijstComponent },
  { path: 'note', component: NoteComponent },
  { path: 'klantenlijst', component: KlantenLijstComponent },
  { path: 'vraag/:id', component: VraaglijstDetailsComponent },
  { path: 'users', component: UserSelectComponent },
  { path: 'questions-select', component: QuestionsSelectComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
