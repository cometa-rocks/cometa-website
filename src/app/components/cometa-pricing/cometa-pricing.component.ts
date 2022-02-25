/* ViewEncapsulation makes css rules from this component visible in Angular - https://stackoverflow.com/questions/45940965/angular-material-customize-tab */
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SwitcherService } from '../../cometa-services/shared/switcher.service';

// Contact Us is used here for the button to contact
import { CometaContactUsComponent } from '../cometa-contact-us/cometa-contact-us.component';

// Used to open the contact-us component
import { MatDialog } from '@angular/material/dialog';

// import logger service
import { LoggerService } from 'src/app/services/logger.service';

@Component({
  selector: 'app-cometa-pricing',
  templateUrl: './cometa-pricing.component.html',
  styleUrls: ['./cometa-pricing.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CometaPricingComponent implements OnInit {

  currentTheme: any;

  constructor(private switcherService: SwitcherService, private dialog: MatDialog, private log:LoggerService) { }

  ngOnInit(): void {
    this.switcherService.getCurrentThemeObservable().subscribe((theme: any) => this.currentTheme = theme);
    this.log.trace("ngOnInit", "PRICING")
  }

  open_dialog_contact_form() {
    this.dialog.open(CometaContactUsComponent)
    this.log.trace("open_dialog_contact_form", "PRICING")
  }


}
