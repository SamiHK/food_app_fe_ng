import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-active-switch',
  templateUrl: './user-active-switch.component.html',
  styleUrls: ['./user-active-switch.component.scss']
})
export class UserActiveSwitchComponent implements OnInit {

  @Input('label') label?: string;
  @Input('user') user?: User;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  isLoading = false;
  onChange($event: any){
    // console.log($event);
    if(this.user && this.user.id){
      this.isLoading = true;
      this.authService.enabled(this.user.id, {
        enabled: this.user.enabled
      }).forEach(v => {
        if(this.user){
          this.user.enabled = v.enabled;
        }
      })
      .finally(() => {
        this.isLoading = false;
      })
    }
  }

}
