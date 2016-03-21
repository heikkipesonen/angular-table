
export function TablePageSelect(){
  return {
    restrict: 'E',
    replace: true,
    scope: {
      pages: '=',
      page: '='
    },
    controller: function PageSelectorController($scope){
      'ngInject';
      $scope.buttons = [];
      let updateVisibleButtons = () => {
        let pages = $scope.pages ? $scope.pages : [];

        let currentIndex = $scope.page || 0;
            currentIndex = currentIndex > 2 ? currentIndex - 3 : 0;

        let toMaxIndex = pages.length - 1 - currentIndex;
            currentIndex = toMaxIndex < 6 ? currentIndex - (6 - toMaxIndex) : currentIndex;

        $scope.buttons = pages.slice(currentIndex, currentIndex + 7);
      };

      $scope.prevPage = () => $scope.setPage($scope.page -1);
      $scope.nextPage = () => $scope.setPage($scope.page +1);

      $scope.setPage = (pageIndex) => {
        pageIndex = pageIndex < 0 ? 0  : pageIndex < $scope.pages.length ? pageIndex : $scope.pages.length - 1;
        $scope.page = pageIndex;
      };

      $scope.isSelected = (button) => {
        return button.index === parseInt($scope.page);
      }

      $scope.$watch(()=>{
        return {
          pages: $scope.pages.length,
          page: $scope.page
        };
      }, () => updateVisibleButtons() ,true );
    },
    template: `
    <div class="h-page-select">
        <div class="h-page-select-wrapper">
          <div class="h-page-selector" ng-click="prevPage()">
            <i class="ion-ios-arrow-left"></i>
          </div>
          <div class="h-page-selector"
            ng-class="{'h-page-selector-active' : isSelected(button)}"
            ng-repeat="button in buttons track by button.index"
            ng-click="setPage(button.index)">
            {{button.label}}
          </div>
          <div class="h-page-selector" ng-click="nextPage()">
            <i class="ion-ios-arrow-right"></i>
          </div>
        </div>
    </div>
    `
  };
}
