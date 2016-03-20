const BASE_TEMPLATE = `
  <tr class="h-table-details-row">
    <td class="h-table-details-cell" colspan="999">
    {{content}}
    </td>
  </tr>`;

export class TableDetailViewService{

  constructor($rootScope, $compile, $animate, $q){
      'ngInject';
      this.$rootScope = $rootScope;
      this.$compile = $compile;
      this.$animate = $animate;
      this.$q = $q;

      this.visibleViews = [];
  }

  showDetails(data, rowElement, template, inject) {
    if (this.visibleViews.indexOf(rowElement) > -1){
      return;
    }

    let scope = this.$rootScope.$new();
        scope.data = data;
        scope.deferred = this.$q.defer();

    let element = this.$compile(BASE_TEMPLATE.replace('{{content}}', template))(scope);

    this.$animate.enter(element, rowElement.parentNode, rowElement);
    this.visibleViews.push(rowElement);

    scope.deferred.promise.finally(()=>{
      this.$animate.leave(element).then(()=>{
        scope.$destroy();
      });
    });

    scope.$on('$destroy', () => {
      console.log('perejen pere');
    })

    element.on('$destroy', () => {
      this.visibleViews.splice(this.visibleViews.indexOf(rowElement), 1);
      scope.$destroy();
    });

    return scope.deferred.promise;
  }
}
