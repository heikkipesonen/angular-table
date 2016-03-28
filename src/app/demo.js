import data from './directives/data';


angular.module('hTable').controller('MainController', function ($scope) {
  'ngInject';
  /**
   * table row data
   * @type {Array}
   */

  $scope.$watch('filterText', () => {
    $scope.data = data.filter((item) => {
      return $scope.filterText ? item.name.indexOf($scope.filterText) > -1 : true;
    });
  });

  $scope.data = data;
  $scope.table = {
    /**
     * is table paged or all items displayed at once?
     * @type {Boolean}
     */
    paged: true,

    /**
     * if paged, how many items shown at once?
     * @type {Number}
     */
    itemsPerPage: 100,

    /**
     * does table have detailed view of items?
     * rowclick opens new row underneath the original one
     * @type {Object}
     */
    details: {
      /**
       * details view (row clicked)
       * row data is provided as data into template scope
       * @type {String}
       */
      template: '<h2>{{data.name}}</h2>'
    },

    orderBy: {
      key: 'name',
      reverse: false
    },

    /**
     * columns to display
     * @type {Array}
     */
    columns:[
      {

        /**
         * object key to use as value
         * @type {String}
         */
        key: 'name',

        /**
         * label for column
         * @type {String}
         */
        label: 'Name',

        /**
         * classnames to add to the table cell
         * @type {String}
         */
        classNames: 'col-lt-md-hide'
      },

      {
        key: 'available',
        label:'Available',
        classNames: 'fit-content text-center'
      },
      {
        key: 'category',
        label: 'Category'
      },
      {
        key: 'package_size',
        label: 'Size',
      },
      {
        key: 'unit',
        label: 'unit',
        classNames: 'fit-content text-center'
      },
      {
        key: 'package_price',
        label: 'Price',
        classNames: 'fit-content text-center'
      }
    ],

    /**
     * row control buttons
     * @type {Object}
     */
    controls: {

      /**
       * left side (before cells)
       * @type {Array}
       */
      left: [
        {

          /**
           * icon class to add to button
           * @type {String}
           */
          icon: 'ion-ios-plus-outline',

          /**
           * callback to trigger when control is pressed
           * @return {[type]} [description]
           */
          onclick: (...args) => {
            console.log('button 1 on left', args);
          }
        },
        {
          icon: 'ion-ios-search-strong',
          type: 'icon',
          onclick: () => {
            console.log('button 2 on left');
          }
        }
      ],

      /**
       * the other side (after the cells)
       * @type {Array}
       */
      right: [
        {
          icon: 'ion-ios-email-outline',
          onclick: () => {
            console.log('button 3');
          }
        },
        {
          icon: 'ion-ios-email',
          onclick: () => {
            console.log('button 4');
          }
        },
        {
          icon: 'ion-ios-close-outline',
          onclick: () => {
            console.log('button 5');
          }
        }
      ]
    }
  }

});
