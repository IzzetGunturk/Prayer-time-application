import { Routes } from '@angular/router';
import { ApplicationComponent } from './application/application.component';

export const routes: Routes = [
    { path: ':stad', component: ApplicationComponent },
    { path: '', redirectTo: '/amsterdam', pathMatch: 'full' } 
];
