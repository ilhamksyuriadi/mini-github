import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { RepositoriesPageComponent } from './repositories-page/repositories-page.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'error-page', component: ErrorPageComponent },
  { path: 'profile-page/:username', component: ProfilePageComponent },
  { path: 'repositories-page/:username', component: RepositoriesPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
