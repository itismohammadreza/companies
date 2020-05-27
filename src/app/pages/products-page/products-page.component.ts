import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { Subscription } from 'rxjs';

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
  productsSubscription: Subscription;
  states = ['فعال', 'غیرفعال'];
  tableConfig = {
    header: {
      title: 'عنوان',
      companyId: 'شناسه کمپانی',
      state: 'وضعیت',
    },
    data: [],
  };

  form = new FormGroup({
    companyId: new FormControl(),
    createDate: new FormControl(null),
    title: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
    ]),
    state: new FormControl(null, Validators.required),
  });

  ngOnInit(): void {
    let companyId = +this.route.snapshot.paramMap.get('companyId');
    this.form.get('companyId').setValue(companyId);
    this.productsSubscription = this.dataService
      .getProdcutsByCompanyId(companyId)
      .subscribe((products) => {
        this.tableConfig.data = products || [];
      });
  }

  onSubmit() {
    this.dataService
      .addProduct(this.form.value as Product)
      .subscribe((result) => {
        this.tableConfig.data.push(result);
      });
  }

  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
  }
}
