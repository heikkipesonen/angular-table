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
