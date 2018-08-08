import { IKeyValue } from './../../find-best-resume/find-resume/find-resume.component';
import { Component, OnInit } from '@angular/core';
import { SuitableJobsService } from '../../../services/suitable-jobs-service/suitable-jobs.service';
import 'rxjs';

export interface ILocation {
  location: IKeyValue;
}

export interface IExperience {
  experience: IKeyValue;
}

export interface ISuitableFormsData {
  searchText: string;
  locations: Array<ILocation>;
  experience: string;
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
  public formData: ISuitableFormsData = {
    searchText: '',
    locations: [],
    experience: '',
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
    const checkboxes = document.getElementsByClassName('checkboxes')[0] as HTMLElement;
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
      if (this.labelText.includes(str + ',')) {
        this.labelText = this.labelText.replace(str + ',', '');
      } else if (this.labelText.includes(',' + str)) {
        this.labelText = this.labelText.replace(',' + str, '');
      } else {
        this.labelText = this.labelText.replace(str, '');
      }
      const index = this.formData.locations.findIndex(function(item) {
        return item.location.key === key;
      });
      this.formData.locations.splice(index, 1);
    } else {
      if (this.labelText.length === 0) {
        this.labelText = str;
      } else {
        this.labelText += (',' + str);
      }
      this.formData.locations.push({
        location: {
          key: key,
          value: value
        }
      });
    }
    console.log(this.formData.locations);
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


