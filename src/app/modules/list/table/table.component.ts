import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Superheroe } from '../../../models/superheroes.model';
import { ApiService } from '../../../services/api-service.service';
import { TableDataSource } from './table-datasource';
import { DialogComponent } from '../dialog/dialog.component';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../services/snackbar.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Input() searchInput = new BehaviorSubject<string>('');

  dataSource: TableDataSource;
  displayedColumns= ["id", "name", "publisher", "alter","actions"];

  constructor(private apiService: ApiService, public dialog: MatDialog, private router: Router, private snackService: SnackbarService) {
      this.dataSource = new TableDataSource(this.apiService);
  }

  ngOnInit(){
  }

  ngAfterViewInit(): void {
    this.paginator.page
    .pipe(
        tap(() => this.loadSuperHeroesPage())
    )
    .subscribe();

    this.searchInput.subscribe( textSearch => {
      this.busqueda(textSearch);
    });
    
  }

  openDeleteRow(row: Superheroe) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: 'Delete',
        message: `Are you to delete ${row.name}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.apiService.deleteSuperheroe(row.id).subscribe( () => {
          this.snackService.showSnackBar(`SuperHero has been deleted`, 'OK', 'success', 5000);
          this.busqueda();
        });
      }
    });
  }

  editRow(row: Superheroe) {
    this.router.navigate(['/addUpdate', row.id]);
  }

  loadSuperHeroesPage() {
    this.dataSource.loadSuperHeroes(
        this.paginator.pageIndex + 1,
        this.paginator.pageSize,
        'id');
}

  private busqueda(filterName?: string){
    this.paginator.pageIndex = 0;
    this.dataSource.loadSuperHeroes(0,5,'id',filterName);
  }

}
