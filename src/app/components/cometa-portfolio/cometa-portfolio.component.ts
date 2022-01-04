import { Component, ElementRef, Renderer2, OnInit } from '@angular/core';
import { SwitcherService } from '../../cometa-services/shared/switcher.service';
import { COMETA_PORTFOLIO_DATA } from 'src/app/data/cometa.portfolio.data';
import { HostListener } from '@angular/core';


@Component({
  selector: 'app-cometa-portfolio',
  templateUrl: './cometa-portfolio.component.html',
  styleUrls: ['./cometa-portfolio.component.scss']
})
export class CometaPortfolioComponent implements OnInit {

  img_magnifier_isActive: boolean = false;
  currentTheme: any;
  currentLang: any;
  co_screenshots_show_more: boolean = false;

  /*stores the text-type content of the section*/
  content: any;


  constructor(private sw: SwitcherService, private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.applyCurrentLayoutSettings();
  }

  /* closes img magnifier  when escape is clicked */
  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.closeMagnifier();
  }

  /* closes img magnifier on any kind of mousewheel usage */
  @HostListener('mousewheel', ['$event']) scroll(event: MouseEvent) {
    this.closeMagnifier();
  }

  /* applys currently selected language and theme to layout */
  applyCurrentLayoutSettings() {
    this.sw.getCurrentThemeObservable().subscribe((theme: any) => this.currentTheme = theme);
    this.sw.getCurrentLangObservable().subscribe((lang: any) => {
      this.currentLang = lang;
      this.content = this.getCurrentLangContent();
    });
  }

  /* filters testimonials by currentLang('en'/'ca') value and returns an object which contains all the section text-type content for translated in currently selected language*/
  getCurrentLangContent() {
    const currentLangEntry = Object.entries(COMETA_PORTFOLIO_DATA).filter(([key]) => key === this.currentLang);
    const currentLangContent = Object.fromEntries(currentLangEntry);
    return Object.values(currentLangContent)[0];
  }

  /* image magnifier toggling is binded to img_magnifier_isActive boolean variable */
  /* sends selected img to html element with class name mangnified_img and rerenders its src attribute */
  openMagnifier(event: any) {
    let magnified_img = this.elRef.nativeElement.querySelector(".magnified_img");
    this.renderer.setAttribute(magnified_img, "src", event.target.src);
    this.img_magnifier_isActive = true;
  }

  /* closes the image magnifier */
  closeMagnifier() {
    this.img_magnifier_isActive = false;
  }
}
