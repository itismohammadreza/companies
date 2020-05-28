type ErrorTypes =
  | 'min'
  | 'max'
  | 'required'
  | 'email'
  | 'minlength'
  | 'maxlength'
  | 'pattern'
  | 'nullValidator';
export class InputError {
  type: ErrorTypes;
  message: string;
}
