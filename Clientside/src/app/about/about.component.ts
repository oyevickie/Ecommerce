import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { RestApiService } from '../shared/rest-api.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {



  constructor(
    public data: DataService,
    private rest: RestApiService,
    private http: HttpClient
  ) { }

  async ngOnInit() {
  }


}
