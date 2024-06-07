import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { NewEditHeroComponent } from './new-edit-hero.component';
import { Router } from '@angular/router';
import { HeroService } from '../../services/hero.service';
import { of } from 'rxjs';
import {
  EDIT_HERO_RESPONSE_MOCK,
  HERO_DATA_EDIT,
  HERO_DATA_NEW,
} from '../../mocks/index';
import { MatSnackBar } from '@angular/material/snack-bar';

const heroServiceMock = {
  heroData$: of(HERO_DATA_EDIT),
  setHeroData: jest.fn().mockReturnValue(of(HERO_DATA_EDIT)),
  editHero: jest.fn().mockReturnValue(of(EDIT_HERO_RESPONSE_MOCK)),
  createHero: jest.fn().mockReturnValue(of(EDIT_HERO_RESPONSE_MOCK)),
};

describe('New Edit Hero Component', () => {
  let component: NewEditHeroComponent;
  let fixture: ComponentFixture<NewEditHeroComponent>;
  let service: HeroService;
  let router: Router;
  let snackBar: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [NewEditHeroComponent],
      providers: [
        MatSnackBar,
        Router,
        { provide: HeroService, useValue: heroServiceMock },
      ],

      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEditHeroComponent);
    service = TestBed.inject(HeroService);
    snackBar = TestBed.inject(MatSnackBar);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should cancel', () => {
    const spy = jest.spyOn(router, 'navigateByUrl');
    component.cancel();
    expect(spy).toHaveBeenCalled();
  });

  it('should getOutputIsAllowRecord', () => {
    component.getOutputIsAllowRecord(false);
    expect(component.isAllowRecord).toBeFalsy();
  });

  it('should recordHero with edit origin', () => {
    const spy = jest.spyOn(service, 'setHeroData');
    component.recordHero();
    expect(spy).toHaveBeenCalled();
  });

  it('should recordHero with new origin', () => {
    heroServiceMock.heroData$ = of(HERO_DATA_NEW);
    component.recordHero();
    const spy = jest.spyOn(service, 'createHero');
    expect(spy).toHaveBeenCalled();
  });
});
