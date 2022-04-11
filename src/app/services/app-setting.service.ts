import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class AppSettingService {

  private BASE_URL = `${environment.API_BASE_URL}/appsetting`;
  private ADMIN_BASE_URL = `${environment.API_BASE_URL}/admin/appsetting`;

  constructor(private http: HttpClient, private commonService: CommonService) { }

  private get() {
    return this.http.get(`${this.BASE_URL}`)
      .pipe(
        catchError(this.commonService.catchError)
      );
  }

  updateAppSettingCache(){
    this.get().subscribe(e => localStorage.setItem('appSetting', JSON.stringify(e)))
  }

  updateLightLogo(file: File) {
    const formData = new FormData();
    formData.append('lightLogo', file);
    return this.http.post(`${this.ADMIN_BASE_URL}/lightLogo`, formData)
    .pipe(
      catchError(this.commonService.catchError)
    );
  }

  updateDarkLogo(file: File) {
    const formData = new FormData();
    formData.append('darkLogo', file);
    return this.http.post(`${this.ADMIN_BASE_URL}/darkLogo`, formData)
    .pipe(
      catchError(this.commonService.catchError)
    );
  }


  getBanner() {
    return this.http.get(`${this.ADMIN_BASE_URL}/banner`)
    .pipe(
      catchError(this.commonService.catchError)
    );
  }

  addBanner(file: File) {
    const formData = new FormData();
    formData.append('banner', file);
    return this.http.post(`${this.ADMIN_BASE_URL}/banner`, formData)
    .pipe(
      catchError(this.commonService.catchError)
    );
  }

  getPropValueByPropKey(key: string){
    let appSettingString = localStorage.getItem('appSetting');
    let appSetting = null;
    
    if (appSettingString) {
      appSetting = JSON.parse(appSettingString);
    }    

    if(appSetting != null){
      let setting = appSetting.find((s:any) => s.propKey == key)
      if(setting){
        return setting.propVal
      } 
    } 
  
    return null;
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

  getDarkLogo(){
    let value = this.getPropValueByPropKey('LOGO_DARK')
    // if(value){
    //   value = `${environment.BASE_URL}/${value}`
    // }
    return value
  }
  
  getLightLogo(){
    let value = this.getPropValueByPropKey('LOGO_LIGHT')
    // if(value){
    //   value = `${environment.BASE_URL}/${value}`
    // }
    return value
  }
}
