import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ChatbotComponent } from './chatbot.component';
import { ChatService } from '../../services/chatbot-service/chat.service';
import { APIService } from '../../services/api-service/api.service';
import { Http2Service } from '../../services/http2/http2.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ChatConstants } from '../../app.constants.component';
import { ModalModule } from '../../components/modal/modal.module';
import { StoreModule } from '@ngrx/store';
import { chatReducer } from '../../reducers/chat.reducer';
import { ModalComponent } from '../../components/modal/modal.component';
import { Observable, of } from 'rxjs';

const mockResponse = {
  body: {
    'message': 'Hi, how can i help you?'
  }
};

class MockService {
  public postChatDetails(userChat): Observable<{}> {
    return of(mockResponse);
  }
  public uploadResume(userChat): Observable<{}> {
    return of(mockResponse);
  }
}
describe('ChatbotComponent', () => {
  let component: ChatbotComponent;
  let fixture: ComponentFixture<ChatbotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChatbotComponent],
      imports: [
        FormsModule,
        HttpClientTestingModule,
        StoreModule.forRoot(
          { chat: chatReducer },
        ),
        ModalModule,
      ],
      providers: [
        ChatService,
        APIService,
        Http2Service,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatbotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check attachment type is pdf', () => {
    component.fileName = 'txt.pdf';
    component.attachmentType();
    expect(component.fileType).toBe('pdf');
  });
  it('should check if file size is less than 2 KB', () => {
    const files = [{
      name: 'abc.pdf',
      size: 100
    }];
    component.fileSizeCheck(files);
    expect(component.errorFlag).toBe(true);
    expect(component.isAttachment).toBe(false);
    expect(component.fileName).toBe('');
  });
  it('should check if file size is more than 400 KB', () => {
    const files = [{
      name: 'abc.pdf',
      size: 100000000
    }];
    component.fileSizeCheck(files);
    expect(component.errorFlagGreater).toBe(true);
    expect(component.isAttachment).toBe(false);
    expect(component.fileName).toBe('');
  });
  it('should decrease the size of chatbot image by 30px', () => {
    component.height = 150;
    component.setChatbotImage();
    expect(component.height).toBe(120);
  });
  it('check if file got attached or not', () => {
    // const files = [{
    //   name: 'abc.pdf',
    //   length: 2
    // }];
    const  modifiedDate  =  new  Date();
    const  files  =  new  File([3555],  'test-file.jpg', { lastModified:  modifiedDate,  type:  'image/jpeg' });
    component.uploadFileSet(files);
    expect(component.errorFlag).toBe(false);
    expect(component.isAttachment).toBe(true);
    expect(component.errorFlagGreater).toBe(false);
  });
  it('file name sould be empty and attachment type should be false', () => {
    component.removeAttachment();
    expect(component.isAttachment).toBe(false);
    expect(component.fileName).toBe('');
  });
  it('should post the chat message and get the response', inject(
    [ChatService],
    (chatService: MockService) => {
      const userChat = 'Hi';
      spyOn(chatService, 'postChatDetails').and.callThrough();
      component.chatConversation();
      chatService.postChatDetails(userChat).subscribe(res => {
        expect(component.botChat).toEqual(mockResponse);
      });
    }
  ));
});
