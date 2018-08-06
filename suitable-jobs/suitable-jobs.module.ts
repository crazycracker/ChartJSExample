/**
 * Module for suitablejobs components
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SuitableJobsSearchComponent } from './suitable-jobs-search/suitable-jobs-search.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SuitableJobsSearchComponent,
    SearchResultsComponent
  ],
  exports: [
    SuitableJobsSearchComponent,
    SearchResultsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
})
export class SuitableJobsModule { }
