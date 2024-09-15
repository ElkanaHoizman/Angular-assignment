import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/items-manager/pages/main/main.component').then(
        (m) => m.MainComponent
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./features/items-manager/pages/main/main.component').then(
        (m) => m.MainComponent
      ),
  },
];
