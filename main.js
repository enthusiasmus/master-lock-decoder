var masterLockDecoder = {
	init: function(){
		this.lockedPosition1 = parseInt($('input#l1').val());
		this.lockedPosition2 = parseInt($('input#l2').val());
		this.firstResistancePosition = $('input#rl').val();
		this.secondCombinationDigitPossibilities = [];
		this.thirdCombinationDigitPossibilities = [];

		decode();
		print();
	},
	decode: function(){
		this.decodeFirstDigit();
		this.decodeThirdDigit();
		this.decodeSecondDigit();
	},
	decodeFirstDigit: function(){
		/*
		 * First Digit
		 * Explanation: 1. Find the one (!) position which is like a wall, while pulling the shakle slightly up
		 *							2. Round up and add 5 to it
		 */
		this.firstDigitOfCombination = (Math.ceil(this.firstResistancePosition) + 5) % 40;
		this.setFirstCombinationDigit(this.firstDigitOfCombination)
	},
	decodeSecondDigit: function(){
		/*
		 * Second Digit
		 * Explanation: 1. Loop 10 times
		 * 							2. Example calculation
		 *								 modulo = 3
		 * 								 calculation = (modulo + 2) % 4 = 1
		 *								 steps = calculation + (4 * i) = 5, 9, 13, 17, 21, 25, 29, 33, 36, 0
		 *							3. If none of the third digit possibilities have been choosen OR the choosen third digit
		 *								 -2 and +2 is not equal to steps, the secondCombinationDigitPossibilities get filled
		 *								 (again). MAGIC!
		 */

		this.thirdDigitOfCombination = this.thirdCombinationDigitPossibilities[this.choosenThirdDigit-1];
		var intermediateCalculation = (this.modulo + 2) % 4;
		var step;

		for (var i = 0; i < 10; i++) {
			step = intermediateCalculation + (4 * i);
			condition0 = !this.choosenThirdDigit;
			condition1 = (this.thirdDigitOfCombination + 2) % 40 != step;
			condition2 = (this.thirdDigitOfCombination - 2) % 40 != step;

			// When the number is choosen it depends on condition1 and condition2
			// When the number is not choosen it always get filled
			if (condition0 || (condition1 && condition2) {
				this.secondCombinationDigitPossibilities.push(step);
			}
		}
		tmp = this.secondCombinationDigitPossibilities.join(', ')
		this.setSecondCombinationDigit(tmp)
	},
	decodeThirdDigit: function(){
		/*
		 * Third Digit
		 * Explanation: 1. Is the first Combination for example 31, we calculate 31 % 4 = 3
		 * 							2. Loop 4 times
		 *								2.1. In Masterlocks there exists every 3 or 4 digits a lock positions, overall there
	 	 *										 are 4*4 lock positions. When there is a lock position at 3 there should be also
		 *										 lock positions at 13, 23 and 33. To find them you have to strongly pull up the
		 *										 shakle.
		 *								2.2. When the first lockedPosition equals 3, the first condition checks
		 * 										 3 % 4 == 3, 13 % 4 == 3, and 23 % 4 == 3 and 33 % 4 == 3
		 *										 The second condition checks the same thing for the second lockedPosition
		 *										 for example 6 % 4 == 3, 16 % 4 == 3, and 26 % 4 == 3 and 36 % 4 == 3
		 *							3. The result will only be two possibilties for the third digit number. MAGIC!
		 *								 The two possibilites gets set into the buttons to narrow down the possibilites.
		 *							4. Its also MAGIC that we only check the first two groups of lock positions, altough
		 *								 there are always 4 groups of lock positions. When we choose on of the third digit
		 *								 possibilities, we set the result input field accordingly.
		 */

		this.modulo = this.firstDigitOfCombination % 4;
		var iterationValueLockedPosition1, iterationValueLockedPosition2;

		for (var i = 0; i < 4; i++)	{
			iterationValueLockedPosition1 = (10 * i) + lockedPosition1
			iterationValueLockedPosition2 = (10 * i) + lockedPosition1

			if (iterationValueLockedPosition1 % 4 == this.modulo){
				this.thirdCombinationDigitPossibilities.push(iterationValueLockedPosition1);
			}

			if (iterationValueLockedPosition2 % 4 == this.modulo){
				this.thirdCombinationDigitPossibilities.push(iterationValueLockedPosition2);
			}
		}

		this.setThirdCombinitionDigitButtons();

		var tmp = this.choosenThirdDigit ? this.thirdCombinationDigitPossibilities[this.this.choosenThirdDigit-1] : this.thirdCombinationDigitPossibilities.join(', ')
		this.setThirdCombinationDigit(tmp)
	},
	print: function(){
		console.log(this.firstDigitOfCombination);
		console.log(this.secondCombinationDigitPossibilities);
		console.log(this.thirdCombinationDigitPossibilities);
	},
	setThirdCombinitionDigitButtons: function(){
		$('a#t1').text(this.thirdCombinationDigitPossibilities[0]);
		$('a#t2').text(this.thirdCombinationDigitPossibilities[1]);
	},
	setFirstCombinationDigit: function(value){
		$('input#d1').val(value);
	},
	setSecondCombinationDigit: function(value){
			$('input#d2').val(value);
	},
	setThirdCombinationDigit: function(value){
			$('input#d3').val(value);
	}
}

function combo(x){
	if (x){
		masterLockDecoder.choosenThirdDigit = x;
	}
	masterLockDecoder.init();
}
