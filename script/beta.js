/* HIGHERORDER FUNCTIONS */
// Zum aufsteigendem Sortieren von Arrays
const sortAsc = ( array ) => array.sort( ( a, b ) => a - b );

// Errechnet die Summe des Arrays
const sumOfArray = ( array ) => array.reduce( ( a, b ) => a + b, 0 );

/* CONSTRUCTOR FUNCTIONS */
function Stat( boundElement ) {
	this.boundElement = boundElement,
	this.diceMin = 1,
	this.diceMax = 6,
	this.statMin = 3,
	this.statMax = 18,
	this.legendaryRoll = function() {
		return dice6.legendaryRoll();
	},
	this.getFudgedLegendaryRoll = function( desiredValue ) {
		let combinations = this.getArrayWithFudgedLegendaryRollCombinations( desiredValue, this.diceMin, this.diceMax ),
		min = 0,
		max = combination.length - 1,
		randomNumber = Math.floor( Math.random() * ((max) - (min - 1))) + min;

		return combinations[randomNumber];
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
			this.getActualStat();
			this.calculateStat();
			// console.log("ERROR, this.actualStat ist noch nicht vorhanden. Use " + this + ".getActualStat.");
		}
	},
	this.getStat = function() {
		this.stat = [];
		for(i = 0; i <= 3; i++) {
			this.stat.push(this.legendaryRoll());
		}
		this.sortAscStat = sortAsc([...this.stat]); // Das Stat Array, der größe nach sortiert, hat noch keinen Nutzen
		this.statString = ([...this.stat]).toString(); // Das Stat Array als String
		this.statString = this.statString.replace(/,/g," + "); // Der String des Stat Arrays verschönert, um es später besser zu verstehen.
	},
	this.getActualStat = function() {
		if( this.stat !== undefined ) {
			this.actualStat = sortAsc([...this.stat]).slice(1,4);
		}else {
			this.getStat();
			this.getActualStat();
			// console.log("ERROR, this.stat ist noch nicht vorhanden. Use " + this + ".getStat.");
		}
	},
	this.generateStat = function() {
		if( this.statValue === undefined ) {
			this.calculateStat();
		}
		return this.statValue;
	}
	this.displayStat = function() {
		if( this.statValue === undefined ) {
			this.generateStat();
		}
		this.boundElement.children[0].innerText = this.statString + " drop(" + Math.min(...this.stat) + ")" + " = "; // Der mathematische Weg zu dem Wert
		this.boundElement.children[1].innerText = this.statValue; // Der Wert, des Stats
	}
}

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

const stats = document.querySelectorAll("#statlist li");
function Character( name ) {
	name ? this.name = name : this.name = undefined,
	this.stats = [
		new Stat([...stats][0]),
		new Stat([...stats][1]),
		new Stat([...stats][2]),
		new Stat([...stats][3]),
		new Stat([...stats][4]),
		new Stat([...stats][5])
	],
	this.generateStats = function() {
		this.stats.forEach( stat => stat.generateStat() );
	},
	this.displayStats = function() {
		this.stats.forEach( stat => stat.displayStat() );
	},
	this.characterOptions = {
		dmOptions: {
			fullCharManipulator: [
				document.querySelector("#dice-manipulator-min"),
				document.querySelector("#dice-manipulator-max")
			],
			singleStatManipulator: [...document.querySelectorAll(".stat-options")],
		},
	}
}

const test = new Character();

/* OBJECTS UND OBJECT LITERALS */
// Display
const Display = {
	currentlyDisplayed: { /* Hier kommt dann der Character rein, der gerade angezeigt wird. */ },
	toggleDisplay: function() {
		/* Hier kommt dann die Funktion rein, um einen Leeren, oder einen alten Character anzuzeigen. */
	}
}

// Optionen
const PageOptions = {
	dmMode: {
		element: document.querySelector("#dm-mode"),
		boundElements: [
			document.querySelector("#dm-options"),
			...document.querySelectorAll(".dm-statlist-fudge")
		],
		toggleDmMode: function( status ) {
			status === true ? this.boundElements.forEach( element => element.classList.remove("display-none") ) : this.boundElements.forEach( (element) => element.classList.add("display-none") );
		},
	}
}

// Alle Dices.
const dice4 = new Dice(1, 4);
const dice6 = new Dice(1, 6);
const dice8 = new Dice(1, 8);
const dice10 = new Dice(1, 10);
const dice12 = new Dice(1, 12);
const dice20 = new Dice(1, 20);
const dice100 = new Dice(1, 100);

/* FUNCTIONS */
/* Versteckt und zeigt die DM Optionenm, nachdem ein Passwort abgefragt wurde. */
const dmBtn = document.querySelector("#dm-mode");
dmBtn.addEventListener('change', function() {
	if( dmBtn.checked === true ) {
		let dmPassword = window.prompt("Bitte das DM Passwort eingeben!");
		if( dmPassword === "25" /*|| dmPassword === "das gewünschte passwort" */ /*<- Für weitere Passwörter. Um das Passwort zu ändern, einfach den String "25" ändern. Es MUSS ein String sein, da mit === gearbeitet wird! */) {
			PageOptions.dmMode.toggleDmMode( true );
		}else {
			alert("Falsches Passwort!");
			dmBtn.checked = false;
		}
	}else {
		PageOptions.dmMode.toggleDmMode( false );
	}
});

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