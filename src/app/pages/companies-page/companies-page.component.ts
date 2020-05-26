import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-companies-page',
  templateUrl: './companies-page.component.html',
  styleUrls: ['./companies-page.component.scss'],
})
export class CompaniesPageComponent implements OnInit {
  constructor() {}
  form = new FormGroup({
    id: new FormControl(null),
    title: new FormControl(null),
    phone: new FormControl(null),
    type: new FormControl(null),
  });
  ngOnInit(): void {}
  onSubmit(formValue) {}
}
