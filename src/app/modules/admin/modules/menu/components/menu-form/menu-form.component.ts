import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Menu } from 'src/app/models/menu';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-menu-form',
  templateUrl: './menu-form.component.html',
  styleUrls: ['./menu-form.component.scss']
})
export class MenuFormComponent implements OnInit {

  menu: Menu | null = null;
  form = new FormGroup({
    'title': new FormControl(null, Validators.required),
    'description': new FormControl(null)
  })

  constructor(private route: ActivatedRoute,
    private router: Router,
    private amService: MenuService) { }

  ngOnInit(): void {
    this.route.params.forEach(params => {
      if(params['id']){
        this.amService.get(params['id']).forEach(v => {
          this.menu = v;
          this.setEditFormValues();
        })
      }
    })
  }
  
  setEditFormValues(){
    if(this.menu){
      this.form.controls['title'].setValue(this.menu.title);
      this.form.controls['description'].setValue(this.menu.description);
    }
  }

  reset(){
    if(this.menu){
      this.setEditFormValues()
    } else {
      this.form.reset()
    }
  }

  close(){
    if(this.menu && this.menu.id)
      this.router.navigate(['admin', 'menu', this.menu.id]);
    else 
      this.router.navigate(['admin', 'menu']);
  }

  isSaving = false;
  async onSubmit(){
    if(this.form.valid){
      this.isSaving = true;
      let body = this.form.value;
      if(this.menu && this.menu.id){
         await this.amService.update(body, this.menu.id)
          .forEach(v => {
            this.router.navigate(['admin', 'menu', v.id])
          })
      } else {
        await this.amService.create(body)
          .forEach(v => {
            this.router.navigate(['admin', 'menu', v.id])
          })
      }
      this.isSaving = false;
    }
  }
}
