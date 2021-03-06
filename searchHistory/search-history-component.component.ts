import { Component, OnInit } from '@angular/core';
import { PagerService } from '../../services/Pagination-service/pager.service';
import { SearchHistoryService } from '../../services/search-history/search-history.service';
import { expandCollapse } from '../../utils/animations/carousel.component.animations';
import { ISearchHistoryFormData } from './../../models/search-history/search-history';
import { RecruiterFormData, ExperienceFormData } from '../../models/user-profile/userProfile';

@Component({
    selector: 'app-search-history-component',
    templateUrl: './search-history-component.component.html',
    styleUrls: ['./search-history-component.component.scss'],
    animations: [expandCollapse]
})
export class SearchHistoryComponentComponent implements OnInit {

    public searchHistorydata: any;
    public searchHistoryLabel: any;
    public searchHistoryValues: any;
    private allItems: ISearchHistoryFormData[];
    public pager: any = {};
    public pagedItems: any[];

    constructor(private searchHistory: SearchHistoryService,
        private pagerService: PagerService) { }

    /**
    * @method ngOnInit
    * @description : Getting the data from SearchHistory service
    */
    ngOnInit(): void {
        this.searchHistory.getSearchHistoryDetails().subscribe(res => {
            this.searchHistorydata = res;
            this.searchHistoryLabel = this.searchHistorydata.Labels;
        });
        this.allItems = [];
        this.searchHistory.postSearchHistoryDetails().subscribe((res => {
            this.searchHistoryValues = JSON.parse(res['body'].searchList);
            this.searchHistoryValues.forEach(element => {
                const educational_organizational_details: any = (element.educational_organizational_details != '' ? JSON.parse(element.educational_organizational_details) : '');
                const languagesKnown: any = (element.languages_known != '' ? JSON.parse(element.languages_known) : '');
                const cities: any = (element.city != '' ? JSON.parse(element.city) : '');
                const states: any = (element.state != '' ? JSON.parse(element.state) : '');
                const hardSkills: any = (element.hardskills != '' ? JSON.parse(element.hardskills) : '');
                const softSkills: any = (element.softskills != '' ? JSON.parse(element.softskills) : '');
                const educationalDetails: RecruiterFormData[] = (educational_organizational_details.educationalDetails != undefined ? [educational_organizational_details.educationalDetails] : []);
                const experienceDetails: ExperienceFormData[] = (educational_organizational_details.experienceDetails != undefined ? [educational_organizational_details.experienceDetails] : []);
                const searchHistoryData: ISearchHistoryFormData = {
                    username: element.user_name,
                    created_date: element.CREATED_DATE,
                    city: cities,
                    state: states,
                    diversity: element.diversity,
                    employmentType: element.employment_type,
                    employmentTypeWeightage: element.employment_type_weightage,
                    hardskills: hardSkills,
                    softskills: softSkills,
                    industryType: element.industry_type,
                    industryWeightage: element.industryweightage,
                    subType: element.industry_subtype,
                    jobid: element.jobreqid,
                    lastExperienceInMedical: element.last_experience_inmedical,
                    profilesRequired: element.number_of_profiles_required,
                    priorityOfTheJob: element.priority_of_job,
                    priorityofthejobWeightage: element.priority_of_job_weightage,
                    qualifications: element.qualification,
                    candidateDetailsWeightage: element.candidate_details_weightage,
                    educational_details: educationalDetails,
                    experience_details: experienceDetails,
                    languages_known: languagesKnown
                };
                this.allItems.push(searchHistoryData);
            });
            console.log(this.allItems);
            this.setPage(1);
        }));
    }

    /**
    * @method setPage
    * @description :Method to get the search history data with pagination
    * @param {number} page: no of page
    */
    setPage(page: number) {
        // get pager object from service
        this.pager = this.pagerService.getPager(this.allItems.length, page);

        // get current page of items
        this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
        console.log(this.pagedItems);
    }
}