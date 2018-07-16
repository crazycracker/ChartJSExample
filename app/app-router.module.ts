import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { AppRouteConstants } from './app.constants.component';
import { ChatbotComponent } from './pages/chatbot/chatbot.component';
import { FindBestResumeComponent } from './pages/find-best-resume/find-best-resume.component';

const Routes: Routes = [
  { path: '', redirectTo: AppRouteConstants.CHATBOT, pathMatch: 'full' },
  { path: AppRouteConstants.CHATBOT, component: ChatbotComponent },
  { path: AppRouteConstants.FIND_BEST_RESUME, component: FindBestResumeComponent },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(Routes)],
  providers: [],
})
export class AppRoutingModule {
}
