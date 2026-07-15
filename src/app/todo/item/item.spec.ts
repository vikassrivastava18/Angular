import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ItemComponent } from './item';
import { TodoService } from '../todo.service';

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    component.item = { id: 1, todo: 'Test todo', status: 'to' };
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the todo status when the checkbox is toggled', () => {
    const todoService = TestBed.inject(TodoService);
    const updateSpy = spyOn(todoService, 'updateTodo').and.returnValue(of({
      id: 1,
      todo: 'Test todo',
      status: 'co',
    }));

    component.toggleItemStatus({ target: { checked: true } } as unknown as Event);

    expect(updateSpy).toHaveBeenCalledWith('Test todo', 1, 'co');
    expect(component.item.status).toBe('co');
  });

  it('should emit a remove event after a successful delete', () => {
    const todoService = TestBed.inject(TodoService);
    const deleteSpy = spyOn(todoService, 'deleteTodo').and.returnValue(of({
      id: 1,
      todo: 'Test todo',
      status: 'to',
    }));
    const emitSpy = spyOn(component.remove, 'emit');

    component.deleteItem(1);

    expect(deleteSpy).toHaveBeenCalledWith(1);
    expect(emitSpy).toHaveBeenCalledWith(component.item);
  });
});
