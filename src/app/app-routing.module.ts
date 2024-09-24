import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewEditHeroComponent } from './views/new-edit-hero/new-edit-hero.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'new', component: NewEditHeroComponent },
  { path: 'edit', component: NewEditHeroComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
