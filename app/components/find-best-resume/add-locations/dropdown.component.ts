import { FindBestResumeService } from '../../../services/find-best-resume-service/find-best-resume.service';
import { Component } from '@angular/core';
@Component({
    selector: 'app-locations-dropdown',
    templateUrl: 'dropdown.component.html',
    styleUrls: ['dropdown.component.scss']
})
export class LocationDropDownComponent {

    constructor(private service: FindBestResumeService) { }
    public selectItems;
    public data: any = [];
    ngOnInit() {
        this.service.getLabelDetails().subscribe(response => {
            if (response) {
                this.data = response;
                this.selectItems = this.data.InputValues;
            }
        });
    }
}