import { NoticiasComponent } from './../pages/noticias/noticias.component';
import { TestBed } from '@angular/core/testing';


describe('Noticias', () => {
  let service: NoticiasComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoticiasComponent);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
