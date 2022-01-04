import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SwitcherService } from '../../cometa-services/shared/switcher.service';

@Component({
  selector: 'app-cometa-header',
  templateUrl: './cometa-header.component.html',
  styleUrls: ['./cometa-header.component.scss']
})
export class CometaHeaderComponent implements OnInit {
  currentTheme: any;
  currentLang: any;

  constructor(private sw: SwitcherService, private router: Router,) { }

  ngOnInit(): void {
    this.applyCurrentLayoutSettings();
  }

  applyCurrentLayoutSettings() {
    this.sw.getCurrentThemeObservable().subscribe((theme: any) => this.currentTheme = theme);
    this.sw.getCurrentLangObservable().subscribe((lang: any) => this.currentLang = lang);
  }

  switchTheme() {
    const invertedTheme = this.invertTheme();
    this.sw.switchCurrentTheme(invertedTheme);
  }

  switchLang(lang: string) {
    this.sw.switchCurrentLang(lang);
  }

  invertTheme() {
    return this.currentTheme == 'dark' ? 'light' : 'dark';
  }

  gotoHome() {
    this.router.navigate(['/home']);
  }
}
