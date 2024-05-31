import { Routes } from '@angular/router';
import { FilterListComponent } from './views/filter-list/filter-list.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    component: FilterListComponent,
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () =>
      import('./views/filter-list/filter-list.component').then(
        (m) => m.FilterListComponent
      ),
  },
];
