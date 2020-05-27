import {
  Component,
  OnInit,
  Optional,
  Self,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { InputError } from 'src/app/models/input-error';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
})
export class InputTextComponent implements OnInit, ControlValueAccessor {
  constructor(@Optional() @Self() public ngControl?: NgControl) {
    this.ngControl.valueAccessor = this;
  }
  @Input() placeholder: string = '';
  @Input() label: string = '';
  @Input() errors: InputError[] = [];
  @Output() onInput = new EventEmitter();
  @Output() onBlur = new EventEmitter();
  @Output() onFocus = new EventEmitter();

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
