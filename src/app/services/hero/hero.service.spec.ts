import { TestBed } from '@angular/core/testing';
import { HeroService } from './hero.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import {
  CREATE_HERO_FORM_MOCK,
  CREATE_HERO_REQUEST_MOCK,
  DELETE_HERO_REQUEST_MOCK,
  DELETE_HERO_RESPONSE_MOCK,
  EDIT_HERO_RESPONSE_MOCK,
  HEROES_MOCK,
  HERO_DATA_EDIT,
  HERO_DATA_NEW,
} from '../mocks';
import { API_CONTEXT } from '../constants';

describe('Hero Service', () => {
  let service: HeroService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroService],
    });
  });

  beforeEach(() => {
    service = TestBed.inject(HeroService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should getHeroes', () => {
    service.getHeroes().subscribe((response) => {
      expect(response).toEqual(HEROES_MOCK);
    });

    const request: TestRequest = httpMock.expectOne({
      method: 'GET',
      url: `${API_CONTEXT}/heroes`,
    });
    request.flush(HEROES_MOCK);
  });

  it('should deleteHero', () => {
    const id = DELETE_HERO_REQUEST_MOCK.id;
    const heroList = DELETE_HERO_REQUEST_MOCK.heroList;
    const fullHeroList = DELETE_HERO_REQUEST_MOCK.fullHeroList;

    service.deleteHero(id, heroList, fullHeroList).subscribe((response) => {
      expect(response).toEqual(DELETE_HERO_RESPONSE_MOCK);
    });

    const request: TestRequest = httpMock.expectOne({
      method: 'DELETE',
      url: `${API_CONTEXT}/hero/${id}`,
    });
    request.flush(DELETE_HERO_RESPONSE_MOCK);
  });

  it('should editHero', () => {
    const body = CREATE_HERO_REQUEST_MOCK.body;
    const id = CREATE_HERO_REQUEST_MOCK.id;

    service.editHero(body, id).subscribe((response) => {
      expect(response).toEqual(EDIT_HERO_RESPONSE_MOCK);
    });

    const request: TestRequest = httpMock.expectOne({
      method: 'PUT',
      url: `${API_CONTEXT}/hero`,
    });
    request.flush(EDIT_HERO_RESPONSE_MOCK);
  });

  it('should createHero', () => {
    service.createHero(CREATE_HERO_FORM_MOCK).subscribe((response) => {
      expect(response).toEqual(EDIT_HERO_RESPONSE_MOCK);
    });

    const request: TestRequest = httpMock.expectOne({
      method: 'POST',
      url: `${API_CONTEXT}/hero`,
    });
    request.flush(EDIT_HERO_RESPONSE_MOCK);
  });

  it('should editHeroList with origin New', () => {
    const heroList = service.editHeroList(HERO_DATA_NEW);
    expect(heroList.length).toBeGreaterThan(0);
  });

  it('should editHeroList with Origin Edit', () => {
    const heroList = service.editHeroList(HERO_DATA_EDIT);
    expect(heroList.length).toBeGreaterThan(0);
  });

  it('should setHeroData', () => {
    service.setHeroData(HERO_DATA_NEW);
    service.heroData$.subscribe((result) => {
      expect(result).toEqual(HERO_DATA_NEW);
    });
  });
});
