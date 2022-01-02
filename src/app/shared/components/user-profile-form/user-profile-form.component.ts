import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Alert } from 'src/app/models/alert';
import { User } from 'src/app/models/user';
import { CommonService } from 'src/app/services/common.service';
import { UserService } from 'src/app/services/user.service';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile-form.component.html',
  styleUrls: ['./user-profile-form.component.scss']
})
export class UserProfileFormComponent implements OnInit {

  @Input('user') user: User = new User()

  constructor(private authService: AuthService,
    private userService: UserService,
    private profileService: ProfileService,
    private commonService: CommonService) { }

  ngOnInit(): void {
  }

  alert = new Alert();

  userForm = new FormGroup({
    'email': new FormControl(null, [Validators.required, Validators.email])
  })
  isEditUser = false;
  editUser() {
    this.userForm.controls['email'].setValue(this.user.email)
    this.isEditUser = true;
  }
  cancelEditUser() {
    this.isEditUser = false;
    this.userForm.reset();
  }
  savingUser = false;
  saveUser() {
    if (this.userForm.valid) {
      this.savingUser = true;
      this.userService.updateEmail(this.user.id, this.userForm.value).forEach(
        v => {
          if (v && v.error) {
            this.commonService.showAlert(this.alert, v.error.code, v.error.message);
          } else {
            this.commonService.showSuccessAlert(this.alert, 'Email has been updated');
            this.user.email = v.email
          }
        }
      )
        .then(v => {
          this.isEditUser = false;
          this.userForm.reset()
        })
        .catch(e => {
          if (e.code == "ER_DUP_ENTRY") {
            this.userForm.controls['email'].setErrors({
              else: "email already registered. try another one"
            })
          } else {
            this.commonService.showErrorAlert(this.alert, e);
          }
        })
        .finally(() => {
          this.savingUser = false;
        })
    }
  }

  profileForm = new FormGroup({
    'firstName': new FormControl(null),
    'lastName': new FormControl(null)
  })
  isEditProfile = false;
  editProfile() {
    this.profileForm.controls['firstName'].setValue(this.user.firstName);
    this.profileForm.controls['lastName'].setValue(this.user.lastName);
    this.isEditProfile = true;
  }
  cancelEditProfile() {
    this.isEditProfile = false;
    this.profileForm.reset();
  }
  savingProfile = false;
  saveProfile() {
    this.savingProfile = true;
    this.profileService.update(this.user.id, this.profileForm.value).forEach(
      v => {
        if (v && v.error) {
          this.commonService.showAlert(this.alert, v.error.code, v.error.message);
        } else {
          this.commonService.showSuccessAlert(this.alert, 'Profile has been updated');
          // this.user.email = v.email
          Object.assign(this.user, v);
        }
      }
    )
      .catch(e => {
        this.commonService.showErrorAlert(this.alert, e);
      })
      .finally(() => {
        this.isEditProfile = false;
        this.savingProfile = false;
        this.profileForm.reset()
      })
  }

  passwordForm = new FormGroup({
    'password': new FormControl(null, Validators.required),
    'confirmPassword': new FormControl(null)
  }, this.commonService.checkPassword)
  isUpdatePassword = false;
  editUpdatePassword() {
    this.isUpdatePassword = true;
  }
  cancelUpdatePassword() {
    this.isUpdatePassword = false;
    this.passwordForm.reset()
  }
  updatingPassword = false;
  updatePassword() {
    if(this.passwordForm.valid){
      this.updatingPassword = true;
      this.authService.updatePassword(this.user.id, this.passwordForm.value)
        .forEach(v => {
          if(v && v.error){

          } else {
            Object.assign(this.user, v);
            this.commonService.showSuccessAlert(this.alert, 'Password has been updated');
            this.isUpdatePassword = false;
            this.passwordForm.reset()
          }
        })
        .catch(e => {
          this.commonService.showErrorAlert(this.alert, e)
        })
        .finally(() => {
          this.updatingPassword = false;
        })
    }
  }

}
