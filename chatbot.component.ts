import { Profile } from './../../models/user-profile/userProfile';
import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, combineLatest } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ChatService } from '../../services/chatbot-service/chat.service';
import { SpeechRecognitionService } from '../../services/chatbot-service/speech-recognition.service';
import { ChatConstants } from '../../app.constants.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { Store, select } from '@ngrx/store';
import { Chat } from '../../models/chat-messages/chat';
import { ChatState } from '../../state/chat.state';
import * as ChatActions from '../../actions/chat.actions';
import { IUserState } from '../../state/user.state';
import { FetchProfile, RemoveProfile } from '../../actions/profile.actions';
import { ProfileData } from '../../models/user-profile/userProfile';
import { ViewProfileService } from '../../services/view-profile-service/view-profile.service';
import { UtilService } from '../../services/util/util.service';
import { IAppState } from '../../app.state';
import { $ } from 'protractor';
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
  public fileDetails: File[];
  public fileType: string;
  public botChat: any;
  public isProfileDisable: Boolean = false;
  public data: any = [];
  public buttontext;
  chats;
  ChatState: any;
  candidateStatus = 'Pre-Application';
  candidateStatusIndex: number;
  uploadMessage: any;
  isSpeech = false;
  userName = '';
  constructor(
    private chatService: ChatService,
    private viewProfileService: ViewProfileService,
    private utilService: UtilService,
    private http: HttpClient,
    private speechRecognitionService: SpeechRecognitionService,
    private store: Store<ChatState>,
    private profilestore: Store<IAppState>
  ) {
  }

  /**
   * @method ngOnInit
   * @description : Getting the Constants from chatbot.constants Component and chat from chatState
   */
  ngOnInit(): void {
    speechSynthesis.cancel();
    this.chatService.getChatDetails().subscribe(res => {
      this.profilestore.select('profile').subscribe((profileState: ProfileData) => {
        let profileData: Profile;
        if (!this.utilService.isObjectEmpty(profileState)) {
          profileData = profileState[0];
        }
        this.isProfileDisable = (!profileData) ? true : false;
      }
      );
      this.chatbotMessages = res;
      this.candidateStatusIndex = this.chatbotMessages.candidateStatus.indexOf(this.candidateStatus);
      const candidateData = localStorage.getItem('candidateData');
      candidateData === null ? this.fetchCandidateStatus() : this.setCandidateStatus(candidateData);
    });
    this.store.select('chat').subscribe((chatState: Chat[]) => {
      this.chatMessages = chatState;
      if (this.chatMessages.length > 0) {
        this.nochat = false;
      }
    });
    this.store.select('user').subscribe((userState: IUserState) => {
      if (userState.user && userState.user[0].loginData) {
        this.userName = userState.user[0].loginData.first_name;
      }
    });
    this.chatService.getChatDetails().subscribe(response => {
      if (response) {
        this.data = response;
        this.buttontext = this.data.Buttontext;
      }
    });
  }

  /**
   * @method fetchCandidateStatus
   * @description: this method initates the API call for candidate details
   */
  private fetchCandidateStatus() {
    this.chatService.fetchCandidateDetails().subscribe(res => {
      if (res['body'] !== undefined && res['body'] !== null) {
        const data = res['body'].candidateLatestJobData;
        this.setCandidateStatus(data);
        localStorage.setItem('candidateData', data);
      }
    }, (error) => {
      const jsonData = this.chatService.modifyJSONData(error);
      this.setCandidateStatus(jsonData);
      localStorage.setItem('candidateData', jsonData);
    });
  }

  /**
   * @method setCandidateStatus
   * @description: this method parse the data sets the candidate status
   * @param: string JsonData
   */
  private setCandidateStatus(jsonData) {
    const CandidateDataObj = JSON.parse(jsonData);
    if (CandidateDataObj) {
      this.candidateStatus = CandidateDataObj.Candidate_Stage;
      this.candidateStatusIndex = this.chatbotMessages.candidateStatus.indexOf(this.candidateStatus);
    }
  }

  /**
   * @method chatConversation
   * @description: To post the reply from the user
   */
  public chatConversation(): void {
    if (this.userChat !== '' && !this.isAttachment) {
      this.addChatMessages(this.userChat, true, false);
      this.chatService.postChatDetails(this.userChat).subscribe(res => {
        this.botChat = res['body'].message;
        this.addChatMessages(this.botChat, false, '');
      });
    }
    this.userChat = '';
  }


  /**
   * @method chatConversation1
   * @description: To post the reply from the user
   */
  public chatConversation1(message): void {
    if (!this.isAttachment) {
      this.addChatMessages(message, true, false);
      this.chatService.postChatDetails(message).subscribe(res => {
        this.botChat = res['body'].message;
        this.addChatMessages(this.botChat, false, '');
        document.getElementById(message).remove();
      });
      this.chatService.getChatDetails().subscribe(response => {
        if (response) {
          this.data = response;
          this.buttontext = this.data.Buttontext;
        }
      });
    }
    this.userChat = '';
  }
  /**
   * @method sendAttachment
   * @description: To capture the attachment details in chantmessages
   */
  public sendAttachment(): void {
    if (this.fileName !== '' && this.isAttachment) {
      this.errorFlag = false;
      this.errorFlagGreater = false;
      this.chatService.upload(this.fileDetails).subscribe(res => {
        this.uploadMessage = res['body'].message;
        this.addChatMessages(this.uploadMessage, false, '');
        this.store.dispatch(RemoveProfile());
        this.viewProfileService.fetchProfileDetails().subscribe(response => {
          const profileArray: ProfileData = JSON.parse(response['body'].profileData);
          if (!this.utilService.isObjectEmpty(profileArray)) {
            this.store.dispatch(FetchProfile(profileArray[0]));
          }
        }, error => {
          console.log(error);
        });
      });
      this.addChatMessages(this.fileName, true, this.fileType);
      const docDeatils = {
        name: this.fileName,
        date: this.completeDate
      };
      localStorage.setItem('docDetails', JSON.stringify(docDeatils));
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
      if (!userMessage) {
        const botVoice = new SpeechSynthesisUtterance(userChat);
        botVoice.text = userChat;
        const voiceArr = speechSynthesis.getVoices();
        botVoice.voice = voiceArr[1];
        botVoice.lang = 'en-GB';
        botVoice.onend = function (e) {
          console.log('Finished in ' + e.timeStamp + ' seconds.');
        };
        speechSynthesis.speak(botVoice);
        //  this.isSpeech = false;
      }
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
      this.fileName = '';
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
    if (files.length > 0) {
      this.isAttachment = true;
      this.errorFlag = false;
      this.errorFlagGreater = false;
      this.fileName = files[0].name;
      this.fileDetails = files;
      this.attachmentType();
      this.fileSizeCheck(this.fileDetails);
    }
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
    this.speechRecognitionService.recordVoice()
      .subscribe(
        (recordedObject) => {
          this.userChat = recordedObject;
          this.isSpeech = true;
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
