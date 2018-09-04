import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {Store} from '@ngrx/store';

import {EducationData, ExperienceData, Profile, ProfileData, SkillsData, ISkills} from '../../../models/user-profile/userProfile';
import {IAppState} from '../../../app.state';
import {IUserState} from '../../../state/user.state';
import {ModalComponent} from '../../modal/modal.component';
import {monthsConstants} from '../../../app.constants.component';
import {ViewProfileService} from '../../../services/view-profile-service/view-profile.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {
  public data: any = [];
  public labels;
  public isEditEducation: Boolean = false;
  public isEditExperience: Boolean = false;
  public isEditContact: Boolean = false;
  public isEditSkills: Boolean = false;
  public selectItems;
  public years = [];
  public formData;
  public months = monthsConstants;
  public experienceData: ExperienceData;
  public educationData: EducationData;
  public skillsData: SkillsData;
  public isCandidateProfile;
  public profileArray: ProfileData;
  public profileData: Profile;
  public profileImage: string;

  @ViewChild('updateProfileImage') profileImageModal: ModalComponent;
  @ViewChild('saveSection') saveSectionModal: ModalComponent;

  constructor(
    private service: ViewProfileService,
    private element: ElementRef,
    private store: Store<IAppState>,
  ) {
    this.service.getLabelDetails().subscribe(response => {
      if (response) {
        this.data = response;
        this.labels = this.data[0].Labels[0];
        this.selectItems = this.data[0].InputValues[0];
        this.profileData = this.data[0].ProfileData;
        this.educationData = new EducationData(this.profileData.educationalDetails);
        this.experienceData = new ExperienceData(this.profileData.experienceDetails);
        this.skillsData = new SkillsData(this.profileData.skillDetails);
        this.profileImage = this.data[0].Labels[0].profileimagePath;
      }
    });
  }

  /**
   * @method {ngOnIt}
   * @description: The method gets the data from the Json
   */
  ngOnInit(): void {
    this.setYears();
    this.store.select('user').subscribe((userState: IUserState) => {
      if (userState.user && userState.user['isCandidate']) {
        this.isCandidateProfile = userState.user['isCandidate'];
      }
    });

    this.service.fetchProfileDetails().subscribe(res => {
      this.profileArray = JSON.parse(res['body'].profileData);
      this.profileData = this.profileArray[0];
      if (this.profileData.educationalDetails.length > 0 ) {
        this.educationData.educationalDetails = this.profileData.educationalDetails;
      }
      if (this.profileData.experienceDetails.length > 0) {
        this.experienceData.experienceDetails = this.profileData.experienceDetails;
      }
      if (this.profileData.skillDetails.length > 0 ) {
        this.skillsData.skills = this.profileData.skillDetails;
      }
    });

    // TODO : Will remove this call once actual data available
/*    this.service.getDummyProfileDetails().subscribe((response) => {
      this.profileArray = JSON.parse(response['body'].profileData);
      this.profileData = this.profileArray[0];
      this.educationData.educationalDetails = this.profileData.educationalDetails;
      this.experienceData.experienceDetails = this.profileData.experienceDetails;
      this.skillsData.skills = this.profileData.skillDetails;
      this.profileData.skillDetails = this.setDefaultSkillIcon(this.profileData.skillDetails);
    });*/
  }

  /**
   *@method {enableEdit}
   *@description: The method enables section for edit
   *@param { section}:this specifies which data we are collecting from the form
   */
  public enableEdit(section): void {
    this.checkUnsavedSection();
    this.enableDisableSection(section);
  }

  public checkUnsavedSection(): void {
    if (
      this.isEditEducation ||
      this.isEditExperience ||
      this.isEditContact ||
      this.isEditSkills
    ) {
      this.saveSectionModal.openModal();
      this.isEditEducation = false;
    this.isEditExperience = false;
    this.isEditContact = false;
    this.isEditSkills = false;
    }
  }

  /**
   *@method {saveData}
   *@description: The method posts the data collected from the form
   *@param { section}:this specifies which data we are collecting from the form
   */
  public saveData(section): void {
    this.saveSectionModal.closeModal();
    this.enableDisableSection(section);
    this.profileData.educationalDetails = this.educationData.educationalDetails;
    this.profileData.experienceDetails = this.experienceData.experienceDetails;
    this.profileData.skillDetails = this.skillsData.skills;
    this.formData = this.profileData;
  }

  /**
   * @method addEducationalDetails
   *@description: The method posts the educationalDetails collected from education field in the form to the server
   */
  public addEducationalDetails(): void {
    this.educationData['educationalDetails'].push({
      fromYearEducation: '',
      fromMonthEducation: '',
      toYearEducation: '',
      toMonthEducation: '',
      instituteEducation: '',
    });
  }

  /**
   * @method addExperienceDetails
   *@description:This method posts the experienceDetails collected from the experience field in form to the server
   */
  public addExperienceDetails(): void {
    this.experienceData['experienceDetails'].push({
      fromYearExperience: '',
      fromMonthExperience: '',
      toYearExperience: '',
      toMonthExperience: '',
      companyExperience: '',
      designationExperience: '',
      companyName: '',
    });
  }

  /**
   * @method addSkills
   *@description:This method posts the skills data collected from the skills field in form to the server
   */
  public addSkills(): void {
    this.skillsData['skills'].push({
      skillIcon: '',
      skillLabel: this.selectItems.skillDetails[0].value,
    });
  }

  /**
   * @method cancel
   * @description the method cancels the save
   */
  public cancel(section): void {
    this.enableDisableSection(section);
  }

  /**
   * @method saveModal
   * @description the method passes the closeModal command to the viewChild
   */
  public saveModal(): void {
    this.saveSectionModal.closeModal();
  }

  /**
   * @method openModal
   * @description the method passes the openModal command to the viewChild
   */
  public openModal(): void {
    this.profileImageModal.openModal();
  }

  /**
   * @method closeModal
   * @description the method passes the Close Modal command to the viewChild
   */
  public closeModal(): void {
    this.profileImageModal.closeModal();
  }

  /**
   * @method editPicture
   * @description the method passes the openModal command to the viewChild
   */
  public editPicture(): void {
    this.profileImageModal.openModal();

  }

  /**
   * @method removePicture
   * @description the method removes the profile picture of user
   */
  public removePicture(): void {
    const image = this.element.nativeElement.querySelector('.change-image');
    image.src = 'assets/images/profile@2x.png';
  }

  /**
   * @method removeAddedRow
   * @description the method removes the added row for required details
   */
  public removeAddedRow(section, index): void {
    if (section === 'educationalDetails') {
      this.educationData[section].splice(index, 1);
    } else if (section === 'experienceDetails') {
      this.experienceData[section].splice(index, 1);
    } else {
      this.skillsData[section].splice(index, 1);
    }
  }

  /**
   * @method numberOnly
   * @description the method check is argument is number or not
   */
  public numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  /**
   * @method enableDisableSection
   * @description the method enables or disables section
   */
  private enableDisableSection(sectionName) {
    if (sectionName === 'education') {
      this.isEditEducation = !this.isEditEducation;
    }
    if (sectionName === 'experience') {
      this.isEditExperience = !this.isEditExperience;
    }
    if (sectionName === 'contact') {
      this.isEditContact = !this.isEditContact;
    }
    if (sectionName === 'skills') {
      this.isEditSkills = !this.isEditSkills;
    }
  }

  /**
   * @method setYears
   * @description the method sets year for profile
   */
  private setYears(): void {
    const year = new Date().getFullYear();
    const range = [];
    range.push(year);
    for (let i = 1; i < 47; i++) {
      range.push(year - i);
    }
    this.years = range;
  }

  /**
   * @method updateSkillIcons
   * @param skills : Array<ISkills>
   * @description the method sets default image for skills
   */
  public setSkillIcon(skill) {
    this.selectItems.skillDetails.filter((element) => {
      if (element.value === skill) {
        this.profileData.skillDetails.filter((data) => {
          if (data.skillLabel === skill) {
            data.skillIcon = element.image;
          }
        });
      }
    });
  }
}
