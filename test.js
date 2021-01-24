let { Card } = require('./Card');
console.log(  new Card('4','diamond'), new Card('4', 'diamond'));

console.log( Object.is( new Card('4','diamond'), new Card('4', 'diamond') ) );
