import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CometaLogotipsComponent } from './components/cometa-logotips/cometa-logotips.component';
import { CometaHomeComponent } from './components/cometa-home/cometa-home.component';
import { CometaSpeechComponent } from './components/cometa-speech/cometa-speech.component';
import { CometaSupportComponent } from './components/cometa-support/cometa-support.component';

const routes: Routes = [
  /*inner component navigations  */

  /* default url is cometa.rocks/home, any url that is not defined in this file will redirect to cometa.rocks/home*/
  { path: 'home', component: CometaHomeComponent },

  /* redirects to cometa.rocks/logotips */
  { path: 'logotips', component: CometaLogotipsComponent },

  /* redirects to cometa.rocks/speech*/
  { path: 'speech', component: CometaSpeechComponent },

  /* redirects to cometa.rocks/support ... where users can see support options */
  { path: 'support', component: CometaSupportComponent },

  /* redirects to cometa.rocks/speech/<name>, where <name> must be ralf or david. ex: cometa.rocks/speech/ralf
     if any other option is passed, it will be considered as ralf
     ex: cometa.rocks/speech/xyz will behave like it is cometa.rocks/speech/ralf*/
  { path: 'speech/:speakername', component: CometaSpeechComponent },

  /* redirects cometa.rocks/ to cometa.rocks/home*/
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  /*redirects cometa.rocks/introduction to https://drive.google.com/file/d/1Y4lQ5aSC5Dbfn8q5Q4DLy0eEfsGWAVkm/view?usp=sharing*/
  {
    path: 'introduction',
    loadChildren: () => new Promise(() => { if (window.location.href.match(/introduction/)) window.location.href = 'https://drive.google.com/file/d/1Y4lQ5aSC5Dbfn8q5Q4DLy0eEfsGWAVkm/view?usp=sharing'; })
  },

  /*redirects cometa.rocks/getting-started to https://drive.google.com/file/d/1jWA5QeMW1MJ0rmrP60oC5YzpCSRcZa9w/view?usp=sharing*/
  {
    path: 'getting-started',
    loadChildren: () => new Promise(() => { if (window.location.href.match(/getting-started/)) window.location.href = 'https://drive.google.com/file/d/1jWA5QeMW1MJ0rmrP60oC5YzpCSRcZa9w/view?usp=sharing'; })
  },

  /*redirects cometa.rocks/user-scenarios to https://drive.google.com/file/d/1jlxj-776_oTUyRHrxtFgZJUXmX3yInxn/view?usp=sharing*/
  {
    path: 'user-scenarios',
    loadChildren: () => new Promise(() => { if (window.location.href.match(/user-scenarios/)) window.location.href = 'https://drive.google.com/file/d/1jlxj-776_oTUyRHrxtFgZJUXmX3yInxn/view?usp=sharing'; })
  },

  /*redirects cometa.rocks/early-access-form to https://drive.google.com/file/d/1jlxj-776_oTUyRHrxtFgZJUXmX3yInxn/view?usp=sharing*/
  {
    path: 'early-access-form',
    loadChildren: () => new Promise(() => { if (window.location.href.match(/early-access-form/)) window.location.href = 'https://ocagzojn33k.typeform.com/to/G2VgVbbB'; })
  },

  /* redirects any cometa.rocks/inexsistent to cometa.rocks/home*/
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
