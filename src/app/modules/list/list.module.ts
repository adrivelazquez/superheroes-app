import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListRoutingModule } from './list-routing.module';

import { ListComponent } from './list.component';
import { TableComponent } from './table/table.component';
import { DialogComponent } from './dialog/dialog.component';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';

import { SnackbarService } from '../../services/snackbar.service';

@NgModule({
  declarations: [
    TableComponent,
    ListComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    ListRoutingModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    HttpClientModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatInputModule,
    MatProgressSpinnerModule
  ],
  exports: [ListComponent],
  providers: [SnackbarService]
})
export class ListModule { }
