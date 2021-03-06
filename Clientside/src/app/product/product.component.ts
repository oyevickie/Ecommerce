import { RestApiService } from './../shared/rest-api.service';
import { DataService } from './../shared/data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  myReview = {
    title : '',
    description :'',
    rating: 0
  };

  btnDisabled = false;

  product: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    public data: DataService,
    private rest: RestApiService,
    private router: Router
  ) { }

  ngOnInit(){
    this.activatedRoute.params.subscribe(res => {
      this.rest
      .get(`http://localhost:3030/api/product/${res['id']}`)
      .then(data => {
        data['success']
        ? (this.product = data['product'])
        : this.router.navigate(['/']);
      })
      .catch(error => this.data.error(error['message']))
    })
  }


  get token() {
    return localStorage.getItem('token');
  }

  addToCart() {
    this.data.addToCart(this.product)
    ? this.data.success('Product successfully added to cart')
    : this.data.error('Product has already been added to cart')
  }

  async postReview() {   
    this.btnDisabled = true;
    try {
      const data = await this.rest.post('http://localhost:3030/api/review', {
        productId: this.product._id,
        title: this.myReview.title,
        description: this.myReview.description,
        rating: this.myReview.rating,
      });
      data['success']
        ? this.data.success(data['message'])
        : this.data.error(data['message']);
      this.btnDisabled = false;
    } catch (error) {
      this.data.error(error['message']);
    }
  }
}
