import {Component, OnInit,ViewChild} from '@angular/core';
import {MenuCategoryService} from '../services/menucategory.service';
import {SubMenuCategoryService} from '../services/submenucategory.service';
import {FooditemmasterService}  from '../services/fooditemmaster.service';
import {Chartnames}  from '../services/chartnames.service';
import {FoundationChartItems}  from '../services/foundationchartitems.service';
declare var $;

@Component({
  selector: 'app-foodchart',
  templateUrl: './foodchart.component.html',
  styleUrls: ['./foodchart.component.css'],
  providers:[MenuCategoryService,SubMenuCategoryService,FooditemmasterService,Chartnames,FoundationChartItems]
})
export class FoodchartComponent implements OnInit {
  @ViewChild('frm') frm;
  @ViewChild('frm1') frm1;
  Foodchart="";
  Foodchartname="";
  MenuCat="";
  SubMenuCat="";
  Items:any;
  dataarry:any=[];
  errordata="";

  
  responsedata:any={};
  returnJsonMenu:any=[];
  returnJsonSubMenu:any=[];
  returnJsonchart:any=[];
  returnJsonitem :any;
  returnJsonitemchcked:any=[];
  selectedItems = [];
  successJson: any= [];
  returnJson: any = [];
  submitbtn:string="Save";
  buttonClass: string='btn btn-primary';
  alert_class="alert-success";
  Arr = Array; //Array type captured in a variable
  num:number = 10;
  foodbox:boolean=true;
  showMessage: any= false;
  constructor(private _fservice:FoundationChartItems,private _menuservice:MenuCategoryService, private _submenuservice:SubMenuCategoryService, private _itemservice:FooditemmasterService,private _chartname:Chartnames)
 {  }
    

  ngOnInit() {
    this.getAllitems(); this.getAllMenuCategory(); this.getAllSubMenuCategory(); this.getCharName();
  }
 
  onSubmit(data){
     this.saveValues(data);
  }
  saveValues(data){
    this.getCheckedValues(this.selectedItems, function(resp){
   
    data.item_ids=resp;
    this.dataarry.push(data);
    //this.dataarry=data;
    
    this.responsedata.foundation_chart_items=this.dataarry;

    console.log(this.responsedata);
    this._fservice.saveFChartitems(this.responsedata).subscribe(
      data => {
                      this.successJson = data;
                      if(this.successJson.status===true){
                      //this.getAllItemCategories();
                      this.alert_class="alert-success";
                      //this.showMessage= true;
                      this.displayMessage();
                      this.resetFunction();
                  }
                
                  },
                error=>alert(error),
                () =>console.log("finished")
               );
}.bind(this));
    }


  additem(recitem, event) {
            var index = this.selectedItems.indexOf(recitem.item_id);
            alert(recitem.item_id);
            alert(index);
            if (event.target.checked) {
                if (index == -1) {
                    this.selectedItems.push(recitem.item_id); 
                }
            } else {
                if (index != -1) {
                  this.selectedItems.splice(index, 1);
                  console.log(this.selectedItems);
                    
                }
            }
            //console.log(this.selectedItems);
        }

        getAllitems(): void{
          this._itemservice.getitems({"item_id":"0"}).subscribe(data => this.returnJsonitem =data.data,   
          error=>alert(error),
          () =>console.log("data displayed")
         );   
        }


        getitemschecked(data){
          //this.selectedItems=[7,8,9,10,11,12];
    
          this._itemservice.getitemsCheckedval({"foundation_chart_id":data.foundation_chart_id,"menu_categoryid":data.menu_categoryid,"menu_sub_categoryid":data.menu_sub_categoryid}).subscribe(data => this.returnJsonitemchcked =data.data,   
      
            error=>alert(error),
          () =>console.log("data displayed")
         );

        
        }

  getCheckedValues(obj, callback){
    var returnArr=[];
    $("input[name='item_id']:checked").each(function(){
      returnArr.push(parseInt($(this).attr("itemid")));
    });
    setTimeout(function(){
      console.log(obj);
      console.log(returnArr);
      callback(returnArr);
    }, 100);
  }
  
  getAllMenuCategory(): void{
    // console.log("Hello fetch data ");        
     this._menuservice.getMenu({"menu_categoryid":"0"}).subscribe(data => this.returnJsonMenu =data.data,
     error=>alert(error),
     () =>console.log("data displayed")
     );
  }

  checkItemExists(itemid){
    // alert("hello");
    //console.log("test");
    var returnVal='';
    for(var i=0; i<this.returnJsonitemchcked.length; i++){
      if(parseInt(this.returnJsonitemchcked[i].item_id)==itemid){
        returnVal='checked';
        if(this.selectedItems.indexOf(this.returnJsonitemchcked[i].item_id)==-1){
          this.selectedItems.push(this.returnJsonitemchcked[i].item_id);
        }
      }
      if(i==this.returnJsonitemchcked.length-1){
        return returnVal;
      }
    }
  }

  getAllSubMenuCategory(): void{
    this._submenuservice.getsubMenu({"menu_sub_categoryid":"0"}).subscribe(data => this.returnJsonSubMenu =data.data,
    error=>alert(error),
    () =>console.log("data displayed")
    );
    
 } 
   
 getCharName(): void{
  this._chartname.getChartname({"foundation_chart_id":"0"}).subscribe(data => this.returnJsonchart =data.data,
  error=>alert(error),
  () =>console.log("data displayed")
  );
}
  

foodchart(){
  if(this.foodbox ==true){
  this.foodbox =false;
  }
  else{
    this.foodbox =true;
  }
}


chkchart(name){
  this._chartname.saveChartname(name).subscribe(
    data => {
                    this.successJson = data;
                    if(this.successJson.status===true){
                    this.getCharName();
                    this.alert_class="alert-success";
                    this.showMessage= true;
                    this.displayMessage();
                }
             
                },
              error=>alert(error),
              () =>console.log("finished")
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

          resetFunction(){
           // this.updateId=[];
            this.frm.reset();
            this.frm.controls['foundation_chart_id'].setValue('');
            this.frm.controls['menu_categoryid'].setValue('');
            this.frm.controls['menu_sub_categoryid'].setValue('');
            // this.frm.controls['item_id'].setValue('');
           
            //this.changeButton();
          }

}


