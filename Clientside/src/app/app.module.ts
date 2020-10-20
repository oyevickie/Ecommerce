import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './accounts/login/login.component';
import { RegisterComponent } from './accounts/register/register.component';
import { HomeComponent } from './home/home.component';
import { NotificationsComponent } from './accounts/notifications/notifications.component';
import { PostProductComponent } from './post-product/post-product.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProfileComponent } from './profile/profile.component';
import { MyProductsComponent } from './my-products/my-products.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { CategoryComponent } from './category/category.component';
import { SettingsComponent } from './settings/settings.component';
import { AddressComponent } from './address/address.component';
import { SearchComponent } from './search/search.component';
import { MyordersComponent } from './myorders/myorders.component';
import { AboutComponent } from './about/about.component';
import { AddcategoryComponent } from './addcategory/addcategory.component' 



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NotificationsComponent,
    PostProductComponent,
    CategoriesComponent,
    ProfileComponent,
    MyProductsComponent,
    ProductComponent,
    CartComponent,
    CategoryComponent,
    SettingsComponent,
    AddressComponent,
    SearchComponent,
    MyordersComponent,
    AboutComponent,
    AddcategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
