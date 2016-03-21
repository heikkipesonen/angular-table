export function TableHeaderDirective(){
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    template: `
    <th class="h-table-header-row" ng-transclude></th>
    `
  }
}

export function DataTableHeaderRowDirective(){
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    template: `
    <tr class="h-table-header-row" ng-transclude></tr>
    `
  }
}

export function DataTableHeaderCellDirective(){
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    template: `
    <th class="h-table-header-cell" ng-transclude></th>
    `
  }
}

export function DataTableFilterRowDirective(){
  return {
    restrict: 'E',
    replace: true,
    scope: {
      options: '='
    },
    template: `
    <tr class="h-table-filter-row">
      <td ng-if="options.controls.left.length"></td>
      <td class="h-table-filter-cell" ng-repeat="column in options.columns">
        <input type="text" ng-model="options.filter[column.key]" placeholder="{{column.label}}"/>
      </td>
      <td ng-if="options.controls.right.length"></td>
    </tr>
    `
  }
}
