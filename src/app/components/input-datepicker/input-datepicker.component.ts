import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  Optional,
  Self,
} from '@angular/core';
import * as moment from 'jalali-moment';
import { IDatePickerConfig } from 'ng2-jalali-date-picker';
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

  @Input() disabled: boolean = false;
  @Input() label: string = '';
  @Input() errors: InputError[] = [];
  @Input() placeholder: string = '';
  @Input() minDate: moment.Moment | string = undefined;
  @Input() maxDate: moment.Moment | string = undefined;
  @Input() minTime: moment.Moment | string = undefined;
  @Input() maxTime: moment.Moment | string = undefined;
  @Input() date: moment.Moment = undefined;
  @Output() onChange = new EventEmitter();
  @Output() onOpen = new EventEmitter();
  @Output() onClose = new EventEmitter();
  @Output() onGoToCurrent = new EventEmitter();
  @Output() onLeftNav = new EventEmitter();
  @Output() onRightNav = new EventEmitter();
  @Output() onBlur = new EventEmitter();
  @Output() onFocus = new EventEmitter();
  @Output() onInput = new EventEmitter();

  controlOnChange: (value?: any) => void;
  controlOnTouched: () => void;
  _date: moment.Moment;
  config: IDatePickerConfig = {
    disableKeypress: true,
    closeOnSelect: true,
    openOnClick: true,
    openOnFocus: true,
    allowMultiSelect: false,
    showTwentyFourHours: true,
    showGoToCurrent: true,
    hideOnOutsideClick: true,
    locale: moment.locale('fa'),
  };

  _miladiMonths = [
    'ژانویه ',
    'فوریه ',
    'مارس',
    'آوریل',
    'می',
    'ژوئن',
    'جولای',
    'آگوست',
    'سپتامبر',
    'اکتبر',
    'نوامبر',
    'دسامبر',
  ];
  _months = [
    'فروردین',
    'اردیبهشت',
    'خرداد',
    'تیر',
    'مرداد',
    'شهریور',
    'مهر',
    'آبان',
    'آذر',
    'دی',
    'بهمن',
    'اسفند',
  ];

  ngOnInit(): void {
    if (this.date) this._date = this.date;
  }

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

  _onChange(date) {
    let dateObj = date._d;
    let result = {
      day: date.date(),
      month: date.month() + 1,
      year: date.year(),
      strMonth: this._months[date.month()],
      miladiDay: dateObj.getDate(),
      miladiMonth: dateObj.getMonth() + 1,
      miladiYear: dateObj.getFullYear(),
      miladiStrMonth: this._miladiMonths[dateObj.getMonth()],
      dateObj: dateObj,
      momentObj: date,
    };
    this.onChange.emit(result);
  }
}
