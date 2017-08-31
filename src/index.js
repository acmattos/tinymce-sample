import angular from 'angular';
import tinymce from './tinymce';

/**
 * @description Main module. Depends on tinymce component. * 
 */
export default angular.module('editor', [
   tinymce
]).name;