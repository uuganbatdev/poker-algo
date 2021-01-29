let { popDeck } = require('./methods-on-cards')
let consts = require('./constants-in-check-ranking');

let Player = class Player {
	isSmallBlind = false;
	isBigBlind = false;
	isFolded = false;
	handCards = [];
	roundRank = [];
	roundCard = [];

	constructor(
		pname,
		totalMoney,
		moneyOnTable,
		sitIndex,
	){
		this.pname = pname;	
		this.totalMoney = totalMoney;
		this.moneyOnTable = moneyOnTable;
		this.sitIndex = sitIndex;
	}

	get_roundRank() {
		return this.roundRank;
	}

	set_roundRank(newroundRank) {
		if (newroundRank == 0) {
			this.roundRank == [];
		} else {
			this.roundRank.push(newroundRank);
			switch (newroundRank) {
				case consts.HIGH_CARD:
					this.roundRank.push(consts.HIGH_CARD_RANK);
					break;
				case consts.ONE_PAIR:
					this.roundRank.push(consts.ONE_PAIR_RANK);
					break;
				case consts.TWO_PAIR:
					this.roundRank.push(consts.TWO_PAIR_RANK);
					break;
				case consts.THREE_OF_KIND:
					this.roundRank.push(consts.THREE_OF_KIND_RANK);
					break;
				case consts.STRAIGHT:
					this.roundRank.push(consts.STRAIGHT_RANK);
					break;
				case consts.FLUSH:
					this.roundRank.push(consts.FLUSH_RANK);
					break;
				case consts.FULL_HOUSE:
					this.roundRank.push(consts.FULL_HOUSE_RANK);
					break;
				case consts.FOUR_OF_KIND:
					this.roundRank.push(consts.FOUR_OF_KIND_RANK);
					break;
				case consts.STRAIGHT_FLUSH:
					this.roundRank.push(consts.STRAIGHT_FLUSH_RANK);
					break;
				case consts.ROYAL_FLUSH:
					this.roundRank.push(consts.ROYAL_FLUSH_RANK);
					break;
			}
		}
	}

	get_roundCard() {
		return this.roundCard;
	}

	set_roundCard(newroundCard) {
		if ( newroundCard == 0 ) {
			this.roundCard = [];
		} else {
			this.roundCard = newroundCard;
		}
	}

	get_isSmallBlind() {
		return this.isSmallBlind;
	}

	set_isSmallBlind(newisSmallBlind) {
		this.isSmallBlind = newisSmallBlind;
	}

	get_isBigBlind() {
		return this.isBigBlind;
	}

	set_isBigBlind(newisBigBlind) {
		this.isBigBlind = newisBigBlind;
	}

	get_handCards() {
		return this.handCards;
	}

	set_handCards() {
		this.handCards[0] = popDeck();
		this.handCards[1] = popDeck();
	}
	clear_handCards() {
		this.handCards = [];
	}
	get_pname() {
		return this.pname;
	}

	get_isFolded() {
		return this.isFolded;
	}

	set_isFolded(newisFolded) {
		this.isFolded = newisFolded;
	}

	set_pname(newpname) {
		this.pname = newpname;
	}

	get_totalMoney() {
		return this.totalMoney;
	}

	set_totalMoney(newtotalMoney) {
		this.totalMoney = newtotalMoney;
	}

	get_moneyOnTable() {
		return this.moneyOnTable;
	}

	set_moneyOnTable(newmoneyOnTable) {
		this.moneyOnTable = newmoneyOnTable;
	}

	get_sitIndex() {
		return this.sitIndex;
	}

	set_sitIndex(newsitIndex) {
		this.sitIndex = newsitIndex;
	}

}

module.exports.Player = Player;
