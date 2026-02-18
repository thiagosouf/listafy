import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaDetalhePage } from './lista-detalhe.page';

describe('ListaDetalhePage', () => {
  let component: ListaDetalhePage;
  let fixture: ComponentFixture<ListaDetalhePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDetalhePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
