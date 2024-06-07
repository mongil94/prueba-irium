import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { TableHeroesComponent } from './table-heroes.component';
import {
  DELETE_HERO_RESPONSE_MOCK,
  HERO_DATA_EDIT,
  HERO_MOCK,
} from '../../mocks/index';
import { of } from 'rxjs';
import { HeroService } from '../../services/hero.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

const heroServiceMock = {
  heroData$: of(HERO_DATA_EDIT),
  setHeroData: jest.fn().mockReturnValue(of(HERO_DATA_EDIT)),
  deleteHero: jest.fn().mockReturnValue(of(DELETE_HERO_RESPONSE_MOCK)),
};

const dialogMock = {
  open() {
    return {
      afterClosed: () => of(true),
    };
  },
};

describe('Table Heroes Component', () => {
  let component: TableHeroesComponent;
  let fixture: ComponentFixture<TableHeroesComponent>;
  let service: HeroService;
  let router: Router;
  let dialog: MatDialog;
  let snackBar: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        TableHeroesComponent,
        MatDialogModule,
      ],
      providers: [
        Router,
        { provide: MatDialog, useValue: dialogMock },
        MatSnackBar,
        { provide: HeroService, useValue: heroServiceMock },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableHeroesComponent);
    service = TestBed.inject(HeroService);
    router = TestBed.inject(Router);
    dialog = TestBed.inject(MatDialog);
    snackBar = TestBed.inject(MatSnackBar);
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should editHero', () => {
    const spy = jest.spyOn(service, 'setHeroData');
    component.editHero(HERO_MOCK);
    expect(spy).toHaveBeenCalled();
  });

  it('should deleteRow', () => {
    const spyDialog = jest.spyOn(dialog, 'open');
    const spyDeleteHero = jest.spyOn(service, 'deleteHero');
    component.deteleRow(HERO_MOCK);
    expect(spyDialog).toHaveBeenCalled();
    expect(spyDeleteHero).toHaveBeenCalled();
  });
});
