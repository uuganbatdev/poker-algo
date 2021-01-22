let consts = require('./constants-in-check-ranking');

let checkRanking = (handCards, communityCards) => {
	// player ymuu table iin property value shuud oorchlohguin tuld huulbarlaj avch baina
	let cards = [[...handCards], [...communityCards]];
	// returns hand cards
	let getHCards = () => {
		return cards[0];
	}
	// returns community cards
	let getCCards = () => {
		return cards[1];
	}

	let loopThroughCommunityCards = (a = getHCards()) => {
		return a;
	}
	console.log(loopThroughCommunityCards());
	//all functions below return [ card-rank: pair,two pair ...etc, cards: array[5])]

}

module.exports.checkRanking = checkRanking;
