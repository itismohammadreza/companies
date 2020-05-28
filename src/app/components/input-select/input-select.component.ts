import {
  Component,
  OnInit,
  Optional,
  Self,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { NgControl, ControlValueAccessor } from '@angular/forms';

import { InputError } from 'src/app/models/input-error';

@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss'],
})
export class InputSelectComponent implements OnInit, ControlValueAccessor {
  constructor(@Optional() @Self() public ngControl?: NgControl) {
    if (this.ngControl) this.ngControl.valueAccessor = this;
  }
  @Input() items: string[] = [];
  @Input() placeholder: string = '';
  @Input() label: string = '';
  @Input() errors: InputError[] = [];

  @Output() onChange = new EventEmitter();

  controlOnChange: (value?: any) => void;
  controlOnTouched: () => void;

  ngOnInit(): void {}

  writeValue(obj: any): void {}

  registerOnChange(fn: any): void {
    this.controlOnChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.controlOnTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {}

  getId() {
    return Math.random().toString(36).substr(2, 9);
  }
}
