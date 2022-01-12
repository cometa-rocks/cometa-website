import { Component, OnInit } from '@angular/core';
import { SwitcherService } from '../../cometa-services/shared/switcher.service';
import { TranslateService } from 'src/app/cometa-services/shared/translate.service';
import { COMETA_LOGOTIPS_DATA } from 'src/app/data/cometa.logotips.data';

@Component({
  selector: 'app-cometa-logotips',
  templateUrl: './cometa-logotips.component.html',
  styleUrls: ['./cometa-logotips.component.scss']
})
export class CometaLogotipsComponent implements OnInit {
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
    this.switcherService.getCurrentThemeObservable().subscribe((theme: any) => this.currentTheme = theme);
    this.switcherService.getCurrentLangObservable().subscribe((lang: any) => {
      this.currentLang = lang;
      this.content = this.translateService.translate(COMETA_LOGOTIPS_DATA);
    });
  }
}
