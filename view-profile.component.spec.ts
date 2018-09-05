import { EducationData, ExperienceData, SkillsData, ProfileData } from './../../../models/user-profile/userProfile';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed, inject } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { StoreModule, Store } from "@ngrx/store";

import { ModalComponent } from '../../modal/modal.component';
import { ViewProfileService } from './../../../services/view-profile-service/view-profile.service';
import { APIService } from "../../../services/api-service/api.service";
import { Http2Service } from "../../../services/http2/http2.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { userReducer } from "../../../reducers/user.reducer";
import { ViewProfileComponent } from "./view-profile.component";
import { IAppState } from '../../../app.state';

const mockResponse = [{
  "Labels": [
    {
      "candidateNameLabel": "David James",
      "appliedForLabel": "APPLIED FOR",
      "positionLabel": "Senior Visual Merchandiser - Regional Level",
      "contactLabel": "CONTACT",
      "editLabel": "EDIT",
      "fromLabel": "FROM:",
      "toLabel": "TO:",
      "saveLabel": "SAVE",
      "cancelLabel": "CANCEL",
      "educationLabel": "EDUCATION",
      "experienceLabel": "EXPERIENCE",
      "skillsLabel": "SKILLS",
      "profileimagePath": "../assets/images/editProfileImage.png"
    }
  ],
  "InputValues": [
    {
      "skillDetails": [
        {
          "key": "Select Skill",
          "value": "Select Skill",
          "image": ""
        },
        {
          "key": "Photography",
          "value": "Photography",
          "image": "../assets/icons/photography-icon@2x.png"
        },
        {
          "key": "Fashion Design",
          "value": "Fashion Design",
          "image": "../assets/icons/fashion-icon@2x.png"
        },
        {
          "key": "Store Management",
          "value": "Store Management",
          "image": "../assets/icons/store@2x.png"
        },
        {
          "key": "Quality Assurance",
          "value": "Quality Assurance",
          "image": "../assets/icons/quality-icon@2x.png"
        },
        {
          "key": "Medical Coding",
          "value": "Medical Coding",
          "image": "../assets/icons/coding-icon@2x.png"
        },
        {
          "key": "Sales and Marketing",
          "value": "Sales and Marketing",
          "image": "../assets/icons/sales-icon@2x.png"
        },
        {
          "key": "Clinical Research",
          "value": "Clinical Research",
          "image": "../assets/icons/research-icon@2x.png"
        },
        {
          "key": "Online Marketing",
          "value": "Online Marketing",
          "image": "../assets/icons/online-icon@2x.png"
        },
        {
          "key": "Research & Development",
          "value": "Research & Development",
          "image": "../assets/icons/lab-icon@2x.png"
        }
      ]
    }
  ],
  "ProfileData": {
    "lastName": "aaaa",
    "country": "bbbb",
    "skillDetails": [
      {
        "skillIcon": "",
        "skillLabel": "ccc"
      }
    ],
    "gender": "dddd",
    "disability": "eeee",
    "educationalDetails": [
      {
        "fromYearEducation": "2018",
        "fromMonthEducation": "march",
        "toYearEducation": "2020",
        "toMonthEducation": "march",
        "instituteEducation": "iiit"
      }
    ],
    "postalCode": "500003",
    "research": "artificial intelligence",
    "veteranStatus": "none",
    "yearsOfExperience": "4",
    "personalEmailId": "xyz@gmail.com",
    "careerSummary": "none",
    "state": "Andaman nicobar",
    "hispanic_Latino": "esso",
    "address": "kfc restaurant",
    "race": "lets start",
    "languages": "all",
    "volunteer_Community_Experience": "",
    "personalAttributes": "",
    "certifications": "java",
    "firstName": "",
    "phoneNumber": "",
    "aspiration": "",
    "experienceDetails": [
      {
        "fromYearExperience": "",
        "fromMonthExperience": "",
        "toYearExperience": "",
        "toMonthExperience": "",
        "companyExperience": "",
        "designationExperience": "",
        "companyName": ""
      }
    ],
    "maritalStatus": "",
    "hobby": ""
  }
}];

class MockService {
  public getLabelDetails(): Observable<{}> {
    return of(mockResponse);
  }

  public fetchProfileDetails(): Observable<{}> {
    const postResponse = {
      "body": {
        "ProfileData": mockResponse[0].ProfileData
      }
    };
    return of(postResponse);
  }
}
// class TestStore<T> {
//   private state: BehaviorSubject<T> = new BehaviorSubject(undefined);

//   setState(data: T) {
//     this.state.next(data);
//   }

//   select(selector?: any): Observable<T> {
//     return this.state.asObservable();
//   }

//   dispatch(action: any) { }
// }
describe("ViewProfileComponent", () => {
  let component: ViewProfileComponent;
  let fixture: ComponentFixture<ViewProfileComponent>;
  // let store: TestStore<IAppState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewProfileComponent],
      imports: [
        FormsModule,
        HttpClientTestingModule,
        HttpModule,
        StoreModule.forRoot(userReducer)
      ],
      providers: [
        { provide: ViewProfileService, useClass: MockService },
        APIService,
        Http2Service,
        // { provide: Store, useClass: TestStore }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should get the label data", () => {
    expect(component.data).toEqual(mockResponse);
    expect(component.profileData).toEqual(component.data[0].ProfileData);
    expect(component.selectItems).toEqual(component.data[0].InputValues);
    expect(component.educationData).toEqual(component.data[0].ProfileData[0].educationalDetails);
    expect(component.experienceData).toEqual(component.data[0].ProfileData[0].experienceDetails);
    expect(component.skillsData).toEqual(component.data[0].ProfileData[0].skillDetails);
    expect(component.profileImage).toEqual(component.data[0].Labels[0].profileimagePath);
    expect(component.experienceData).toEqual(new ExperienceData(component.data[0].profileData[0].experienceDetails));
    expect(component.skillsData).toEqual(new SkillsData(component.data[0].profileData[0].skillDetails));
    expect(component.profileImage).toEqual(component.data[0].Labels[0].profileimagePath);
  });

  // it('should set candidate profile', inject([Store], (testStore: TestStore<IAppState>) => {
  //   store = testStore;
  //   store.setState({
  //     user: {
  //       loggedIn: true,
  //       lastActive: 0,
  //       user: {
  //         username: "",
  //         userToken: "",
  //         tokenExpiration: 0,
  //         userRefreshToken: "",
  //         userProfile: null,
  //         loginType: "",
  //         memberTier: "",
  //         memberId: "",
  //         isHRUser: false
  //       }
  //     }
  //   });
  // }));

  it("fetch user Profile Details", () => {
    expect(component.profileArray).toEqual(mockResponse[0].ProfileData[0]);
    expect(component.profileData).toEqual(mockResponse[0].ProfileData[0].profileArray[0]);
    expect(component.educationData.educationalDetails).toEqual(mockResponse[0].ProfileData[0].educationalDetails);
    expect(component.experienceData.experienceDetails).toEqual(mockResponse[0].ProfileData[0].experienceDetails);
    expect(component.skillsData.skills).toEqual(mockResponse[0].ProfileData[0].skillDetails);
  });

  it("should enable edit", () => {
    component.enableEdit(mockResponse);
    expect(component.checkUnsavedSection()).toHaveBeenCalled();
    expect(component['enableDisableSection'](mockResponse)).toHaveBeenCalled();
  });

  it('should check unsaved section', () => {
    component.isEditEducation = true;
    component.checkUnsavedSection();
    component.isEditEducation = false;
    expect(component.saveSectionModal.openModal()).toHaveBeenCalled();
  });

  it("should save data", () => {
    component.saveData(mockResponse);
    expect(component.saveSectionModal.openModal()).toHaveBeenCalled();
    expect(component.profileData.educationalDetails).toEqual(component.educationData.educationalDetails);
    expect(component.profileData.experienceDetails).toEqual(component.experienceData.experienceDetails);
    expect(component.profileData.skillDetails).toEqual(component.skillsData.skills);
    expect(component.formData).toEqual(component.profileData);
  });

  it("should add educational Details", () => {
    const previous = component.educationData.educationalDetails.length;
    component.addEducationalDetails();
    expect(component.educationData.educationalDetails.length).toEqual(previous + 1);
  });

  it("should add experience Details", () => {
    const previous = component.experienceData.experienceDetails.length;
    component.addExperienceDetails();
    expect(component.experienceData.experienceDetails.length).toEqual(previous + 1);
  });

  it("should add skill Details", () => {
    const previous = component.skillsData.skills.length;
    component.addSkills();
    expect(component.skillsData.skills.length).toEqual(previous + 1);
  });

  it('should save model', () => {
    const saveSectionModal: ModalComponent = fixture.componentInstance.saveSectionModal;
    component.saveSectionModal = saveSectionModal;
    component.saveModal();
    expect(saveSectionModal).toBeDefined();
  });

  it('should open modal', () => {
    const profileImageModal: ModalComponent = fixture.componentInstance.profileImageModal;
    component.profileImageModal = profileImageModal;
    component.openModal();
    expect(profileImageModal).toBeDefined();
  });

  // it('should close modal', () => {
  //   let spy = spyOn(component, "closeModal");
  //   component.closeModal();
  //   expect(spy).toHaveBeenCalled();
  // });

  // it('should edit picture', () => {
  //   const profileImageModal: ModalComponent = fixture.componentInstance.profileImageModal;
  //   component.profileImageModal = profileImageModal;
  //   component.editPicture();
  //   expect(component.profileImageModal).toBeDefined();
  // });

  // it('should trigger keyboard event', async(() => {
  //   fixture.detectChanges();
  //   let spy = spyOn(component, "numberOnly");
  //   const event = new KeyboardEvent("keypress", {
  //     "code": "34",
  //   });
  //   fixture.nativeElement.dispatchEvent(event);

  //   component.numberOnly(event);
  //   expect(spy).toHaveBeenCalled();
  // }));

  it("should cancel", () => {
    const previousValue: any = component.isEditEducation;
    component.cancel('education');
    expect(component.isEditEducation).toEqual(!previousValue);
    const previousValue1 = component.isEditExperience;
    component.cancel('experience');
    expect(component.isEditEducation).toEqual(!previousValue1);
    const previousValue2 = component.isEditContact;
    component.cancel('contact');
    expect(component.isEditEducation).toEqual(!previousValue2);
    const previousValue3 = component.isEditSkills;
    component.cancel('skills');
    expect(component.isEditEducation).toEqual(!previousValue3);
  });

  // it("should remove picture", () => {
  //   component.removePicture();
  // });

  // it("set skill icon", () => {
  //   component.setSkillIcon('');
  //   expect(component.profileData.skillDetails[0].skillIcon).toBeDefined(true);
  // });

  // it("remove added row", () => {
  //   component.removeAddedRow('educationalDetails', -1);
  //   expect(component.educationData['educationalDetails'].length).toBeGreaterThan(0);
  // });
});
