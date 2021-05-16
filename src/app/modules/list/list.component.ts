import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public textSearch = new BehaviorSubject<string>('');

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  addSuperheroe(){
    this.router.navigate(['/addUpdate']);
  }

  buscarPorNombre(event: any){
    this.textSearch.next(event.target.value);
  }

}
