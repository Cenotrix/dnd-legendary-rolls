// Zum aufsteigendem Sortieren von Arrays
const sortAsc = ( array ) => array.sort( ( a, b ) => a - b );

// Errechnet die Summe des Arrays
const sumOfArray = ( array ) => array.reduce( ( a, b ) => a + b, 0 );

const makeCombinationArray = ( start, end, min, max  ) => {
	array = [];
	for(i = start; i <= end; i++) {
		array.push(i);
	}
	calculatePossibleCombination( array, min, max );
}

const calculatePossibleCombination = ( array, data, start, end, index, min, max ) => {
	for(i = min; i <= max; i++) {
		
	}
};


let array = [
				1,
				2,
				3,
				4,
				5,
				6
			]
let i = 0;
let j = 0;
let min = 10;
let missing;
let combiArray = [];

for(i = 0; i < array.length && j < array.length; j++) {
	if( array[i] + array[array.length - ( j + 1)] < min ) {
		missing = min - parseInt( array[i] + array[array.length - ( j + 1 )] );
		combiArray.push( array[i] + " + " + array[array.length - ( j + 1 )] + " + " + array[missing-1] );
	}
	if( missing === array[array.length - 1] ){
		i++;
		j = -1;
	}
}


// für 10
[
	"1 + 6 + 3",
	"1 + 5 + 4",
	"1 + 4 + 5",
	"1 + 3 + 6",
	"2 + 6 + 2",
	"2 + 5 + 3",
	"2 + 4 + 4",
	"2 + 3 + 5",
	"2 + 2 + 6",
	"3 + 6 + 1",
	"3 + 5 + 2",
	"3 + 4 + 3",
	"3 + 3 + 4",
	"3 + 2 + 5",
	"3 + 1 + 6",
	"4 + 5 + 1",
	"4 + 4 + 2",
	"4 + 3 + 3",
	"4 + 2 + 4",
	"4 + 1 + 5",
	"5 + 4 + 1",
	"5 + 3 + 2",
	"5 + 2 + 3",
	"5 + 1 + 4",
	"6 + 1 + 3",
	"6 + 2 + 2",
	"6 + 3 + 1"
];

// für 10
[
	"1 + 6 + 3",
	"1 + 5 + 4",
	"2 + 6 + 2",
	"2 + 5 + 3",
	"2 + 4 + 4",
	"3 + 4 + 3",
];

function getCombinations( arr, combinationArr, combinationValue, currentIndex ) {
	!currentIndex ? currentIndex = 0 : currentIndex = currentIndex;
	console.log(currentIndex);
}


function Dice(diceMin, diceMax) {
	this.diceMin = diceMin,
	this.diceMax = diceMax,
	this.rollDice = function( min, max ) {
		return Math.floor( Math.random() * ((this.diceMax) - (this.diceMin - 1))) + this.diceMin;
	},
	this.legendaryRoll = function( rerolled ) {
		number = Math.floor( Math.random() * ((this.diceMax) - (this.diceMin - 1))) + this.diceMin;

		if( rerolled === true ) {
			return number;
		}

		if( number === 1 ) {
			return this.getRoll( true );
		}

		return number;
	},
	this.fudgedRoll = function( min, max ) {
		if( min <= this.diceMin && max >= this.diceMax ) {
			return Math.floor( Math.random() * ((max) - (min - 1))) + min;
		}else {
			console.log("Die Zahlen müssen sich schon auf dem Würfel befinden ;)");
		}
	}
}

function Stat() {
	this.diceMin = 1,
	this.diceMax = 6,
	this.statMin = 3,
	this.statMax = 18,
	this.calculateDiceValues = function() {
		if( value % 3 === 0 ) {
			value = value / 3;
		}else {
			calculatePossibleCombination( this.statMin, this.statMax, 3 );
		}
	},
	this.setMin = function(value) {
		this.diceMin = value;
	},
	this.setMax = function(value) {
		this.diceMax = value;
	},
	this.getRoll = function() {
		dice6.legendaryRoll();
	},
	this.calculateStat = function() {
		if( this.actualStat !== undefined ) {
			this.statValue = sumOfArray( this.actualStat );
		}else {
			console.log("ERROR, this.actualStat ist noch nicht vorhanden. Use " + this + ".getActualStat.");
		}
	},
	this.getStat = function() {
		this.stat = [];
		for(i = 0; i <= 3; i++) {
			this.stat.push(this.getRoll());
		}
	},
	this.getActualStat = function() {
		if( this.stat !== undefined ) {
			this.actualStat = sortAsc([...this.stat]).slice(1,4);
		}else {
			console.log("ERROR, this.stat ist noch nicht vorhanden. Use " + this + ".getStat.");
		}
	}
}

// Alle Stats.
let str = new Stat();
let dex = new Stat();
let con = new Stat();
let int = new Stat();
let wis = new Stat();
let cha = new Stat();

// Alle Dices.
const dice4 = new Dice(1, 4);
const dice6 = new Dice(1, 6);
const dice8 = new Dice(1, 8);
const dice10 = new Dice(1, 10);
const dice12 = new Dice(1, 12);
const dice20 = new Dice(1, 20);
const dice100 = new Dice(1, 100);