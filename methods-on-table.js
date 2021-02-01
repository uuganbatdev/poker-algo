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

	let cardRank = (player,cardIndex) => {
		return player.get_roundCard()[cardIndex].get_rank();
	}
	let checkTie = 0;
	if ( result.length == 1 ) {
		return result;
	} else {
		for ( let i in result ) {
			console.log(result[i].get_handCards());
		}
		switch ( result[0].get_roundRank()[0] ) {
			case consts.HIGH_CARD:
				for ( let i = 0; i < result.length - 1; i++ ) {
					if ( cardRank(result[i],0) > cardRank(result[i+1],0) ) {
						result.splice(i+1,1);
					} else if ( cardRank(result[i],0) == cardRank(result[i+1],0) ) {
						if ( cardRank(result[i],1) > cardRank(result[i+1],1) ) {
							result.splice(i+1,1);
						} else if ( cardRank(result[i],1) == cardRank(result[i+1],1) ) {
							if ( cardRank(result[i],2) > cardRank(result[i+1],2) ) {
								result.splice(i+1,1);
							} else if ( cardRank(result[i],2) == cardRank(result[i+1],2) ) {
								if ( cardRank(result[i],3) > cardRank(result[i+1],3) ) {
									result.splice(i+1,1);
								} else if ( cardRank(result[i],3) == cardRank(result[i+1],3) ) {
									if ( cardRank(result[i],4) > cardRank(result[i+1],4) ) {
										result.splice(i+1,1);
									} else if ( cardRank(result[i],4) == cardRank(result[i+1],4) ) {
										continue;
									} else {
										result.splice(i,1);
									}
								} else {
									result.splice(i,1);
								}
							} else {
								result.splice(i,1);
							}
						} else {
							result.splice(i,1);
						}
					} else {
						result.splice(i,1);
					} 

					if ( i == 0 ) {
						i = 0;
					} else {
						i--;
					}
				}
				break;
			case consts.ONE_PAIR:
				for ( let i = 0; i < result.length - 1; i++ ) {
					if ( cardRank(result[i],0) > cardRank(result[i+1],0) ) {
						result.splice(i+1,1);
					} else if ( cardRank(result[i],0) == cardRank(result[i+1],0) ) {
						if (cardRank(result[i],2) > cardRank(result[i+1],2) ) {
							result.splice(i+1,1);
						} else if ( cardRank(result[i],2) == cardRank(result[i+1],2) ) {
							if ( cardRank(result[i],3) > cardRank(result[i+1],3) ) {
								result.splice(i+1,1);
							} else if ( cardRank(result[i],3) == cardRank(result[i+1],3) ) {
								if ( cardRank(result[i],4) > cardRank(result[i+1],4) ) {
									result.splice(i+1,1);
								} else if ( cardRank(result[i],4) == cardRank(result[i+1],4) ) {
									continue;
								} else {
									result.splice(i,1);
								}
							} else {
								result.splice(i,1);
							}
						} else {
							result.splice(i,1);
						}
					} else {
						result.splice(i,1);
					} 
					if ( i == 0 ) {
						i = 0;
					} else {
						i--;
					}
				}
				break;
			case consts.TWO_PAIR:
				for ( let i = 0; i < result.length - 1; i++ ) {
					if ( cardRank(result[i],0) > cardRank(result[i+1],0) ) {
						result.splice(i+1,1);
					} else if ( cardRank(result[i],0) == cardRank(result[i+1],0) ) {
						if (cardRank(result[i],2) > cardRank(result[i+1],2) ) {
							result.splice(i+1,1);
						} else if ( cardRank(result[i],2) == cardRank(result[i+1],2) ) {
							if ( cardRank(result[i],4) > cardRank(result[i+1],4) ) {
								result.splice(i+1,1);
							} else if ( cardRank(result[i],4) == cardRank(result[i+1],4) ) {
								continue;
							} else {
								result.splice(i,1);
							}
						} else {
							result.splice(i,1);
						}
					} else {
						result.splice(i,1);
					} 
					if ( i == 0 ) {
						i = 0;
					} else {
						i--;
					}
				}
				break;
			case consts.THREE_Of_KIND:
				for ( let i = 0; i < result.length - 1; i++ ) {
					if ( cardRank(result[i],0) > cardRank(result[i+1],0) ) {
						result.splice(i+1,1);
					} else if ( cardRank(result[i],0) == cardRank(result[i+1],0) ) {
						if (cardRank(result[i],3) > cardRank(result[i+1],3) ) {
							result.splice(i+1,1);
						} else if ( cardRank(result[i],3) == cardRank(result[i+1],3) ) {
							if ( cardRank(result[i],4) > cardRank(result[i+1],4) ) {
								result.splice(i+1,1);
							} else if ( cardRank(result[i],4) == cardRank(result[i+1],4) ) {
								continue;
							} else {
								result.splice(i,1);
							}
						} else {
							result.splice(i,1);
						}
					} else {
						result.splice(i,1);
					} 
					if ( i == 0 ) {
						i = 0;
					} else {
						i--;
					}
				}
				break;
			case consts.STRAIGHT:
				for ( let i = 0; i < result.length - 1; i++ ) {
					if ( cardRank(result[i],0) > cardRank(result[i+1],0) ) {
						result.splice(i+1,1);
					} else if ( cardRank(result[i],0) == cardRank(result[i+1],0) ) {
						continue;
					} else {
						result.splice(i,1);
					} 
					if ( i == 0 ) {
						i = 0;
					} else {
						i--;
					}
				}
				break;
			case consts.FLUSH:
				for ( let i = 0; i < result.length - 1; i++ ) {
					if ( cardRank(result[i],0) > cardRank(result[i+1],0) ) {
						result.splice(i+1,1);
					} else if ( cardRank(result[i],0) == cardRank(result[i+1],0) ) {
						if (cardRank(result[i],1) > cardRank(result[i+1],1) ) {
							result.splice(i+1,1);
						} else if ( cardRank(result[i],1) == cardRank(result[i+1],1) ) {
							if ( cardRank(result[i],2) > cardRank(result[i+1],2) ) {
								result.splice(i+1,1);
							} else if ( cardRank(result[i],2) == cardRank(result[i+1],2) ) {
								if ( cardRank(result[i],3) > cardRank(result[i+1],3) ) {
									result.splice(i+1,1);
								} else if ( cardRank(result[i],3) == cardRank(result[i+1],3) ) {
									if ( cardRank(result[i],4) > cardRank(result[i+1],4) ) {
										result.splice(i+1,1);
									} else if ( cardRank(result[i],4) == cardRank(result[i+1],4) ) {
										continue;
									} else {
										result.splice(i,1);
									}
								} else {
									result.splice(i,1);
								}
							} else {
								result.splice(i,1);
							}
						} else {
							result.splice(i,1);
						}
					} else {
						result.splice(i,1);
					} 
					if ( i == 0 ) {
						i = 0;
					} else {
						i--;
					}
				}
				break;
			case consts.FULL_HOUSE:
				for ( let i = 0; i < result.length - 1; i++ ) {
					if ( cardRank(result[i],0) > cardRank(result[i+1],0) ) {
						result.splice(i+1,1);
					} else if ( cardRank(result[i],0) == cardRank(result[i+1],0) ) {
						if (cardRank(result[i],3) > cardRank(result[i+1],3) ) {
							result.splice(i+1,1);
						} else if ( cardRank(result[i],3) == cardRank(result[i+1],3) ) {
							continue;
						} else {
							result.splice(i,1);
						}
					} else {
						result.splice(i,1);
					} 
					if ( i == 0 ) {
						i = 0;
					} else {
						i--;
					}
				}
				break;
			case consts.FOUR_OF_KIND:
				for ( let i = 0; i < result.length - 1; i++ ) {
					if ( cardRank(result[i],0) > cardRank(result[i+1],0) ) {
						result.splice(i+1,1);
					} else if ( cardRank(result[i],0) == cardRank(result[i+1],0) ) {
						if (cardRank(result[i],4) > cardRank(result[i+1],4) ) {
							result.splice(i+1,1);
						} else if ( cardRank(result[i],4) == cardRank(result[i+1],4) ) {
							continue;
						} else {
							result.splice(i,1);
						}
					} else {
						result.splice(i,1);
					} 
					if ( i == 0 ) {
						i = 0;
					} else {
						i--;
					}
				}
				break;
			case consts.STRAIGHT_FLUSH:
				for ( let i = 0; i < result.length - 1; i++ ) {
					if ( cardRank(result[i],0) > cardRank(result[i+1],0) ) {
						result.splice(i+1,1);
					} else if ( cardRank(result[i],0) == cardRank(result[i+1],0) ) {
						continue;
					} else {
						result.splice(i,1);
					} 
					if ( i == 0 ) {
						i = 0;
					} else {
						i--;
					}
				}
				break;
		}
		return result;
	}

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

let showTable = () => console.log(Table.communityCards);

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
