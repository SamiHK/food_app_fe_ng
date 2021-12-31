import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  loading = true;
  isEmailVerified = false;
  constructor(private route: ActivatedRoute, private userService: UserService) { }

  async ngOnInit() {
    let token = this.route.snapshot.params.token;
    if(token){
      await this.userService.verifyEmail(token).toPromise()
      .then((r)=>{
        if(r){
          this.isEmailVerified = r.isEmailVerified;
        }
      })
      .catch((e) => console.log(e))
      .finally(() => this.loading = false)
    }
  }

}
