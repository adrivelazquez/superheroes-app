import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
  { 
    path: 'list',
    loadChildren: () => import('./modules/list/list.module').then(m => m.ListModule) 
  },
  { 
    path: 'addUpdate', 
    loadChildren: () => import('./modules/addUpdate/addUpdate.module').then(m => m.addUpdateModule) 
  },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
