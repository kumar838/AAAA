import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { CookieService } from 'ng2-cookies';
import { Config } from '../app.config';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Injectable()
export class FoundationChartItems {
	url : string;	
	constructor (private _http: Http, private cookies: CookieService, private conf: Config){ }
	host=this.conf.get('apiUrl');
	hmsauthKey = this.conf.get('hms-auth-key');
	hmsaccessKey = this.cookies.get('hmssessionId');
      authKey = this.conf.get('auth-key');
      
      saveFChartitems(param){	
            console.log(param);
           
		var headers = new Headers();
		headers.append(this.authKey,"Basic YWRtaW46YWRtaW4=");
		headers.append(this.hmsauthKey,this.hmsaccessKey);
            headers.append("Content-Type", "application/json");
            this.url = this.host+"hospitality/addfoundationchartitems";   
		return this._http.post(this.url, JSON.stringify(param), {headers: headers}).map(res=> res.json());
	}
      
      getFChartitems(param){
		var headers = new Headers();	
		headers.append(this.authKey,"Basic YWRtaW46YWRtaW4=");
		headers.append(this.hmsauthKey,this.hmsaccessKey);
		headers.append("Content-Type", "application/json");
		this.url = this.host+"hospitality/getfoundationchartitems";
            return this._http.post(this.url, JSON.stringify(param), {headers: headers}).map(res=> res.json()); 
	}

	
	

}