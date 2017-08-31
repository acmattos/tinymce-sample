/**
 * @export
 * @class TinyMceService
 * @description TinyMceService is used to create unique ID's, this prevents 
 * duplicate  ID's if there are multiple editors on screen.
 * 
 * Configuration:
 * import tinyMceDirective  from './tinymce.directive';
 * import tinyMceService    from './tinymce.service';
 * 
 * export default angular.module('editor.tinymce', [])
 * .directive('tinyMce', tinyMceDirective)
 * .service('tinyMceService', tinyMceService).name;
 */
export default class TinyMceService {
   constructor() {
      this._ID_ATTR = 'ui-tinymce';
      this._uniqueId = 0;
   }

   /**
    * @returns Unique ID for Tiny MCE editor component.
    */
   getUniqueId()  {
      this._uniqueId ++;
      return this._ID_ATTR + '-' + this._uniqueId;
   }
}