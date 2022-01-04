import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { CometaContactUsComponent } from '../cometa-contact-us/cometa-contact-us.component';

/*
* Stripe offers two ways of importing the service
* 1. from '@stripe/stripe-js';
* 2. from '@stripe/stripe-js/pure';
* what makes difference between these two is that /pure version implements lazy loading, check docs https://github.com/stripe/stripe-js/issues/43
* meaning that script will not be loaded untill first occurrence of loadStripe() function
* import { loadStripe } from '@stripe/stripe-js';
*/
import { loadStripe } from '@stripe/stripe-js/pure';
import { environment } from 'src/environments/environment';
import { SwitcherService } from '../../cometa-services/shared/switcher.service';
import { COMETA_USERS_DATA } from 'src/app/data/cometa.users.data'; // imports text content for this section


@Component({
  selector: 'app-cometa-users',
  templateUrl: './cometa-users.component.html',
  styleUrls: ['./cometa-users.component.scss']
})
export class CometaUsersComponent implements OnInit {
  donatePanelIsActive = false;
  donateForm: FormGroup;
  loading = false;
  currentTheme: any;
  currentLang: any;

  /*stores the text-type content of the section*/
  content: any;


  constructor(private formBuilder: FormBuilder, private http: HttpClient, private sw: SwitcherService, private dialog: MatDialog) {
    this.donateForm = this.formBuilder.group({});
  }


  ngOnInit(): void {
    /*applys current local storage setting for language and theme*/
    this.applyCurrentLayoutSettings();

    /*inicialized donation panel formGroup and formControlName bindings*/
    this.inicializeForm();
  }

  /*applys currently selected language and theme to layout*/
  applyCurrentLayoutSettings() {
    this.sw.getCurrentThemeObservable().subscribe((theme: any) => this.currentTheme = theme);
    this.sw.getCurrentLangObservable().subscribe((lang: any) => {
      this.currentLang = lang;
      this.content = this.getCurrentLangContent();
    });
  }

  /*filters testimonials by currentLang('en'/'ca') value and returns an object which contains all the section text-type content for translated in currently selected language*/
  getCurrentLangContent() {
    const currentLangEntry = Object.entries(COMETA_USERS_DATA).filter(([key]) => key === this.currentLang);
    const currentLangContent = Object.fromEntries(currentLangEntry);
    return Object.values(currentLangContent)[0];
  }


  /*toggles donation panel open. donation panel toggle event is binded to boolean variable donatePanelIsActive.
  correspondingly - panel is open when variable value is true and closed when it is false*/
  toggleDonatePanel() {
    this.donatePanelIsActive = this.donatePanelIsActive ? false : true;
  }

  /*Binds the selected donation amount to the formControlName >> amount */
  setAmount(amount: any) {
    this.form['amount'].setValue(amount);
  }

  /* this functions is triggered if user choosed to donate amount of their preference, insted of choosing one of the preset amounts */
  setCustomeAmount(event: any) {
    /*event.target.value returns amount in string format, so we are parsing it to number using Number(value: string) method*/
    this.setAmount(Number(event.target.value));
  }

  /*Binds the selected donation period to the formControlName >> period */
  setPeriod(period: any) {
    this.form['period'].setValue(period);
  }

  /* inicializes donation panel form and binds to it required attributes */
  inicializeForm() {
    this.donateForm = this.formBuilder.group({
      reason: [''],
      amount: [''],
      period: ['']
    });
  }

  /*returns from controls, which in their place can be used to treat formControl errors directly from html 
    in this particular case formControls have no validatiors, so there cannot be any errors as user is allowed to not fill or not input fields*/
  get form() {
    return this.donateForm.controls;
  }

  /* triggers when submit button is pressed */
  async onSubmit(period: any) {

    /*each one of two submit button in their place transmits value for selected donation period, the next line of code binds the recieved period value to formControl name >> period*/
    this.setPeriod(period);

    /*loading variable is binded to submit buttons,
      it is set to true in order to disable submit button
      this behavior prevents multiple event firing while first event is still being processed*/
    this.loading = true;

    /*defines request url to donation service*/
    const apiURL = `https://${environment.stripe_domain}.cometa.rocks/backend/createDonation/`;

    /*gets stripe key from enviroment variables*/
    const stripe = await loadStripe(environment.stripe_key);

    /*processes the request*/
    await this.http.post(apiURL, { amount: this.form['amount'].value, period: this.form['period'].value })
      .subscribe(
        (res: any) => {
          /*redirect to stripe page if request was successful*/
          stripe?.redirectToCheckout({ sessionId: res.sessionId })

          /*enable button again*/
          this.loading = false;
        },
        (err: any) => {
          /* console the error */
          console.log('HTTP Error', err);

          /*enable button again*/
          this.loading = false;
        }
      );
  }

  //opens up a dialog that contains layout of cometa contact us component
  openMailDialog() {
    //close donate panel if it is open
    if (this.donatePanelIsActive) { this.donatePanelIsActive = false; }

    //open dialog
    const dialogRef = this.dialog.open(CometaContactUsComponent);

    dialogRef.afterClosed().subscribe((result: any) => {
      //here goes logic after dialog is closed
    });
  }
}
