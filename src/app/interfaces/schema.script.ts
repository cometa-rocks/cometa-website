/* 
 * Defines the schema of scripts object 
 * this schema is used togather with store/store.script.ts and services/shared/script.services.ts 
 * to load scripts dynamically, only when they are needed 
 * */

export interface Script {
    name: string;
    src: string;
    loaded: boolean;
}
