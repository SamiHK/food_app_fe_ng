import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { brandSet, freeSet } from '@coreui/icons';
import { AppSettingService } from './services/app-setting.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'body',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = environment.appName;

  constructor(
    private router: Router,
    private titleService: Title,
    private iconSetService: IconSetService,
    private appSettingService: AppSettingService
  ) {
    titleService.setTitle(this.title);
    // iconSet singleton
    iconSetService.icons = { ...iconSubset, ...freeSet, ...brandSet };
  }

  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
    });
    this.appSettingService.get().subscribe(s => {
      // console.log(s)
      localStorage.setItem('appSetting', JSON.stringify(s))
    })
  }
}
