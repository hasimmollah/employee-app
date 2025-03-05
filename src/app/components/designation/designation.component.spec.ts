import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignationComponent } from './designation.component';
import { DesignationService } from '../../services/designation/designation.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DesignationComponent', () => {
  let component: DesignationComponent;
  let fixture: ComponentFixture<DesignationComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesignationComponent, HttpClientTestingModule],
      providers: [DesignationService],
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesignationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
