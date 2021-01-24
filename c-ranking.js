let consts = require('./constants-in-check-ranking');
let { restoreDeck, shuffleDeck, showDeck, clearDeck, popDeck, deckLength } = require('./methods-on-cards');
let { Card } = require('./Card');
let { DIAMOND, HEART, SPADE, CLUB } = require('./cards');

restoreDeck();
shuffleDeck();

let checkRanking = (handCards, communityCards) => {
	// hand cards
	let hCards = [
		new Card('4', SPADE),
		new Card('3', DIAMOND)
	];
	// communitycards
	let cCards = [
			new Card('4', HEART), 
			new Card('7', HEART), 
			new Card('4', HEART), 
			new Card('3', HEART),
			new Card('6', HEART)
		];
	// all cards
	let cards = [...hCards, ...cCards];
	let sda = 'sda';
	let yessda = 0;

	let checkPairs = () => {
		let result = [];
		let cards1 = [...cards];
		let tempIndex = -1;

		for ( let i = 0; i < cards1.length; i++ ) {
			for( let j = i + 1; j < cards1.length; j++ ) {
				if ( cards1[i].get_name() == cards1[j].get_name() ) {
					result.push(...cards1.splice(j,1));
					tempIndex = i;
					if ( i == 0 ) {
						i = 0;
					} else {
						i--;
					}
				}
			}
			if( tempIndex > -1 ) {
				result.push(...cards1.splice(tempIndex,1));
				tempIndex = -1;
				console.log(sda);
			}

		}

		return result;
	}

	checkPairs();

	console.log(checkPairs());
	
	//console.log(removeCards([new Card('4', HEART), new Card('7', HEART),new Card('6', HEART), new Card('3', DIAMOND)]));
}

checkRanking();
module.exports.checkRanking = checkRanking;
