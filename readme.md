# Data-displaying-table-thing

a kind-of-simple angular directive for displaying data on responsive tables. Currently features complex configuration object to provide many useless features. as usual.

this directive aims to aid only on displaying the data, not hc-data analysis or cosmic search algorithms, you can build them yourself if you wish.

this directive is still under preliminary development so it should not be used by anyone except extremely masochistic persons.

---

## Features not desired by anyone

- changing column order should mess up the whole table
- updating columns when table is rendered, should also mess up the whole table


## Features

- works almost like angular directive should,
  - manipulate data somewhere, display with this
  - should update automatically
- relatively fast render, with hundreds of rows at once
- only few watches per row, regardless of cell count
- pagination
- cell templating (not $compiled, so only html markup)
- cell value filtering (not $filter, do it yourself)
- simple (read: barely useful) functionalities for
  - filtering
  - sorting
- row icons / buttons
- all data paging, filtering and sorting in one service


currenly watches changes on:
```javascript
page: pagenumber
order: this.options.orderBy,
data: this.data, // reference change only
paged: this.options.paged,
itemsPerPage: this.options.itemsPerPage,
columns: this.options.columns,
filter: this.options.filter
```
##### features could be or may be under development

- extra content display (new row rendered)  
- configurable filters and sorters ($provider)

##### maybe planned

- promise data input
- loading from url
- $resource support(?)

## Usage
```HTML
  <h-data-table data="data" options="dataTableOptions" page="page"></h-data-table>
```
 variable | description
 --- | ---
 data | data provider, array of objects [{key: value}, {key: value} ..-]
 options | table options object
page | page index currently displayed

### options

horribly complex options to be provided for the table directive to correctly display the data and customize output.

some of these are optional, other are not.

```javascript
dataTableOptions = {

  /**
   * enable filter inputs under the table header
   * @type {Boolean}
   */
  rowFilter: false,
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


  /**
   * row odering
   * key: name of the property in object for value to sort by
   * reverse: sort reversal
   *
   * @type {Object}
   */
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
      classNames: 'col-lt-md-hide',

      /**
       * custom template to wrap cell content
       * not $compiled
       *
       * {{content}} will be replaced with (filtered) cell content
       * @type {String}
       */
      cellTemplate: '<div class="kissa">{{content}}</div>'
    },

    {
      key: 'available',
      label:'Available',
      classNames: 'fit-content text-center',

      /**
       * cell content filter applied once
       * when cell is rendered
       *
       * @param  {[type]} content content of current cell without filter
       * @param  {[type]} row     row of current cell
       * @return {[type]}         string to append into dom
       */
      filter: function(content, row) {
        return content + '&nbsp;' + row.unit;
      }
    },
    ...
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
```
---

# License
MIT
