import { Component, ViewChild, Renderer2, ElementRef, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SwitcherService } from '../../cometa-services/shared/switcher.service';
import { CaptchaComponent } from 'angular-captcha';
import { COMETA_CONTACT_US_DATA } from 'src/app/data/cometa.contactus.data';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cometa-contact-us',
  templateUrl: './cometa-contact-us.component.html',
  styleUrls: ['./cometa-contact-us.component.scss']
})
export class CometaContactUsComponent implements OnInit {

  currentTheme: any;
  currentLang: any;
  contactForm: FormGroup;
  loading = false;
  submitted = false;

  // MailFeedback Object is received from mail.php backend via XHR
  mailFeedback = {
    success: false,
    successCode: 0,
    message: '',
    lastMsgID: 'not available'
  };

  /*stores the text-type content of the section*/
  content: any; 


  //view the captcha child component
  @ViewChild(CaptchaComponent, { static: true }) captchaComponent!: CaptchaComponent;

  constructor(private formBuilder: FormBuilder, private sw: SwitcherService, private http: HttpClient, private elRef: ElementRef, private renderer: Renderer2) {
    this.contactForm = this.formBuilder.group({});
    
  }

  ngOnInit() {
    this.initializeForm();
    this.applyCurrentLayoutSettings();

    /*set the endpoint to the captcha backend service */
    this.captchaComponent.captchaEndpoint = `${environment.env_mailurl}/php/simple-botdetect.php`;
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
    const currentLangEntry =  Object.entries(COMETA_CONTACT_US_DATA).filter(([key]) => key === this.currentLang);
    const currentLangContent  = Object.fromEntries(currentLangEntry);
    return Object.values(currentLangContent)[0];
  }

  /* inicializes contact us mail form and binds to it required attributes and validators for each required attribute*/
  initializeForm() {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
      captcha: ['', Validators.required]
    });
  }

  /*returns from controls, which in their place can be used to treat formControl errors directly from html 
    check out cometa-contact-us.component html to see how it is done*/
  get form() {
    return this.contactForm.controls; 
  }

  onSubmit() {
    /*loading variable is binded to submit buttons,
      it is set to true in order to disable submit button
      this behavior prevents multiple event firing while first event is still being processed*/
    this.submitted = true;

    /*do nothing and simply return if form is invalid*/
    if (this.contactForm.invalid) {
      return;
    }
    
    /*form is valid, procced to http request*/

    /*loading variable is binded to submit buttons,
      it is set to true in order to disable submit button
      this behavior prevents multiple event firing while first event is still being processed*/
    this.loading = true;

    /*defines url to to php mailer backend service*/
    const url = `${environment.env_mailurl}/php/mail.php`;

    /* set request options
     - setting X-www-form-urlencoded, as mail.php expects the variable values in $_POST['fieldname']*/
    const options = {
      headers: { 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8' }
    };
    
    // Wrapping the parameters from the form in HttpParams values, because mail.php is expecting $_POST['name'] ...
    // - name ............. name of the user filling the form
    // - email ............ email of user
    // - sibject  ......... the subject of the mail
    // - captchaID ........ Referenz to CaptchaID in Backend
    // - userEnteredInput . The Captcha the user entered to be verified in backend
    // - mail-version ..... if emmpty backend reacts as before (old version), if "toni" uses newhandling
    const payload_body = new HttpParams()
      .set('name',this.form['name'].value)
      .set('email',this.form['email'].value)
      .set('subject',this.form['subject'].value)
      .set('message',this.form['message'].value)
      .set('captchaId', this.captchaComponent.captchaId)
      .set('userEnteredInput', this.captchaComponent.userEnteredCaptchaCode)
      .set('mail-version', 'toni');


      
    //make http request to send mail  
    this.http.post(url, payload_body, options)
    .subscribe(
      (res: any) => {
        /*Feedback status codes 
          200: mail has been sent successully
          503: server crash, mail sender service is down, mail has not been sent
          400: bad request, captcha is invalid or out of date
        */
        this.reload();

        /*html calls mailfeedback properties in order to show service feedback message to user */
        this.mailFeedback = res;

        /* get feedback-message element*/
        //const feedback = this.elRef.nativeElement.querySelector('.feedback-message');
        //console.log(feedback);

        setTimeout(() => {
/*           this.mailFeedback.message = '';
 */        }, 5000);
      },
      (err: any) => {
        console.log(err);
        this.reload();
      }
    );
  }

  //reset form binding variables and captcha
  reload() {
    this.submitted = false;
    this.loading = false;
    this.captchaComponent.reloadImage();
    this.form['captcha'].reset();
  }
}

