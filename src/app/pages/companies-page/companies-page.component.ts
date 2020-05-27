import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Company } from 'src/app/models/company';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-companies-page',
  templateUrl: './companies-page.component.html',
  styleUrls: ['./companies-page.component.scss'],
})
export class CompaniesPageComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private dataService: DataService) {}
  tableConfig = {
    header: {
      title: 'عنوان',
      phone: 'تلفن تماس',
      type: 'نوع',
    },
    data: [],
  };

  companiesSubscription: Subscription;

  form = new FormGroup({
    title: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
    ]),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern('0([0-9]{2,3})-?[0-9]{7,8}'),
    ]),
    type: new FormControl(null, Validators.required),
  });

  ngOnInit(): void {
    this.companiesSubscription = this.dataService
      .getCompanies()
      .subscribe((companies: Company[]) => {
        this.tableConfig.data = companies;
      });
  }

  onSubmit() {
    this.dataService
      .addCompany(this.form.value as Company)
      .subscribe((result) => {
        this.tableConfig.data.push(result);
      });
  }

  onRowClick(event) {
    this.router.navigate(['products', event.id]);
  }

  ngOnDestroy(): void {
    this.companiesSubscription.unsubscribe();
  }
}
