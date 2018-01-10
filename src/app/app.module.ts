import { RouterModule, Routes, ActivatedRoute, Params } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CookieService } from 'ng2-cookies';
import { Config } from './app.config';
import { FileUploadModule } from 'ng2-file-upload';
import { AppComponent } from './app.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LeftmenuComponent } from './leftmenu/leftmenu.component';
import { RegisterComponent } from './register/register.component';
import { ItemcategoryComponent } from './itemcategory/itemcategory.component'; 
import { ItemCategoryService } from './services/itemcategory.service';
import { IngredientmasterComponent } from './ingredientmaster/ingredientmaster.component';
import { IngredientMasterService } from './services/ingredientmaster.service';
import { LoginComponent } from './login/login.component';
import { MenucategoryComponent } from './menucategory/menucategory.component';
import { MenuCategoryService } from './services/menucategory.service';
import { SubmenucategoryComponent } from './submenucategory/submenucategory.component';
import { SubMenuCategoryService } from './services/submenucategory.service';
import { CommunicationComponent } from './communication/communication.component';
import { CommunicationCategoryService } from './services/communication.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AddressComponent } from './address/address.component';
import { AddressService } from './services/address.service';
import { NutritionmasterComponent } from './nutritionmaster/nutritionmaster.component';
import { NutritionMasterService } from './services/nutritionmaster.service';
import { ConfigchartmasterComponent } from './configchartmaster/configchartmaster.component';
import { ConfigchartmasterService } from './services/confchartmaster.service';
import { ConfmodulesComponent } from './confmodules/confmodules.component';
import { ConfigmodulesService } from './services/confmodules.service';
import { ItemquantitytypeComponent } from './itemquantitytype/itemquantitytype.component';
import { ItemquantitypeService } from './services/itemquantitytype.service';
import { ConfsettingsComponent } from './confsettings/confsettings.component';
import { ConfsetingsService } from './services/confsettings.service';
import { KitchenmasterComponent } from './kitchenmaster/kitchenmaster.component';
import { AllhospitalsService } from './services/allhospitals.service';
import { FooditemmasterComponent } from './fooditemmaster/fooditemmaster.component';
import {FooditemmasterService}  from './services/fooditemmaster.service';
import { FoodchartComponent } from './foodchart/foodchart.component';
import { HospitalchartmasterComponent } from './hospitalchartmaster/hospitalchartmaster.component';
import { HospitalmasterService } from './services/hospitalmaster.service';

export function configLoad(){
  return Config.getInstance('config.json');
 }


const routing=[
{ path:'', redirectTo: '/home', pathMatch: 'full'},
{path:'home',component:HomeComponent},
{path:'login/:hid/:service/:subservice/:role/:dep/:childrole/:ustatus/:group/:servicename/:memberid',  component: LoginComponent},
{path:'register', component:RegisterComponent},
{path :'items', component:ItemcategoryComponent},
{ path:'ingredientmaster', component:IngredientmasterComponent},
{path: 'menu',   component:MenucategoryComponent},
{path: 'submenu', component:SubmenucategoryComponent},
{path:'communication', component:CommunicationComponent},
{path:'address', component:AddressComponent},
{path:'nutritionmaster', component:NutritionmasterComponent},
{path:'chartmaster', component:ConfigchartmasterComponent},
{path:'modules', component:ConfmodulesComponent},
{path:'itemquantity', component:ItemquantitytypeComponent},
{path:'kitchenmaster', component:KitchenmasterComponent},
{path:'settings', component:ConfsettingsComponent},
{path:'fooditemmaster', component:FooditemmasterComponent},
{path:'foodchart', component:FoodchartComponent},
{path:'hospitalchartmaster', component:HospitalchartmasterComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LeftmenuComponent,
    RegisterComponent,
    ItemcategoryComponent,
    IngredientmasterComponent,
    LoginComponent,
    MenucategoryComponent,
    SubmenucategoryComponent,
    CommunicationComponent,
    AddressComponent,
    NutritionmasterComponent,
    ConfigchartmasterComponent,
    ConfmodulesComponent,
    ItemquantitytypeComponent,
    KitchenmasterComponent,
    ConfsettingsComponent,
    FooditemmasterComponent,
    FoodchartComponent,
    HospitalchartmasterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    FileUploadModule,
    PaginationModule.forRoot(),
    RouterModule.forRoot(routing)
  ],
  providers: [CookieService, {provide: Config, useFactory:configLoad},{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
