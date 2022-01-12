import { Component, OnInit } from '@angular/core';
import { SwitcherService } from '../../cometa-services/shared/switcher.service';
import { TranslateService } from '../../cometa-services/shared/translate.service';
import { COMETA_ARCHITECTURE_DATA } from 'src/app/data/cometa.architecture.data';

@Component({
  selector: 'app-cometa-architecture',
  templateUrl: './cometa-architecture.component.html',
  styleUrls: ['./cometa-architecture.component.scss']
})
export class CometaArchitectureComponent implements OnInit {

  currentTheme: any;
  currentLang: any;

  /*stores the text-type content of the section*/
  content: any;

  constructor(private switcherService: SwitcherService, private translateService: TranslateService) { }

  ngOnInit(): void {
    /*applys current local storage setting for language and theme*/
    this.applyCurrentLayoutSettings();
  }

  /*applys currently selected language and theme to layout*/
  applyCurrentLayoutSettings() {
    /*get current theme*/
    this.switcherService.getCurrentThemeObservable().subscribe((theme: any) => this.currentTheme = theme);

    /*get current language and translate all the text in that language*/
    this.switcherService.getCurrentLangObservable().subscribe((lang: any) => {
      this.currentLang = lang;
      this.content = this.translateService.translate(COMETA_ARCHITECTURE_DATA);
    });
  }

}
