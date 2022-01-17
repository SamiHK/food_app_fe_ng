import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alert } from 'src/app/models/alert';
import { SalesPerson } from 'src/app/models/sales-person';
import { SalespersonService } from '../../services/salesperson.service';

@Component({
  selector: 'app-salesperson-view',
  templateUrl: './salesperson-view.component.html',
  styleUrls: ['./salesperson-view.component.scss']
})
export class SalespersonViewComponent implements OnInit {

  salesperson: SalesPerson = new SalesPerson();

  constructor(private route: ActivatedRoute, private router: Router,
    private amService: SalespersonService) {
    let id = this.route.snapshot.params['id'];
    if (id) {
      this.salesperson.id = id;
    }
  }

  isLoading = false;
  async ngOnInit() {
    if (this.salesperson.id) {
      this.isLoading = true;
      await this.amService.get(this.salesperson.id)
        .forEach(v => this.salesperson = v)
        .finally(() => this.isLoading = false)
    }
  }

  isEditBranch = false;
  selectedBranchId = null;
  branchLoading = false;
  alert = new Alert()
}
