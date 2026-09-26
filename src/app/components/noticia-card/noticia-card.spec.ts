import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoticiaCardComponent } from './noticia-card.component';

describe('NoticiaCard', () => {
  let component: NoticiaCardComponent;
  let fixture: ComponentFixture<NoticiaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoticiaCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NoticiaCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
