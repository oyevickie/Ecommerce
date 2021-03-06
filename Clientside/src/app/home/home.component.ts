import { RestApiService } from './../shared/rest-api.service';
import { DataService } from './../shared/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: any;

  constructor(public data: DataService, private rest: RestApiService) { }

  async ngOnInit() {
    try {
      const data = await this.rest.get('http://localhost:3030/api/products');
      data['success']
      ? (this.products = data['products'])
      : this.data.error('Could not fetch products');
    } catch (error) {
      this.data.error(error['message']);
    }
  }

}
