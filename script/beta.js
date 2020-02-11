/*
* btn ist das Div, auf das man zum starten klicken kann
* statlist ist die ul, in der die Werte angezeigt werden, zuerst sind 6 * <li>0</li> in ihr
* totalValue ist das p unter dem p mit "Total" als inhalt
* totalAbilityValue ist das p unter dem p mit "Total Ability Plus" als inhalt
* rollHistory ist der table, der zu Beginn nur die Aufteilung hat.
* minDiceMan ist das Inputfeld für den minimal Wert
* maxDiceMan ist das Inputfeld für den maximal Wert
* multiChar ist das Inputfeld für die Anzahl der Charaktere die gerollt werden sollen.
*/
const btn = document.querySelector("#btn");
const statlist = document.querySelector("#statlist");
const totalValue = document.querySelector("#total-value");
const totalAbilityValue = document.querySelector("#total-ability-value");
const rollHistory = document.querySelector("#roll-history");
const minDiceMan = document.querySelector("#dice-manipulator-min");
const maxDiceMan = document.querySelector("#dice-manipulator-max");
const multiChar = document.querySelector("#multi-char-roll");
/*
* rolls ist das Array, in dem später die Werte von einem roll stehen. Es wird 6 mal überschrieben und ausgegeben.
* allValues ist das Array, in dem einfach alle Werte die zum displayed gebraucht werden drinne stehen.
* totalRollValue ist eine Variable in der der totale Wert von dem gerollten steht.
* rollValue ist eine Variable die immer wieder mit dem Value von einem Roll überschrieben und ausgegeben wird.
* rollValueHistory ist ein array, das 6 mal den rollValue speichert.
* rollString ist für die schöne ausgabe der rolls.
*/
var rolls = [];
var allValues = [];
var totalRollValue = 0;
var rollValue = 0;
var rollValueHistory = [];
var rollString;
var totalAbilityPlusValue = 0;
var multiCharValue = 0;
/*
* Zählvariable
*/
var i = 0;
var n = 0;
var m = 0;
/*
* Zwischenspeichervariable
*/
var a;
var b;

/* executeEverything function
* führt die diceMaster function multiChar.value oft aus.
* wenn kein multiChar.value gegeben ist, nur 1 mal
*/
function executeEverything() {
	if( multiChar.value > 0 ) {
		multiCharValue = multiChar.value -1;
	}else {
		multiCharValue = 0;
	}
	do {
		diceMaster();
		multiCharValue = multiCharValue - 1;
	}while( multiCharValue > 0 );
}

/* diceMaster function
* führt die meisten functions zusammen
* checkt ob die min/max Total Werte stimmen, sonst rerollt.
*/
function diceMaster() {
	/*
	* Die function fängt damit an sich einmal alles zu erwürfeln
	* sollten die min / max nicht gegeben sein passiert nichts weiter.
	*/
	getAllValues();

	/* Die if's
	* Die if >= 36 sind checks, ob der mindest Wert von 36 (6*6) gegeben ist.
	* Die sind beim min Dice eig. überflüssig, da er immer auf über 36 kommt.
	* Die if <= 108 sind checks, ob der maximale Wert von 108 (6*18) nicht überschritten wird.
	* Die sind beim max Dice eig. überflüssig, da er nicht über 108 kommen kann.
	*/
	if( maxDiceMan.value >= 36 && minDiceMan.value >= 36 && ( maxDiceMan.value + 1 ) > minDiceMan.value ){
		if( maxDiceMan.value <= 108 && minDiceMan.value <= 108 ) {
			do {
				getAllValues();
			}while( totalRollValue > maxDiceMan.value || totalRollValue < minDiceMan.value );
			/*
			+ Wenn der gewürfelte Wert über dem eingegebenen max. Wert liegt 
			* ODER
			* wenn der gewürfelte Wert unter dem eingegebenen min. Wert liegt
			* werden 6 neue Werte gewürfelt.
			*/
		}
	}else {
		if( minDiceMan.value >= 36 ) {
			if( minDiceMan.value <= 108 ) {
				do{
					getAllValues();
				}while( totalRollValue < minDiceMan.value );
				/*
				* Wenn der gewürfelte Wert unter dem eingegebenen min. Wert liegt
				* werden 6 neue Werte gewürfelt.
				*/
			}
		}else {
			if( maxDiceMan.value >= 36 ) {
				if( maxDiceMan.value <= 108 ) {
					do {
						getAllValues();
					}while( totalRollValue > maxDiceMan.value );
					/*
					* Wenn der gewürfelte Wert über dem eingegebenen max. Wert liegt
					* werden 6 neue Werte gewürfelt.
					*/
				}
			}
		}
	}
	/*
	* Sollte alles soweit gecheckt sein(if's und else's) werden die Werte angezeigt.
	*/
	displayValues();
}

/* displayValues function
* Ändert die innerHTML von der statlist
* Verschönert die Anzeige
* Gibt die richtigen Werte and addToHistory weiter
*/
function displayValues() {
	/*
	* Reset Variable
	*/
	totalAbilityPlusValue = 0;
	for( n = 0; n <= 5; n++ ) {
		/*
		* muss roll Value jedes mal resetten.
		*/
		rollValue = 0;
		for( i = 1; i <= 3; i++ ) {
			rollValue = rollValue + allValues[n][i];
		}
		/*
		* für die Ausgabe wird der string aus dem array erstellt und verschönert.
		*/
		rollString = allValues[n].toString();
		rollString = rollString.replace(/,/g," + ");
		//Total Ability Plus Value wird ausgerechnet
		totalAbilityPlusValue = totalAbilityPlusValue + getAPM( rollValue );
		
		rollValueHistory[n] = rollValue;
		/* Beispielausgabe: 2 + 4 + 4 + 5, drop(2) = 13 (1)
		* rollString = 2 + 4 + 4 + 5,
		* allValues[n][0] = 2,
		* rollValue = 13,
		* getAPM(rollValue) = 1
		*/
		statlist.children[n].innerHTML =  rollString + ", drop(" + allValues[n][0] + ")" + " = " + rollValue  + " (" + getAPM( rollValue ) + ")";
	}
	// Anzeige des Total-Wert
	totalValue.innerHTML = totalRollValue;
	//Anzeige des Total Ability Plus-Wert
	totalAbilityValue.innerHTML = totalAbilityPlusValue;
	/*
	* Für die Roll History müssen einige Werte übergeben werden. diese werden in die Variablen geschrieben, wenn es sie noch nicht gibt
	*/
	rollString = rollValueHistory.toString();
	rollString = rollString.replace( /,/g," + " );
	addToHistory( rollString, totalAbilityPlusValue, totalRollValue );
}

/* getAllValues function
* allValues wird mit 6 Array's mit 4 Zahlen gefüllt.
* totalRollValue wird ausgerechnet
*/
function getAllValues() {
	/*
	* Reset der Variablen
	*/
	allValues = [];
	rolls = [];
	totalRollValue = 0;
	for( n = 0; n <= 5; n++ ){
		for( i = 0; i <= 3; i++ ){
			rolls.push( randomDice() );
			//console.log(rolls);
		}
		/*
		* rolls wird aufsteigend sortiert
		* all Values wird mit 6 rolls befüllt
		*/
		rolls = sortAsc( rolls );
		allValues[n] = rolls;
		rolls = [];
		totalRollValue = totalRollValue + addTotalRollValue( allValues[n] );
	}
}

/* 
* Rolling function
* Rollt mindestens 1x und solange number = 1 ist. (Legendary rolls Regeln, reroll 1's, once)
* Rollt nur 1 Zahl.
*/
/* !! LEGACY FUNCTION !!
function randomDice() {
	let number = Math.floor(Math.random() * 6) + 1;
	do{
		number = Math.floor(Math.random() * 6) + 1;
	}while(number == 1);
	return number;
}
*/
/* !! LEGACY FUNCTION !!
function randomDice(rerolled) {
	let number = Math.floor(Math.random() * 6) + 1;

	if( rerolled === true ) {
		return number;
	}

	if( number == 1 && rerolled !== true ) {
		return randomDice( true );
	}
	
	return number;
	
}
*/
let randomDice = ( rerolled ) => {
	let number = Math.floor(Math.random() * 6) + 1;

	if( rerolled === true ) {
		return number;
	}

	if( number === 1 && rerolled !== true ) {
		return randomDice( true );
	}

	return number;
}

/* addTotalRollValue function
* Rechnet den Wert aus dem Array zusammen.
* Ignoriert dabei den ersten Wert, da das Array sortiert ist und es sich um Legendary Rolls handelt.
*/
/* !! LEGACY FUNCTION !!
function addTotalRollValue(array) {
	b = 0;
	for(i = 1; i < array.length; i++){
		b = b + array[i];
	}
	return b;
}
*/
let addTotalRollValue = ( array ) => array.shift().reduce( ( a, b ) => a + b, 0 );

/* Drop lowest function
* Sortiert das Array der größe nach.
*/
/* !! LEGACY FUNCTION !!
function sortAsc(array) {
	array.sort(function(a, b){return a - b});
	return array;
}
*/
let sortAsc = ( array ) => array.sort( ( a, b ) => a - b );

/* Roll History
* Erstellt die Roll History
* Add 1 tr to table und call addToHistoryUl
*/
function addToHistory( valueA, valueB, valueC ){
	/*
	* newTr erstellt immer neue table rows
	* tr ist ein array mit allen tr's
	* valueA = gewürfelte werte
	* valueB = total ability plus
	* valueC = total
	*/
	var newTr = document.createElement( "tr" );
	var tr = document.getElementsByClassName( "roll-history" );
	/*
	*
	*/
	newTr.setAttribute( "class", "roll-history" );
	rollHistory.appendChild( newTr );
	m = rollHistory.children.length - 1;
	
	addToHistoryTr( valueA, m );
	addToHistoryTr( valueB, m );
	addToHistoryTr( valueC, m );
}

/* addToHistory function
* Add 1 td to the tr
*/
function addToHistoryTr( value, num ){
	var newTd = document.createElement("td");
	newTd.appendChild( document.createTextNode( value ) );
	rollHistory.children[num].appendChild( newTd )
}

/*
* APM = Ability Plus Math zum ausrechnen des Ability Score Imporves.
*/
/* !! LEGACY FUNCTION !!
function getAPM(rollValue){
	var APM = Math.floor((rollValue - 10) / 2);
	return APM;
}
*/
let getAPM = ( rollValue ) => Math.floor( ( rollValue - 10 ) / 2 );

/*
* Führt alles aus, wenn btn geklickt wird.
*/
btn.onclick = executeEverything;