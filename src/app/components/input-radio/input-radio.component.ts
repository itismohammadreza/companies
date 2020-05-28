import { Component, OnInit, Optional, Self, Input } from '@angular/core';
import { ControlValueAccessor, NgControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-input-radio',
  templateUrl: './input-radio.component.html',
  styleUrls: ['./input-radio.component.scss'],
})
export class InputRadioComponent implements OnInit, ControlValueAccessor {
  constructor(@Optional() @Self() public ngControl?: NgControl) {
    if (this.ngControl) this.ngControl.valueAccessor = this;
  }

  @Input() label: string = '';
  @Input() inputId: string = '';
  @Input() value: string = '';
  @Input() name: string = '';

  ngOnInit(): void {}

  controlOnChange: (value?: any) => void;
  controlOnTouched: () => void;

  writeValue(obj: any): void {}

  registerOnChange(fn: any): void {
    this.controlOnChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.controlOnTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {}
}
