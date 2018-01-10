import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { CookieService } from 'ng2-cookies';
import 'rxjs/add/operator/map';
import { Config } from '../app.config';

import 'rxjs/Rx';

@Injectable()
export class NutritionMasterService {
      url : string;	
	constructor (private _http: Http,private cookies: CookieService, private conf: Config){ }
		//this.memberid=atob(this.accessKey).split("@_@")[9];    
      host=this.conf.get('apiUrl');
	hmsauthKey = this.conf.get('hms-auth-key');
	hmsaccessKey = this.cookies.get('hmssessionId');
	authKey = this.conf.get('auth-key');
      
      saveNutrition(param){
		var headers = new Headers();
            headers.append(this.authKey,"Basic YWRtaW46YWRtaW4=");
		headers.append(this.hmsauthKey,this.hmsaccessKey);
            headers.append("Content-Type", "application/json");
            this.url = this.host+"hospitality/addnutritionvaluemaster";
		return this._http.post( this.url, JSON.stringify(param), {headers: headers} ).map(res=> res.json());
      }

      updateNutrition(param){
            var headers = new Headers();
            headers.append(this.authKey,"Basic YWRtaW46YWRtaW4=");
		headers.append(this.hmsauthKey,this.hmsaccessKey);
            headers.append("Content-Type", "application/json");
            this.url = this.host+"hospitality/setnutritionvaluemaster";
		return this._http.post(this.url, JSON.stringify(param), {headers: headers}).map(res=> res.json());	 
	}

      getNutrition(param){
		var headers = new Headers();
            headers.append(this.authKey,"Basic YWRtaW46YWRtaW4=");
		headers.append(this.hmsauthKey,this.hmsaccessKey);
            headers.append("Content-Type", "application/json");
            this.url = this.host+"hospitality/getnutritionvaluemaster";
            return this._http.post(this.url, JSON.stringify(param), {headers: headers}) .map(res=> res.json());
	}

      DeleteNutrition(param){
            var headers = new Headers();
		var tempData =JSON.stringify(param);
            headers.append(this.authKey,"Basic YWRtaW46YWRtaW4=");
		headers.append(this.hmsauthKey,this.hmsaccessKey);
            headers.append("Content-Type", "application/json");
		this.url = this.host+"hospitality/delnutritionvaluemaster";
		return this._http.post(this.url, tempData, {headers: headers}).map(res=> res.json());
	}
}