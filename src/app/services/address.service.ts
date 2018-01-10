import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { CookieService } from 'ng2-cookies';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Injectable()
export class AddressService {
      url : string;
     // memberid='';
	accessKey='';
	constructor (private _http: Http , private cookies: CookieService){
            this.accessKey = this.cookies.get('hmssessionId');
		//this.memberid=atob(this.accessKey).split("@_@")[9];
      }
    
      saveAddress(param){
		var headers = new Headers();
            param.query_type='set_data';
            var options=JSON.stringify(param);
            //param.memberid=this.memberid;
		//console.log(options);
            // headers.append("Authorization","YWRtaW46YWRtaW4=");
            headers.append("Content-Type", "application/json");
            headers.append("Authorization",this.accessKey);
            this.url = "http://localhost:3000/hospitality/addresstypes";
             //console.log(this.url);
		return this._http.post( this.url, JSON.stringify(param), {headers: headers} ).map(res=> res.json());
      }

      updateAddress(param){
            var headers = new Headers();
            //param.memberid=this.memberid;
		//param.query_type='set_data';
		//console.log(param);
            // headers.append("Authorization","YWRtaW46YWRtaW4=");
            headers.append("Content-Type", "application/json");
            headers.append("Authorization",this.accessKey);
            this.url = "http://localhost:3000/hospitality/addresstypes";
             //console.log(this.url);
		return this._http.post(this.url, JSON.stringify(param), {headers: headers}).map(res=> res.json());	 
	}

      getAddress(param){
            var headers = new Headers();
           
            headers.append("Content-Type", "application/json");
            headers.append("Authorization",this.accessKey);
            this.url = "http://localhost:3000/hospitality/addresstypes";
            return this._http.post(this.url, JSON.stringify(param), {headers: headers}) .map(res=> res.json());
	}

      DeleteAddress(param){
		var headers = new Headers();
		var tempData =JSON.stringify(param);
            headers.append('Content-Type', 'application/json');
            headers.append("Authorization",this.accessKey);
		this.url = "http://localhost:3000/hospitality/addresstypes";
		return this._http.post(this.url, tempData, {headers: headers}).map(res=> res.json());
	}
}