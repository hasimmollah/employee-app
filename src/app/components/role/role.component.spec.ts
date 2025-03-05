import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleComponent } from './role.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RoleService } from '../../services/role/role.service';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('RoleComponent', () => {
  let component: RoleComponent;
  let fixture: ComponentFixture<RoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleComponent, HttpClientTestingModule],
                        providers: [RoleService, provideAnimations(),],
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
