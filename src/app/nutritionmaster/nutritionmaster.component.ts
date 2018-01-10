import { Component, OnInit ,ViewChild} from '@angular/core';
import { NutritionMasterService } from '../services/nutritionmaster.service';

@Component({
  selector: 'app-nutritionmaster',
  templateUrl: './nutritionmaster.component.html',
  styleUrls: ['./nutritionmaster.component.css'],
  providers: [NutritionMasterService]
})
export class NutritionmasterComponent implements OnInit {

  @ViewChild('frm') frm;
  NutritionName="";
  NutritionDescription="";
  successJson: any= [];
  returnJson: any = [];
  alert_class="alert-success";
  buttonClass: string='btn btn-primary';
  editid:any="";
  updateId: any= [];
  showMessage: any= false;
  errordata="";
  submitbtn:string="Save";

  constructor(private _httpService: NutritionMasterService) { this.getAllNutrition();}
 

  onSubmit(data){
    if(Object.keys(this.updateId).length==0){
     this.saveValues(data);
    }
    else{
     
      this.updateValues(data,this.updateId.ingredient_id);	
    }
  
  }

  saveValues(data){
    
    this._httpService.saveNutrition(data).subscribe(
  data => {
                  this.successJson = data;
                  if(this.successJson.status===true){ 
                  this.getAllNutrition();
                  this.alert_class="alert-success";
                  this.showMessage= true;
                 this.displayMessage();
              }
             else if(this.successJson.status===false){
           
              this.getAllNutrition();
                this.errordata=this.successJson.errors[0].msg;
            
            
           }
              },
            error=>alert(error),
            () =>console.log("finished")
           );
          }

          getAllNutrition(): void{
         
             this._httpService.getNutrition({"ingredient_id":"0"}).subscribe(data => this.returnJson =data.data,
             error=>alert(error),
             () =>console.log("data displayed")
             );
          }

     getNutritionEdit(rec){
    this.updateId = rec;
    this.submitbtn="Update";
    this.NutritionName=rec.ingredient_name;
    this.NutritionDescription=rec.ingredient_description;
       }

         updateValues(data,id){
          console.log(data);      
            this._httpService.updateNutrition({"ingredient_name":data.ingredient_name,"ingredient_description":data.ingredient_description,"ingredient_id":id}).subscribe(
            data => {
                            this.successJson = data;
                            if(this.successJson.status===true){
                            this.getAllNutrition();
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


          deleteNutrition(id){
          
           this._httpService.DeleteNutrition({"ingredient_id":id}).subscribe(
             
            data => {
              this.successJson = data;
              //console.log(this.successJson);
              if(this.successJson.status===true){
                this.getAllNutrition();
                this.displayMessage();
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
                this.frm.controls['ingredient_name'].setValue('');
                this.frm.controls['ingredient_description'].setValue('');
                // this.form.controls['is_hospital'].setValue(1);
                this.changeButton(); 
              }



  ngOnInit() {
  }

}
