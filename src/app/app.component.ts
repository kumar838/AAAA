import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CookieService } from 'ng2-cookies/';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  hmsaccessKey = this.cookies.get('hmssessionId');
  constructor(private activatedRoute: ActivatedRoute, private cookies: CookieService, private router: Router){
       //console.log(this.router.url.indexOf('login'));
      //console.log("Cookie value"+ this.cookies);
      console.log("Cookie value HMS"+ this.hmsaccessKey);
       if(this.hmsaccessKey==""){
          //this.router.navigate(['/localhost']);
          window.location.href='http://localhost/ums/';
            }
  }

  title = 'app works!';

}
