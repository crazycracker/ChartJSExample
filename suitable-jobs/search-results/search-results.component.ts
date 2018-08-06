import { Component, OnInit } from '@angular/core';
import { SuitableJobsService } from '../../../services/suitable-jobs-service/suitable-jobs.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-irene-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  public data: any = [];
  public labels;
  public selectJobs;
  public getLinks;
  public imageRef;
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
        this.selectJobs = this.data[0].SuitableJobs;
        this.getLinks = this.data[0].Links[0];
      }
    });
  }

  toggleImage(value){
    this.imageRef = document.getElementById(value);
    if(this.imageRef.getAttribute('src') == 'assets/icons/screened-profiles-icon.png')
      this.imageRef.setAttribute('src','assets/icons/favorite-icon@2x.png');
    else
    this.imageRef.setAttribute('src','assets/icons/screened-profiles-icon.png');
  }
}
