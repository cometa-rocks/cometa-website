import { Component, ElementRef, Renderer2, OnInit } from '@angular/core';
import { SwitcherService } from '../../cometa-services/shared/switcher.service';
import { COMETA_PORTFOLIO_DATA } from 'src/app/data/cometa.portfolio.data';

@Component({
  selector: 'app-cometa-portfolio',
  templateUrl: './cometa-portfolio.component.html',
  styleUrls: ['./cometa-portfolio.component.scss'],
  host: {
    '(document:keydown)': 'handleKeyboardEvents($event)'
  }
})
export class CometaPortfolioComponent implements OnInit {

  img_magnifier_isActive: boolean = false;
  currentTheme: any;
  currentLang: any;

  /*stores the text-type content of the section*/
  content: any; 


  constructor(private sw: SwitcherService, private elRef: ElementRef, private renderer: Renderer2) { }  

  ngOnInit(): void {
    this.applyCurrentLayoutSettings();
  }

  /* Track the ESC to close images preview in big */
  handleKeyboardEvents(event: KeyboardEvent) {
    if (event.code == 'Escape') {
      this.closeMagnifier();
    }
  }

  /*applys currently selected language and theme to layout*/
  applyCurrentLayoutSettings() {
    this.sw.getCurrentThemeObservable().subscribe( (theme: any) => this.currentTheme = theme );
    this.sw.getCurrentLangObservable().subscribe( (lang: any) => {
      this.currentLang = lang;
      this.content = this.getCurrentLangContent();
    });
  }

  /*filters testimonials by currentLang('en'/'ca') value and returns an object which contains all the section text-type content for translated in currently selected language*/
  getCurrentLangContent() {
    const currentLangEntry =  Object.entries(COMETA_PORTFOLIO_DATA).filter(([key]) => key === this.currentLang);
    const currentLangContent  = Object.fromEntries(currentLangEntry);
    return Object.values(currentLangContent)[0];
  }
  
  /* image magnifier toggling is binded to img_magnifier_isActive boolean variable */
  /* sends selected img to html element with class name mangnified_img  and  and rerenders its src attribute */
  openMagnifier(event: any) {
    let magnified_img = this.elRef.nativeElement.querySelector(".magnified_img");
    this.renderer.setAttribute(magnified_img, "src", event.target.src);
    this.img_magnifier_isActive = true;
  }

  /* closes the image magnifier */
  closeMagnifier() {
    this.img_magnifier_isActive = false;
  }

  /*Prevents default event blubbling, the magnifier will only close if the click event is firied outside the magnified image itself */
  preventEventBubbling(event: any) {
    event.stopPropagation();
  }

}
