const BASE_TEMPLATE = `
  <tr class="h-table-details-row">
    <td colspan="999">
      <div class="h-table-details-wrapper">
        {{content}}
      </div>
    </td>
  <tr>`;

export class TableDetailViewService{

  constructor($rootScope, $compile, $animate, $controller, $q){
      'ngInject';
      this.$rootScope = $rootScope;
      this.$compile = $compile;
      this.$animate = $animate;
      this.$controller = $controller;
      this.$q = $q;

      console.log($controller);

      this.visibleViews = [];
  }

  closeAll(){
    this.visibleViews.forEach((view) => {
        view.$$scope.close();
    });
  }

  isViewOpen(rowElement){
    return this.visibleViews.indexOf(rowElement) > -1;
  }

  closeView(rowElement) {
    rowElement.$$scope.close();
  }

  showDetails(data, rowElement, template, inject) {
    if (this.visibleViews.indexOf(rowElement) > -1){
      return;
    }

    let scope = this.$rootScope.$new();
        scope.data = data;
        scope.close = function () { scope.deferred.reject() };
        scope.complete = function () { scope.deferred.accept() };
        scope.deferred = this.$q.defer();

    let element = this.$compile(BASE_TEMPLATE.replace('{{content}}', template))(scope);

    this.$animate.enter(element, rowElement.parentNode, rowElement);
    this.visibleViews.push(rowElement);

    rowElement.$$deferred = scope.deferred;
    rowElement.$$scope = scope;

    scope.deferred.promise.finally(()=>{

      this.$animate.leave(element).then(()=>{
        this.visibleViews.splice(this.visibleViews.indexOf(rowElement), 1);
      });
    });

    scope.$on('$destroy', () => {
      console.log('perejen pere');
    })

    element.on('$destroy', () => {
      scope.$destroy();
    });

    return scope.deferred.promise;
  }
}
