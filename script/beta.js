// Zum aufsteigendem Sortieren von Arrays
const sortAsc = ( array ) => array.sort( ( a, b ) => a - b );

// Errechnet die Summe des Arrays
const sumOfArray = ( array ) => array.reduce( ( a, b ) => a + b, 0 );

/* Befindet sich jetzt in dem Objekt "Stat"
function fudgeLegendaryRoll(desiredValue, minChar, maxChar) {
	let 
	possibleCombinations = [],
	possibleCharacters = [];

	for( let i = minChar; i <= maxChar; i++ ) {
		possibleCharacters.push(i);
	}

	for(let i = 0, j = 0; i <= possibleCharacters.length && j <= possibleCharacters.length; j++) {
		let missing;

		// Push der Kombination in das array, wenn es eine gültige Kombination ist.
		if( possibleCharacters[i] + possibleCharacters[(possibleCharacters.length - ( j + 1))] < desiredValue) {
			missing = desiredValue - parseInt( possibleCharacters[i] + possibleCharacters[possibleCharacters.length - ( j + 1 )] );
			if( missing <= possibleCharacters[possibleCharacters.length - 1] ){
				possibleCombinations.push( possibleCharacters[i] + " + " + possibleCharacters[possibleCharacters.length - ( j + 1 )] + " + " + possibleCharacters[missing-1] );
			}
		}
		// Erhöht den i Wert, sobald alle Kombinationen überprüft wurden. Reset des j Wertes.
		if( missing === possibleCharacters[possibleCharacters.length - 1] || possibleCharacters[i] + possibleCharacters[0] + possibleCharacters[missing-1] == desiredValue && possibleCharacters[missing-1] < possibleCharacters[possibleCharacters.length-1]){
			i++;
			j = -1;
		}
		// Erhöht den i Wert, sobald es keine gültige Kombinationsmöglichkeiten mit dem ersten possibleCharacter[i] gibt. Reset des j Wertes.
		if( possibleCharacters[i] + possibleCharacters[possibleCharacters.length - ( j + 1 )] + possibleCharacters[possibleCharacters.length - 1] < desiredValue ) {
			i++;
			j = -1;
		}
	}
	// Return des vollständigen Arrays
	return possibleCombinations;
}
*/

function Dice( diceMin, diceMax ) {
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

function Stat( boundElement ) {
	this.boundElement = boundElement,
	this.diceMin = 1,
	this.diceMax = 6,
	this.statMin = 3,
	this.statMax = 18,
	this.setMin = function(value) {
		this.diceMin = value;
	},
	this.setMax = function(value) {
		this.diceMax = value;
	},
	this.legendaryRoll = function() {
		dice6.legendaryRoll();
	},
	this.getFudgedLegendaryRoll = function( desiredValue ) {
		let combination = this.getArrayWithFudgedLegendaryRollCombinations( desiredValue, this.diceMin, this.diceMax ),
		min = 0,
		max = combination.length - 1,
		randomNumber = Math.floor( Math.random() * ((max) - (min - 1))) + min;

		return combination[randomNumber];
	},
	this.getArrayWithFudgedLegendaryRollCombinations = function( desiredValue, minDieValue, maxDieValue ) {
		let
		possibleCombinations = [],
		possibleCharacters = [];
		
		minDieValue === undefined ? minDieValue = this.diceMin : minDieValue = minDieValue;
		maxDieValue === undefined ? maxDieValue = this.diceMax : maxDieValue = maxDieValue;

		for( let i = minDieValue; i <= maxDieValue; i++ ) {
			possibleCharacters.push(i);
		}

		for(let i = 0, j = 0; i <= possibleCharacters.length && j <= possibleCharacters.length; j++) {
			let missing;

			// Push der Kombination in das array, wenn es eine gültige Kombination ist.
			if( possibleCharacters[i] + possibleCharacters[(possibleCharacters.length - ( j + 1))] < desiredValue) {
				missing = desiredValue - parseInt( possibleCharacters[i] + possibleCharacters[possibleCharacters.length - ( j + 1 )] );
				if( missing <= possibleCharacters[possibleCharacters.length - 1] ){
					possibleCombinations.push( possibleCharacters[i] + " + " + possibleCharacters[possibleCharacters.length - ( j + 1 )] + " + " + possibleCharacters[missing-1] );
				}
			}
			// Erhöht den i Wert, sobald alle Kombinationen überprüft wurden. Reset des j Wertes.
			if( missing === possibleCharacters[possibleCharacters.length - 1] || possibleCharacters[i] + possibleCharacters[0] + possibleCharacters[missing-1] == desiredValue && possibleCharacters[missing-1] < possibleCharacters[possibleCharacters.length-1]){
				i++;
				j = -1;
			}
			// Erhöht den i Wert, sobald es keine gültige Kombinationsmöglichkeiten mit dem ersten possibleCharacter[i] gibt. Reset des j Wertes.
			if( possibleCharacters[i] + possibleCharacters[possibleCharacters.length - ( j + 1 )] + possibleCharacters[possibleCharacters.length - 1] < desiredValue ) {
				i++;
				j = -1;
			}
		}
		// Return des vollständigen Arrays
		return possibleCombinations;
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
			this.stat.push(this.legendaryRoll());
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

let stats = document.querySelectorAll("#statlist li");

// Alle Stats.
let str = new Stat([...stats][0]);
let dex = new Stat([...stats][1]);
let con = new Stat([...stats][2]);
let int = new Stat([...stats][3]);
let wis = new Stat([...stats][4]);
let cha = new Stat([...stats][5]);

// Alle Dices.
const dice4 = new Dice(1, 4);
const dice6 = new Dice(1, 6);
const dice8 = new Dice(1, 8);
const dice10 = new Dice(1, 10);
const dice12 = new Dice(1, 12);
const dice20 = new Dice(1, 20);
const dice100 = new Dice(1, 100);