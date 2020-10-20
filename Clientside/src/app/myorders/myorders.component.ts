import { RestApiService } from './../shared/rest-api.service';
import { DataService } from './../shared/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css']
})
export class MyordersComponent implements OnInit {

  myorders: any;

  constructor(private data: DataService, private rest: RestApiService) { }

  async ngOnInit() {
    try {
      const data = await this.rest.get(
        'http://localhost:3030/api/accounts/orders'
        );
        data['success']
        ? (this.myorders = data['orders'])
        : this.data.error(data['message'])
    } catch (error) {
      this.data.error(error['message'])
    }
  }

}
