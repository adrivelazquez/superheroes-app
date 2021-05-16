import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddUpdateRoutingModule } from './addUpdate-routing.module';
import {MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AddUpdateComponent } from './addUpdate.component';

import { SnackbarService } from '../../services/snackbar.service';

//directive
import { UppercaseDirective } from '../../directives/uppercase.directive';

@NgModule({
  declarations: [
    AddUpdateComponent,
    UppercaseDirective
  ],
  imports: [
    CommonModule,
    AddUpdateRoutingModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    FormsModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  providers: [SnackbarService]
})
export class addUpdateModule { }
