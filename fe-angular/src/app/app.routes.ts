import { Routes } from '@angular/router';

import { ListPage } from '../pages/list.page';
import { AddPage } from '../pages/add.page';
import { ErrorPage } from '../pages/error.page';

export const routes: Routes = [
  { path: '', component: ListPage },
  { path: 'add', component: AddPage },
  { path: '**', component: ErrorPage },
];
