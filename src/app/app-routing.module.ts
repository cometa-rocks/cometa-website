import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CometaLogotipsComponent } from './components/cometa-logotips/cometa-logotips.component';
import { CometaHomeComponent } from './components/cometa-home/cometa-home.component';

const routes: Routes = [
  //inner component navigations  
  { path: 'home', component: CometaHomeComponent },
  { path: 'logotips', component: CometaLogotipsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  //redirects cometa.rocks/introduction to https://drive.google.com/file/d/1Y4lQ5aSC5Dbfn8q5Q4DLy0eEfsGWAVkm/view?usp=sharing
  {
    path: 'introduction',
    loadChildren: () => new Promise(() => { if (window.location.href.match(/introduction/)) window.location.href = 'https://drive.google.com/file/d/1Y4lQ5aSC5Dbfn8q5Q4DLy0eEfsGWAVkm/view?usp=sharing'; })
  },

  //redirects cometa.rocks/getting-started to https://drive.google.com/file/d/1jWA5QeMW1MJ0rmrP60oC5YzpCSRcZa9w/view?usp=sharing
  {
    path: 'getting-started',
    loadChildren: () => new Promise(() => { if (window.location.href.match(/getting-started/)) window.location.href = 'https://drive.google.com/file/d/1jWA5QeMW1MJ0rmrP60oC5YzpCSRcZa9w/view?usp=sharing'; })
  },

  //redirects cometa.rocks/user-scenarios to https://drive.google.com/file/d/1jlxj-776_oTUyRHrxtFgZJUXmX3yInxn/view?usp=sharing
  {
    path: 'user-scenarios',
    loadChildren: () => new Promise(() => { if (window.location.href.match(/user-scenarios/)) window.location.href = 'https://drive.google.com/file/d/1jlxj-776_oTUyRHrxtFgZJUXmX3yInxn/view?usp=sharing'; })
  },

  //redirects cometa.rocks/early-access-form to https://drive.google.com/file/d/1jlxj-776_oTUyRHrxtFgZJUXmX3yInxn/view?usp=sharing
  {
    path: 'early-access-form',
    loadChildren: () => new Promise(() => { if (window.location.href.match(/early-access-form/)) window.location.href = 'https://ocagzojn33k.typeform.com/to/G2VgVbbB'; })
  },

  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
