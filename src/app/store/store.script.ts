/* 
 * this module exports an array of objects containing information about
 * scripts that are used in app. This module togather with services/shared/script.service.ts
 * is implemented in order to prevent unused sript loading. The idea is to load scripts 
 * dynamically, only when they are needed 
 */

import { Script } from "../interfaces/schema.script";

export const ScriptStore: Script[] = [
    { name: 'typeform', src: '//embed.typeform.com/next/embed.js', loaded: false }
    /*
     * usage.....
     * import here script info in object format. ex:
     * { name: 'script1', src: 'url1', loaded: false } 
     * { name: 'script2', src: 'url2', loaded: false }
     * { name: 'script3', src: 'url3', loaded: false }
     * 
     * import LoadScriptService from cometa-service/shared/script.service.ts in any components of your desire
     * 
     * import LoadScriptService in constructor, ex: constructor(private scriptService: LoadScriptService) { }
     * 
     * call function scriptService.load(scripts: string[]).
     * 
     * the function recieves array as of script names (in string format), so we have a choice to load multiple scripts at the same time. ex: scriptService.load(['script1','script2'])
     * 
     * but, if you need to load only one script just pass the string parameter surrounded in array braces like scriptService.load(['script1'])
     * 
     * check cometa-service/shared/script.service.ts for more details about script load service behaviour
    */
];
