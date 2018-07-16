/**
 * Module for sidebar components
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SidebarComponent } from './sidebar.component';

@NgModule({
  declarations: [
    SidebarComponent,
  ],
  exports: [
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
})
export class SidebarModule { }
