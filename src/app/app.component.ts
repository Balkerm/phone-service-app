import { Component } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { phoneNumber } from './phone-number';


class DataTablesResponse {
  numbers: any[] = [];
  totalCount: number = 0;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'phone-service-app';
  dtOptions: DataTables.Settings = {};
  numbers: phoneNumber[] = [];

 constructor(private http: HttpClient) {}


  ngOnInit(): void {
    const that = this;

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        // console.log('dataTablesParameters::' , dataTablesParameters);
        // console.log('url: ','http://localhost:8080/phones?page='+(dataTablesParameters.start/dataTablesParameters.length)+'&size='+dataTablesParameters.length )
        that.http
          .get<DataTablesResponse>(
            'http://localhost:8080/phones?page='+(dataTablesParameters.start/dataTablesParameters.length)+'&size='+dataTablesParameters.length
          ).subscribe(resp => {
            // console.log('[ApiService] - response::', resp);
            that.numbers = resp.numbers;
            callback({
              recordsTotal: resp.totalCount,
              recordsFiltered:  resp.totalCount,
              data: []
            });
          });
      },
      columns: [{ data: 'id' }, { data: 'customerName' }, { data: 'number' }, { data: 'country' }, { data: 'isValid' }]
    };
  }
}
