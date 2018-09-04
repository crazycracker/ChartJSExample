import { EducationData, ExperienceData, SkillsData, ProfileData } from './../../../models/user-profile/userProfile';
import { Observable, of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed, inject } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { StoreModule } from "@ngrx/store";

import { ViewProfileService } from './../../../services/view-profile-service/view-profile.service';
import { APIService } from "../../../services/api-service/api.service";
import { Http2Service } from "../../../services/http2/http2.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { userReducer } from "../../../reducers/user.reducer";
import { ViewProfileComponent } from "./view-profile.component";

const mockReponse = {
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
    "lastName": "",
    "country": "",
    "skillDetails": [
      {
        "skillIcon": "",
        "skillLabel": ""
      }
    ],
    "gender": "",
    "disability": "",
    "educationalDetails": [
      {
        "fromYearEducation": "",
        "fromMonthEducation": "",
        "toYearEducation": "",
        "toMonthEducation": "",
        "instituteEducation": ""
      }
    ],
    "postalCode": "",
    "research": "",
    "veteranStatus": "",
    "yearsOfExperience": "",
    "personalEmailId": "",
    "careerSummary": "",
    "state": "",
    "hispanic_Latino": "",
    "address": "",
    "race": "",
    "languages": "",
    "volunteer_Community_Experience": "",
    "personalAttributes": "",
    "certifications": "",
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
}

class MockService {
  public getLabelDetails(): Observable<{}> {
    return of(mockReponse);
  }

  public fetchProfileDetails(): Observable<{}> {
    return of(mockReponse);
  }
}
describe("ViewProfileComponent", () => {
  let component: ViewProfileComponent;
  let fixture: ComponentFixture<ViewProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewProfileComponent],
      imports: [
        FormsModule,
        HttpClientTestingModule,
        HttpModule,
        StoreModule.forRoot(userReducer)
      ],
      providers: [APIService, Http2Service],
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

  it("should enable edit", () => {
    component.enableEdit(mockReponse);
    expect(component.checkUnsavedSection()).toBeTruthy();
    expect(component['enableDisableSection'](mockReponse)).toBeTruthy();
  });

  it("should save data", () => {
    component.saveData(mockReponse);
    expect(component['enableDisableSection'](mockReponse)).toBeTruthy();
    // expect(component.profileData.educationalDetails).toBe(component.educationData.educationalDetails);
    // expect(component.profileData.experienceDetails).toBe(component.experienceData.experienceDetails);
    // expect(component.profileData.skillDetails).toBe(component.skillsData.skills);
    // expect(component.formData).toBe(component.profileData);
  });

  it("should add educational Details", () => {
    //expect(component.educationData['educationalDetails'].push({})).toBeTruthy();
  });

  it("should cancel", () => {
    component.cancel(mockReponse);
    expect(component['enableDisableSection'](mockReponse)).toBeTruthy();
  });

  it("should remove picture", () => {
    expect(component.removePicture()).toBeTruthy();
  });

  it("set skill icon", () => {
    expect(component.setSkillIcon('')).toBeTruthy();
  })
});