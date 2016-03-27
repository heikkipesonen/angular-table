
import {DataTableDirective} from './directives/table';
import {DataTableHeaderRowDirective} from './directives/table-header';
import {DataTableFilterRowDirective} from './directives/table-header';
import {DataTableService} from './directives/table-service';
import {DataTableRowDirective} from './directives/table-row';
import {TableDetailViewService} from './directives/table-detail-view';
import {TablePageSelect} from './directives/table-page-select';
import * as extra from './directives/table-extra';



angular.module('hTable', ['ngAnimate'])

  .directive('hDataTable', DataTableDirective)
  .directive('hDataTableFilterRow', DataTableFilterRowDirective)
  .directive('hTableRow', DataTableRowDirective)

  .directive('hDataTableRowLoader', extra.TableRowLoaderDirective)
  .directive('hTablePageSelect', TablePageSelect)


  .service('TableDetailViewService', TableDetailViewService)
  .service('DataTableService', DataTableService);

  require('./demo');
