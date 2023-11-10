import { Component } from '@angular/core';
import { ApiModule } from './services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'selenium-monitoring';
  
  constructor(private apiService: ApiModule) { }

  // fetchData(): Observable<any> {
  //   return this.apiService.;
  // }
}
