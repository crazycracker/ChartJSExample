export interface IStateCity {
    state: Array<string>;
    city: Array<string>;
}

export interface ISkills {
    value: string;
    proficiency: string;
}

export interface ISearchHistoryFormData {
    username?: string;
    created_date?: string;
    jobid?: string;
    hardskills?: Array<ISkills>;
    softskills?: Array<ISkills>;
    industryWeightage?: string;
    industryType?: string;
    subType?: string;
    candidateDetailsWeightage?: string;
    qualifications?: string;
    lastExperienceInMedical?: string;
    profilesRequired?: string;
    employmentTypeWeightage?: string;
    employmentType?: string;
    city?: Array<string>,
    state?: Array<string>,
    priorityOfTheJob?: string;
    priorityofthejobWeightage?: string;
    diversity?: string;
}

export class SearchHistoryFormData implements ISearchHistoryFormData {
    constructor(
        public username: string,
        public created_date: string,
        public jobid: string,
        public hardskills: Array<ISkills>,
        public softskills: Array<ISkills>,
        public industryWeightage: string,
        public industryType: string,
        public subType: string,
        public candidateDetailsWeightage: string,
        public qualifications: string,
        public lastExperienceInMedical: string,
        public profilesRequired: string,
        public employmentTypeWeightage: string,
        public employmentType: string,
        public city: Array<string>,
        public state: Array<string>,
        public priorityOfTheJob: string,
        public priorityofthejobWeightage: string,
        public diversity: string
    ) { }
}
