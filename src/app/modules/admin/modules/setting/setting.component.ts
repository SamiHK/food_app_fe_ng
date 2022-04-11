import { Component, OnInit } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from 'src/app/icons/icon-subset';
import { AppSettingService } from 'src/app/services/app-setting.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
 
  
  // baseURL = environment.BASE_URL;
  lightLogo?: string;
  darkLogo?: string;

  constructor(
    private settingService: AppSettingService,
    iconSetService: IconSetService) {
    iconSetService.icons = { ...iconSubset, ...freeSet,};
  }

  ngOnInit(): void {
    this.loadSettings()
  }
  
  
  loadSettings(){
    this.darkLogo = this.settingService.getDarkLogo();
    this.lightLogo = this.settingService.getLightLogo();
    // this.settingService.getBanner();
  }

  updateSettings(){
    this.settingService.updateAppSettingCache();
    this.loadSettings();
  }

  updateLightLogo(data: {
    id: any,
    files: FileList
  }){
    // console.log(data)
    if(data && data.files && data.files.length > 0){
      // console.log(data.files[0])
      this.settingService.updateLightLogo(data.files[0]).forEach(f => this.updateSettings())
    }
  }

  updateDarkLogo(data: {
    id: any,
    files: FileList
  }){
    // console.log(data)
    if(data && data.files && data.files.length > 0){
      this.settingService.updateDarkLogo(data.files[0]).forEach(f => this.updateSettings())
    }
  }


  addBanner(data: {
    id: any,
    files: FileList
  }){
    // console.log(data)
    if(data && data.files && data.files.length > 0){
      // console.log(data.files[0])
      this.settingService.addBanner(data.files[0]).forEach(f => console.log(f))
    }
  }

}
