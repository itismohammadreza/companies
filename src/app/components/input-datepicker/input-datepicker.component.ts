import { Component, OnInit, Input, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

import { InputError } from 'src/app/models/input-error';

@Component({
  selector: 'app-input-datepicker',
  templateUrl: './input-datepicker.component.html',
  styleUrls: ['./input-datepicker.component.scss'],
})
export class InputDatepickerComponent implements OnInit, ControlValueAccessor {
  constructor(@Optional() @Self() public ngControl?: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  @Input() label: string = '';
  @Input() errors: InputError[] = [];
  @Input() placeholder: string = '';

  value: string;
  controlOnChange: (value?: any) => void;
  controlOnTouched: () => void;

  ngOnInit(): void {
    const controlValue = this.ngControl?.control?.value;
    this.value =
    controlValue.getMonth() + controlValue.getDate() + controlValue.getYear();
  }

  writeValue(obj: any): void {}

  registerOnChange(fn: any): void {
    this.controlOnChange = fn;
  }

  onInput(event) {
    this.ngControl?.control?.setValue(new Date(event.target.value));
  }

  registerOnTouched(fn: any): void {
    this.controlOnTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {}

  getId() {
    return Math.random().toString(36).substr(2, 9);
  }
}
