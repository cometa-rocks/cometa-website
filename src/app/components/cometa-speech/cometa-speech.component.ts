import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { LoadScriptService } from '../../../app/cometa-services/shared/script.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cometa-speech',
  templateUrl: './cometa-speech.component.html',
  styleUrls: ['./cometa-speech.component.scss']
})
export class CometaSpeechComponent implements OnInit {

  //defines dynamic source for image
  img_src = "assets/speech/Flyer_Ralf.jpg";

  constructor(private loadScript: LoadScriptService, private activatedroute: ActivatedRoute, private elref: ElementRef, private renderer: Renderer2) {
    /* load typeform embed.js script before page is rendered

       LoadScriptService is a service that takes care of dynamic script loading,
       in other words it loads script only when it is needed

       check comments to understand how the service work in 
       app/store/store.script.ts    and    app/cometa-services/shared/script.service.ts
    */
    this.loadScript.load(["typeform"]);
  }

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe((paramsMap: any) => {
      // Replace speaker image according to parameters coming from URL
      // There are only two valid parameters
      // 1. ralf
      // 2. david
      // all other paramters will be showing ralf

      //get speaker
      const speaker = paramsMap.params.speakername == "david" ? "david" : "ralf";

      //set src attribute to img according to recieved param(speakername)
      const img = this.elref.nativeElement.querySelector("img");

      this.renderer.setAttribute(img, "src", `assets/speech/Flyer_${speaker}.jpg`);
    })
  }

}
