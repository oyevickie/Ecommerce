import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { RestApiService } from '../shared/rest-api.service';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent implements OnInit {
  categories: any;

  newCategory = '';
  btnDisabled = false;

  constructor(
    public data: DataService,
    private rest: RestApiService
  ) { }

  async ngOnInit() {
    try {
      const data = await this.rest.get(
        'http://localhost:3030/api/categories'
      );
      data['success']
      ?(this.categories = data['categories'])
      : this.data.error(data['message'])
    } catch (error) {
      this.data.error(error['message']);
    }
  }

  async addCategory() {
    this.btnDisabled = true;
    try {
      const data = await this.rest.post(
        'http://localhost:3030/api/categories',
        { category: this.newCategory }
      );
      data['success']
      ? this.data.success(data['message'])
      : this.data.error(data['message']);
    } catch(error) {
      this.data.error(error['message'])
    }
    this.btnDisabled = false
  }

}
