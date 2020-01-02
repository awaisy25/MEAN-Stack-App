import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
// component to show error messages
@Component({
  templateUrl: './error.component.html'
})

export class ErrorComponent {
  // using inject to retrieve the data. hvaing the data object as a string
  constructor(@Inject(MAT_DIALOG_DATA) public data: {message: string}) {}
}
