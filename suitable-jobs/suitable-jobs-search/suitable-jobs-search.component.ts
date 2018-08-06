import { IKeyValue } from './../../find-best-resume/find-resume/find-resume.component';
import { Component, OnInit } from '@angular/core';
import { SuitableJobsService } from '../../../services/suitable-jobs-service/suitable-jobs.service';
import 'rxjs';

export interface ILocation {
  key: string;
  value: string;
}

export interface IAllKeyWords {
  allKeyWords: boolean;
}

export interface IAnyKeyWords {
  anyKeyWords: boolean;
}

export interface ISuitableFormsData {
  searchText: string;
  allKeyWords: boolean;
  anyKeyWords: boolean;
  locations: Array<ILocation>;
  experiences: string;
}

@Component({
  selector: 'app-irene-suitable-jobs-search',
  templateUrl: './suitable-jobs-search.component.html',
  styleUrls: ['./suitable-jobs-search.component.scss']
})

export class SuitableJobsSearchComponent implements OnInit {
  public data: any = [];
  public labels;
  public selectItems;
  public expanded = false;
  public labelText = '';
  public selectedOption:string = 'default';
  public buttonHtml = '<button type="submit" class="search-icon"><img src="assets/icons/search-icon.png"></button>';
  public formData: ISuitableFormsData = {
    searchText: '',
    allKeyWords: false,
    anyKeyWords: false,
    locations:[
      {
        key:'',
        value:''
      }
    ],
    experiences:'',
  };
  /**
  * @constructor injects the dependent services
  * @description : The constructor initialises the class variables with the dependencies injected into the class
  * @param {service} SuitableJobsService
 */
  constructor(private service: SuitableJobsService) { }

  /**
   * @method ngOnInit
   * @description : Method used to initalize the component
   */
  ngOnInit() {
    this.service.getLabelDetails().subscribe(response => {
      if (response) {
        this.data = response;
        this.labels = this.data[0].Labels[0];
        this.selectItems = this.data[0].InputValues[0];
      }
    });
  }
  public showCheckboxes() {
    const checkboxes = document.getElementById('checkboxes');
    
    if (!this.expanded) {
      checkboxes.style.display = 'block';
      this.expanded = true;
    } else {
      checkboxes.style.display = 'none';
      this.expanded = false;
    }
  }
  public updateLabel(e, key, value) {
    const str = value;
    if (this.labelText.includes(str)) {
      this.labelText = this.labelText.replace(str + ',', '');
      this.labelText = this.labelText.replace(str, '');
    } else {
      if (this.labelText.length === 0) {
        this.labelText = str;
      } else {
        this.labelText += (',' + str);
      }
      this.formData.locations.push({
          key: key,
          value: value
        });
    }
    const option = document.getElementById('locationDropdownValue');
    if (this.labelText.length === 0) {
      option.textContent = 'Select an option';
    } else {
      option.textContent = this.labelText;
    }
  }
  public formDetails() {
    console.log(this.formData);
    this.service
      .postFormDetails(this.formData)
      .subscribe(data => console.log(data));
  }
}


