import { useReducer } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text } from "react-native";

import Row from "./components/Row";

const initialState = {
   result: 0,
   operator: null,
   firstValue: 0,
   memory: 0,
};

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

export default function App() {
   const [state, dispatch] = useReducer(reducer, initialState);
   const { result } = state;

   const onButtonPress = value => {
      if (Number.isInteger(value)) {
         dispatch({ type: "number tapped", payload: value });
      }
      if (value === "C") {
         dispatch({ type: "clear" });
      }
      if (value === "=") {
         dispatch({ type: "equals" });
      }
      if (value === "+" || value === "-" || value === "/" || value === "X") {
         dispatch({ type: "operator tapped", payload: value });
      }
      if (value == "%") {
         dispatch({ type: "percentage" });
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
