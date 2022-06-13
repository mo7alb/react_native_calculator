import { useReducer } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import Row from "./components/Row";

// initial state of the component
const initialState = {
   result: 0,
   operator: null,
   firstValue: 0,
   memory: 0,
};

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
 * a reducer to be used to manage the state of the component
 * @param {Object} state the state of the application
 * @param {Object} action different types of actions to be performed on the state
 * @returns state after processing
 */
const reducer = (state, action) => {
   switch (action.type) {
      // when a number is tapped on the screen
      case "number tapped":
         // check if the result and the memory states are of the same value
         if (state.result === state.memory && state.result != 0) {
            state = { ...state, result: 0 };
         }
         // get the number tapped
         let num = action.payload;
         // get previous number on screen
         let previousNum = state.result;

         // if previous number is 0, return the number tapped
         if (previousNum == 0) {
            return { ...state, result: num };
         }

         // multiply the previos number by 10, this would
         // add an extra 0 at the end of the previous number
         previousNum *= 10;

         // add the number tapped to the previous number
         // multiplied by 10 and return the state
         return { ...state, result: num + previousNum };

      // when C is tapped on the screen
      case "clear":
         // reset all values
         return initialState;

      // when = is tapped on the screen
      case "equals":
         // calculate the result of the operation
         let result = calculate(state.firstValue, state.result, state.operator);
         // return new state
         return { ...state, memory: result, result };

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
         return { ...state, firstValue, operator, result: 0 };

      // when the percentage operator is tapped on the screen
      case "percentage":
         // return the state with a result multiplied by 0.01
         return { ...state, result: state.result * 0.01 };

      // when the +/- operator is tapped on the screen
      case "change sign":
         // return state with -1 multiplied to the result
         return { ...state, result: state.result * -1 };

      default:
         return state;
   }
};

/**
 * the main component of the application
 * contains the state of the calculator
 * @returns JSX of a react functional component
 */
export default function App() {
   // state with useReducer
   const [state, dispatch] = useReducer(reducer, initialState);
   // destructure result from state
   const { result } = state;

   /**
    * function that handles taps on TouchableOpacity by maping
    * different types of button taps to different dispatches
    * @param {*} value value of the button tapped
    */
   const onButtonPress = value => {
      // check if a number is tapped
      if (Number.isInteger(value)) {
         // pass the number tapped to dispatch and specify type of dispatch
         dispatch({ type: "number tapped", payload: value });
      }
      // check if C was tapped on screen was tapped on the screen
      if (value === "C") {
         dispatch({ type: "clear" });
      }
      // check if equal sign was tapped
      if (value === "=") {
         dispatch({ type: "equals" });
      }
      // check if any of the arithmetic operands was tapped on
      if (value === "+" || value === "-" || value === "/" || value === "X") {
         dispatch({ type: "operator tapped", payload: value });
      }
      // check if the percentage operand was tapped on
      if (value === "%") {
         dispatch({ type: "percentage" });
      }
      // check if +/- operand was tapped on
      if (value === "+/-") {
         dispatch({ type: "change sign" });
      }
   };

   return (
      <SafeAreaView style={styles.container}>
         <StatusBar style="light" />

         {/* text to display the result / answer */}
         <Text style={styles.result}>{result}</Text>

         {/* create a rows of buttons below results */}
         <Row
            buttonPressed={onButtonPress}
            buttons={[
               { value: "C", color: "grey" },
               { value: "+/-", color: "grey" },
               { value: "%", color: "grey" },
               { value: "/", color: "blue" },
            ]}
         />
         <Row
            buttonPressed={onButtonPress}
            buttons={[
               { color: "black", value: 7 },
               { color: "black", value: 8 },
               { color: "black", value: 9 },
               { color: "blue", value: "X" },
            ]}
         />
         <Row
            buttonPressed={onButtonPress}
            buttons={[
               { color: "black", value: 4 },
               { color: "black", value: 5 },
               { color: "black", value: 6 },
               { color: "blue", value: "-" },
            ]}
         />
         <Row
            buttonPressed={onButtonPress}
            buttons={[
               { color: "black", value: 1 },
               { color: "black", value: 2 },
               { color: "black", value: 3 },
               { color: "blue", value: "+" },
            ]}
         />
         <Row
            buttonPressed={onButtonPress}
            buttons={[
               { color: "black", value: 0, size: "double" },
               { color: "black", value: "." },
               { color: "blue", value: "=" },
            ]}
         />
      </SafeAreaView>
   );
}

// styles of the application
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "black",
      justifyContent: "flex-end",
   },
   result: {
      color: "white",
      fontSize: 65,
      margin: 5,
      marginRight: 30,
      textAlign: "right",
   },
});
