

# Webpack 3.5.5 + AngularJS 1.6.5 + TinyMCE 4.6.5 Integration

[Tiny MCE](https://www.tinymce.com/) is designed for a full featured web editing. You can easily extend it and customize it. But, we you need to put it together with Angular JS (1.6.5) and Webpack (3.5.5) thinks can be a little odd.

This is a "step by step" manual. It's designed to help you integrate those tools and develop rich web applications. It's based on Windows SO, but you can easily adjust to some kind of Linux flavor you love it! I also supose that you already have [NodeJS](https://nodejs.org/en/download/) and [Visual Studio Code](https://code.visualstudio.com/download) installed on your computer.

So, let's get started! 

1) Open a console an type:

```
mkdir c:\workspace\tinymce-sample\src

cd c:\workspace\tinymce-sample\

npm init -y
```
Now, you'll probably have this *c:\workspace\tinymce-sample\package.json* on root's project:

```
{
  "name": "tinymce-sample",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```
2) Let's install webpack as a development dependency:
```
npm install --save-dev webpack 
```
3) AngularJS and TinyMCE are project dependencies:
```
npm install --save angular@1.6.5 tinymce@4.6.5 
```
Your *package.json* should look like this:
```
{
  "name": "tinymce-sample",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^3.5.5"
  },
  "dependencies": {
    "angular": "^1.6.5",
    "tinymce": "^4.6.5"
  }
}
```
4) Open your project on *VS Code* editor:

Create on root's directory of your project:
```
webpack.config.js
```
Inside *src* directory, create the following files:
```
index.js
index.html
tinymce (dir)
```
And *tinymce* directory. Inside that, create:
```
index.js
tinymce.directive.html
tinymce.directive.js
tinymce.service.js
```
5) Open *src/index.js* and type:
```
import angular from 'angular';

export default angular.module('editor', []).name;
```
6) Open *src/index.html* and type:
```
<!doctype html>
<html ng-app="editor" lang="pt" ng-strict-di>
  <head>
    <title>Webpack 3.5.5 + AngularJS 1.6.5 + TinyMCE 4.6.5</title>
  </head>
  <body>
     <h1>Webpack 3.5.5 + AngularJS 1.6.5 + TinyMCE 4.6.5</h1>
     <br/><br/>
  </body>
</html>
```
7) Open *package.json* and change *scripts* from:
```
"scripts": {
   "test": "echo \"Error: no test specified\" && exit 1"
},
```
to:
```
"scripts": {
   "build": "webpack"
}
```
8) Open *webpack.config.js* and type:
```
var path = require('path');
var webpack = require('webpack');

const VENDOR_LIBS = [
   'angular'
];

const config = {
   entry: {
      bundle: './src/index.js', // Bootstrap application
      vendor: VENDOR_LIBS
   },
   output: {
      path: path.join(__dirname, 'dist'), // Deployment dir
      filename: '[name].[chunkhash].js'
   }
}
module.exports = config;
```
## First run

First part is accomplished. Now it's time to run our *build* directive and see what we've done so far:

```
npm run build
```
You should see something like that:
```
c:\workspace\tinymce-sample>npm run build

> tinymce-sample@1.0.0 build c:\workspace\tinymce-sample
> webpack

Hash: de5096574c414c67c463
Version: webpack 3.5.5
Time: 725ms
                         Asset     Size  Chunks                    Chunk Names
vendor.80f1bcd682bd65da01f9.js  1.27 MB       0  [emitted]  [big]  vendor
bundle.384878bc94ad28ef5f32.js  1.27 MB       1  [emitted]  [big]  bundle
   [2] ./src/index.js 89 bytes {1} [built]
   [3] multi angular 28 bytes {0} [built]
    + 2 hidden modules
```
If came to this point, you haven't missed a thing through out here. But our job it's not complete. Let's configure *webpack* a little more:

1) On the top of *webpack.config.js* add the following lines:
```
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
```
2) Now, it's time to add *module* configuration, just below *output*:
```
   module:{
      rules:[
         {
            use: 'babel-loader',
            test: /\.js$/,
         },
         {
            use: 'html-loader',
            test: /\.html$/
         },
      ]
   },
   plugins: [
      new CleanWebpackPlugin(
         ['dist'], 
         {verbose: true}
      ),
      new webpack.optimize.CommonsChunkPlugin({
         names: ['vendor', 'manifest']
      }),
      new HtmlWebpackPlugin({
         template: 'src/index.html'
      })
   ]
```
3) Let's install some loaders and plugins:
```
npm install --save-dev babel-loader babel-core html-loader clean-webpack-plugin html-webpack-plugin
```
4) Now it's time to run build directive again:
```
c:\workspace\tinymce-sample>npm run build

> tinymce-sample@1.0.0 build c:\workspace\tinymce-sample
> webpack

clean-webpack-plugin: C:\workspace\tinymce-sample\dist has been removed.
[BABEL] Note: The code generator has deoptimised the styling of "c:/workspace
/tinymce-sample/node_modules/angular/angular.js" as it exceeds the max of "500KB
".
Hash: 2cb99fd61a48933ab10c
Version: webpack 3.5.5
Time: 3131ms
                           Asset       Size  Chunks                    Chunk Names
  vendor.eaa1b1c3a13f50e3c381.js    1.14 MB       0  [emitted]  [big]  vendor
  bundle.23de4ac059d9fddb8ad7.js  576 bytes       1  [emitted]         bundle
manifest.9ba63e4bd178325cace5.js    5.85 kB       2  [emitted]         manifest
                      index.html  470 bytes          [emitted]
   [1] ./src/index.js 81 bytes {1} [built]
   [3] multi angular 28 bytes {0} [built]
    + 2 hidden modules
Child html-webpack-plugin for "index.html":
     1 asset
       [0] ./node_modules/html-webpack-plugin/lib/loader.js!./src/index.html 279 bytes {0} [built]
```
As you can see, bundle.\*.js file has no longer the same size as vendor.\*.js file. Your results must be similar to mine. Now it's time to set TinyMCE up.

## TinyMCE Configuration
1) Open *tinymce.directive.html* and type:
```
<textarea ng-model="document"></textarea>
```
2) Open *tinymce.directive.js* and type:
```
import angular         from 'angular';
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

export default ['tinyMceService', (tinyMceService) => {
   
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
                  var blobCache =  tinymce.activeEditor.editorUpload.blobCache;
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
            file  : {title: 'File', items: 'newdocument fullpage '},
            edit  : {title: 'Edit', items: 'searchreplace undo redo | cut copy paste pastetext | selectall'},
            insert: {title: 'Insert', items: 'image pagebreak link media | template hr'},
            view  : {title: 'View', items: 'visualaid view fullscreen'},
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
    * @argument scope  is an AngularJS scope object.
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
         cid      : '@'  // Share specified value
         },
      link: linker 
   };

   return directive;
}];
```
3) Open tinymce.service.js and type:
```
export default class TinyMceService {
   constructor() {
      this._ID_ATTR = 'ui-tinymce';
      this._uniqueId = 0;
   }

   /**
    * @returns Unique ID for Tiny MCE editor component.
    */
   getUniqueId()  {
      this._uniqueId ++;
      return this._ID_ATTR + '-' + this._uniqueId;
   }
}
```
4) Open *tinymce/index.js* and type:
```
import angular           from 'angular';
import tinyMceDirective  from './tinymce.directive';
import tinyMceService    from './tinymce.service';

export default angular.module('editor.tinymce', [])
.directive('tinyMce', tinyMceDirective)
.service('tinyMceService', tinyMceService)
.name;
```
5) Reopen *index.html* and include after *h1* tag:
```
    <form method="post" >
      <tiny-mce document="vm.document.content"></tiny-mce>
      Content => {{vm.document.content}}
    </form>
    <script src="tinymce.min.js"></script>
```
6) Reopen *index.js* and make sure it looks like that:
```
import angular from 'angular';
import tinymce from './tinymce';

export default angular.module('editor', [
   tinymce
]).name;
```
7) Reopen *package.jason* and include inside *scripts*:
```
"serve": "webpack-dev-server"
```
*scripts* should look like that:
```
  "scripts": {
    "build": "webpack",
    "serve": "webpack-dev-server"
  }
```
7) Let's install *webpack-dev-server*:
```
npm install --save-dev webpack-dev-server
```
8) And run *serve* directive:
```
c:\workspace\tinymce-sample>npm run serve

> tinymce-sample@1.0.0 serve c:\workspace\tinymce-sample
> webpack-dev-server

clean-webpack-plugin: C:\workspace\tinymce-sample\dist has been removed.
Project is running at http://localhost:8080/
webpack output is served from /
[BABEL] Note: The code generator has deoptimised the styling of "c:/workspace
/tinymce-sample/node_modules/angular/angular.js" as it exceeds the max of "500KB
".
Hash: efa1d9b9c75c95769d81
Version: webpack 3.5.5
Time: 4806ms
                           Asset       Size  Chunks                    Chunk Nam
es
  vendor.8fe87cd1949c453e8028.js    1.46 MB       0  [emitted]  [big]  vendor
  bundle.07df356270d5de88325c.js  720 bytes       1  [emitted]         bundle
manifest.154e521feeb98b53d689.js    5.85 kB       2  [emitted]         manifest
                      index.html  670 bytes          [emitted]
  [19] (webpack)-dev-server/client?http://localhost:8080 5.85 kB {0} [built]
  [36] ./node_modules/angular/index.js 47 bytes {0} [built]
  [37] multi (webpack)-dev-server/client?http://localhost:8080 ./src/index.js 40
 bytes {1} [built]
  [38] ./node_modules/url/url.js 22.8 kB {0} [built]
  [44] ./node_modules/strip-ansi/index.js 161 bytes {0} [built]
  [46] ./node_modules/loglevel/lib/loglevel.js 6.78 kB {0} [built]
  [47] (webpack)-dev-server/client/socket.js 857 bytes {0} [built]
  [79] (webpack)-dev-server/client/overlay.js 3.59 kB {0} [built]
  [81] ./node_modules/html-entities/index.js 230 bytes {0} [built]
  [84] (webpack)/hot nonrecursive ^\.\/log$ 170 bytes {0} [built]
  [86] (webpack)/hot/emitter.js 74 bytes {0} [built]
  [87] ./node_modules/events/events.js 8.09 kB {0} [built]
  [88] ./src/index.js 81 bytes {1} [built]
  [89] ./node_modules/angular/angular.js 1.14 MB {0} [built]
  [90] multi (webpack)-dev-server/client?http://localhost:8080 angular 40 bytes
{0} [built]
    + 76 hidden modules
Child html-webpack-plugin for "index.html":
     1 asset
    ```   [0] ./node_modules/html-webpack-plugin/lib/loader.js!./src/index.html 495
 bytes {0} [built]
webpack: Compiled successfully.
```
9) Open your favorite browser (Chrome and Firefox are my suggestions) and type:
```
http://localhost:8080/
```
The application is running now... But wait a minute!!! There is no editor on that browser!!!

It's time for the last set up. But first, stop the server hitting *CTRL+C*.

## Final steps
1)  Open *webpack.config.js* and add the following lines to *plugins*:
```
       new CopyWebpackPlugin([
       { 
          context: './node_modules/tinymce/',
          from: '**/*', 
          debug: 'debug'
       }],{
          ignore: [
             // Doesn't copy any files with a txt extension    
             '*.json', '*.txt', '*.md'
       ]})
```
2) At the very begining of the same file, type:
```
 var CopyWebpackPlugin = require('copy-webpack-plugin');
```
3) It's time to install *copy-webpack-plugin*:
```
npm install --save-dev copy-webpack-plugin
```
4) And run *build* directive again. You should see something like that:

```
                 plugins/legacyoutput/index.js  220 bytes          [emitted]

                    plugins/link/plugin.min.js    11.3 kB          [emitted]

          plugins/insertdatetime/plugin.min.js     2.9 kB          [emitted]

                   plugins/lists/plugin.min.js    16.4 kB          [emitted]

                    plugins/importcss/index.js  211 bytes          [emitted]

                plugins/legacyoutput/plugin.js    10.4 kB          [emitted]

               plugins/importcss/plugin.min.js    3.76 kB          [emitted]

                   plugins/importcss/plugin.js    13.5 kB          [emitted]

                                    index.html  670 bytes          [emitted]

   [1] ./src/index.js 81 bytes {1} [built]
   [3] multi angular 28 bytes {0} [built]
    + 2 hidden modules
Child html-webpack-plugin for "index.html":
     1 asset
       [0] ./node_modules/html-webpack-plugin/lib/loader.js!./src/index.html 495
 bytes {0} [built]
```
5) Check *dist* directory. You now have a little bit more files than you've had before. That's fine. Let's run the server again:
```
npm run serve
```
Go to your browser and reload the application. *Voilá!* You can see TinyMCE Editor up an running, integrated to AngularJS and packed using Webpack.