import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  //redirects cometa.rocks/cometa-introduction to https://drive.google.com/file/d/1Y4lQ5aSC5Dbfn8q5Q4DLy0eEfsGWAVkm/view?usp=sharing
  {
    path: 'cometa-introduction',
    loadChildren: () => new Promise(() => { if (window.location.href.match(/cometa-introduction/)) window.location.href = 'https://drive.google.com/file/d/1Y4lQ5aSC5Dbfn8q5Q4DLy0eEfsGWAVkm/view?usp=sharing'; })
  },

  //redirects cometa.rocks/cometa-getting-started to https://drive.google.com/file/d/1jWA5QeMW1MJ0rmrP60oC5YzpCSRcZa9w/view?usp=sharing
  {
    path: 'cometa-getting-started',
    loadChildren: () => new Promise(() => { if (window.location.href.match(/cometa-getting-started/)) window.location.href = 'https://drive.google.com/file/d/1jWA5QeMW1MJ0rmrP60oC5YzpCSRcZa9w/view?usp=sharing'; })
  },

  //redirects cometa.rocks/cometa-user-scenarios to https://drive.google.com/file/d/1jlxj-776_oTUyRHrxtFgZJUXmX3yInxn/view?usp=sharing
  {
    path: 'cometa-user-scenarios',
    loadChildren: () => new Promise(() => { if (window.location.href.match(/cometa-user-scenarios/)) window.location.href = 'https://drive.google.com/file/d/1jlxj-776_oTUyRHrxtFgZJUXmX3yInxn/view?usp=sharing'; })
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
