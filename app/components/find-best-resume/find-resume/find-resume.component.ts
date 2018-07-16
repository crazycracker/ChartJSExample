import { Component, OnInit } from '@angular/core';
import { FindBestResumeService } from '../../../services/find-best-resume-service/find-best-resume.service';
@Component({
  selector: 'app-find-resume',
  templateUrl: './find-resume.component.html',
  styleUrls: ['./find-resume.component.scss']
})
export class FindResumeComponent implements OnInit {

  constructor(private service: FindBestResumeService) { }
  public labels;
  public selectItems;
  public data: any = [];
  ngOnInit() {
    this.service.getLabelDetails().subscribe(response => {
      if (response) {
        this.data = response;
        this.labels = this.data.Labels;
        this.selectItems = this.data.InputValues;
      }
    });
  }

}
