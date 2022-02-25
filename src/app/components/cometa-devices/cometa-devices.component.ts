import { Component, OnInit } from '@angular/core';
import { SwitcherService } from '../../cometa-services/shared/switcher.service';
import { TranslateService } from '../../cometa-services/shared/translate.service';
import { COMETA_DEVICES_DATA } from 'src/app/data/cometa.devices.data';
import { LoggerService } from 'src/app/services/logger.service';


@Component({
  selector: 'app-cometa-devices',
  templateUrl: './cometa-devices.component.html',
  styleUrls: ['./cometa-devices.component.scss']
})
export class CometaDevicesComponent implements OnInit {

  currentTheme: any;
  currentLang: any;

  /* stores the text-type content of the section translated in current language */
  content: any;


  constructor(private switcherService: SwitcherService, private translateService: TranslateService, private logger:LoggerService) { }

  ngOnInit(): void {
    this.applyCurrentLayoutSettings();
    /* this.log.trace("===> ngOninit <=====","DEVICES") */
    /* Switch the alternative string every 2 seconds */
    this.content.noneFossAlternative = "Foo"
    this.content.noneFossAlternativeCnt = 1
    /* this.log.trace("setting timeout to switchFossString","DEVICES") */
    // window.setTimeout(this.switchFossString, 200)
    this.switchFossString()
  }

  /* Recurrently switch the string */
  switchFossString() {

    /*  Array of Alternative that are not Open Source */
    this.content.noneFossAlternativeArray = ["testim.io", "Headspin", "testProject", "TestIO", "perfecto", "Virtuoso"];

    this.logger.trace("===> Switching Foss String to bar","DEVICES")

    /* Just in case have a try catch to not break other stuff */
    try {
      this.logger.trace("This content <===========================","DEVICES")
      this.logger.trace(this.content, "DEVICES")

      this.logger.trace("===> Array length:"+this.content.noneFossAlternativeArray.length+ " Cnt:"+this.content.noneFossAlternativeCnt, "DEVICES")

      // Set the text string to be displayed on the page
      this.content.noneFossAlternativeStringLength = 0;
      this.slowlyTypeStringLetterByLetter();
      
      // Check Cnt to to not run over max of array length
      if (this.content.noneFossAlternativeCnt >= this.content.noneFossAlternativeArray.length-1) {
        // max array length reach ... start over at 0
        this.content.noneFossAlternativeCnt = 0
      } else {
        // still array end not reach ... add +1
        this.content.noneFossAlternativeCnt += 1
      }

      /* recursively calling mySelf to switch the string every two seconds */
      setTimeout(() => {
        this.logger.trace("===> Timeout 1","DEVICES")
        this.switchFossString()
      }, 4000)

    } catch (error) {
      this.logger.error("Caught an Error","DEVICES")
    }
  }

  /* Slowly fills the string letter by letter */
  slowlyTypeStringLetterByLetter() {
    // Add 1 to the written stringLength ... this counts up to the complete stringLength
    this.content.noneFossAlternativeStringLength++
    // get the string in variable foo to shorten code
    const foo = this.content.noneFossAlternativeArray[this.content.noneFossAlternativeCnt]
    // check if foo.length is already reached, if so ... no more writing is needed
    if (this.content.noneFossAlternativeStringLength <= foo.length ) {
      // get the substring of the new text to be displayed
      this.content['noneFossAlternative'] = foo.substring(0,this.content.noneFossAlternativeStringLength)
      // schedule the next letter to be added
      setTimeout( () => {
        this.slowlyTypeStringLetterByLetter()
      }, 100)
    }
  }

  /*applys currently selected language and theme to layout*/
  applyCurrentLayoutSettings() {
    /*get current theme*/
    this.switcherService.getCurrentThemeObservable().subscribe((theme: any) => this.currentTheme = theme);

    /*get current language and translate all the text in that language*/
    this.switcherService.getCurrentLangObservable().subscribe((lang: any) => {
      this.currentLang = lang;
      this.content = this.translateService.translate(COMETA_DEVICES_DATA);
    });
  }
}
