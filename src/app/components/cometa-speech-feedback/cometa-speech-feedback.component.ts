import { Component, OnInit } from '@angular/core';
import { LoadScriptService } from 'src/app/cometa-services/shared/script.service';

@Component({
  selector: 'app-cometa-speech-feedback',
  templateUrl: './cometa-speech-feedback.component.html',
  styleUrls: ['./cometa-speech-feedback.component.scss']
})
export class CometaSpeechFeedbackComponent implements OnInit {

  constructor(private loadScript: LoadScriptService) {
    /* load typeform embed.js script before page is rendered

       LoadScriptService is a service that takes care of dynamic script loading,
       in other words it loads script only when it is needed

       check comments to understand how the service work in 
       app/store/store.script.ts    and    app/cometa-services/shared/script.service.ts
    */
    this.loadScript.load(["typeform"]);
  }
  ngOnInit(): void {
  }

}
