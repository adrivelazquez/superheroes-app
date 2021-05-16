import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Superheroe } from '../models/superheroes.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  BASE_URL = '/api';

  constructor(private http: HttpClient) { }

  getSuperheroes(pageIndex:number, pageSize: number, sort: string, filterName?: string): Observable<Superheroe[]>{
    const  url = this.BASE_URL + `/superheroes?_page=${pageIndex}&_limit=${pageSize}&_sort=${sort}` + (filterName ? `&name_like=${filterName}` : '');
    return this.http.get<Superheroe[]>(url);
  }

  getCountElements(): any{
    const  url = this.BASE_URL + `/superheroes`;
    return this.http.get<any>(url).pipe(
      map( resp => {
        return resp.length;
      })
    );
  }

  getSuperheroesId(id: number): Observable<Superheroe>{
    const  url = this.BASE_URL + `/superheroes/${id}`;
    return this.http.get<Superheroe>(url);
  }

  updateSuperheroe(heroe: Superheroe,id: number): Observable<Superheroe>{
    const  url = this.BASE_URL + `/superheroes/${id}`;
    return this.http.put<Superheroe>(url,heroe);
  }

  deleteSuperheroe(id: number): Observable<Superheroe>{
    const  url = this.BASE_URL + `/superheroes/${id}`;
    return this.http.delete<Superheroe>(url);
  }

  addSuperheroe(heroe: Superheroe): Observable<Superheroe>{
    const  url = this.BASE_URL + `/superheroes`;
    return this.http.post<Superheroe>(url,heroe);
  }

}
