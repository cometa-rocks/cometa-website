import { Injectable } from '@angular/core';
import { SwitcherService } from '../../cometa-services/shared/switcher.service';

// import logger service
import { LoggerService } from 'src/app/services/logger.service';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  private currentLang: any;


  constructor(private sw: SwitcherService, private log:LoggerService) {
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
    this.log.msg("1", "Just translated", "TRANSLATE")
    return Object.values(currentLangContent)[0];
  }
}
