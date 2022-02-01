import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, MenuItemUnit } from 'src/app/models/menu';
import { MenuItemUnitService } from '../../services/menu-item-unit.service';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-menu-item-form',
  templateUrl: './menu-item-form.component.html',
  styleUrls: ['./menu-item-form.component.scss']
})
export class MenuItemFormComponent implements OnInit {

  menuId?: number;
  menuItemId?: number;
  menuItem?: MenuItem;
  menuItemUnits?: MenuItemUnit[];
  isLoading = false;
  form = new FormGroup({
    'title': new FormControl(null, Validators.required),
    'description': new FormControl(null),
    'price': new FormControl(null, [Validators.required, Validators.min(1)]),
    'oldPrice': new FormControl(null),
    'unitId': new FormControl(null),
  })

  constructor(private route: ActivatedRoute,
    private router: Router,
    private amService: MenuService,
    private miuService: MenuItemUnitService) { }


  async ngOnInit() {
    this.menuId = this.route.parent?.snapshot.params['id'];
    // console.log(`menuId: ${this.menuId}`)
    this.menuItemId = this.route.snapshot.params['menuItemId'];
    this.miuService.getMenuItemsUnit().forEach((v: MenuItemUnit[]) => this.menuItemUnits = v);
    if(this.menuItemId){
      this.isLoading = true;
      await this.amService.getMenuItem(this.menuItemId).forEach((v:MenuItem) => this.menuItem = v);
      this.loadForm();
      this.isLoading = false;
    }
    document.querySelector('#item-form')?.scrollIntoView({
      behavior: 'smooth', block: 'center',
    })
  }

  loadForm(){
    if(this.menuItem){
      this.form.controls['title'].setValue(this.menuItem.title);
      this.form.controls['description'].setValue(this.menuItem.description);
      this.form.controls['price'].setValue(this.menuItem.price);
      this.form.controls['oldPrice'].setValue(this.menuItem.oldPrice);
      this.form.controls['unitId'].setValue(this.menuItem.unitId);
      // console.log(this.form.value)
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
        await this.amService.updateMenuItem(this.menuItemId, this.form.value).forEach(v => {
          console.log(v);
          this.router.navigate(['admin', 'menu', this.menuId])
          console.log('update menu item')
        })
      } else {
        await this.amService.createMenuItem(this.menuId, this.form.value).forEach(v => {
          console.log(v);
          this.router.navigate(['admin', 'menu', this.menuId])
          console.log('created new item')
        })        
      }
      this.isSaving = false;
      console.log('end')
    }
  }

  onSelectUnit(event: Event){
    if(this.form && this.form.controls['unitId'].value == 'create'){
      this.router.navigate(['admin', 'menu', 'menuItemUnits', 'create']);
    }
  }

}
