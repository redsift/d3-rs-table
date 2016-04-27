import babel from 'rollup-plugin-babel';
import includes from 'rollup-plugin-includepaths';

var ipo = {
    include: {
        'd3-selection': 'node_modules/d3-selection/index.js'
    },
    paths: [ 'src/' ],
    external: []
};

export default {
  entry: 'index.js',
  format: 'umd',
  sourceMap: true,
  plugins: [ includes(ipo), babel() ]
};