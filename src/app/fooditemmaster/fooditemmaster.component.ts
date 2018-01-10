
import { Component, OnInit ,ViewChild} from '@angular/core';
import {FooditemmasterService}  from '../services/fooditemmaster.service';
import { ItemquantitypeService } from '../services/itemquantitytype.service';
import { ItemCategoryService } from '../services/itemcategory.service';
import { Config } from '../app.config';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-fooditemmaster',
  templateUrl: './fooditemmaster.component.html',
  styleUrls: ['./fooditemmaster.component.css'],
  providers:[FooditemmasterService,ItemquantitypeService,ItemCategoryService]
})
export class FooditemmasterComponent implements OnInit {
  @ViewChild('frm') frm;
  ItemName ="";
  ItemCode="";
  ItemQunatity="";
  ItemImage : any="";
  ItemDes="";
  QuantityType="";
  ItemCategory="";
  VegType="";
  subVegType="";
  Price="";

  successJson: any= [];
  returnJson: any = [];
   
  returnJsonitemQtype:any =[];
  returnJsonitemcategory:any =[];

  alert_class="alert-success";
  buttonClass: string='btn btn-primary';
  editid:any="";
  updateId: any= [];
  showMessage: any= false;
  errordata="";
  submitbtn:string="Save";
  Filesize : number =null;

  
  constructor(private _httpService: FooditemmasterService,private  _itemqtypeservice:ItemquantitypeService,private _httpitemcatService:ItemCategoryService,private conf: Config) {
   
   }

  ngOnInit() {
   this.getAllitemQuantityType(); this.getAllItemCategories();this.getAllFoodItemMaster();
 
  }

  onSubmit(data){
    if(Object.keys(this.updateId).length==0){
     this.saveValues(data);
    }
    else{
      this.updateValues(data,this.updateId.item_id);	
    }
  }

  saveValues(data){
    console.log(data);
    this._httpService.saveFoodItemMasrter(data).subscribe(
    data => {
                  this.successJson = data;  
                  if(this.successJson.status===true){ 
                  this.getAllFoodItemMaster();
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

          getAllFoodItemMaster(): void{
             this._httpService.getFoodItemMasrter({"item_id":"0"}).subscribe(data => this.returnJson =data.data,   
             error=>alert(error),
             () =>console.log("data displayed")
            
             );
            
          }

          getAllitemQuantityType(): void{ 
            this._itemqtypeservice.getItemQuantity({"item_quantity_type":"0"}).subscribe(data => this.returnJsonitemQtype =data.data,
            error=>alert(error),
            () =>console.log("data displayed")
            );
         }

         getAllItemCategories(): void{
          this._httpitemcatService.getItemCategories({"item_category_id":"0"}).subscribe(data => this.returnJsonitemcategory =data.data,
           error=>alert(error),
           () =>console.log("data displayed")
           );
        }

        changeListener($event) : void {
          this.readThis($event.target);
        }
        
        readThis(inputValue: any): void {
          var file:File = inputValue.files[0];
          //console.log(file.size);
          this.Filesize=file.size;

          var myReader:FileReader = new FileReader();
        
          myReader.onloadend = (e) => {
            this.ItemImage = myReader.result;
          }
          myReader.readAsDataURL(file);
        }

    
    getFoodItemMasrterEdit(rec){
      console.log(rec);
    this.updateId = rec;
    this.submitbtn="Update";
    this.ItemName=rec.item_name;
    this.ItemCode=rec.item_code;
    this.ItemQunatity=rec.item_quantity;
    this.ItemImage= rec.item_image ;
    this.ItemDes=rec.item_description;
    this.QuantityType=rec.item_quantity_type;
    this.ItemCategory=rec.item_category_id;
    this.VegType=rec.item_veg_type;
    this.subVegType=rec.item_veg_subtype;
    this.Price=rec.item_price;

         }


         updateValues(data,id){
          this._httpService.updateFoodItemMasrter({"item_name":data.item_name,"item_code":data.item_code,"item_quantity":data.item_quantity,"item_image":data.item_image,"item_description":data.item_description,"item_quantity_type":data.item_quantity_type,"item_category_id":data.item_category_id,"item_veg_type":data.item_veg_type,"item_veg_subtype":data.item_veg_subtype,"item_price":data.item_price,"item_id":id}).subscribe(
            data => {
                            this.successJson = data;
                            if(this.successJson.status===true){
                            this.getAllFoodItemMaster();
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


          deleteFoodItemMasrter(id){
           this._httpService.DeleteFoodItemMasrter({"item_id":id}).subscribe(
            data => {
              this.successJson = data;
              if(this.successJson.status===true){
                this.getAllFoodItemMaster();
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
                this.frm.controls['item_name'].setValue('');
                this.frm.controls['item_code'].setValue('');
                this.frm.controls['item_description'].setValue('');
                //this.frm.controls['item_image'].setValue('');
                this.frm.controls['item_quantity'].setValue('');
                this.frm.controls['item_quantity_type'].setValue('');
                this.frm.controls['item_category_id'].setValue('');
                this.frm.controls['item_veg_subtype'].setValue('');
                //this.frm.controls['item_single'].setValue('');
                this.frm.controls['item_price'].setValue('');
                this.changeButton();
                //console.log(this.returnJson);
              }     
              
              
             

}
