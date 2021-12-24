/*
* This is a service that takes care of dynamic script loading 
* Inject it in any components that do use script but only in certain moments
* Using this service will prevent additional load on the website, as we will load adecuate scripts only when they are needed
*/

import { Injectable , Renderer2, RendererFactory2 } from '@angular/core';
import { ScriptStore } from '../../store/store.script';

@Injectable({
  providedIn: 'root'
})

export class LoadScriptService {

  /* stores the info about scripts(these that can be loaded dynamically) that are used in website */
  private scripts: any = {};

  /* stores dom renderer, which is created via rendererFactory2 as renderer2 itself is not @Injectable, read https://stackoverflow.com/questions/44989666/service-no-provider-for-renderer2 for more details*/
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.getScripts();
  }

  /* 
  * transforms format of recieved data
  * ex before: { name: 'stripe', src: 'https://api.filestackapi.com/filestack.js,', loaded: false }
  * ex after: stripe: { src: 'https://api.filestackapi.com/filestack.js,', loaded: false }
  * and saves data with new format in object called scripts
  */
  private getScripts() {   
    ScriptStore.forEach((script: any) => {
      this.scripts[script.name] = { src: script.src, loaded: script.loaded }
    });
  }

  /* 
  * recieves an array of strings, these strings must be equals to the names of scripts stored in app/store/store.script.ts
  * each name corresponds to an object containing info about script .
  * executes loadScript() function for each item in array
  */
  load(scriptName: string[]) {
    scriptName.forEach((script: any) => {
      this.loadScript(script);
    });
  }

  /* 
  * recieves a string as parameter, this string must be a name of a script
  * the function recieves script's name as parameter because the information about scrips is stored in following format
  * stripe: { src: 'https://api.filestackapi.com/filestack.js,', loaded: false } 
  * where >>> stripe <<< is the name that should be sent to this function
  * so we can check if source for this script name is already loaded and if that is not case then load it
  */
  private loadScript(name: string) {
     /* do nothing and just return if the script is already loaded */
    if (this.scripts[name].loaded) {
      return;
    }

    /* script isn't loaded, procceed to loading  */

    /* create script tag and set src attribute */
    let script = this.renderer.createElement('script');
    script.src = this.scripts[name].src;

    /* add created script tag to body, so it is loaded */
    document.getElementsByTagName('head')[0].appendChild(script);

    /* 
     *  set >>loaded<< property value to true
     *  so the next time this function is called, track the script and detect that it is already loaded
     */
    this.scripts[name].loaded = true;
  }
  
}
