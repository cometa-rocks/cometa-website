import { Component, OnInit } from '@angular/core';
import { SwitcherService } from '../../cometa-services/shared/switcher.service';
@Component({
  selector: 'app-cometa-pricing',
  templateUrl: './cometa-pricing.component.html',
  styleUrls: ['./cometa-pricing.component.scss']
})
export class CometaPricingComponent implements OnInit {

  currentTheme: any;

  constructor(private switcherService: SwitcherService ) { }

  ngOnInit(): void {
    this.switcherService.getCurrentThemeObservable().subscribe((theme: any) => this.currentTheme = theme);
  }

}
