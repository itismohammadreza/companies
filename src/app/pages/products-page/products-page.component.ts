import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';

import { DataService } from 'src/app/services/data.service';
import { Product } from 'src/app/models/product';
import { Company } from 'src/app/models/company';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss'],
})
export class ProductsPageComponent implements OnInit, OnDestroy {
  constructor(
    private dataService: DataService,
    private route: ActivatedRoute
  ) {}

  company$: Observable<Company>;
  companyId: number;
  productsSubscription: Subscription;
  states = ['فعال', 'غیرفعال'];
  tableConfig = {
    header: {
      id: 'شناسه',
      title: 'عنوان',
      companyId: 'شناسه کمپانی',
      state: 'وضعیت',
      createDate: 'تاریخ تولید',
    },
    data: new Array<Product>(),
  };
  form = new FormGroup({
    companyId: new FormControl(),
    createDate: new FormControl(null, [Validators.required]),
    title: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
    ]),
    state: new FormControl(null, [Validators.required]),
  });

  ngOnInit(): void {
    this.companyId = +this.route.snapshot.paramMap.get('companyId');
    this.company$ = this.dataService.getCompanyById(this.companyId);
    this.productsSubscription = this.dataService
      .getProdcutsByCompanyId(this.companyId)
      .subscribe((products) => {
        this.tableConfig.data = products;
      });
  }

  onSubmit() {
    this.form.get('companyId').setValue(this.companyId);
    const product = this.form.value as Product;
    if (!this.isDuplicate(product)) {
      this.dataService.addProduct(product).subscribe((result) => {
        this.tableConfig.data.push(result);
        this.form.reset();
      });
    } else {
      alert('این مورد قبلا ثبت شده است.');
    }
  }

  isDuplicate(prodcut: Product): boolean {
    return this.tableConfig.data.find(
      (c) =>
        c.createDate == prodcut.createDate &&
        c.title == prodcut.title &&
        c.state == prodcut.state
    )
      ? true
      : false;
  }

  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
  }
}
