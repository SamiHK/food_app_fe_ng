import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'src/app/models/menu';
import { AdminMenuService } from 'src/app/services/admin-menu.service';

@Component({
  selector: 'app-admin-menu-item-form',
  templateUrl: './admin-menu-item-form.component.html',
  styleUrls: ['./admin-menu-item-form.component.scss']
})
export class AdminMenuItemFormComponent implements OnInit {

  menuId?: number;
  menuItemId?: number;
  menuItem?: MenuItem;
  isLoading = false;
  form = new FormGroup({
    'title': new FormControl(null, Validators.required),
    'description': new FormControl(null),
    'price': new FormControl(null, [Validators.required, Validators.min(1)]),
    'oldPrice': new FormControl(null)
  })

  constructor(private route: ActivatedRoute,
    private router: Router,
    private amService: AdminMenuService) { }


  async ngOnInit() {
    this.menuId = this.route.snapshot.parent?.params['id'];
    console.log(`menuId: ${this.menuId}`)
    this.menuItemId = this.route.snapshot.params['itemId'];
    if(this.menuItemId){
      this.isLoading = true;
      await this.amService.item(this.menuItemId).forEach((v:MenuItem) => this.menuItem = v);
      this.loadForm();
      this.isLoading = false;
    }
  }

  loadForm(){
    if(this.menuItem){
      this.form.controls['title'].setValue(this.menuItem.title);
      this.form.controls['description'].setValue(this.menuItem.description);
      this.form.controls['price'].setValue(this.menuItem.price);
      this.form.controls['oldPrice'].setValue(this.menuItem.oldPrice);
    }
  }

  reset(){
    if(this.menuItem){
      this.loadForm()
    } else {
      this.form.reset();
    }
  }

  close(){
    this.router.navigate(['admin', 'menu', this.menuId])
  }

  isSaving = false;
  async onSubmit(){
    if(this.menuId && this.form.valid){
      this.isSaving = true;
      if(this.menuItemId  && this.menuItem){
        await this.amService.updateItem(this.menuItemId, this.form.value).forEach(v => {
          console.log(v);
          this.router.navigate(['admin', 'menu', this.menuId])
          console.log('update menu item')
        })
      } else {
        await this.amService.createItem(this.menuId, this.form.value).forEach(v => {
          console.log(v);
          this.router.navigate(['admin', 'menu', this.menuId])
          console.log('created new item')
        })        
      }
      this.isSaving = false;
      console.log('end')
    }
  }

}
