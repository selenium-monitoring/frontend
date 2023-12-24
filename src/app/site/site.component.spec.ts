import { ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';

import { SiteComponent } from './site.component';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { RouterTestingModule } from '@angular/router/testing';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { sites } from '../site-list/mock-sites';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { ApiModule } from '../services';
import { NzSpinModule } from 'ng-zorro-antd/spin';

describe('SiteComponent', () => {
  let component: SiteComponent;
  let fixture: ComponentFixture<SiteComponent>;
  let route: ActivatedRoute

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiteComponent],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        ApiModule,
        NzDescriptionsModule,
        NzBadgeModule,
        NzGridModule,
        NzAlertModule,
        NzToolTipModule,
        NzSpinModule,
      ]
    });

    route = TestBed.inject(ActivatedRoute)
  });

  // it('should create', () => {
  //   component = fixture.componentInstance
  //   expect(component).toBeTruthy();
  // });

  it('should get site', fakeAsync(() => {
    const site = sites[3]
    const spyRoute = spyOn(route.snapshot.paramMap, 'get')
    spyRoute.and.returnValue(site.name)
    fixture = TestBed.createComponent(SiteComponent);
    fixture.detectChanges();
    component = fixture.componentInstance
    flush()
    expect(route.snapshot.paramMap.get).toHaveBeenCalled()
    expect(component.site).toBeDefined()
    expect(component.site).toBe(site)
    expect(component.siteName).toBe(site.name)
  }))
  it('should should not get unknown site', fakeAsync(() => {
    const spyRoute = spyOn(route.snapshot.paramMap, 'get')
    spyRoute.and.returnValue('Missing')
    fixture = TestBed.createComponent(SiteComponent);
    fixture.detectChanges();
    component = fixture.componentInstance
    flush()
    expect(route.snapshot.paramMap.get).toHaveBeenCalled()
    expect(component.site).toBeUndefined()
    expect(component.siteName).toBe('Missing')
  }))
});
