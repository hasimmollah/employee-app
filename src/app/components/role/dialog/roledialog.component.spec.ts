import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoledialogComponent } from './roledialog.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RoleService } from '../../../services/role/role.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('RoledialogComponent', () => {
  let component: RoledialogComponent;
  let fixture: ComponentFixture<RoledialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
       imports: [RoledialogComponent, HttpClientTestingModule],
       providers: [RoleService, provideAnimations(),
        {
          provide: MatDialogRef, // ✅ Mock MatDialogRef
          useValue: { close: jasmine.createSpy('close') }, // Mock close function
        },
        {
          provide: MAT_DIALOG_DATA, // ✅ Mock MAT_DIALOG_DATA if needed
          useValue: {}, // Provide an empty object or mock data
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoledialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
