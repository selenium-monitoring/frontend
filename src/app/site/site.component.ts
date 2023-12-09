import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Result } from './result.model';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss']
})
export class SiteComponent {
  results:Result[];
  constructor(private router: Router) {
    this.results = [
      new Result(0, 'First Result', new Date(), 'Success'),
      new Result(1, 'First Result', new Date(), 'Error'),
      new Result(2, 'First Result', new Date(), 'Success'),
    ]
  }
}
