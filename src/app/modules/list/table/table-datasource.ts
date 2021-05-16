import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { catchError, finalize, map, switchMap } from 'rxjs/operators';
import { Observable, of as observableOf, merge, BehaviorSubject, of, forkJoin } from 'rxjs';
import { Superheroe } from '../../../models/superheroes.model';
import { ApiService } from '../../../services/api-service.service';
import { ThrowStmt } from '@angular/compiler';

export class TableDataSource extends DataSource<Superheroe> {
  // private searchName = new BehaviorSubject<string>(''); // Subscribe for input update

  public listSubject = new BehaviorSubject<Superheroe[]>([]);
  public loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  public resultLength: number = 0;

  constructor(private apiService: ApiService) {
    super()
  }

  loadSuperHeroes(
    pageIndex: number,
    pageSize: number,
    sort: string,
    filterName?: string
  ){
    this.loadingSubject.next(true);

    forkJoin([
      this.apiService.getCountElements(),
      this.apiService.getSuperheroes(pageIndex,pageSize,sort,filterName)
    ]).pipe(
      catchError(() => of([])),
      finalize(() => {
        this.loadingSubject.next(false)
      })
  )
  .subscribe( (data: any) => {
    filterName ? this.resultLength = data[1].length : this.resultLength = data[0];
    this.listSubject.next(data[1]);
  });
    
  }

  connect(collectionViewer: CollectionViewer): Observable<Superheroe[]> {
    return this.listSubject.asObservable();
  }

  disconnect(): void {
    this.listSubject.complete();
    this.loadingSubject.complete();
  }

}
