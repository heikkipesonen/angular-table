export function TableRowDirective(){
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    template: `
    <tr class="table-row" ng-transclude></tr>
    `,
    require: '^hTable',
    link: ($scope, $element, $attrs, $controller) => {
      console.log($controller);
    }
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
