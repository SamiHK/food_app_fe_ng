import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BranchService } from '../../services/branch.service';

@Component({
  selector: 'app-branch-save',
  templateUrl: './branch-save.component.html',
  styleUrls: ['./branch-save.component.scss']
})
export class BranchSaveComponent implements OnInit {

  form = new FormGroup({
    'name': new FormControl(null, [Validators.required]),
    'code': new FormControl(null, [Validators.required]),
  });

  isSubmitting = false;

  constructor(private branchService: BranchService, private router: Router) { }

  ngOnInit(): void {}

  async onSubmit(){
    if(this.form.valid){
      this.isSubmitting = true;
      await this.branchService.save(this.form.value).toPromise()
      .then(e => {
        this.router.navigate(['branches', e.id]);
      })
      .catch(e => {
        if(e && e.code == 'ER_DUP_ENTRY'){
          this.form.controls.code.setErrors({
            custom: 'this code is already assigned. Try another one'
          })
        }
      })
      .finally(() => {
        this.isSubmitting = false;
      })
    }
  }

}
