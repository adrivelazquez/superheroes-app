import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  isLoading$ = this.loadingService.isLoading$;

  constructor( private loadingService :LoadingService) { }

  ngOnInit(): void {
  }

}
