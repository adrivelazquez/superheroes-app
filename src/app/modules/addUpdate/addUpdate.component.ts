import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'; 
import { Router } from '@angular/router';
import { Superheroe } from '../../models/superheroes.model';
import { ApiService } from '../../services/api-service.service';
import { ActivatedRoute } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-addUpdate',
  templateUrl: './addUpdate.component.html',
  styleUrls: ['./addUpdate.component.scss']
})
export class AddUpdateComponent implements OnInit {

  id: number = 0;
  private sub: any;

  mode: string = 'new';

  addSuperheroeForm = new FormGroup({
    name: new FormControl('' ,Validators.required ),
    publisher: new FormControl('', Validators.required),
    alter: new FormControl('', Validators.required),
    first_appearance: new FormControl('', Validators.required),
    characters: new FormControl('', Validators.required),
  });

  constructor( private apiService: ApiService, private router: Router, private routeActivate: ActivatedRoute,
    private snackService: SnackbarService) {

   }

  ngOnInit(): void {
    this.sub = this.routeActivate.params.subscribe(params => {
      if( params['id'] ){
        this.id = +params['id'];
        this.mode = 'edit';
        this.apiService.getSuperheroesId(this.id).subscribe( heroe => {
          this.addSuperheroeForm.controls.name.setValue(heroe.name);
          this.addSuperheroeForm.controls.publisher.setValue(heroe.publisher);
          this.addSuperheroeForm.controls.alter.setValue(heroe.alter_ego);
          this.addSuperheroeForm.controls.first_appearance.setValue(heroe.first_appearance);
          this.addSuperheroeForm.controls.characters.setValue(heroe.characters);
        })
      }
   });
  }

  onSubmitNew(){
    const newSuperHeroe: Superheroe = 
    {
        id: 0,
        name: this.addSuperheroeForm.controls.name.value,
        publisher: this.addSuperheroeForm.controls.publisher.value,
        alter_ego: this.addSuperheroeForm.controls.alter.value,
        first_appearance: this.addSuperheroeForm.controls.first_appearance.value,
        characters: this.addSuperheroeForm.controls.characters.value
    }

    this.apiService.addSuperheroe(newSuperHeroe).subscribe( () => {
      this.snackService.showSnackBar(`SuperHero has been added`, 'OK', 'success', 5000);
      this.router.navigate(['/list'])
    });

  }

  onSubmitUpdate(){
    const newSuperHeroe: Superheroe = 
    {
        id: this.id,
        name: this.addSuperheroeForm.controls.name.value,
        publisher: this.addSuperheroeForm.controls.publisher.value,
        alter_ego: this.addSuperheroeForm.controls.alter.value,
        first_appearance: this.addSuperheroeForm.controls.first_appearance.value,
        characters: this.addSuperheroeForm.controls.characters.value
    }

    this.apiService.updateSuperheroe(newSuperHeroe,this.id).subscribe( () => {
      this.snackService.showSnackBar(`SuperHero has been update`, 'OK', 'success', 5000);
      this.router.navigate(['/list'])
    });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
