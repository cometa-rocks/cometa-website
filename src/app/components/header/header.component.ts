import { Component, OnInit } from '@angular/core';
import { SwitcherService } from '../../cometa-services/shared/switcher.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentTheme: any;
  currentLang: any;

  constructor(private sw: SwitcherService) { }

  ngOnInit(): void {
    this.applyCurrentLayoutSettings();
  }

  applyCurrentLayoutSettings() {
    this.sw.getCurrentThemeObservable().subscribe( (theme: any) => this.currentTheme = theme );
    this.sw.getCurrentLangObservable().subscribe( (lang: any) => this.currentLang = lang );
  }

  switchTheme() {
    const invertedTheme = this.invertTheme();
    this.sw.switchCurrentTheme(invertedTheme);
  }

  switchLang(lang: string) {
     this.sw.switchCurrentLang(lang);
  }

  invertTheme() {
    return this.currentTheme == 'dark' ? 'light': 'dark';  
  }
}
