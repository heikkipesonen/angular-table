export function TableRowControlsDirective(){
  return {
    restrict: 'E',
    replace: true,
    scope: {
      controls: '='
    },
    template: `
      <td class="h-table-row-controls">
        <h-table-row-icon
          ng-repeat="control in controls"
          ng-click="$event.stopPropagation(); control.onclick({$event: $event, row: row})">
            <i class="{{control.icon}}"></i>
          </h-table-row-icon>
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

export function TablePageSelect(){
  return {
    restrict: 'E',
    replace: true,
    scope: {
      pages: '=',
      currentPage: '=',
      setPage: '&select'
    },
    template: `
    <div class="h-page-select">
        <div class="h-page-select-wrapper">
          <div class="h-page-selector"
            ng-class="{'h-page-selector-active' : pageSelector === currentPage}"
            ng-repeat="pageSelector in pages"
            ng-click="setPage({page: pageSelector})">
            {{pageSelector.label}}
          </div>
        </div>
    </div>
    `
  };
}
