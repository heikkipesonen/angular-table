# Data-displaying-table-thing

a kind-of-simple angular directive for displaying data on responsive tables. Currently features complex configuration object to provide many useless features. as usual.

this directive aims to aid only on displaying the data, not hc-data analysis or cosmic search algorithms, you can build them yourself if you wish.

this directive is still under preliminary development so it should not be used by anyone except extremely masochistic persons.

---

## Features not desired by anyone

- changing column order should mess up the whole table
- updating columns when table is rendered, should also mess up the whole table


## Features

- works almosti like angular directive should,
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
  <h-data-table data="data" options="table" page="page"></h-data-table>
```
 variable | description
 --- | ---
 data | data provider, array of objects [{key: value}, {key: value} ..-]
 options | table options object
page | page index currently displayed

### options

horribly complex options to be provided for the table directive to correctly display the data and customize output.

some of these are optional, other are not.


key | type | description
-- | -- | --
rowfilter | boolean | show filter row as first row
paged | boolean | paged display, if false, all data displayed at once
itemsPerPage | number | how many items per page is shown
details | object | configuration for details view, extra row rendered under tr for displaying more info
details.* | null | under development
orderBy | object | orderby filter
orderBy.key | string | object key (in data[index]) to sort viewmodel
orderBy.reverse | boolean | reverse sort by key
columns | array | array of columns (see below)
controls | object | row controls (see below)

#### column configuration
key | type | description
-- | -- | --
key | string | object key for value to render
label | string | column label (for header)
classNames | string | class names to add into each cell in current column
cellTemplate | string | string to wrap cell content, replaces `{{content}}` string with (filtered)cell value
filter | function | cell value filter, should return string to be placed into cell

##### example:

```javascript
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
   * @type {String}
   */
  cellTemplate: '<div class="kissa">{{content}}</div>',

  /**
   * row value filter
   * @param  {[type]} content [description]
   * @param  {[type]} row     [description]
   * @return {[type]}         [description]
   */
  filter: function(content, row) {
    return content + '&nbsp;' + row.unit;
  }  
}
```



#### table row controls

key | type | description
-- | -- | --
left | array | list of control buttons at row start
right | array | list of buttons at row end

##### button object

key | type | description
-- | -- | --
icon | string | class name for i-element inside control item
onclick | function | callback function when element is clicked

```javascript
{
  "left": [
    {
      "icon": "ion-ios-search-strong",      
      "onclick": (...args) => {
        console.log('button callback', args);
      }
    }    
  ],
  "right": [
    {
      "icon": "ion-ios-search-strong",      
      "onclick": (...args) => {
        console.log('button callback', args);
      }
    }    
  ]
}
```
---

# License
MIT
