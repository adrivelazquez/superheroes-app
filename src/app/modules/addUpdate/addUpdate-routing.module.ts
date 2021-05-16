import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUpdateComponent } from './addUpdate.component';

const routes: Routes = [
  { path: '', component: AddUpdateComponent },
  { path: ':id', component: AddUpdateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddUpdateRoutingModule { }
