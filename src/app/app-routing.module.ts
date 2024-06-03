import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilterListComponent } from './views/filter-list/filter-list.component';
import { NewEditHeroComponent } from './views/new-edit-hero/new-edit-hero.component';

const routes: Routes = [
  { path: '', component: FilterListComponent },
  { path: 'new', component: NewEditHeroComponent },
  { path: 'edit', component: NewEditHeroComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
