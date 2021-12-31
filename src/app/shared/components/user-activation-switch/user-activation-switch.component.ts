import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-activation-switch',
  templateUrl: './user-activation-switch.component.html',
  styleUrls: ['./user-activation-switch.component.scss']
})
export class UserActivationSwitchComponent implements OnInit {

  @Input('user') user: User;
  @Input('cssClass') cssClass: string;
  @Input('switchCssClass') switchCssClass: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  loading = false;
  async onEnableChange($event){
    this.loading = true;
    await this.authService.enabled(this.user.id, $event).toPromise()
    .then(r => {
      // console.log(r)
      Object.assign(this.user, r);
    })
    .catch(e => {
      console.log(e)
    })
    .finally(() => {
      // console.log(r)
      this.loading = false;
    })
  }

}
