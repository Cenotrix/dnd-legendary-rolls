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

    ( a[] + b[] + c[] + ... + n[] ) == combinationValue /* Das ist das Statement, welches immer true sein muss, damit die Werte in das combinationArr gepusht werden. */

    irgendwas ? combinationArr.push(getCombinations( arr, combinationArr, combinationValue, combinatorCount, currentIndex )) : combination;
}