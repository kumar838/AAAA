import { Component, OnInit,ViewChild } from '@angular/core';
import { AddressService } from '../services/address.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
  providers:[AddressService]
})
export class AddressComponent implements OnInit {
  @ViewChild('frm') frm;
  Addresstype="";
  AddressDescription="";
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

  constructor(private _httpService: AddressService) {this.getAllAddress();}

  onSubmit(data){
    if(Object.keys(this.updateId).length==0){
     this.saveValues(data);
    }
    else{
      //console.log(this.updateId.item_category_id);
      this.updateValues(data,this.updateId.id);	
    }
  
  }

  saveValues(data){
    //this.saveValues(data);
   // console.log(data);
    this._httpService.saveAddress(data).subscribe(
  data => {
                  this.successJson = data;
                  
                  if(this.successJson.status===true){
                  
                  this.getAllAddress();
                  this.alert_class="alert-success";
                  this.showMessage= true;
                  this.displayMessage();
              }
             else if(this.successJson.status===false){

              //console.log(this.successJson.errors[0].msg);
               
              this.getAllAddress();
                this.errordata=this.successJson.errors[0].msg;
               //this.showMessage= true;
            
           }
              },
            error=>alert(error),
            () =>console.log("finished")
           );
          }



          getAllAddress(): void{
            // console.log("Hello fetch data ");
            
             this._httpService.getAddress({"query_type":"fetch_data","memberid":"1234564","id":"0"}).subscribe(data => this.returnJson =data.data,
             error=>alert(error),
             () =>console.log("data displayed")
             );
          }

     getAddressEdit(rec){
    this.updateId = rec;
    //console.log(data);
    this.submitbtn="Update";
    this.Addresstype=rec.type;
    this.AddressDescription=rec.description;
    //console.log("update function");
      //rawdata={"query_type":"set_data","memberid":"74125896","item_category":"Beverages555","item_category_id":"2"};
         }



         updateValues(data,id){
        // console.log(id);
            this._httpService.updateAddress({"query_type":"set_data","memberid":"12345678","type":data.type,"description":data.description,"id":id}).subscribe(
            data => {
                            this.successJson = data;
                            if(this.successJson.status===true){
                            this.getAllAddress();
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


          deleteAddress(id){
            //console.log({"query_type":"del_data","memberid":"1234564","item_category_id":id});
           this._httpService.DeleteAddress({"query_type":"del_data","memberid":"1234564","id":id}).subscribe(
             
            data => {
              this.successJson = data;
              //console.log(this.successJson);
              if(this.successJson.status===true){
                this.getAllAddress();
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
                this.frm.controls['type'].setValue('');
                this.frm.controls['description'].setValue('');
                // this.form.controls['is_hospital'].setValue(1);
                this.changeButton();
               
              }



  ngOnInit() {
  }

}
