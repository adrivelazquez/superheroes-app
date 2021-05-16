import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

declare type SnackBarType = 'success' | 'error' | 'info';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  showSnackBar(
    message: string,
    title: string,
    panelClass: SnackBarType,
    duration: number = 3000,
    verticalPosition: MatSnackBarVerticalPosition = 'top',
    horizontalPosition: MatSnackBarHorizontalPosition = 'right'
    ) {

    this.snackBar.open(message, title, {
      duration,
      verticalPosition,
      horizontalPosition,
      panelClass
    });
  }
}
