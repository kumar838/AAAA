import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { CookieService } from 'ng2-cookies';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Injectable()
export class CommunicationCategoryService {
      url : string;
      //memberid='';
	accessKey='';
	constructor (private _http: Http,private cookies: CookieService){
            this.accessKey = this.cookies.get('hmssessionId');
		//this.memberid=atob(this.accessKey).split("@_@")[9];
      }
    
      saveCommunication(param){
		var headers = new Headers();
            param.query_type='set_data';
           // param.memberid=this.memberid;
		var options=JSON.stringify(param);
		console.log(options);
            // headers.append("Authorization","YWRtaW46YWRtaW4=");
            headers.append("Content-Type", "application/json");
            headers.append("Authorization",this.accessKey);
            this.url = "http://localhost:3000/hospitality/communicationtypes";
             //console.log(this.url);
		return this._http.post( this.url, JSON.stringify(param), {headers: headers} ).map(res=> res.json());
      }

      updateCommunication(param){
            var headers = new Headers();
            //param.memberid=this.memberid;
		//param.query_type='set_data';
		//console.log(param);
            // headers.append("Authorization","YWRtaW46YWRtaW4=");
            headers.append("Content-Type", "application/json");
            headers.append("Authorization",this.accessKey);
            this.url = "http://localhost:3000/hospitality/communicationtypes";
             //console.log(this.url);
		return this._http.post(this.url, JSON.stringify(param), {headers: headers}).map(res=> res.json());	 
	}

      getCommunication(param){
		var headers = new Headers();
            headers.append("Content-Type", "application/json");
            headers.append("Authorization",this.accessKey);
            this.url = "http://localhost:3000/hospitality/communicationtypes";
            return this._http.post(this.url, JSON.stringify(param), {headers: headers}) .map(res=> res.json());
	}

      DeleteCommunication(param){
		var headers = new Headers();
		var tempData =JSON.stringify(param);
            headers.append('Content-Type', 'application/json');
            headers.append("Authorization",this.accessKey);
		this.url = "http://localhost:3000/hospitality/communicationtypes";
		return this._http.post(this.url, tempData, {headers: headers}).map(res=> res.json());
	}
}