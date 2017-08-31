import angular         from 'angular';
import tinyMceTemplate from './tinymce.directive.html';

// Import a theme is required and avoids extra requests!
import 'tinymce/themes/modern';
// Any plugins you want to use has to be imported and also avoids extra requests!
import 'tinymce/themes/modern';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/link';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/autoresize';
import 'tinymce/plugins/imagetools';
import 'tinymce/plugins/table';
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/textcolor';
import 'tinymce/plugins/colorpicker';
import 'tinymce/plugins/print';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/contextmenu';
import 'tinymce/plugins/image';
import 'tinymce/plugins/hr';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/pagebreak';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/template';
import 'tinymce/plugins/save';
import 'tinymce/plugins/fullpage';

/**
 * This directive is used to set uo Tiny MCE editor in an application. It must 
 * be used together with is TinyMceService.
 * 
 * Configuration:
 * import tinyMceDirective  from './tinymce.directive';
 * 
 * export default angular.module('editor.tinymce', [])
 * .directive('tinyMce', tinyMceDirective) // This difines usage: <tiny-mce/>
 * .name;
 * 
 * Usage:
 * Defining cid property, this directive will use cid's value.
 * <tiny-mce cid="editor" documento="vm.documento"></tiny-mce>
 * 
 * If cid property is ommited, TinyMceService will generate a particular id to 
 * Tiny MCE editor.
 * <tiny-mce  documento="vm.documento"></tiny-mce>
 */
export default ['tinyMceService', (tinyMceService) => {
   /**
    * @description This function initializes TinyMCE editor. It's is important
    * to mention that all configuration parameters are hardcoded. A proper way 
    * to make this directive be user configurable must be applied.
    * For further TinyMCE configuration tips, please refer component's page.
    * 
    * @param {any} scope Directive's scope.
    * @param {any} updateNgModel Callback function responsible to update 
    * Angualar's model with TinyMCE's content.
    */
   function initEditor(scope, updateNgModel){
      tinymce.init({
         selector: 'textarea',
         schema: 'html5',
         removed_menuitems: 'visualaid',
         branding: false,
         paste_data_images: true,
         browser_spellcheck: true,
         elementpath: false,
         statusbar: false,
         custom_undo_redo_levels: 30,
         imagetools_toolbar: "rotateleft rotateright | flipv fliph | editimage imageoptions",
         file_picker_types: 'image',
         autoresize_on_init: true,
         autoresize_bottom_margin: 10,
         autoresize_overflow_padding: 10,
         autoresize_min_height: 600,
         file_picker_callback: function(cb, value, meta) {
            var input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');
            input.onchange = function() {
               var file = this.files[0];
               var reader = new FileReader();
               reader.readAsDataURL(file);
               reader.onload = function () {
                  var id = 'blobid' + (new Date()).getTime();
                  var blobCache =  tinymce.activeEditor.editorUpload.blobCache;
                  var base64 = reader.result.split(',')[1];
                  var blobInfo = blobCache.create(id, file, base64);
                  blobCache.add(blobInfo);
                  cb(blobInfo.blobUri(), { title: file.name });
               };
            };
            input.click();
         },
         templates: [
            { title: 'Template Sample 1', content: '<h1>Sample 1<h1>' },
            { title: 'Template Sample 2', 
              content: '<!DOCTYPE html><html><head><title>Template Sample 1</title></head><body>Another template sample</body></html>' },
         ],
         plugins: [
            'autoresize', 'lists', 'textcolor', 'colorpicker', 'table', 'print',
            'preview', 'charmap', 'insertdatetime', 'searchreplace', 'advlist',
            'contextmenu', 'image', 'imagetools', 'hr', 'anchor', 'link', 
            'pagebreak', 'fullscreen', 'wordcount', 'template', 'save', 
            'fullpage', 'paste'
         ],
         toolbar: [
            'newdocument template save fullpage preview fullscreen print | undo redo',
            'formatselect fontselect fontsizeselect | forecolor backcolor | bold italic underline strikethrough hr | alignleft aligncenter alignright alignjustify',
            'numlist bullist outdent indent pagebreak | table link image charmap subscript superscript',
            'mybutton'
         ],
         table_toolbar: "tableprops tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol",
         menu: {
            file  : {title: 'File', items: 'newdocument fullpage '},
            edit  : {title: 'Edit', items: 'searchreplace undo redo | cut copy paste pastetext | selectall'},
            insert: {title: 'Insert', items: 'image pagebreak link media | template hr'},
            view  : {title: 'View', items: 'visualaid view fullscreen'},
            format: {title: 'Format', items: 'bold italic underline strikethrough superscript subscript | formats | removeformat'},
            table : {title: 'Table', items: 'table inserttable tableprops deletetable | cell row column'},
            tools : {title: 'Tools', items: 'spellchecker code'}
         },
         setup (editor) {
            editor.addButton('mybutton', {
               text: 'My button',
               icon: false,
               onclick: function () {
                  editor.insertContent('&nbsp;<b>It\'s my button!</b>&nbsp;');
                  updateNgModel(editor.getContent());
               }
            });
            editor.on('keyup', e => {
               updateNgModel(editor.getContent());
            });
            editor.on('ExecCommand change NodeChange ObjectResized', e => {
               updateNgModel(editor.getContent());
            });
         }
      });
   }
      
   /** 
    * It is used to initialize Tiny MCE editor.
    *
    * @argument scope  is an AngularJS scope object.
    */
   function linker(scope){
      scope.cid = scope.cid || tinyMceService.getUniqueId() ;
      initEditor(scope, function(content){
         // We must update model, after any change made!
         scope.$apply(function(){scope.document = content;});
      });
   }
   
   let directive = {
      restrict: 'E',
      priority: 599,
      template: tinyMceTemplate,
      scope: {
         document: '=', // 2-Way data binding
         cid     : '@'  // Share specified value
         },
      link: linker 
   };

   return directive;
}];