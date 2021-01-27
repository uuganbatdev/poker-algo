let consts = require('./constants-in-check-ranking');
let { restoreDeck, sortCards, getHighRankCards, shuffleDeck, showDeck, clearDeck, popDeck, deckLength } = require('./methods-on-cards');
let { Card } = require('./Card');
let { DIAMOND, HEART, SPADE, CLUB } = require('./cards');

restoreDeck();
shuffleDeck();

let checkRanking = (handCards, communityCards) => {
	// hand cards
	let hCards = [
		new Card('A', SPADE),
		new Card('2', SPADE)
	];

	// communitycards
	let cCards = [
		new Card('3', SPADE), 
		new Card('4', SPADE), 
		new Card('5', SPADE), 
		new Card('7', SPADE),
		new Card('3', HEART)
	];

	// all cards
	let globalCards = [...hCards, ...cCards];
	let rank = [];

	let checkFlush = () => {
		let result = [];
		let cards1 = sortCards([...globalCards]);

		for ( let i = 0; i < 2; i++ ) {
			for ( let j = i+1; j < cards1.length; j++ ) {
				if ( cards1[i].get_suit() == cards1[j].get_suit() ) {
					if ( !result[0] ) {
						result.push(cards1[i]);
					}
					result.push(cards1[j]);
				}
			}
			if (result.length >= 5) {
				break;
			}
		}

		if ( result.length >= 5 ) {
			let cards2 = [...result];
			let result2 = [];

			for ( let i = 0, j = 1; j < cards2.length; i++, j++ ) {
				if ( cards2[i].get_rank() - cards2[j].get_rank() == 1) {
					result2.push(cards2[i]);
					if ( result2.length == 4 || result2.length == 3  ) {
						if ( cards2[i].get_rank() - cards2[i+1].get_rank() == 1) {
							result2.push(cards2[i+1]);
							break;
						}
					}
				}
			}

			if ( result2.length ) {
				console.log('sda');
				console.log(result2);
			}

		}
	}

	checkFlush();

	let checkStraight = () => {
		let result = [];
		let cards1 = sortCards([...globalCards]);

		for ( let i = 0, j = 1; j < cards1.length; i++, j++ ) {
			if ( cards1[i].get_rank() - cards1[j].get_rank() == 1) {
				result.push(cards1[i]);
				if ( result.length == 4 || result.length == 3  ) {
					if ( cards1[i].get_rank() - cards1[i+1].get_rank() == 1) {
						result.push(cards1[i+1]);
						break;
					}
				}
			}
		}
		
		if (
			result[3].get_name() == '2'&&
			result[2].get_name() == '3'&&
			result[1].get_name() == '4'&&
			result[0].get_name() == '5'&&
			cards1[0].get_name() == 'A'
		) {
			if (
				result[0].get_suit() == result[1].get_suit() &&
				result[2].get_suit() == result[3].get_suit() &&
				result[1].get_suit() == result[2].get_suit() &&
				cards1[0].get_suit() == result[2].get_suit() 
			) {
				rank.push(consts.STRAIGHT_FLUSH);
			} else {
				rank.push(consts.STRAIGHT);
			}
			rank.push([...result, cards1[0]]);
		} else if ( result.length == 5) {
			if (
				result[0].get_suit() == result[1].get_suit() &&
				result[2].get_suit() == result[3].get_suit() &&
				result[1].get_suit() == result[2].get_suit() &&
				result[4].get_suit() == result[2].get_suit() 
			) { 
				if ( 
					result[0].get_name() == 'A'&&
					result[1].get_name() == 'K'&&
					result[2].get_name() == 'Q'&&
					result[3].get_name() == 'J'&&
					result[4].get_name() == '10'
				) {
					rank.push(consts.ROYAL_FLUSH);
				} else {
					rank.push(consts.STRAIGHT_FLUSH);
				}
			} else {
				rank.push(consts.STRAIGHT);
			}
			rank.push(result);
		}

	}

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

		let pairs = sortCards(result);
		let compareCards = [...globalCards];

		if ( pairs ) {
			switch( pairs.length) {
				case 2:
					rank.push( consts.ONE_PAIR );
					rank.push([...pairs, ...getHighRankCards( compareCards, pairs, 3 )]);
					break;

				case 3:
					rank.push( consts.THREE_OF_KIND );
					rank.push([...pairs, ...getHighRankCards( compareCards, pairs, 2 )]);
					break;

				case 4:
					if ( pairs[0].get_name() == pairs[3].get_name())
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
					rank.push([...pairs]);
					break;

				case 6:
					if ( pairs[0].get_name() == pairs[3].get_name() ) {
						let fourOfKind1 = [pairs[0],pairs[1],pairs[2],pairs[3],];
						rank.push(consts.FOUR_OF_KIND);
						rank.push([...fourOfKind1,...getHighRankCards( compareCards, fourOfKind1, 1 )]);
					}
					else if ( pairs[2].get_name() == pairs[5].get_name() ) {
						let fourOfKind2 = [pairs[2],pairs[3],pairs[4],pairs[5],];
						rank.push(consts.FOUR_OF_KIND);
						rank.push([...fourOfKind2,...getHighRankCards( compareCards, fourOfKind2, 1 )]);
					}
					else if ( pairs[0].get_name() == pairs[2].get_name() ) {
						if ( pairs[3].get_name() == pairs[4].get_name() ) {
							rank.push(consts.FULL_HOUSE);
							rank.push([...pairs.splice(0,5)]);
						} else {
							let threeOfKind2 = [pairs[3],pairs[4],pairs[5]];
							rank.push(consts.THREE_OF_KIND);
							rank.push([...threeOfKind2,...getHighRankCards( compareCards, threeOfKind2, 2 )]);
						} 
					}
					else if ( pairs[3].get_name() == pairs[5].get_name() ) {
						if ( pairs[1].get_name() == pairs[2].get_name() ) {
							rank.push(consts.FULL_HOUSE);
							rank.push([...pairs.splice(1,5)]);
						} else {
							let threeOfKind3 = [pairs[3],pairs[4],pairs[5]];
							rank.push(consts.THREE_OF_KIND);
							rank.push([...threeOfKind3,...getHighRankCards( compareCards, threeOfKind3, 2 )]);
						} 
					}
					else {
						rank.push(consts.TWO_PAIR);
						rank.push([...pairs.splice(0,4),...getHighRankCards( compareCards, pairs, 1 )]);
					}
					break;

				case 7:
					if ( pairs[0].get_name() == pairs[3].get_name() ) {
						let fourOfKind3 = [pairs[0],pairs[1],pairs[2],pairs[3],];
						rank.push(consts.FOUR_OF_KIND);
						rank.push([...fourOfKind3,...getHighRankCards( compareCards, fourOfKind3, 1 )]);
					}
					else if ( pairs[3].get_name() == pairs[6].get_name() ) {
						let fourOfKind4 = [pairs[3],pairs[4],pairs[5],pairs[6],];
						rank.push(consts.FOUR_OF_KIND);
						rank.push([...fourOfKind4,...getHighRankCards( compareCards, fourOfKind4, 1 )]);
					}
					else if ( pairs[0].get_name() == pairs[2].get_name() ) {
						if ( pairs[3].get_name() == pairs[4].get_name() ) {
							rank.push(consts.FULL_HOUSE);
							rank.push([...pairs.splice(0,5)]);
						} else {
							let threeOfKind5 = [pairs[0],pairs[1],pairs[2]];
							rank.push(consts.THREE_OF_KIND);
							rank.push([...threeOfKind5,...getHighRankCards( compareCards, threeOfKind5, 2 )]);
						}
					}
					else if ( pairs[4].get_name() == pairs[6].get_name() ) {
						if ( pairs[2].get_name() == pairs[3].get_name() ) {
							rank.push(consts.FULL_HOUSE);
							rank.push([...pairs.splice(2,5)]);
						} else {
							let threeOfKind6 = [pairs[4],pairs[5],pairs[6]];
							rank.push(consts.THREE_OF_KIND);
							rank.push([...threeOfKind6,...getHighRankCards( compareCards, threeOfKind6, 2 )]);
						}
					} 
					else if ( pairs[2].get_name() == pairs[4].get_name() )  {
						if ( pairs[0].get_name() == pairs[1].get_name() ) {
							rank.push(consts.FULL_HOUSE);
							rank.push([...pairs.splice(0,5)]);
						} else if ( pairs[5].get_name() == pairs[6].get_name() ) {
							rank.push(consts.FULL_HOUSE);
							rank.push([...pairs.splice(2,5)]);
						} else {
							let threeOfKind7 = [pairs[2],pairs[3],pairs[4]];
							rank.push(consts.THREE_OF_KIND);
							rank.push([...threeOfKind7,...getHighRankCards( compareCards, threeOfKind7, 2 )]);
						}
					}
					break;
			}
		}
	}

	console.log(rank);
}

checkRanking();
module.exports.checkRanking = checkRanking;
