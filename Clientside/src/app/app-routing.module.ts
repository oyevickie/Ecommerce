import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './accounts/login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './accounts/register/register.component';
import { PostProductComponent } from './post-product/post-product.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProfileComponent } from './profile/profile.component';
import { MyProductsComponent } from './my-products/my-products.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { CategoryComponent } from './category/category.component';


import { AuthGuardService } from './shared/auth-guard.service';
import { SettingsComponent } from './settings/settings.component';
import { AddressComponent } from './address/address.component';
import { SearchComponent } from './search/search.component';
import { MyordersComponent } from './myorders/myorders.component';
import { AboutComponent } from './about/about.component';
import { AddcategoryComponent } from './addcategory/addcategory.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'search',
    component: SearchComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthGuardService]
  }, 
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService] 
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'product/:id',
    component: ProductComponent
  },
  {
    path: 'profile/postproduct',
    component: PostProductComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'profile/myproducts',
    component: MyProductsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path : 'about',
    component: AboutComponent
  },
  {
    path: 'categories',
    component: CategoriesComponent,
  },
  {
    path: 'categories/:id',
    component: CategoryComponent
  },
  {
    path: 'profile/settings',
    component: SettingsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'profile/address',
    component: AddressComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'profile/orders',
    component: MyordersComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'profile/addcategory',
    component: AddcategoryComponent,
    canActivate: [AuthGuardService]
    
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
