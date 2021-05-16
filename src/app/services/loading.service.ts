import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  isLoading$ = new Subject<boolean>();

  constructor() { }

  show(): void{
    setTimeout(() => {this.isLoading$.next(true)}, 0)
    
  }

  hide(): void{
    setTimeout(() => {this.isLoading$.next(false)}, 0)
  }
}
