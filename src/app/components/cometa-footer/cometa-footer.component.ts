import { Component, OnInit } from '@angular/core';
import { SwitcherService } from '../../cometa-services/shared/switcher.service';
import { COMETA_FOOTER_DATA } from 'src/app/data/cometa.footer.data';

@Component({
  selector: 'app-cometa-footer',
  templateUrl: './cometa-footer.component.html',
  styleUrls: ['./cometa-footer.component.scss']
})
export class CometaFooterComponent implements OnInit {
 
  currentTheme: any;
  currentLang: any;

  /*stores the text-type content of the section*/
  content: any; 

  constructor(private sw: SwitcherService) { }

  ngOnInit(): void {
    this.applyCurrentLayoutSettings();
  }

  /*applys currently selected language and theme to layout*/
  applyCurrentLayoutSettings() {
    this.sw.getCurrentThemeObservable().subscribe( (theme: any) => this.currentTheme = theme );
    this.sw.getCurrentLangObservable().subscribe( (lang: any) => {
      this.currentLang = lang;
      this.content = this.getCurrentLangContent();
    });
  }

  /*filters testimonials by currentLang('en'/'ca') value and returns an object which contains all the section text-type content for translated in currently selected language*/
  getCurrentLangContent() {
    const currentLangEntry =  Object.entries(COMETA_FOOTER_DATA).filter(([key]) => key === this.currentLang);
    const currentLangContent  = Object.fromEntries(currentLangEntry);
    return Object.values(currentLangContent)[0];
  }
}
