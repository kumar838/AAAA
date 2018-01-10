import { Component, OnInit ,ViewChild} from '@angular/core';
import { AllhospitalsService } from '../services/allhospitals.service';
import { ConfigchartmasterService } from '../services/confchartmaster.service';
import { HospitalmasterService } from '../services/hospitalmaster.service';


@Component({
  selector: 'app-hospitalchartmaster',
  templateUrl: './hospitalchartmaster.component.html',
  styleUrls: ['./hospitalchartmaster.component.css'],
  providers:[AllhospitalsService,ConfigchartmasterService,HospitalmasterService]
})
export class HospitalchartmasterComponent implements OnInit {


  @ViewChild('frm') frm;
  
  HospitalId="";
  DepartmentId="";
  WardId="";
  ChartId="";
  FoodchartName="";
  ChartCode="";

  successJson: any= [];
  returnJson: any = [];
  returnJsonhospital: any = [];
  returnJsondept:any=[];
  returnJsonward:any=[];
  returnJsonchart:any=[];
  returnJsonhosmaster:any=[];
  alert_class="alert-success";
  buttonClass: string='btn btn-primary';
  editid:any="";
  updateId: any= [];
  showMessage: any= false;
  errordata="";
  submitbtn:string="Save";

  constructor(private _hospService: AllhospitalsService,private _chartservice:ConfigchartmasterService,private _hosmasterservice :HospitalmasterService ) { }

 ngOnInit() {
  this.getAllHospMaster();this.getAllHospitals();this.getAllChartMaster();
    }

    getAllHospitals(): void{ 
      this._hospService.gethopitals({}).subscribe(data => this.returnJsonhospital =data.data,
      error=>alert(error),
      () =>console.log("data displayed")
      );
   }
  
   
   onSelecthos(hid){
    this._hospService.getdepartments({"hid":hid}).subscribe(data => this.returnJsondept =data.data,
    error=>alert(error),
    () =>console.log("data displayed")
    );
   }
  
   onSelectdep(depid){
     //console.log(this.HospitalId);
    this._hospService.getwards({"hid":this.HospitalId,"dept_id":depid}).subscribe(data => this.returnJsonward =data.data,
    error=>alert(error),
    () =>console.log("data displayed")
    );
  }
  
   getAllChartMaster(): void{ 
    this._chartservice.getChart({"chart_id":"0"}).subscribe(data => this.returnJsonchart =data.data,
    error=>alert(error),
    () =>console.log("data displayed")
    );
  }
  
  getAllHospMaster():void{
    this._hosmasterservice.getHosChartMaster({"hos_food_chartid":"0"}).subscribe(data => this.returnJsonhosmaster =data.data,
      error=>alert(error),
      () =>console.log("data displayed")
      );
  }



    onSubmit(data){
      if(Object.keys(this.updateId).length==0){
       this.saveValues(data);
      }
      else{
        //console.log(this.updateId.item_category_id);
        this.updateValues(data,this.updateId.hos_food_chartid);	
      }
    
    }
  
    saveValues(data){
      //this.saveValues(data);
      console.log(data);
      this._hosmasterservice.saveHosChartMaster(data).subscribe(
    data => {
                    this.successJson = data;
                    if(this.successJson.status===true){
                    this.getAllHospMaster();
                    this.alert_class="alert-success";
                    this.showMessage= true;
                    this.displayMessage();
                }
               
                },
              error=>alert(error),
              () =>console.log("finished")
             );
            }


            gethospmasterEdit(rec){
              this.updateId = rec;
              console.log(rec);
              this.submitbtn="Update";
              this.HospitalId=rec.hid;
              this.onSelecthos(rec.hid);
              this.DepartmentId=rec.dept_id;
              this.onSelectdep(rec.dept_id);
              this.WardId=rec.ward_id;
              this.ChartId=rec.chart_id;
              this.FoodchartName=rec.hos_food_chart_name;
              this.ChartCode=rec.hos_food_chart_code;
                   }
                  

            updateValues(data,id){

              this._hosmasterservice.updateHosChartMaster({"chart_id":data.chart_id,"hos_food_chart_name":data.hos_food_chart_name,"hos_food_chart_code":data.hos_food_chart_code,"hid":data.hid,"ward_id":data.ward_id,"hos_food_chartid":id,"dept_id":data.dept_id}).subscribe(
                data => {
                                this.successJson = data;
                                if(this.successJson.status===true){
                                  this.getAllHospMaster();
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


            deletehospmaster(id){ 
             //console.log(id);
             this._hosmasterservice.DeleteHosChartMaster({"hos_food_chartid":id}).subscribe(
               
              data => {
                this.successJson = data;
                //console.log(this.successJson);
                if(this.successJson.status===true){
                  this.getAllHospMaster();
                  //this.displayMessage();
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
                     //console.log(this.successJson);
                     this.updateId = {};
                     //this.resetFunction();
                 }.bind(this), 3000);
                }
  
                changeButton(){
                  this.submitbtn= "Save";
                  this.buttonClass= "btn btn-primary";
               }
                resetFunction(){
                  this.updateId=[];
                  this.frm.reset();
                  this.frm.controls['hos_food_chart_name'].setValue('');
                  this.frm.controls['hos_food_chart_code'].setValue('');
                  this.frm.controls['hid'].setValue('');
                  this.frm.controls['dept_id'].setValue('');
                  this.frm.controls['ward_id'].setValue('');
                  this.frm.controls['chart_id'].setValue('');
                  this.changeButton();
                 
                }
}
