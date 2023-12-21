import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteListComponent } from './site-list.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Site } from '../site/site.model';

describe('SiteListComponent', () => {
  let component: SiteListComponent;
  let fixture: ComponentFixture<SiteListComponent>;
  
  const sites: Site[] = [
    new Site('mocked 1', '', new Date(), '', 'Running'),
    new Site('test 5', '', new Date(), '', 'Success'),
    new Site('test 1', '', new Date(), '', 'Error'),
    new Site('another 1', '', new Date(), '', 'Unknown'),
    new Site('test 10', '', new Date(), '', 'Error'),
    new Site('another 1', '', new Date(), '', 'Success'),
  ]

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiteListComponent],
      imports: [
        FormsModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        NzTableModule,
        NzDropDownModule,
        NzInputModule,
        NzButtonModule,
        NzTagModule,
        NzToolTipModule,
      ]
    });
    fixture = TestBed.createComponent(SiteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should sort by name', () => {
    const sortedSites = sites.sort(component.sortByName)
    expect(sortedSites[0].name).toBe('another 1')
    expect(sortedSites[1].name).toBe('another 1')
    expect(sortedSites[2].name).toBe('mocked 1')
    expect(sortedSites[3].name).toBe('test 1')
    expect(sortedSites[4].name).toBe('test 5')
    expect(sortedSites[5].name).toBe('test 10')
  });
  it('should filter by last result', () => {
    const filt = {
      success: sites.filter(site => component.resultFilterFunc(['Success'], site)),
      error: sites.filter(site => component.resultFilterFunc(['Error'], site)),
      running: sites.filter(site => component.resultFilterFunc(['Running'], site)),
      unknown: sites.filter(site => component.resultFilterFunc(['Unknown'], site)),
      run_eq: sites.filter(site => component.resultFilterFunc(['Running','Unknown'], site)),
    }
    expect(filt.success).toEqual([sites[1], sites[5]])
    expect(filt.error).toEqual([sites[2], sites[4]])
    expect(filt.running).toEqual([sites[0]])
    expect(filt.unknown).toEqual([sites[3]])
    expect(filt.run_eq).toEqual([sites[0], sites[3]])

  });
});
