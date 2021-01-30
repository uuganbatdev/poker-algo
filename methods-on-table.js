"use strict";

let { Table } = require('./Table');
let { popDeck, restoreDeck, deckLength } = require('./methods-on-cards');
let { checkRanking } = require('./checkRanking');
let consts = require('./constants-in-check-ranking');

let drawToTable = () => {
	Table.communityCards.push(popDeck());
}

let getCommunityCards = () => {
	return Table.communityCards;
}

let clearCommunityCards = () => {
	Table.communityCards = [];
}

let isReadyToPlay = () => {
	if(Table.players.length < 2){
		return false;
	} else {
		Table.isAbleToPlay = true;
		return true;
	}
}

let fillTablePlayer = (player, playerIndex) => {
	Table.players[playerIndex] = player;
}


let doSomethingOnPlayers = (callback) => {
	for (let i = 0; i < Table.players.length; i++) {
		if (Table.players[i]) {
			callback(Table.players[i]);
		}
	}
}

let giveCardsToPlayers = () => {
	doSomethingOnPlayers(
		(player) => player.set_handCards()
	)
}

let whoWinner = () => {
	let result = [];
	let rankingResult;
	let players = [];

	doSomethingOnPlayers(
		(player) => {
			rankingResult = checkRanking(player.get_handCards(),Table.communityCards);
			player.set_roundRank(rankingResult[0]);
			player.set_roundCard(rankingResult[1]);
		}
	);

	doSomethingOnPlayers(
		(player) => {
			players.push(player);
		}
	)

	let highestRank = 0;
	for ( let i = 0; i < players.length; i++ ) {
		if ( players[i].get_roundRank()[1] > highestRank ) {
			highestRank = players[i].get_roundRank()[1]; 
		}
	}
	for ( let i = 0; i < players.length; i++ ) {
		if ( players[i].get_roundRank()[1] == highestRank ) {
			result.push(players[i]);
		}
	}

	return result;
}

let clearPayersRoundRankCards = () => {
	doSomethingOnPlayers(
		(player) => {
			player.set_roundRank([]);
			player.set_roundCard([]);
			player.clear_handCards();
		}
	)
}

let showTable = () => console.log(Table);

module.exports = {
	drawToTable,
	isReadyToPlay,
	fillTablePlayer,
	showTable,
	giveCardsToPlayers,
	getCommunityCards,
	clearCommunityCards,
	whoWinner,
	clearPayersRoundRankCards 
}
