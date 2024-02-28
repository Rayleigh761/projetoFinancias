import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { MockModule, MockProvider, MockService } from 'ng-mocks';
import { HttpBaseService } from 'src/app/shared/base/http-base.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DashboardService } from '../../service/dashboard.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/app/shared/material/material.module';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let httpServiceBaseStub;

  beforeEach(async () => {

    httpServiceBaseStub = {

    }

    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [
        FormBuilder,
        MockService(DashboardService),
        MockProvider(HttpBaseService),
        MockProvider(HttpClient),        
        MockModule(HttpClientModule),
        MockModule(MaterialModule),
        MockModule(ReactiveFormsModule),
      ]
        ,
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
