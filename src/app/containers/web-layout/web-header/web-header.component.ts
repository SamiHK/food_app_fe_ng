import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassToggleService, HeaderComponent, INavData } from '@coreui/angular';
import { Store } from '@ngrx/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthUser } from 'src/app/models/auth-user';
import { Branch } from 'src/app/models/branch';
import { Cart } from 'src/app/models/cart';
import { Manager } from 'src/app/models/manager';
import { Menu } from 'src/app/models/menu';
import { SalesPerson } from 'src/app/models/sales-person';
import { USER_ROLE } from 'src/app/models/user';
import { MenuService } from 'src/app/modules/customer/modules/menu/services/menu.service';
import { logoutAction } from 'src/app/ngrx/auth/actions';
import { selectBranchAction } from 'src/app/ngrx/branch/actions';
import { changeBranchAction } from 'src/app/ngrx/cart/actions';
import { BranchModalComponent } from 'src/app/shared/components/branch-modal/branch-modal.component';
import { adminNavItems, customerNavItems, managerNavItems, salespersonNavItems } from '../../default-layout/_nav';
// import { adminNavItems, customerNavItems, managerNavItems, salespersonNavItems } from '../_nav';

const EXCLUDE_BRANCH_SELECT_ROLES = [USER_ROLE.MANAGER.toString(), USER_ROLE.SALES_PERSON.toString()];

@Component({
  selector: 'app-web-header',
  templateUrl: './web-header.component.html',
  styleUrls: ['./web-header.component.scss']
})
export class WebHeaderComponent extends HeaderComponent implements OnInit {

  branch?: Branch;
  // @Input() sidebarId: string = "sidebar";
  @Input() user?: AuthUser;
  @Input() totalItemsInCart = 0;


  isLoading = false;
  menus: Menu[] = [];
  async loadMenus(branch?: Branch) {
    this.isLoading = true;
    let params = {};
    if (branch && branch.id) {
      params = { branchId: branch.id };
    }
    await this.mService.getMenus(params).forEach(v => this.menus = v)
    this.isLoading = false;
  }

  constructor(private classToggler: ClassToggleService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private mService: MenuService,
    private cartStore: Store<{ 'cart': Cart }>,
    private authStore: Store<{ 'auth': AuthUser }>,
    private branchStore: Store<{ 'branch': Branch }>) {
    super();
  }

  userMenus: INavData[] = customerNavItems;
  ngOnInit() {
    this.authStore.select('auth').forEach(v => {
      if (v && v.role) {
        switch (v.role) {
          case 'ADMIN': this.userMenus = adminNavItems; break;
          case 'MANAGER':
            this.userMenus = managerNavItems;
            let m = v as Manager;
            this.branchStore.dispatch(selectBranchAction({ branch: m.branch }));
            if (m.branch)
              this.cartStore.dispatch(changeBranchAction(m.branch))
            break;
          case 'SALES_PERSON':
            this.userMenus = salespersonNavItems;
            let s = v as SalesPerson;
            this.branchStore.dispatch(selectBranchAction({ branch: s.branch }));
            if (s.branch)
              this.cartStore.dispatch(changeBranchAction(s.branch))
            break;
          case 'CUSTOMER': this.userMenus = customerNavItems;
        }
      } else {
        this.userMenus = [];
      }
    });
    this.branchStore.select('branch').forEach(v => {
      this.branch = v;
      if (!this.branch || !this.branch.id) {
        this.selectBranch()
      }
    });
    this.loadMenus();
  }

  public logout() {
    this.authStore.dispatch(logoutAction());
    this.router.navigate([''])
  }


  selectBranch() {

    if (this.user && this.user.role && EXCLUDE_BRANCH_SELECT_ROLES.includes(this.user.role)) {
      // do nothing
    } else {
      let branchModalRef = this.modalService.show(BranchModalComponent, {
        show: true,
        animated: true,
        backdrop: true,
        ignoreBackdropClick: true,
        class: 'modal-dialog-centered',
        initialState: {
          selectedBranch: this.branch
        }
      });
      branchModalRef.onHide?.subscribe((r: BsModalRef<BranchModalComponent>) => {
        if (r) {
          // console.log(r);
          if (branchModalRef.content) {
            console.log(branchModalRef.content.selectedBranch)
            if (this.branch == null
              || branchModalRef.content.selectedBranch == null
              || this.branch.id != branchModalRef.content.selectedBranch.id) {
              this.branch = branchModalRef.content.selectedBranch;
              this.branchStore.dispatch(selectBranchAction({ branch: this.branch }))
              if (this.branch)
                this.cartStore.dispatch(changeBranchAction(this.branch))
            }
          }
        }
      })

    }

  }

}
