import { Component, OnInit } from '@angular/core';


// Contact Us is used here for the button to contact
import { CometaContactUsComponent } from '../cometa-contact-us/cometa-contact-us.component';

// Used to open the contact-us component
import { MatDialog } from '@angular/material/dialog';

// Global Services for Transaltion and ThemeSwitching
import { SwitcherService } from '../../cometa-services/shared/switcher.service';
import { TranslateService } from 'src/app/cometa-services/shared/translate.service';

@Component({
  selector: 'app-cometa-support',
  templateUrl: './cometa-support.component.html',
  styleUrls: ['./cometa-support.component.scss']
})
export class CometaSupportComponent implements OnInit {

  // Variables for global Theme and Language
  currentTheme: any;
  currentLang: any;

  constructor(private dialog: MatDialog, private switcherService: SwitcherService, private translateService: TranslateService) { }

  ngOnInit(): void {
    // global theme and language options
    this.applyCurrentLayoutSettings()
  }

  /**
   * open_dialog_contact_form()
   * 
   * Is a button on the support page that opens the dial to contact form for the users
   * 
   * Changelog:
   * 20202-01-17 RRO entry
   * 
   */
  open_dialog_contact_form() {
    this.dialog.open(CometaContactUsComponent)
  }

  /*applys currently selected language and theme to layout*/
  applyCurrentLayoutSettings() {
    /*get current theme*/
    this.switcherService.getCurrentThemeObservable().subscribe((theme: any) => this.currentTheme = theme);

    /*get current language and translate all the text in that language*/
    this.switcherService.getCurrentLangObservable().subscribe((lang: any) => {
      this.currentLang = lang;
/*       this.content = this.translateService.translate(COMETA_FOOTER_DATA);
 */    });
  }

}
