import angular           from 'angular';

import tinyMceDirective  from './tinymce.directive';
import tinyMceService    from './tinymce.service';

/**
 * Exports TinyMCE's component to be used by the application.
 */
export default angular.module('editor.tinymce', [])
.directive('tinyMce', tinyMceDirective) // Defines directive's HTML name <tiny-mce/>
.service('tinyMceService', tinyMceService).name;