import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChatService } from '../../services/chatbot-service/chat.service';
import { SpeechRecognitionService } from '../../services/chatbot-service/speech-recognition.service';
import { ChatConstants } from '../../app.constants.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Chat } from '../../models/chat-messages/chat';
import { ChatState } from '../../state/chat.state';
import * as ChatActions from '../../actions/chat.actions';

@Component({
  selector: 'app-chatbot-page',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})

export class ChatbotComponent implements OnInit, OnDestroy {
  @ViewChild('scrollMe') chatScroll: ElementRef;
  @ViewChild('attachementError') attachmentErrorModal: ModalComponent;

  public scrolltop: number = null;
  public userChat: any = '';
  public chatMessages: any = [];
  public nochat: Boolean = true;
  public fileName: String = '';
  public date: any;
  public hours: number;
  public minutes: any;
  public ampm: string;
  public strTime: any;
  public completeDate: any;
  public fileSize: any;
  public height: any = 280;
  public marginLeft: any = 'auto';
  public errorFlag: Boolean = false;
  public chatbotMessages: any;
  public recognition: any;
  public final_transcript: any;
  public errorFlagGreater: Boolean = false;
  public isAttachment: Boolean = false;
  public uploadMessage: any;
  public fileDetails: File[];
  public fileType: string;
  public botChat: any;
  chats;
  ChatState: any;
  candidateStatus = 'Assessment';
  candidateStatusIndex: number;

  constructor(private chatService: ChatService, private http: HttpClient,
    private speechRecognitionService: SpeechRecognitionService,
    private store: Store<ChatState>) { }

  /**
   * @method ngOnInit
   * @description : Getting the Constants from chatbot.constants Component and chat from chatState
   */
  ngOnInit(): void {
    this.chatService.getChatDetails().subscribe(res => {
      this.chatbotMessages = res;
      this.candidateStatusIndex = this.chatbotMessages.candidateStatus.indexOf(this.candidateStatus);
    });
    this.store.select('chat').subscribe((chatState: Chat[]) => {
        this.chatMessages = chatState;
        if (this.chatMessages.length > 0) {
          this.nochat = false;
        }
    });
  }

  /**
   * @method chatConversation
   * @description: To post the reply from the user
   */
  public chatConversation(): void {
    if (this.userChat !== '') {
        this.addChatMessages(this.userChat, true , false);
            this.chatService.postChatDetails(this.userChat).subscribe(res => {
              this.botChat = res['body'].message;
              this.addChatMessages(this.botChat, false, '');
            });
      }
    this.userChat = '';
  }

  /**
   * @method sendAttachment
   * @description: To capture the attachment details in chantmessages
   */
  public sendAttachment(): void {
    if (this.fileName !== '') {
      this.errorFlag = false;
      this.errorFlagGreater = false;
        this.upload();
        this.addChatMessages(this.fileName, true , this.fileType);
  }
  this.fileName = '';
  this.isAttachment = false;
}

/**
   * @method setChatbotImage
   * @description: To change the chatbot image dynamically
*/
public setChatbotImage(): void {
    this.marginLeft = 5;
    if (this.height > 100) {
      this.height = this.height - 30;
    }
  }

/**
   * @method addChatMessages
   * @description: To push the chat messages in varriable
   * @param: userChat, userMessage, attachmnetType
*/
public addChatMessages(userChat, userMessage, attachmnetType): void {
    this.errorFlag = false;
    this.errorFlagGreater = false;
    if (userChat !== '') {
      this.nochat = false;
      this.getCurrentTime();
      this.setChatbotImage();
      this.chatMessages.push({
        'text': userChat,
        'self': userMessage,
        'timeStamp': this.strTime,
        'attachment': attachmnetType,
        'attachmentSize': this.fileSize,
        'date': this.completeDate
      });
     }
  }

  /**
   * @method attachmentType
   * @description: To Check the attachment type
   */
public attachmentType(): void {
    const copyMessage = this.fileName;
    const fileFormat: any = copyMessage.split('.')[copyMessage.split('.').length - 1];
    if (fileFormat === ChatConstants.FILE_TYPE_PDF ||
        fileFormat === ChatConstants.FILE_TYPE_DOC) {
      this.fileType = fileFormat;
    } else {
      this.attachmentErrorModal.openModal();
      this.isAttachment = false;
      this.fileName  = '';
    }
  }

   /**
   * @method closeModal
   * @description: To close the file format error Model
   */
public closeModal(): void {
  this.attachmentErrorModal.closeModal();
}

/**
  * @method getCurrentTime
  * @description: To get the current time from the system
*/
public getCurrentTime(): void {
  this.date = new Date();
  this.hours = this.date.getHours();
  this.minutes = this.date.getMinutes();
  this.ampm = this.hours >= 12 ? ChatConstants.PM : ChatConstants.AM;
  this.hours = this.hours % 12;
  this.hours = this.hours ? this.hours : 12; // the hour '0' should be '12'
  this.minutes = this.minutes < 10 ? '0' + this.minutes : this.minutes;
  this.strTime = this.hours + ':' + this.minutes + ' ' + this.ampm;
  this.completeDate = this.date.getFullYear() + '-'
  + this.date.getMonth() + '-'
   + this.date.getDate();
}

/**
 * @description: Method to actually send file to server via
  * http protocol.
  * @param: files {File}, as selected by user
  */
public uploadFileSet(files: File[]): void {
  if (files.length > 0 ) {
    this.isAttachment = true;
    this.errorFlag = false;
    this.errorFlagGreater = false;
    this.fileName  = files[0].name;
    this.fileDetails = files;
    this.attachmentType();
    this.fileSizeCheck(this.fileDetails);
  }
}

 /**
   * @method upload
   * @description: To upload the attached file(sending the data to chatService)
*/
public upload(): void {
  const formData: FormData = new FormData();
  Array.from(this.fileDetails).forEach(f => formData.append('file', f));
  formData.append('userName',  'Venkat');
  formData.append('candidateID',  'CAND-1233');
  const sessionParam =  JSON.stringify({ 'contextId':  '',  'SenderId':  'Venkat',  'SenderName':  'Venkat' });
  formData.append('sessionParam',  sessionParam);
  this.chatService.uploadResume(formData)
  .subscribe(res => {
   this.uploadMessage = res['body'].message;
   this.addChatMessages(this.uploadMessage , false , '');
  });
}

/**
  * @method fileSizeCheck
  * @description: To Check the fileSize of the uploaded file
  * @param: files {File}, as selected by user
*/
fileSizeCheck(files): void {
  this.fileSize = 0;
  this.fileSize = (files[0].size / 1024).toFixed(2);
  if (parseInt(this.fileSize, 10) < 2) {
    this.errorFlag = true;
    this.isAttachment = false;
    this.fileName = '';
  }
  if (parseInt(this.fileSize, 10) > 1024) {
    this.errorFlagGreater = true;
    this.isAttachment = false;
    this.fileName = '';
  }
}

/**
  * @method removeAttachment
  * @description: To remove the attachment
*/
public removeAttachment(): void {
  this.fileName = '';
  this.isAttachment = false;
}

/**
  * @descrition: start Capturing speech
*/
public startCapture(): void {
  const msg = new SpeechSynthesisUtterance(this.userChat);
  msg.lang = 'en-GB';
  window.speechSynthesis.speak(msg);
  this.speechRecognitionService.recordVoice()
    .subscribe(
      (recordedObject) => {
        this.userChat = recordedObject;
      },
      (err) => {
        if (err.error === 'no speech') {
          this.startCapture();
        }
      }
    );
}


  /**
   * @description: End capture event
  */
  public endCapture(): void {
    this.speechRecognitionService.destroySpeechObject();
  }

  /**
   * @description: angular lifecycle hook
   */
  public ngOnDestroy(): void {
    this.speechRecognitionService.destroySpeechObject();
  }
}
