import { Component, OnInit } from '@angular/core';
import { SwitcherService } from '../../cometa-services/shared/switcher.service';
import { COMETA_FEATURES_DATA } from 'src/app/data/cometa.features.data';

@Component({
  selector: 'app-cometa-features',
  templateUrl: './cometa-features.component.html',
  styleUrls: ['./cometa-features.component.scss']
})
export class CometaFeaturesComponent implements OnInit {
    
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
    const currentLangEntry =  Object.entries(COMETA_FEATURES_DATA).filter(([key]) => key === this.currentLang);
    const currentLangContent  = Object.fromEntries(currentLangEntry);
    return Object.values(currentLangContent)[0];
  }

}
