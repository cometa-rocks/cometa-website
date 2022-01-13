import { Component, ElementRef, Renderer2, OnInit, HostListener } from '@angular/core';
import { SwitcherService } from '../../cometa-services/shared/switcher.service';
import { TranslateService } from 'src/app/cometa-services/shared/translate.service';
import { COMETA_PORTFOLIO_DATA } from 'src/app/data/cometa.portfolio.data';


@Component({
  selector: 'app-cometa-portfolio',
  templateUrl: './cometa-portfolio.component.html',
  styleUrls: ['./cometa-portfolio.component.scss']
})
export class CometaPortfolioComponent implements OnInit {

  currentTheme: any;
  currentLang: any;
  img_magnifier_isActive: boolean = false;
  co_screenshots_show_more: boolean = false;

  /*stores the text-type content of the section*/
  content: any;


  constructor(private switcherService: SwitcherService, private translateService: TranslateService, private elRef: ElementRef, private renderer: Renderer2) { }

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

  /*applys currently selected language and theme to layout*/
  applyCurrentLayoutSettings() {
    /*get current theme*/
    this.switcherService.getCurrentThemeObservable().subscribe((theme: any) => this.currentTheme = theme);

    /*get current language and translate all the text in that language*/
    this.switcherService.getCurrentLangObservable().subscribe((lang: any) => {
      this.currentLang = lang;
      this.content = this.translateService.translate(COMETA_PORTFOLIO_DATA);
    });
  }

  /* image magnifier toggling is binded to img_magnifier_isActive boolean variable */
  /* sends selected img to html element with class name mangnified_img and rerenders its src and alt attributes */
  openMagnifier(event: any) {
    let magnified_img = this.elRef.nativeElement.querySelector(".magnified_img");
    this.renderer.setAttribute(magnified_img, "src", event.target.src);
    this.renderer.setAttribute(magnified_img, "alt", event.target.alt);
    this.img_magnifier_isActive = true;
  }

  /* closes the image magnifier */
  closeMagnifier() {
    this.img_magnifier_isActive = false;
  }
}
