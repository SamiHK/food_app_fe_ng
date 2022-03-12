import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class AppSettingService {

  private BASE_URL = `${environment.BASE_URL}/appsetting`;

  constructor(private http: HttpClient, private commonService: CommonService) { }

  get() {
    return this.http.get(`${this.BASE_URL}`)
      .pipe(
        catchError(this.commonService.catchError)
      );
  }

  getPropValueByPropKey(key: string){
    let appSettingString = localStorage.getItem('appSetting');
    if (appSettingString) {
      let appSetting = JSON.parse(appSettingString);
      // console.log(appSetting)
      let setting = appSetting.find((s:any) => s.propKey == key)
      if(setting){
        return setting.propVal
      } else {
        return null
      }
    }
  }  

  getDeliveryCharges() {
    let value = this.getPropValueByPropKey('DELIEVERY_CHARGES')
    if(value){
      value = parseFloat(value)
    }
    return value
  }
  
  getGST(){
    let value = this.getPropValueByPropKey('GST')
    if(value){
      value = parseFloat(value)
    }
    return value
  }
}
