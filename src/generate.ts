var contexts = require('./jefri-typed.mock');
var typed = require('./jefri-typed');
var ttop = typed.generator('TTop', contexts.TabletTop);
console.log(ttop);
