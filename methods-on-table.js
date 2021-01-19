let { Table } = require('./Table');
let { popDeck, restoreDeck, deckLength } = require('./methods-on-cards');

console.log(Table);
let drawToTable = () => {
	Table.communityCards.push(popDeck());
}

let isReadyToPlay = () => {
	if(Table.players.length < 2){
		return false;
	} else {
		return true;
	}
}

let fillTablePlayer = (player) => {
	Table.players[player.sitIndex];
}
restoreDeck();
drawToTable();
console.log(deckLength())
console.log(Table);
