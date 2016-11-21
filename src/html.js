import { select } from "d3-selection";

// headerRow0 = true, header is the first row
// headerRow0 = false, header is the first col
// headerRow0 = null/undef, no header
export default function html(id) {
  
  let classed = 'html-table',
      headerRow0 = null,
      text = (d) => d,
      display = null,
      onClick = null;
      
  function _impl(context) {
    let selection = context.selection ? context.selection() : context;

    let _display = display;
    if (_display == null) {
      _display = function (selection) {
        selection.text(text);
      }
    }

    selection.each(function(data) {
      let parent = select(this);

      let el = parent.select('table' + (id ?  '#' + id : ''));
      if (el.empty()) {
        el = parent.append('table').attr('id', id);
      }
      el.attr('class', classed);
      
      let col = el.selectAll('tr').data(data);
      
      col.exit().remove();

      col = col.enter().append('tr').merge(col);
                    
      if (headerRow0 === true) {
        let _cells = function(type, fn) {
          let arow = col.selectAll(type).data(fn);

          arow.exit().remove();
          let newArow = arow.enter().append(type);
          if (onClick) {
            newArow.on('click', onClick);
          }

          arow = newArow.merge(arow);
          arow.call(_display);
        }
        
        _cells('th', (r, i) => (i === 0) ? r : []);
        _cells('td', (r, i) => (i !== 0) ? r : []);
      } else {
        var row = col.selectAll('.cell').data((r) => r);
        
        row.exit().remove();
        
        let newRow = row.enter()
          .append((_, i) => (headerRow0 === false && i === 0) ? document.createElement('th') : document.createElement('td'))
          .attr('class', 'cell');
        if (onClick) {
          newRow.on('click', onClick);
        }
        
        row = newRow.merge(row);
        row.call(_display);       
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
  
  _impl.display = function(value) {
    return arguments.length ? (display = value, _impl) : display;
  };  

  _impl.onClick = function(value) {
    return arguments.length ? (onClick = value, _impl) : onClick;
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