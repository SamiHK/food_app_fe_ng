import { AbstractControl, ValidatorFn } from "@angular/forms";

export const checkPassword: ValidatorFn = (control: AbstractControl) => {
  if(!control.value['password'] && !control.value['confirmPassword']){
    return null;
  }
  let error = (control.value['password'] !== control.value['confirmPassword']) ?
    {
      else: 'Password not match'
    } : null;

  // (control.parent?.controls?['confirmPassword'] as FormControl).setErrors(error); 
  return error;
}
