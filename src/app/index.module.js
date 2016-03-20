import { config } from './index.config';
import { runBlock } from './index.run';

import {TableDirective} from './directives/table';
import {DataTableDirective} from './directives/table';
import {TableRowDirective} from './directives/table-row';
import {DataTableRowDirective} from './directives/table-row';
import {TableCellDirective} from './directives/table-cell';
import {TableHeaderDirective} from './directives/table-header';
import {DataTableHeaderCellDirective} from './directives/table-header';
import {DataTableHeaderRowDirective} from './directives/table-header';
import * as extra from './directives/table-extra';
import data from './directives/data';


angular.module('hTable', ['ngAnimate', 'toastr'])
  .config(config)
  .run(runBlock)

  .directive('hTable', TableDirective)
  .directive('hTableRow', TableRowDirective)
  .directive('hTableCell', TableCellDirective)
  .directive('hTableHeader', TableHeaderDirective)

  .directive('hTableRowControls', extra.TableRowControlsDirective)
  .directive('hTableRowIcon', extra.TableRowIconDirective)
  .directive('hTableRowButton', extra.TableRowButtonDirective)
  .directive('hDataTableRowLoader', extra.TableRowLoaderDirective)


  .directive('hDataTable', DataTableDirective)
  .directive('hDataTableRow', DataTableRowDirective)
  .directive('hDataTableHeader', DataTableHeaderRowDirective)
  .directive('hDataTableHeaderCell', DataTableHeaderCellDirective)

  .controller('MainController', function ($scope) {
    'ngInject';

    $scope.table = {
      data: data,
      itemsPerPage: 13,
      columns:[
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
          key: 'name',
          label: 'Name',
          classNames: 'col-lt-md-hide'
        },
        {
          key: 'unit',
          label: 'unit',
          classNames: 'fit-content text-center'
        }
      ],
      controls: {
        left: [
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
        ],
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
