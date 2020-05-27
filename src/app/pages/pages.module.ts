import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { PAGES } from '.';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [PAGES],
  exports: [PAGES],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ComponentsModule,
    HttpClientModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class PagesModule {}
