export class InputError {
  type:
    | 'min'
    | 'max'
    | 'required'
    | 'email'
    | 'minlength'
    | 'maxlength'
    | 'pattern'
    | 'nullValidator';
  message: string;
}
