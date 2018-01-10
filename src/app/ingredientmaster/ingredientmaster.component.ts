import { Component, OnInit,ViewChild} from '@angular/core';
import { IngredientMasterService } from '../services/ingredientmaster.service';

@Component({
  selector: 'app-ingredientmaster',
  templateUrl: './ingredientmaster.component.html',
  styleUrls: ['./ingredientmaster.component.css'],
  providers: [IngredientMasterService]
  
})
export class IngredientmasterComponent implements OnInit {
 @ViewChild('frm') frm;
  IngredientType="";
  IngredientName="";
  MemberId="12345678";
  successJson: any= [];
  returnJson: any = [];
  alert_class="alert-success";
  buttonClass: string='btn btn-primary';
  editid:any="";
  updateId: any= [];
  showMessage: any= false;
  errordata="";
  submitbtn:string="Save";

  constructor(private _httpService: IngredientMasterService) {this.getAllIngredientMaster();}

  onSubmit(data){
    if(Object.keys(this.updateId).length==0){
     this.saveValues(data);
    }
    else{
      //console.log(this.updateId.item_category_id);
      this.updateValues(data,this.updateId.ingredient_id);	
    }
  
  }

  saveValues(data){
    //this.saveValues(data);
    //console.log(data);
    this._httpService.saveIgm(data).subscribe(
  data => {
                  this.successJson = data;
                  
                  if(this.successJson.status===true){
                  
                  this.getAllIngredientMaster();
                  this.alert_class="alert-success";
                  //this.showMessage= true;
                 // this.displayMessage();
              }
             else if(this.successJson.status===false){

              //console.log(this.successJson.errors[0].msg);
               
              this.getAllIngredientMaster();
                this.errordata=this.successJson.errors[0].msg;
               //this.showMessage= true;
            
           }
              },
            error=>alert(error),
            () =>console.log("finished")
           );
          }



          getAllIngredientMaster(): void{
            // console.log("Hello fetch data ");
            
             this._httpService.getIngredientMaster({"query_type":"fetch_data","memberid":"1234564","ingredient_id":"0"}).subscribe(data => this.returnJson =data.data,
             error=>alert(error),
             () =>console.log("data displayed")
             );
          }

     getIdmEdit(rec){
    this.updateId = rec;
    //console.log(data);
    this.submitbtn="Update";
    this.IngredientType=rec.ingredient_type;
    this.IngredientName=rec.ingredient_name;
    //console.log("update function");
      //rawdata={"query_type":"set_data","memberid":"74125896","item_category":"Beverages555","item_category_id":"2"};
         }



         updateValues(data,id){
          //console.log(data.ingredient_name);
          
            this._httpService.updateIdm({"query_type":"set_data","memberid":"12345678","ingredient_type":data.ingredient_type,"ingredient_name":data.ingredient_name,"ingredient_id":id}).subscribe(
            data => {
                            this.successJson = data;
                            if(this.successJson.status===true){
                            this.getAllIngredientMaster();
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


          deleteIdm(id){
            //console.log({"query_type":"del_data","memberid":"1234564","item_category_id":id});
           this._httpService.DeleteIdm({"query_type":"del_data","memberid":"1234564","ingredient_id":id}).subscribe(
             
            data => {
              this.successJson = data;
              //console.log(this.successJson);
              if(this.successJson.status===true){
                this.getAllIngredientMaster();
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
                this.frm.controls['ingredient_name'].setValue('');
                this.frm.controls['ingredient_type'].setValue('');
                // this.form.controls['is_hospital'].setValue(1);
                this.changeButton();
               
              }


  ngOnInit() {
  }

}
