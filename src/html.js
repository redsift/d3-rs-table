import { select } from "d3-selection";

// headerRow0 = true, header is the first row
// headerRow0 = false, header is the first col
// headerRow0 = null/undef, no header
export default function html(id) {
  
  var classed = 'html-table',
      headerRow0 = null,
      text = (d) => d;
      
  function _impl(context) {
    var selection = context.selection ? context.selection() : context;
    
    selection.each(function(data) {
      var parent = select(this);

      var el = parent.select('table' + (id ?  '#' + id : ''));
      if (el.empty()) {
        el = parent.append('table').attr('id', id);
      }
      el.attr('class', classed);
      
      var col = el.selectAll('tr').data(data);
      
      col.exit().remove();

      col = col.enter().append('tr').merge(col);
                    
      if (headerRow0 === true) {
        var _cells = function(type, fn) {
          var arow = col.selectAll(type)
              .data(fn);
          arow.exit().remove();
          arow = arow.enter().append(type).merge(arow);
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
    return id;
  };
    
  _impl.classed = function(value) {
    return arguments.length ? (classed = value, _impl) : classed;
  };
  
  _impl.headerRow0 = function(value) {
    return arguments.length ? (headerRow0 = value, _impl) : headerRow0;
  };
  
  _impl.text = function(value) {
    return arguments.length ? (text = value, _impl) : text;
  };  
  
  return _impl;
}

// e.g. d3_rs_table.display(d3.select('#tbl'), demo, null, null, null, { headerRow0: true });
export function display(d3Selection, data, width, height, scale, opts) {
    var table = html();
    
    Object.keys(opts).forEach(function(n) {
        var f = table[n];
        if (f === undefined) {
            // console.warn('property ' + n + ' is not defined');
        } else {
            table = f.bind(table)(opts[n]);
        }
    });
    
    d3Selection.datum(data).call(table);
}