import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SwitcherService {

  private currentThemeSubject: BehaviorSubject<any>;
  private currentLangSubject: BehaviorSubject<any>
  private currentTheme: Observable<any>;
  private currentLang: Observable<any>

  constructor() { 
    if( !this.getCurrentTheme() ) { this.setCurrentTheme('dark'); }
    if( !this.getCurrentLang() ) { this.setCurrentLang('en'); }

    this.currentThemeSubject = new BehaviorSubject<any>(this.getCurrentTheme());
    this.currentTheme = this.currentThemeSubject.asObservable();

    this.currentLangSubject = new BehaviorSubject<any>(this.getCurrentLang());
    this.currentLang = this.currentLangSubject.asObservable();
  }
  
  switchCurrentTheme(theme: string) {
    this.setCurrentTheme(theme);
    this.currentThemeSubject.next(theme);
  }

  switchCurrentLang(lang: string) {
    this.setCurrentLang(lang);
    this.currentLangSubject.next(lang);
  }

  getCurrentThemeValue() {
    return this.currentThemeSubject.value;
  }

  getCurrentThemeObservable() {
    return this.currentTheme;
  }

  getCurrentLangValue() {
    return this.currentLangSubject.value;
  }

  getCurrentLangObservable() {
    return this.currentLang;
  }

  getCurrentTheme() {
    return localStorage.getItem('currentTheme');
  }

  setCurrentTheme(theme: string) {
    localStorage.setItem('currentTheme', theme);
  }

  getCurrentLang() {
    return localStorage.getItem('currentLang');
  }

  setCurrentLang(lang: string) {
    localStorage.setItem('currentLang', lang);
  }

}
