// für 10
[
	"1 + 6 + 3",
	"1 + 5 + 4",
	"2 + 6 + 2",
	"2 + 5 + 3",
	"2 + 4 + 4",
	"3 + 4 + 3",
];

function getCombinations( 
    arr, /* Ist das Array, welches die zulässlichen Zeichen beinhaltet. z.B. [1,2,3,4,5,6] */
    combinationArr, /* Ist das Array, welches am Ende ausgegeben wird, in welchem die Kombinationen stehen */
    combinationValue, /* Ist der Wert, welcher durch Kombination der Werte aus arr erreicht werden soll. */
    combinatorCount, /* Ist der Wert, der bestimmt wie viele Zeichen aus arr benutzt werden dürfen um combinationValue zu erreichen */
    currentIndex  /* Ist der derzeitige Index. (Bestimmt für irgendetwas gut.) */
) {
    !currentIndex ? currentIndex = 0 : currentIndex = currentIndex + 1; // Beim rekursiven Aufruf der Funktion wird der currentIndex mitgegeben.

    /*( a[] + b[] + c[] + ... + n[] ) == combinationValue*/ /* Das ist das Statement, welches immer true sein muss, damit die Werte in das combinationArr gepusht werden. */

    /*
    for( let i = 0; i < arr.length; i++ ) {
        for( let n = 0; n < arr.length; n++ ) {
            for( let m = 0; m < arr.length; m++ ) {
                if( arr[i] + arr[n] + arr[m] == combinationValue ) {
                    combinationArr.push( arr[i] + " + " + arr[n] + " + " + arr[m] );
                }
            }
            m = 0;
        }
        n = 0;
    }
    */

    getCombinations( arr, combinationArr, combinationValue, combinatorCount, currentIndex )
    
    // irgendwas ? combinationArr.push(getCombinations( arr, combinationArr, combinationValue, combinatorCount, currentIndex )) : combination;
}


/* Ist doch useless für das, was ich vorhabe */
function doTheMath( arr, currentIndex ) {
    currentIndex === undefined ? currentIndex = arr.length - 1 : currentIndex = currentIndex - 1;
    return currentIndex >= 0 ? arr[currentIndex] + doTheMath( arr, currentIndex ) : 0;
}

function valueCombinations( arr, combinationArr, depth, currentDepth, currentindex, desiredValue ) {


    if( currentDepth !== depth ) {
        if( doTheMath(combinationArr) + arr[currentIndex] <= desiredValue ) {
            return combinationArr.push( arr[currentIndex] );
        }else if( doTheMath(combinationArr) + arr[currentIndex] < desiredValue ) {
            return valueCombinations( arr, combinationArr, depth, currentDepth, currentindex + 1, desiredValue );
        }
    }
}

valueCombinations( [1,2,3,4,5,6], [], 3, 0, 0 );

/*
function sum (array) {
	let sum = 0;
	array.map((number) => {sum = sum + number;});
	return sum;
}

function multiply (array) {
	let sum = 1;
	array.map((number) => sum = sum * number);
	return sum;
}
*/