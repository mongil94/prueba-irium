import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { FilterListComponent } from './filter-list.component';
import { HeroService } from '../../services/hero.service';
import { of } from 'rxjs';
import { HEROES_MOCK, HERO_DATA_NONE } from '../../mocks/index';
import { EMPTY_HERO } from '../../constants';
import { Router } from '@angular/router';

const heroServiceMock = {
  heroData$: of(HERO_DATA_NONE),
  setHeroData: jest.fn().mockReturnValue(of(HERO_DATA_NONE)),
  getHeroes: jest.fn().mockReturnValue(of(HEROES_MOCK)),
};

describe('Filter List Component', () => {
  let component: FilterListComponent;
  let fixture: ComponentFixture<FilterListComponent>;
  let service: HeroService;
  let router: Router;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [FilterListComponent],
      providers: [Router, { provide: HeroService, useValue: heroServiceMock }],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterListComponent);
    service = TestBed.inject(HeroService);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should outputDataTable', () => {
    const event = [EMPTY_HERO];
    component.outputDataTable(event);
    expect(component.dataTable).toEqual(event);
  });

  it('should goToNewHero', () => {
    const spy = jest.spyOn(router, 'navigateByUrl');
    component.goToNewHero();
    expect(spy).toHaveBeenCalledWith('new');
  });
});
