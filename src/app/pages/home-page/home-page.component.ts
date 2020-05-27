import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor() {}
  form = new FormGroup({
    control: new FormControl(null, [Validators.required]),
  });
  ngOnInit(): void {
    this.form.valueChanges.subscribe((result) => {
      console.log(result);
    });
  }
}
