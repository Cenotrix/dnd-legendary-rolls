const btn = document.querySelector("#btn");
const statlist = document.querySelector("#statlist");
const totalValue = document.querySelector("#total-value");
const totalAbilityValue = document.querySelector("#total-ability-value");
const rollHistory = document.querySelector("#roll-history");
const minDiceMan = document.querySelector("#dice-manipulator-min");
const maxDiceMan = document.querySelector("#dice-manipulator-max");


/** legendaryRoll
 * Der Algorithmus um einen legendary roll auszuführen.
 */

const sortAsc = ( array ) => array.sort( ( a, b ) => a - b );

const stats = {
	stats: [],
	getStats: function() {

	}
}

const stat = {
	min: 0,
	max: 18,
	stat: [],
	actualStat: [],
	getRoll: function(rerolled) {
		number = Math.floor( Math.random() * 6 ) + 1;

		if( rerolled === true ) {
			return number;
		}

		if( number === 1 && rerolled !== true ) {
			return this.getRoll( true );
		}

		return number;
	},
	calculateStat: function() {
		
	}
	,
	getStat: function() {
		this.stat = [];
		for(i = 0; i <= 3; i++) {
			this.stat.push(this.getRoll());
		}
	},
	getActualStat: function() {
		this.actualStat = sortAsc([...this.stat]).slice(1,4);
	}
}