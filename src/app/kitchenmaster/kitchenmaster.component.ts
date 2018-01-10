import { Component, OnInit ,ViewChild} from '@angular/core';
import { KitchenmasterService } from '../services/kitchenmaster.service';
import { AllhospitalsService } from '../services/allhospitals.service';

@Component({
  selector: 'app-kitchenmaster',
  templateUrl: './kitchenmaster.component.html',
  styleUrls: ['./kitchenmaster.component.css'],
  providers:[KitchenmasterService,AllhospitalsService]
})
export class KitchenmasterComponent implements OnInit {

  @ViewChild('frm') frm;
  KitchenName="";
  HospitalId="";
  kitchenlocation="";
  successJson: any= [];
  returnJson: any = [];
  returnJsonhospital: any = [];
  alert_class="alert-success";
  buttonClass: string='btn btn-primary';
  editid:any="";
  updateId: any= [];
  showMessage: any= false;
  errordata="";
  submitbtn:string="Save";

   constructor(private _httpService: KitchenmasterService,private _hospService: AllhospitalsService) {}

   ngOnInit() {
    this.getAllKitchenmaster();this.getAllHospitals();
  }


  onSubmit(data){
    if(Object.keys(this.updateId).length==0){
     this.saveValues(data);

    }
    else{
      this.updateValues(data,this.updateId.kitchen_id);
    }
  }

  saveValues(data){
    console.log(data);
    this._httpService.saveKitchenmaster(data).subscribe(
    data => {
                  this.successJson = data;
                  if(this.successJson.status===true){
                  this.getAllKitchenmaster();
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

          getAllKitchenmaster(): void{
             this._httpService.getKitchenmaster({"kitchen_id":"0"}).subscribe(data => this.returnJson =data.data,
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

    getKitchenmasterEdit(rec){
    this.updateId = rec;
    this.submitbtn="Update";
    this.KitchenName=rec.kitchen_name;
    this.HospitalId=rec.hid;
    this.kitchenlocation=rec.kitchen_location;
         }

         updateValues(data,id){
          this._httpService.updateKitchenmaster({"kitchen_name":data.kitchen_name,"hid":data.hid,"kitchen_location":data.kitchen_location,"kitchen_id":id}).subscribe(
            data => {
                            this.successJson = data;
                            if(this.successJson.status===true){
                            this.getAllKitchenmaster();
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


          deleteKitchenmaster(id){
           this._httpService.DeleteKitchenmaster({"kitchen_id":id}).subscribe(
            data => {
              this.successJson = data;
              if(this.successJson.status===true){
                this.getAllKitchenmaster();
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
                this.frm.controls['kitchen_name'].setValue('');
                this.frm.controls['hid'].setValue('');
                this.frm.controls['kitchen_location'].setValue('');
                this.changeButton();
              }

}
