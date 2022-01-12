import { Component, OnInit } from '@angular/core';
import { SwitcherService } from '../../cometa-services/shared/switcher.service';
import { TranslateService } from 'src/app/cometa-services/shared/translate.service';
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
      this.content = this.translateService.translate(COMETA_FOOTER_DATA);
    });
  }
}
