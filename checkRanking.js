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
			new Card('2', HEART), 
			new Card('3', HEART),
			new Card('6', HEART)
		];
	// all cards
	let cards = [...hCards, ...cCards];
	let sda = 'sda';
	let yessda = 0;
	
	let removeCards = (inputCards) => {
		let result = [...cards];
		for ( let j = 0; j < result.length; j++ ) {
			for (let i = 0; i < inputCards.length; i++ ) {
				if ( result[j].get_name() == inputCards[i].get_name() && result[j].get_suit() == inputCards[i].get_suit() ) {
					result.splice(j,1);
					j--;
					break;
				}
			}
		}

		return result;
	}

	//all functions below return [ card-rank: pair,two pair ...etc, cards: array[])]

	let checkPair = () => {

		if( hCards[0].get_name() == hCards[1].get_name() ) {
			return [ consts.HAND_CARD_PAIR, [ hCards[0], hCards[1] ] ];
		}

		for (let i = 0; i < cCards.length; i++) {
			if ( cCards[i].get_name() == hCards[0].get_name() ) {
				return [ consts.COMMUNITY_CARD_PAIR_FIRST, [ hCards[0], cCards[i] ] ];
			}
			else if ( cCards[i].get_name() == hCards[1].get_name() ) {
				return [ consts.COMMUNITY_CARD_PAIR_SECOND, [ hCards[1], cCards[i] ] ];
			} 
			else return [ consts.NOT_PAIR, [] ];
		}

	}

	let checkTwoPair = () => {
		switch( checkPair()[0] ) {
			case consts.NOT_PAIR:
				return ([ consts.NOT_PAIR, [] ]);
				break;
			case consts.HAND_CARD_PAIR:
				return 
		}
	}
	checkTwoPair();
	//console.log(removeCards([new Card('4', HEART), new Card('7', HEART),new Card('6', HEART), new Card('3', DIAMOND)]));
}

checkRanking();
module.exports.checkRanking = checkRanking;
