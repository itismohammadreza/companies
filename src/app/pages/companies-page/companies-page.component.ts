import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { DataService } from 'src/app/services/data.service';
import { Company } from 'src/app/models/company';

@Component({
  selector: 'app-companies-page',
  templateUrl: './companies-page.component.html',
  styleUrls: ['./companies-page.component.scss'],
})
export class CompaniesPageComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private dataService: DataService) {}
  tableConfig = {
    header: {
      id: 'شناسه',
      title: 'عنوان',
      phone: 'تلفن تماس',
      type: 'نوع',
    },
    data: new Array<Company>(),
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
    const company = this.form.value as Company;
    if (!this.isDuplicate(company)) {
      this.dataService.addCompany(company).subscribe((result) => {
        this.tableConfig.data.push(result);
        this.form.reset();
      });
    } else {
      alert('این مورد قبلا ثبت شده است.');
    }
  }

  onRowClick(event) {
    this.router.navigate(['products', event.id]);
  }

  isDuplicate(company: Company): boolean {
    return this.tableConfig.data.find(
      (c) =>
        c.phone == company.phone &&
        c.title == company.title &&
        c.type == company.type
    )
      ? true
      : false;
  }

  ngOnDestroy(): void {
    this.companiesSubscription.unsubscribe();
  }
}
