import { select } from "d3-selection";

var _TABLE_ID = 0xffa00;

// headerRow0 = true, header is the first row
// headerRow0 = false, header is the first col
// headerRow0 = null/undef, no header
export default function(headerRow0) {
  _TABLE_ID = _TABLE_ID + 1;
  var id = _TABLE_ID;
  
  var classed = 'html-table',
      text = (d) => d;
      
  function _impl(context) {
    var selection = context.selection ? context.selection() : context;
    
    selection.each(function(data) {
      var parent = select(this);
      var el = parent.select('#' + _impl.id());
      if (el.empty()) {
        el = parent.append('table').attr('id', _impl.id());
      }
      el.attr('class', classed);
      
      var col = el.selectAll('tr').data(data);
      
      col.exit().remove();

      col = col.enter().append('tr').merge(col);

                    
      if (headerRow0 === true) {
        var _cells = function(type, fn) {
          var arow = col.selectAll(type)
              .data(fn);
          arow.enter().append(type);
          arow.exit().remove();
          arow.text(text);
        }
        
        _cells('th', (r, i) => (i === 0) ? r : []);
        _cells('td', (r, i) => (i !== 0) ? r : []);
      } else {
        var row = col.selectAll('.cell').data((r) => r);
        
        row.exit().remove();
        
        row = row.enter()
          .append((_, i) => (headerRow0 === false && i === 0) ? document.createElement('th') : document.createElement('td'))
          .attr('class', 'cell')
          .merge(row);
        
        row.text(text);       
      }
    });
  }
  
  _impl.id = function() {
    return 'ht-guid-' + id;
  };
  
  _impl.classed = function(value) {
    return arguments.length ? (classed = value, _impl) : classed;
  };
  
  _impl.text = function(value) {
    return arguments.length ? (text = value, _impl) : text;
  };  
  
  return _impl;
}