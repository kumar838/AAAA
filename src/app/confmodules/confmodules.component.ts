import { Component, OnInit ,ViewChild} from '@angular/core';
import { ConfigmodulesService } from '../services/confmodules.service';

@Component({
  selector: 'app-confmodules',
  templateUrl: './confmodules.component.html',
  styleUrls: ['./confmodules.component.css'],
  providers: [ConfigmodulesService ]
})
export class ConfmodulesComponent implements OnInit {

  @ViewChild('frm') frm;
  ModuleName="";
  successJson: any= [];
  returnJson: any = [];
  submitbtn:string="Save";
  buttonClass: string='btn btn-primary';
  alert_class="alert-success";
  editid:any="";
  updateId: any= [];
  showMessage: any= false;
  errordata="";
constructor(private _httpService: ConfigmodulesService ) { 
  this.getAllModuleMaster();
}

onSubmit(data){
  if(Object.keys(this.updateId).length==0){
   this.saveValues(data);
  }
  else{
   // console.log(this.updateId.module_id);
    this.updateValues(data,this.updateId.module_id);	
  }
}
saveValues(data){
 
 this._httpService.saveModule(data).subscribe(
  data => {
                  this.successJson = data;
                  if(this.successJson.status===true){
                  
                  this.getAllModuleMaster();
                  this.alert_class="alert-success";
                  //this.showMessage= true;
                  this.displayMessage();
              }
            //   else if(this.successJson.status===false){
               
            //     this.getAllModuleMaster();
            //      this.errordata=this.successJson.errors[0].msg;
            //     //this.showMessage= true;
            
            // }
              },
            error=>alert(error),
            () =>console.log("finished")
           );
          }


          getAllModuleMaster(): void{ 
             this._httpService.getModule({"module_id":"0"}).subscribe(data => this.returnJson =data.data,
             error=>alert(error),
             () =>console.log("data displayed")
             );
          }

  getModuleEdit(rec){
    this.updateId = rec;
    this.submitbtn="Update";
    this.ModuleName=rec.module_name;
    }

  updateValues(data,id){
    console.log(id);
  this._httpService.updateModule({"module_name":data.module_name,"module_id":id}).subscribe(
  data => {
                  this.successJson = data;
                  if(this.successJson.status===true){
                    this.getAllModuleMaster();
                    this.alert_class="alert-success";
                    this.displayMessage();
                    this.resetFunction();
                   }
              },
          error=>alert(error),
          () =>console.log("updated")
          );
}

displayMessage(){
    this.showMessage= true;
      setTimeout(function() {
     this.showMessage = false;
     this.successJson={};
     this.updateId = {};  
 }.bind(this), 3000);
}

changeButton(){
   this.submitbtn= "Save";
   this.buttonClass= "btn btn-primary";
}
resetFunction(){
  this.updateId=[];
  this.frm.reset();
  this.frm.controls['module_name'].setValue('');
  this.changeButton();
}
 
deleteModule(id){
 this._httpService.DeleteModule({"module_id":id}).subscribe(
  data => {
    this.successJson = data;
    if(this.successJson.status===true){
      this.getAllModuleMaster();
      this.displayMessage();
}
},
error=>alert(error),
() =>console.log("deleted")
);
    }

  ngOnInit() {
  }

}
