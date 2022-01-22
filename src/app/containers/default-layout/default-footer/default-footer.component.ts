import { Component } from '@angular/core';
import { FooterComponent } from '@coreui/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-default-footer',
  templateUrl: './default-footer.component.html',
  styleUrls: ['./default-footer.component.scss'],
})
export class DefaultFooterComponent extends FooterComponent {

  public appName = environment.appName;
  constructor() {
    super();
  }
}
