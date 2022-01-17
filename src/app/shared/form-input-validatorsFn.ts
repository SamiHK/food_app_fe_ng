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

// export const lessThan(field1: string, field2: string): ValidatorFn => (control: AbstractControl) => {
//   if(!control.value[field1] && !control.value[field2]){
//     return null;
//   }
//   let error = (control.value[field1] > control.value[field2]) ?
//     {
//       else: 'Password not match'
//     } : null;

//   // (control.parent?.controls?['confirmPassword'] as FormControl).setErrors(error); 
//   return error;
// }
