import { Injectable } from '@angular/core';
import { SwitcherService } from '../../cometa-services/shared/switcher.service';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  private currentLang: any;


  constructor(private sw: SwitcherService) {
    //get current language value
    this.sw.getCurrentLangObservable().subscribe((lang: any) => { this.currentLang = lang; });
  }

  /* returns data, translated in current language
     recieved data has to be in javascript object format
     check any file if folder app/data/ to see data format example
  */
  translate(data: Object) {
    const currentLangEntry = Object.entries(data).filter(([key]) => key === this.currentLang);
    const currentLangContent = Object.fromEntries(currentLangEntry);
    return Object.values(currentLangContent)[0];
  }
}
