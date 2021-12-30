import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../models/user';
import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../../services/profile.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-profile-card',
  templateUrl: './user-profile-card.component.html',
  styleUrls: ['./user-profile-card.component.scss']
})
export class UserProfileCardComponent implements OnInit {

  @Input('title') title: string;
  @Input('user') user: User;
  @Output('updateUser') eventEmitter = new EventEmitter<any>(true);
  authForm = new FormGroup({
    'email': new FormControl(null, [Validators.required, Validators.email])
  })
  profileForm = new FormGroup({
    'firstName': new FormControl(null),
    'lastName': new FormControl(null)
  })
  
  constructor(private userService: UserService, 
    private profileService: ProfileService,
    private authService: AuthService) { }
  
  ngOnInit(): void {
  }

  async onEnableChange($event){
    await this.authService.enabled(this.user.id, $event).toPromise()
    .then(r => {
      // console.log(r)
      Object.assign(this.user, r);
    })
    .then(e => {
      console.log(e)
    })
    .finally(() => {
      // console.log(r)
    })
  }
  
  editAuthForm(){
    this.isEditAuth = true;
    if(this.user){
      this.authForm.controls.email.setValue(this.user.email);
    }
  }
  
  cancelEditAuthForm(){
    this.isEditAuth = false;
    this.authForm.reset();
  }
  
  isEditAuth = false;
  savingAuth = false;
  async updateAuth(){
    if(this.authForm.valid){
      this.savingAuth = true;
      let response = await this.userService.updateEmail(this.user.id, this.authForm.value).toPromise()
      .then(r => {
        // console.log(r);
        this.eventEmitter.emit(r);
        this.isEditAuth = false;
      })
      .catch(e => {
        console.log(e);
        if(e && e.code == "ER_DUP_ENTRY"){
          this.authForm.controls.email.setErrors({
            duplicate: true
          })
        }
      })
      .finally(() => {
        this.savingAuth = false;
      });
    }
  }
  
  isEditProfile = false;
  editProfile(){
    this.isEditProfile = true;
    if(this.user){
      this.profileForm.controls.firstName.setValue(this.user.firstName);
      this.profileForm.controls.lastName.setValue(this.user.lastName);
    }
  }
  
  cancelEditProfile(){
    this.profileForm.reset();
    this.isEditProfile = false;
  }
  
  savingProfile = false;
  async updateProfile(){
    this.savingProfile = true;
    await this.profileService.updateProfile(this.user.id, this.profileForm.value).toPromise()
    .then(r => {
      this.eventEmitter.emit(r);
      this.isEditProfile = false;
    })
    .catch(e => {
      console.log(e);
    })
    .finally(()=>{
      this.savingProfile = false;
    });
  }
}
