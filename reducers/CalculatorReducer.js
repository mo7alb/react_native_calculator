/**
 * A function that performs arithmetic operations based on the buttons clicked
 * @param {Number} firstValue the first value on which the operation is to be applied
 * @param {Number} secondValue the second value on which the operation is to be applied
 * @param {String} operator the operand to be used in the operation
 * @returns results obtained by the arithmetic operation
 */
const calculate = (firstValue, secondValue, operator) => {
   switch (operator) {
      case "+":
         return firstValue + secondValue;
      case "-":
         return firstValue - secondValue;
      case "X":
         return firstValue * secondValue;
      case "/":
         return firstValue / secondValue;
      default:
         throw Error("Invalid operation");
   }
};

/**
 * a reducer to be used to manage the state of the main calculator component
 * @param {Object} state the state of the application
 * @param {Object} action different types of actions to be performed on the state
 * @returns state after processing
 */
export const reducer = (state, action) => {
   switch (action.type) {
      // when a number is tapped on the screen
      case "number tapped":
         // check if the result and the memory states are of the same value
         if (state.readyToSwap) {
            state = { ...state, result: "" };
         }

         // the number tapped on the screen
         let num = action.payload;

         // add the number tapped to the previous number
         // multiplied by 10 and return the state
         return {
            ...state,
            result: state.result.concat(num),
            readyToSwap: false,
         };

      // when C is tapped on the screen
      case "clear":
         // reset all values
         return {
            result: "",
            operator: null,
            firstValue: 0,
            secondValue: 0,
            memory: 0,
            readyToSwap: true,
         };

      // when = is tapped on the screen
      case "equals":
         // calculate the result of the operation
         let result = calculate(
            Number.parseFloat(state.firstValue),
            Number.parseFloat(state.result),
            state.operator
         );
         // return new state
         return {
            ...state,
            memory: `${state.memory} ${state.result} = `,
            result: result.toString(),
            readyToSwap: true,
         };

      // when an operator is tapped on the screen
      case "operator tapped":
         /*
            when an operator is tapped, change the result to be the first number
            so that when = sign is tapped, the app treats the result as the
            second number and performs the operation on the first and second
            numbers
         */

         let operator = action.payload;
         let firstValue = state.result;
         // set previous result to first value and operator to the operator
         // tapped on the screen and return state
         return {
            ...state,
            firstValue,
            operator,
            memory: `${firstValue} ${operator}`,
            result: "",
            readyToSwap: true,
         };

      // when the percentage operator is tapped on the screen
      case "percentage":
         let previousState = state.result;
         previousState = Number.parseFloat(previousState);
         previousState = previousState * 0.01;

         // return the state
         return { ...state, result: previousState.toString() };

      // when the +/- operator is tapped on the screen
      case "change sign":
         let previousResult = state.result;
         previousResult = Number.parseFloat(previousResult);
         previousResult = previousResult * -1;

         // return state with -1 multiplied to the result
         return { ...state, result: previousResult.toString() };

      case ". tapped":
         return { ...state, result: state.result.concat(".") };

      default:
         return state;
   }
};
