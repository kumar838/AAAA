import { Component, OnInit, ViewChild } from '@angular/core';
import { ItemquantitypeService } from '../services/itemquantitytype.service';
@Component({
  selector: 'app-itemquantitytype',
  templateUrl: './itemquantitytype.component.html',
  styleUrls: ['./itemquantitytype.component.css'],
  providers:[ItemquantitypeService]
})
export class ItemquantitytypeComponent implements OnInit {
  @ViewChild('frm') frm;
  QuantityName="";
  successJson: any= [];
  returnJson: any = [];
  submitbtn:string="Save";
  buttonClass: string='btn btn-primary';
  alert_class="alert-success";
  editid:any="";
  updateId: any= [];
  showMessage: any= false;
  errordata="";
constructor(private _httpService: ItemquantitypeService ) { 
  this.getAllitemQuantityType();
}
onSubmit(data){
  if(Object.keys(this.updateId).length==0){
   this.saveValues(data);
  }
  else{
   // console.log(this.updateId.item_quantity_type);
    this.updateValues(data,this.updateId.item_quantity_type);	
  }
}
saveValues(data){
 this._httpService.saveItemQuantity(data).subscribe(
  data => {
                  this.successJson = data;
                  if(this.successJson.status===true){
                  
                  this.getAllitemQuantityType();
                  this.alert_class="alert-success";
                  //this.showMessage= true;
                  this.displayMessage();
              }
            //   else if(this.successJson.status===false){
               
            //     this.getAllitemQuantityType();
            //      this.errordata=this.successJson.errors[0].msg;
            //     //this.showMessage= true;
            
            // }
              },
            error=>alert(error),
            () =>console.log("finished")
           );
          }
          
          getAllitemQuantityType(): void{ 
             this._httpService.getItemQuantity({"item_quantity_type":"0"}).subscribe(data => this.returnJson =data.data,
             error=>alert(error),
             () =>console.log("data displayed")
             );
          }
          getItemQuantityEdit(rec){
    this.updateId = rec;
    this.submitbtn="Update";
    this.QuantityName=rec.item_quantity_type_name;
    }
  updateValues(data,id){
    console.log(id);
  this._httpService.updateItemQuantity({"item_quantity_type_name":data.item_quantity_type_name,"item_quantity_type":id}).subscribe(
  data => {
                  this.successJson = data;
                  if(this.successJson.status===true){
                    this.getAllitemQuantityType();
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
  this.frm.controls['item_quantity_type_name'].setValue('');
  this.changeButton();
}
deleteItemQuantity(id){
 this._httpService.DeleteItemQuantity({"item_quantity_type":id}).subscribe(
  data => {
    this.successJson = data;
    if(this.successJson.status===true){
      this.getAllitemQuantityType();
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
