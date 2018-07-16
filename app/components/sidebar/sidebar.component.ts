import { Component, OnInit } from '@angular/core';
import { AppIreneNavConstants, AppHRNavConstants } from '../../app.constants.component';

// interface created for navigation Items
interface InavItems {
  linkText: string;
  imageUrl: string;
  navigateTo: Object;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {

  constructor() { }

  public NavItems: Array<InavItems> = [];
  public selectedItem = 1;
  public isCandidateProfile = true;

  /**
   * @method ngOnInit
   * @description : Method used to initalize the component
   */
  ngOnInit() {
    this.NavItems = this.isCandidateProfile ? AppIreneNavConstants : AppHRNavConstants;
  }

  /**
   * @method setClickedRow
   * @description : Method used to highlight the selected navigation item
   * @param {string} index: index of selected item
   */
  public setClickedRow (index) {
    this.selectedItem = index;
  }

}
