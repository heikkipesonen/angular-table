
import {TableDirective} from './directives/table';
import {DataTableDirective} from './directives/table';
import {TableRowDirective} from './directives/table-row';
import {DataTableRowDirective} from './directives/table-row';
import {TableCellDirective} from './directives/table-cell';
import {TableHeaderDirective} from './directives/table-header';
import {DataTableHeaderCellDirective} from './directives/table-header';
import {DataTableHeaderRowDirective} from './directives/table-header';
import {DataTableFilterRowDirective} from './directives/table-header';
import {TableDetailViewService} from './directives/table-detail-view';
import {TablePageSelect} from './directives/table-page-select';
import * as extra from './directives/table-extra';
import data from './directives/data';


angular.module('hTable', ['ngAnimate'])

  .directive('hTable', TableDirective)
  .directive('hTableRow', TableRowDirective)
  .directive('hTableCell', TableCellDirective)
  .directive('hTableHeader', TableHeaderDirective)

  .directive('hTableRowControls', extra.TableRowControlsDirective)
  .directive('hTableRowIcon', extra.TableRowIconDirective)
  .directive('hTableRowButton', extra.TableRowButtonDirective)
  .directive('hDataTableRowLoader', extra.TableRowLoaderDirective)
  .directive('hTablePageSelect', TablePageSelect)


  .directive('hDataTable', DataTableDirective)
  .directive('hDataTableRow', DataTableRowDirective)
  .directive('hDataTableHeader', DataTableHeaderRowDirective)
  .directive('hDataTableHeaderCell', DataTableHeaderCellDirective)
  .directive('hDataTableFilterRow', DataTableFilterRowDirective)

  .service('TableDetailViewService', TableDetailViewService)

  .controller('MainController', function ($scope) {
    'ngInject';

    $scope.table = {
      /**
       * table row data
       * @type {Array}
       */
      data: data,

      /**
       * is table paged or all items displayed at once?
       * @type {Boolean}
       */
      paged: true,

      /**
       * if paged, how many items shown at once?
       * @type {Number}
       */
      itemsPerPage: 10,

      /**
       * does table have detailed view of items?
       * rowclick opens new row underneath the original one
       * @type {Object}
       */
      details: {
        /**
         * details view (row clicked)
         * row data is provided as data into template scope
         * @type {String}
         */
        template: '<h2>{{data.name}}</h2>'
      },

      /**
       * columns to display
       * @type {Array}
       */
      columns:[
        {

          /**
           * object key to use as value
           * @type {String}
           */
          key: 'name',

          /**
           * label for column
           * @type {String}
           */
          label: 'Name',

          /**
           * classnames to add to the table cell
           * @type {String}
           */
          classNames: 'col-lt-md-hide'
        },

        {
          key: 'avilable',
          label:'Available',
          classNames: 'fit-content text-center'
        },
        {
          key: 'category',
          label: 'Category'
        },
        {
          key: 'package_size',
          label: 'Size'
        },
        {
          key: 'unit',
          label: 'unit',
          classNames: 'fit-content text-center'
        },
        {
          key: 'package_price',
          label: 'Price',
          classNames: 'fit-content text-center',

          /**
           * value filter
           * manipulate model value for display
           * @param  {[type]} value [description]
           * @return {[type]}       [description]
           */
          valueFilter: (value) => {
            return (value + '').replace('.',',');
          }
        }
      ],

      /**
       * row control buttons
       * @type {Object}
       */
      controls: {

        /**
         * left side (before cells)
         * @type {Array}
         */
        left: [
          {

            /**
             * icon class to add to button
             * @type {String}
             */
            icon: 'ion-ios-plus-outline',

            /**
             * tbd
             * @type {String}
             */
            type: 'icon',

            /**
             * callback to trigger when control is pressed
             * @return {[type]} [description]
             */
            onclick: () => {
              console.log('fukSatan');
            }
          },
          {
            icon: 'ion-ios-search-strong',
            type: 'icon',
            onclick: () => {
              console.log('fukSatan');
            }
          }
        ],

        /**
         * the other side (after the cells)
         * @type {Array}
         */
        right: [
          {
            icon: 'ion-ios-plus-outline',
            type: 'icon',
            onclick: () => {
              console.log('fukSatan');
            }
          },
          {
            icon: 'ion-ios-search-strong',
            type: 'icon',
            onclick: () => {
              console.log('fukSatan');
            }
          }
        ]
      }
    }

  })
