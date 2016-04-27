# d3-rs-table

`d3-rs-table` is a component that can map a 2D matrix to an old school `table/tr/td` layout. It serves as a simple example demonstrating the implementation of our reusable chart model for D3 at [Redsift](https://redsift.io/?utm_source=github&utm_medium=readme&utm_campaign=oss) and a baseline for comparing view/data binding approaches for other frameworks. Note, this does not utilise `d3.transition()`. This component is dependent on D3 v4 (Alpha).

## Usage

### Data Format

	var data = [ 	
					[ 'a', 'b', ... ], 
					[ '1', '2', ... ], 
					... 
				]

In this model, the first entry is the first row of the table.

### Call

Assuming data compatible with the layout above is available:

	var tbl = d3_rs_table.html();
	d3.select('body').datum(data).call(tbl);	

Updating is simply mutating the `data` array and calling `d3.select('body').datum(data).call(tbl)` with the same reusable component instance.

## Comparing

Any fair comparison against this component in other presentation frameworks should include the following features:

- Ability to change the dimensions of the data array and rebind the presentation.
- Support ragged arrays via the update flow i.e. arrays where the rows of the array may be of different sizes and have this reflect in the generated DOM.
- Ability to customise the text presentation on demand via a callback. E.g. in the example, the instance of the component constructed uses a function to format the number to 2 decimal places via `var tbl = htmlTable(true).text((d) => d.toFixed(2))`.
- Ability to optionally render the first row or first column of the data set as a `th` element instead of a `td`. While style can be achieved using CSS, this demonstrates the ability to express sophisticated DOM element generation rules.

Other points to consider:

- Sparse arrays should be treated as expected i.e. empty cells should be created for `null` data elements.
- The DOM should be allowed to render between every update using an approach suitable for the framework in question.
- Use a type stable array when running the benchmark e.g. arrays of floats in the reference example.

## Performance

One of the primary uses of this component is testing performance of the DOM binding. A monolithic version of the test is available [here](https://static.redsift.io/blog/performance-04-16/ZWMamp.html) or as a [Codepen here](http://codepen.io/rahulpowar/full/ZWMamp/). The times embedded are not fully representative, as they only measure the time spent in the data binding portion of the library. Developer tools e.g. `Chrome Timeline > Capture > JS/Paint`, provides a more complete picture. Typically a 2500 item data array binds in 8 to 13 ms in Chrome 49 and corresponds to a 25fps once layout, update and paint are done. Safari 9 has a JS time of 3 to 5 ms. Times on a mobile device are visibly slower but acceptable with 16 ms JS times on iOS 9.x with Mobile Safari.

## D3 v4 vs v3

One interesting observation when using the D3 v4 Alpha is that the performance averages improve by ~15% with comparable standard deviations. [D3.js v4 Alpha](http://codepen.io/rahulpowar/full/ZWMamp/) vs [D3.js v3 Release](http://codepen.io/rahulpowar/full/VaGBaz/), note a minor change to the `d3.timer` API between v3 and v4.