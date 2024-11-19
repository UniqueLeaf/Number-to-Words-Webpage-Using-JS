// Function to convert numbers to words for dollars and cents
function numberToWords(num) {
	if (isNaN(num) || num<0) return "Please enter a valid number.";

	const ones = [
		"", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"
	];
	const teens = [
		"Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"
	];
	const tens = [
		"", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"
	];
	const thousands = ["", "Thousand", "Million", "Billion"];

	const convertInteger = (n) => {
		if (n < 10) return ones[n];
		if (n < 20) return teens[n - 10];
		if (n < 100)
			return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? "-" + ones[n % 10] : "");
		if (n < 1000)
			return (
				ones[Math.floor(n / 100)] +
				" Hundred" +
				(n % 100 !== 0 ? " and " + convertInteger(n % 100) : "")
			);
		let word = "";
		let i = 0;
		while (n > 0) {
			if (n % 1000 !== 0) {
				word =
					convertInteger(n % 1000) +
					(thousands[i] !== "" ? " " + thousands[i] : "") +
					(word ? " " + word : "");
			}
			n = Math.floor(n / 1000);
			i++;
		}
		return word;
	};

	// Split the number into whole dollars and cents
	const [dollars, cents] = num.toString().split(".");

	let dollarPart =
		dollars && parseInt(dollars, 10) > 0
			? convertInteger(parseInt(dollars, 10)) + " Dollar" + (parseInt(dollars, 10) > 1 ? "s" : "")
			: "";

	let centPart =
		cents && parseInt(cents, 10) > 0
			? convertInteger(parseInt(cents.padEnd(2, "0"), 10)) + " Cent" + (parseInt(cents, 10) > 1 ? "s" : "")
			: "";

	if (dollarPart && centPart) {
		return dollarPart + " and " + centPart;
	} else if (dollarPart) {
		return dollarPart;
	} else if (centPart) {
		return centPart;
	} else {
		return "Zero Dollars";
	}
}

// Event listener for button click
document.getElementById("convertButton").addEventListener("click", function () {
	handleConversion();
});

// Event listener for Enter key press
document.getElementById("numberInput").addEventListener("keypress", function (event) {
	if (event.key === "Enter") {
		handleConversion();
	}
});

// Function to handle conversion
function handleConversion() {
	const numberInput = document.getElementById("numberInput").value;
	const resultElement = document.getElementById("result");

	if (numberInput === "") {
		resultElement.textContent = "Please enter a number.";
		return;
	}

	const number = parseFloat(numberInput);
	const words = numberToWords(number.toFixed(2)); // Convert output to 2 decimals
	resultElement.textContent = words.toUpperCase(); // Convert output to capital letters
}