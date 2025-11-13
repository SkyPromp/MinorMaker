import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VragenlijstComponent } from './vragenlijst/vragenlijst.component';

export const routes: Routes = [
    {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'vragenlijst',
    component: VragenlijstComponent
  },
];
