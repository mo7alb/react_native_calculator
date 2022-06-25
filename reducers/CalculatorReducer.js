import { Alert } from "react-native";

/**
 * A function that performs arithmetic operations based on the buttons clicked
 * @param {Number} firstValue the first value on which the operation is to be applied
 * @param {Number} secondValue the second value on which the operation is to be applied
 * @param {String} operator the operand to be used in the operation
 * @returns results obtained by the arithmetic operation
 */
const calculate = (firstValue, secondValue, operator) => {
   switch (operator) {
      // case when the operator is a plus
      case "+":
         return firstValue + secondValue;
      // case when the operator is a minus
      case "-":
         return firstValue - secondValue;
      // case when the operator is a multiplication
      case "X":
         return firstValue * secondValue;
      // case when the operator is a divider
      case "/":
         // check if dividing by 0
         if (secondValue == 0) {
            // return error
            return "Cannot divide by 0";
         }
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

         // check if memory contains previous calculations results but does
         // not have a operator
         if (state.readyToSwap && state.operator == null) {
            // clear the memory
            state = { ...state, memory: "" };
         }

         if (state.result !== "" && state.result.length > 6) {
            Alert.alert(
               "Number too long",
               "Number cannot be longer than 7 digits"
            );
            return state;
         }

         // the number tapped on the screen
         let num = action.payload;

         // add the number tapped to the previous number
         // multiplied by 10 and return the state
         return {
            ...state,
            result: state.result.concat(num),
            readyToSwap: false,
            showC: true,
         };

      // when C is tapped on the screen
      case "clear number":
         // reset the result value
         return {
            ...state,
            result: "",
            showC: false,
         };

      // when AC is tapped on the screen
      case "clear all":
         // reset all values
         return {
            result: "",
            operator: null,
            firstValue: 0,
            secondValue: 0,
            memory: "",
            readyToSwap: true,
            showC: false,
         };

      // when = is tapped on the screen
      case "equals":
         if (state.operator == null || state.memory.endsWith("=")) {
            return state;
         }

         // calculate the result of the operation
         let result = calculate(
            Number.parseFloat(state.firstValue),
            Number.parseFloat(state.result),
            state.operator
         );

         // restrict the result floating point number to have
         // 7 decimal digits
         result = result.toFixed(7);

         // return new state
         return {
            ...state,
            memory: `${state.memory} ${state.result} = `,
            result: result.toString(),
            operator: null,
            readyToSwap: true,
            showC: false,
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
            showC: false,
         };

      // when the percentage operator is tapped on the screen
      case "percentage":
         let previousState = state.result;
         previousState = Number.parseFloat(previousState);
         let newVal = previousState * 0.01;

         // return the state
         return {
            ...state,
            result: newVal.toString(),
            memory: `${previousState} % =`,
            showC: false,
         };

      // when the +/- operator is tapped on the screen
      case "change sign":
         let previousResult = state.result;
         previousResult = Number.parseFloat(previousResult);
         let changedSignVal = previousResult * -1;

         // return state with -1 multiplied to the result
         return {
            ...state,
            result: changedSignVal.toString(),
            memory: `${previousResult} +/- =`,
            showC: false,
         };

      // when . is tapped
      case ". tapped":
         if (state.result.includes(".")) {
            return state;
         }

         if (state.result == "") {
            return {
               ...state,
               result: "0.",
            };
         }

         return { ...state, result: state.result.concat(".") };

      // return the sate for everything else
      default:
         return state;
   }
};
