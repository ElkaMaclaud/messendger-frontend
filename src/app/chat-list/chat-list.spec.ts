import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

import { ChatList } from './chat-list';
import { environment } from '../../environment/environment';

describe('ChatList', () => {
  let component: ChatList;
  let fixture: ComponentFixture<ChatList>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatList],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(ChatList);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // ngOnInit запрашивает список чатов - отвечаем пустым списком
    httpMock.expectOne(`${environment.apiUrl}/chats`).flush([]);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
