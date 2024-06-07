import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogDeleteComponent } from './dialog-delete.component';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogRef } from '@angular/material/dialog';

const dialogMock = {
  close: jest.fn(),
};

describe('Dialog Delete Component', () => {
  let component: DialogDeleteComponent;
  let fixture: ComponentFixture<DialogDeleteComponent>;
  let dialogRef: MatDialogRef<DialogDeleteComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        DialogDeleteComponent,
        BrowserAnimationsModule,
      ],
      providers: [{ provide: MatDialogRef, useValue: dialogMock }],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDeleteComponent);
    dialogRef = TestBed.inject(MatDialogRef);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should onNoClick', () => {
    const spy = jest.spyOn(dialogRef, 'close');
    component.onNoClick();
    expect(spy).toHaveBeenLastCalledWith(false);
  });

  it('should onYesClick', () => {
    const spy = jest.spyOn(dialogRef, 'close');
    component.onYesClick();
    expect(spy).toHaveBeenLastCalledWith(true);
  });
});
