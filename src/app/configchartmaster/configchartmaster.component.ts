import { Component, OnInit, ViewChild} from '@angular/core';
import { ConfigchartmasterService } from '../services/confchartmaster.service';

@Component({
  selector: 'app-configchartmaster',
  templateUrl: './configchartmaster.component.html',
  styleUrls: ['./configchartmaster.component.css'],
  providers: [ConfigchartmasterService ]
})
export class ConfigchartmasterComponent implements OnInit {
    @ViewChild('frm') frm;
    ChartName="";
    successJson: any= [];
    returnJson: any = [];
    submitbtn:string="Save";
    buttonClass: string='btn btn-primary';
    alert_class="alert-success";
    editid:any="";
    updateId: any= [];
    showMessage: any= false;
    errordata="";
  constructor(private _httpService: ConfigchartmasterService ) {
    this.getAllChartMaster();
  }

  onSubmit(data){
    if(Object.keys(this.updateId).length==0){
     this.saveValues(data);
    }
    else{
     // console.log(this.updateId.chart_id);
      this.updateValues(data,this.updateId.chart_id);
    }
  }
  saveValues(data){

   this._httpService.saveChart(data).subscribe(
    data => {
                    this.successJson = data;
                    if(this.successJson.status===true){

                    this.getAllChartMaster();
                    this.alert_class="alert-success";
                    //this.showMessage= true;
                    this.displayMessage();
                }
              //   else if(this.successJson.status===false){

              //     this.getAllChartMaster();
              //      this.errordata=this.successJson.errors[0].msg;
              //     //this.showMessage= true;

              // }
                },
              error=>alert(error),
              () =>console.log("finished")
             );
            }


            getAllChartMaster(): void{
               this._httpService.getChart({"chart_id":"0"}).subscribe(data => this.returnJson =data.data,
               error=>alert(error),
               () =>console.log("data displayed")
               );
            }

    getChartEdit(rec){
      this.updateId = rec;
      this.submitbtn="Update";
      this.ChartName=rec.chart_name;
      }

    updateValues(data,id){
      console.log(id);
    this._httpService.updateChart({"chart_name":data.chart_name,"chart_id":id}).subscribe(
    data => {
                    this.successJson = data;
                    if(this.successJson.status===true){
                      this.getAllChartMaster();
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
    this.frm.controls['chart_name'].setValue('');
    this.changeButton();
  }

  deleteChart(id){
   this._httpService.DeleteChart({"chart_id":id}).subscribe(
    data => {
      this.successJson = data;
      if(this.successJson.status===true){
        this.getAllChartMaster();
        this.displayMessage();
        this.resetFunction();
  }
  },
  error=>alert(error),
  () =>console.log("deleted")
  );
      }

  ngOnInit() {
  }

}
