import { FavoritosComponent } from './../pages/favoritos/favoritos.component';
import { TestBed } from '@angular/core/testing';


describe('Favoritos', () => {
  let service: FavoritosComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritosComponent);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
