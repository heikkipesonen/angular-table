export function TableRowControlsDirective($compile){
  'ngInject';

  return {
    restrict: 'A',
    replace: true,
    scope: {
      controls: '='
    },
    compile: function () {
      return {
        pre: function ($scope,  $element) {
          let controls = $scope.controls.map((control) => {
            return `
              <div class="h-table-row-icon">
                  <i class="${control.icon}"></i>
              </div>`;
          });

          $element[0].appendChild($compile(`<div class="table-cell-content">${controls}</div>`)($scope));
        },

        post: function($scope, $element) {

        }
      }
    },
    template: `
      <td class="h-table-row-controls">
      </td>
    `
  };
}

export function TableRowLoaderDirective(){
  return {
    restrict: 'E',
    replace: true,
    scope: {
      loading: '=?'
    },
    template: `
    <tr class="h-table-row h-data-table-loader" ng-class="{'h-data-table-loader-loading' : loading}">
      <td class="h-data-table-loader-cell" colspan="9999"></td>
    </tr>
    `
  };
}
export function TableRowIconDirective(){
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    template: `
      <div class="h-table-row-icon" ng-transclude></div>
    `
  };
}

export function TableRowButtonDirective(){
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    template: `
      <button class="h-table-row-button" ng-transclude></button>
    `
  };
}
