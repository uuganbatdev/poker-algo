let consts = require('./constants-in-check-ranking');
let { restoreDeck, sortCards, getHighRankCards, shuffleDeck, showDeck, clearDeck, popDeck, deckLength } = require('./methods-on-cards');
let { Card } = require('./Card');
let { DIAMOND, HEART, SPADE, CLUB } = require('./cards');

restoreDeck();
shuffleDeck();

let checkRanking = (handCards, communityCards) => {
	// hand cards
	let hCards = [
		new Card('6', SPADE),
		new Card('3', DIAMOND)
	];

	// communitycards
	let cCards = [
		new Card('4', CLUB), 
		new Card('3', CLUB), 
		new Card('6', HEART), 
		new Card('2', SPADE),
		new Card('2', HEART)
	];

	// all cards
	let globalCards = [...hCards, ...cCards];
	let rank = [];

	let checkPairs = () => {
		let result = [];
		let tempIndex = [];
		let cards1 = [...globalCards];

		for ( let i = 0; i < cards1.length; i++ ) {
			for ( let j = i + 1; j < cards1.length; j++ ) {
				if ( cards1[i].get_name() == cards1[j].get_name() ) {
					result.push(...cards1.splice(j,1));
					tempIndex.push(cards1[i]);
					j--;
				}
			}
			if( tempIndex[0] ) {
				result.push(tempIndex[0]);
				tempIndex = [];
			}
		}

		return sortCards(result);
	}

	let pairs = checkPairs();
	let compareCards = [...globalCards];

	if ( pairs ) {
		switch( pairs.length ) {
			case 2:
				rank.push( consts.ONE_PAIR );
				rank.push([...pairs, ...getHighRankCards( compareCards, pairs, 3 )]);
				break;

			case 3:
				rank.push( consts.THREE_OF_KIND );
				rank.push([...pairs, ...getHighRankCards( compareCards, pairs, 2 )]);
				break;

			case 4:
				if ( pairs[0].get_name() &&
					pairs[1].get_name() &&
					pairs[2].get_name() == pairs[3].get_name()
				)
				{
					rank.push(consts.FOUR_OF_KIND);
				}
				else {
					rank.push(consts.TWO_PAIR);
				}
				rank.push([...pairs, ...getHighRankCards( compareCards, pairs, 1 )]);
				break;

			case 5:
				rank.push(consts.FULL_HOUSE);
				rank.psuh([...pairs]);
				break;

			case 6:
			case 7:
				if (
					pairs[0].get_name() &&
					pairs[1].get_name() &&
					pairs[2].get_name()  == pairs[3].get_name()
				) {
					let fourOfKind1 = [pairs[0],pairs[1],pairs[2],pairs[3],];
					rank.push(consts.FOUR_OF_KIND);
					rank.push([...fourOfKind1,...getHighRankCards( compareCards, fourOfKind1, 1 )]);
				}
				else if (
					pairs[2].get_name() &&
					pairs[3].get_name() &&
					pairs[4].get_name()  == pairs[5].get_name()
				) {
					let fourOfKind2 = [pairs[2],pairs[3],pairs[4],pairs[5],];
					rank.push(consts.FOUR_OF_KIND);
					rank.push([...fourOfKind2,...getHighRankCards( compareCards, fourOfKind2, 1 )]);
				}
				else if (
					pairs[0].get_name() &&
					pairs[1].get_name() && == pairs[2].get_name()
				) {
					let threeOfKind1 = [pairs[0],pairs[1],pairs[2]];
					rank.push(consts.THREE_OF_KIND);
					rank.push([...threeOfKind1,...getHighRankCards( compareCards, threeOfKind1, 2 )]);
				}
				else if (
					pairs[3].get_name() &&
					pairs[4].get_name() && == pairs[5].get_name()
				) {
					let threeOfKind2 = [pairs[3],pairs[4],pairs[5]];
					rank.push(consts.THREE_OF_KIND);
					rank.push([...threeOfKind2,...getHighRankCards( compareCards, threeOfKind2, 2 )]);
				} 
				else if (
					pairs[2].get_name() &&
					pairs[3].get_name() && == pairs[4].get_name()
				)  {
					let threeOfKind3 = [pairs[2],pairs[3],pairs[4]];
					rank.push(consts.THREE_OF_KIND);
					rank.push([...threeOfKind3,...getHighRankCards( compareCards, threeOfKind3, 2 )]);
				}
				else {
					rank.push(consts.TWO_PAIR);
					rank.push([...pairs.splice(0,4),...getHighRankCards( compareCards, pairs, 1 )]);
				}
				break;
		}
	}
}

checkRanking();
module.exports.checkRanking = checkRanking;