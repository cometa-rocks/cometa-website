import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// import logger service
import { LoggerService } from 'src/app/services/logger.service';

@Injectable({
  providedIn: 'root'
})

export class SwitcherService {

  private currentThemeSubject: BehaviorSubject<any>;
  private currentLangSubject: BehaviorSubject<any>
  private currentTheme: Observable<any>;
  private currentLang: Observable<any>

  constructor(private log:LoggerService) {
    /* set up localstorage, if it is the first time user enters the page, or user cleared browser cache*/
    if (!this.getCurrentTheme()) { this.setCurrentTheme('dark'); }
    if (!this.getCurrentLang()) { this.setCurrentLang('en'); }

    /* set up behavior subjects, for theme and language.
    Inicial value is set from localstorage using this.getCurrentTheme() and this.getCurrentLang()
    Behavior subjects allows us to export its current value as observable
    which is needed in order to render layout according to theme and language values */
    this.currentThemeSubject = new BehaviorSubject<any>(this.getCurrentTheme());
    this.currentLangSubject = new BehaviorSubject<any>(this.getCurrentLang());


    /* returns current theme and language values as observable
       subscribe from anywhere to these variables in order to set up live data stream
       this will allow to automatically apply changes, depending on theme and language values*/
    this.currentTheme = this.currentThemeSubject.asObservable();
    this.currentLang = this.currentLangSubject.asObservable();
  }

  /* actualize theme value('dark'/'light') in localstorage and set it as next and current value of theme behavior subject */
  switchCurrentTheme(theme: string) {
    this.log.msg("1", "switched theme to:"+theme, "SWITCHER")
    this.setCurrentTheme(theme);
    this.currentThemeSubject.next(theme);
  }

  /* actualize language value('en'/'ca') in localstorage and set it as next and current value of language behavior subject */
  switchCurrentLang(lang: string) {
    this.log.msg("1", "switched lang to: "+lang, "SWITCHER")
    this.setCurrentLang(lang);
    this.currentLangSubject.next(lang);
  }

  /* return current theme value as live data stream */
  getCurrentThemeObservable() {
    return this.currentTheme;
  }

  /* return current language value as live data stream */
  getCurrentLangObservable() {
    return this.currentLang;
  }


  /* localstorange functions -----------------------------------------*/
  /*get current theme (dark/light)*/
  getCurrentTheme() {
    return localStorage.getItem('currentTheme');
  }

  /*set current theme (light/dark)*/
  setCurrentTheme(theme: string) {
    localStorage.setItem('currentTheme', theme);
  }

  /*get current language (en/ca)*/
  getCurrentLang() {
    return localStorage.getItem('currentLang');
  }

  /*set current language (en/ca)*/
  setCurrentLang(lang: string) {
    localStorage.setItem('currentLang', lang);
  }

}
