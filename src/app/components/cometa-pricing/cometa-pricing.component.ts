/* ViewEncapsulation makes css rules from this component visible in Angular - https://stackoverflow.com/questions/45940965/angular-material-customize-tab */
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SwitcherService } from '../../cometa-services/shared/switcher.service';
@Component({
  selector: 'app-cometa-pricing',
  templateUrl: './cometa-pricing.component.html',
  styleUrls: ['./cometa-pricing.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CometaPricingComponent implements OnInit {

  currentTheme: any;

  constructor(private switcherService: SwitcherService ) { }

  ngOnInit(): void {
    this.switcherService.getCurrentThemeObservable().subscribe((theme: any) => this.currentTheme = theme);
  }

}
