let { popDeck } = require('./methods-on-cards')

let Player = class Player {
	isSmallBlind = false;
	isBigBlind = false;
	handCards = new Array(2);
	
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
	get_pname() {
		return this.pname;
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
