export function TableRowDirective(){
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    template: `
    <tr class="table-row" ng-transclude></tr>
    `,
    require: '^hTable'
  }
}

export function DataTableRowDirective(){
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    template: `
      <tr class="table-row" ng-transclude></tr>
    `,
    require: '^hDataTable'
  }
}
