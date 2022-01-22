import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Menu, MenuItemUnit } from 'src/app/models/menu';
import { CommonModalService } from 'src/app/shared/services/common-modal.service';
import { MenuItemUnitService } from '../../services/menu-item-unit.service';

@Component({
  selector: 'app-menu-item-unit-list',
  templateUrl: './menu-item-unit-list.component.html',
  styleUrls: ['./menu-item-unit-list.component.scss']
})
export class MenuItemUnitListComponent implements OnInit {

  isEditForm = false;
  isSaving = false;
  editUnitId?: number;
  constructor(private miuService: MenuItemUnitService,
    private route: ActivatedRoute,
    private cModalService: CommonModalService,
    public location: Location) {    
  }
  
  menuItemUnits?: MenuItemUnit[];
  isLoading = false;
  
  async loadMenuItems(){
    this.isLoading = true;
    await this.miuService.getMenuItemsUnit().forEach(v => this.menuItemUnits = v);
    this.isLoading = false;
  }

  isCreate = false;
  async ngOnInit() {
    await this.loadMenuItems();
    this.route.params.forEach(params => {
      if(params['id']=='create'){
        this.isCreate = true;
        this.isEditForm = true;
      } else {

      }
    })
  }

  form = new FormGroup({
    'title': new FormControl(null, Validators.required),
  })

  createUnit(){
    this.isEditForm = true;
    this.isCreate = true;
    this.editUnitId = undefined;
  }

  editUnit(u: MenuItemUnit){
    this.form.controls['title'].setValue(u.title);
    this.editUnitId = u.id;
    this.isEditForm = true;
    this.isCreate = false;
  }

  async onSubmit(){
    if(this.form.valid){
      this.isSaving = true;
      let unit = this.form.value;
      if(this.editUnitId) unit.id = this.editUnitId;
      await this.miuService.saveMenuItemsUnit(unit).forEach(v => {
        if(this.isCreate){
          this.location.back()
        } else {
          this.loadMenuItems()
        }
      }).finally(() => {
        this.isSaving = false;
      })
    }
  }

  deleteUnit(miu: MenuItemUnit){
    let modal = this.cModalService.showWConfirmDeleteModalComponent();
    modal.onHide?.subscribe(async v => {
      // console.log(v);
      // console.log(modal);
      if(modal.content && modal.content.confirm){
        await this.miuService.deleteMenuItemsUnit(miu.id).forEach(v => {
          this.loadMenuItems();
        })
      }
    })
  }


}
