export function Dice( diceMin, diceMax ) {
	this.diceMin = diceMin,
	this.diceMax = diceMax,
	this.rollDice = function( min, max ) {
		if( !min && !max ) {
			min = this.diceMin;
			max = this.diceMax;	
		}
		return Math.floor( Math.random() * ((max) - (min - 1))) + min;
	},
	this.legendaryRoll = function( rerolled ) {
		number = Math.floor( Math.random() * ( (this.diceMax) - (this.diceMin - 1) )) + this.diceMin;

		if( rerolled === true ) {
			return number;
		}

		if( number === 1 ) {
			return this.legendaryRoll( true );
		}

		return number;
	}
}