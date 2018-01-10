import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ng2-cookies';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
paramenters: any= {};
 constructor(private activatedRoute: ActivatedRoute,private router: Router, private cookies: CookieService) { 
    this.paramenters= this.activatedRoute.snapshot.params;
    console.log(Object.keys(this.paramenters).length);

		if(Object.keys(this.paramenters).length > 0){
    //console.log(this.paramenters.hid+"@_@"+this.paramenters.service+"@_@"+this.paramenters.subservice+"@_@"+this.paramenters.role+"@_@"+this.paramenters.dep+"@_@"+this.paramenters.childrole+"@_@"+this.paramenters.ustatus+"@_@"+this.paramenters.group+"@_@"+this.paramenters.servicename+"@_@"+this.paramenters.memberid);
		  	var temp = btoa(this.paramenters.hid+"@_@"+this.paramenters.service+"@_@"+this.paramenters.subservice+"@_@"+this.paramenters.role+"@_@"+this.paramenters.dep+"@_@"+this.paramenters.childrole+"@_@"+this.paramenters.ustatus+"@_@"+this.paramenters.group+"@_@"+this.paramenters.servicename+"@_@"+this.paramenters.memberid);
		  	this.cookies.set('hmssessionId',temp, 0.25, '/');
		    setTimeout(function(){
		      this.router.navigate(['home']);
		    }.bind(this), 1000);
		  	//window.location.href="http://192.168.0.78:4200/register";
        }
        
  }
  
  ngOnInit() {
  }

}
