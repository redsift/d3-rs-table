var tape = require("tape"),
    jsdom = require("jsdom"),
    d3 = require("d3-selection"),
    table = require("../");
    
tape("table() generates rows", function(t) {
    var document = global.document = jsdom.jsdom("<div id='test'></div>");
    try {   
        var tbl = table.html();

        var el = d3.select('#test');
        var data = [ [ 'a', 'b' ], [ 1, '2' ], [ 'ragged' ] ];
        el.datum(data).call(tbl);
        
        t.equal(el.selectAll('tr').size(), data.length)
        
        t.end();
    } finally {
        delete global.document;
    }    
});   

tape("table() generates cells", function(t) {
    var document = global.document = jsdom.jsdom("<div id='test'></div>");
    try {   
        var tbl = table.html();

        var el = d3.select('#test');
        var data = [ [ 'a', 'b' ], [ 1, '2' ], [ 'ragged' ] ];
        el.datum(data).call(tbl);
        t.equal(el.selectAll('td').size(), 5)
        
        t.end();
    } finally {
        delete global.document;
    }    
});    

tape("table() generates th cells 1st row", function(t) {
    var document = global.document = jsdom.jsdom("<div id='test'></div>");
    try {   
        var tbl = table.html().headerRow0(true);

        var el = d3.select('#test');
        var data = [ [ 'a', 'b' ], [ 1, '2' ], [ 'ragged' ] ];
        el.datum(data).call(tbl);
        t.equal(el.selectAll('th').size(), 2)
        
        t.end();
    } finally {
        delete global.document;
    }    
}); 

tape("table() generates th cells 1st col", function(t) {
    var document = global.document = jsdom.jsdom("<div id='test'></div>");
    try {   
        var tbl = table.html().headerRow0(false);

        var el = d3.select('#test');
        var data = [ [ 'a', 'b' ], [ 1, '2' ], [ 'ragged' ] ];
        el.datum(data).call(tbl);
        t.equal(el.selectAll('th').size(), 3)
        
        t.end();
    } finally {
        delete global.document;
    }    
}); 

tape("table text callback called", function(t) {
    var document = global.document = jsdom.jsdom("<div id='test'></div>");
    try {   
        const MAGIC = 'unit-test-value';
        const DATA = [ [ MAGIC ] ];
        
        var tbl = table.html().text(function(d) {
            t.equal(d, MAGIC);
            t.end();
        });

        var el = d3.select('#test');
        el.datum(DATA).call(tbl);
    } finally {
        delete global.document;
    }      
}); 