import { Component, OnInit } from '@angular/core';
import { SwitcherService } from '../../cometa-services/shared/switcher.service';
import { TranslateService } from 'src/app/cometa-services/shared/translate.service';
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

  constructor(private switcherService: SwitcherService, private translateService: TranslateService) { }

  ngOnInit(): void {
    this.applyCurrentLayoutSettings();
  }


  /*applys currently selected language and theme to layout*/
  applyCurrentLayoutSettings() {
    /*get current theme*/
    this.switcherService.getCurrentThemeObservable().subscribe((theme: any) => this.currentTheme = theme);

    /*get current language and translate all the text in that language*/
    this.switcherService.getCurrentLangObservable().subscribe((lang: any) => {
      this.currentLang = lang;
      this.content = this.translateService.translate(COMETA_FEATURES_DATA);
    });
  }
}
