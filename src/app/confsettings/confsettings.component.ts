import { Component, OnInit ,ViewChild} from '@angular/core';
import { ConfsetingsService } from '../services/confsettings.service';
import { ConfigmodulesService } from '../services/confmodules.service';
import { AllhospitalsService } from '../services/allhospitals.service';


@Component({
  selector: 'app-confsettings',
  templateUrl: './confsettings.component.html',
  styleUrls: ['./confsettings.component.css'],
  providers: [ConfsetingsService,ConfigmodulesService,AllhospitalsService]
})
export class ConfsettingsComponent implements OnInit {

  @ViewChild('frm') frm;
  HospitalId="";
  ModuleId="";
  successJson: any= [];
  returnJson: any = [];
  returnJsonmodule: any = [];
  returnJsonhospital: any = [];
  alert_class="alert-success";
  buttonClass: string='btn btn-primary';
  editid:any="";
  updateId: any= [];
  showMessage: any= false;
  errordata="";
  submitbtn:string="Save";

   constructor(private _httpService: ConfsetingsService, private _moduleService: ConfigmodulesService,private _hospService: AllhospitalsService) {}

   ngOnInit() {
    this.getAllconfSettings(); this.getAllModuleMaster(); this.getAllHospitals();
  }


  onSubmit(data){
    if(Object.keys(this.updateId).length==0){
     this.saveValues(data);
    }
    else{
      this.updateValues(data,this.updateId.config_id);	
    }
  }

  saveValues(data){
    this._httpService.saveSettings(data).subscribe(
    data => {
                  this.successJson = data;  
                  if(this.successJson.status===true){ 
                  this.getAllconfSettings();
                  this.alert_class="alert-success";
                  this.showMessage= true;
                  this.displayMessage();
                  this.resetFunction();
              }
          //    else if(this.successJson.status===false){
          //     this.getAllconfSettings();
          //       this.errordata=this.successJson.errors[0].msg;
          //  }
              },
            error=>alert(error),
            () =>console.log("finished")
           );
          }

          getAllconfSettings(): void{
             this._httpService.getSettings({"config_id":"0"}).subscribe(data => this.returnJson =data.data,
             error=>alert(error),
             () =>console.log("data displayed")
             );
          }

          getAllModuleMaster(): void{ 
            this._moduleService.getModule({"module_id":"0"}).subscribe(data => this.returnJsonmodule =data.data,
            error=>alert(error),
            () =>console.log("data displayed")
            );
         }


         getAllHospitals(): void{ 
          this._hospService.gethopitals({}).subscribe(data => this.returnJsonhospital =data.data,
          error=>alert(error),
          () =>console.log("data displayed")
          );
       }

    getSettingsEdit(rec){
    this.updateId = rec;
    this.submitbtn="Update";
    this.HospitalId=rec.hos_id;
    this.ModuleId=rec.module_id;
         }

         updateValues(data,id){
          this._httpService.updateSettings({"hos_id":data.hos_id,"module_id":data.module_id,"config_id":id}).subscribe(
            data => {
                            this.successJson = data;
                            if(this.successJson.status===true){
                            this.getAllconfSettings();
                            this.alert_class="alert-success";
                            this.showMessage= true;
                            this.displayMessage();
                            this.resetFunction();     
                        }
                        },
                    error=>alert(error),
                    () =>console.log("updated")
                    );
          }


          deleteSettings(id){
           this._httpService.DeleteSettings({"config_id":id}).subscribe(
            data => {
              this.successJson = data;
              if(this.successJson.status===true){
                this.getAllconfSettings();
                this.showMessage= true;
                this.displayMessage();
                this.resetFunction();
          }
          },
          error=>alert(error),
          () =>console.log("deleted")
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
                this.frm.controls['hos_id'].setValue('');
                this.frm.controls['module_id'].setValue('');
                this.changeButton();
              }
 
}
