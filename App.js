import { useReducer } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import { reducer } from "./reducers/CalculatorReducer";

import Buttons from "./components/Buttons";

// AC => all clear => clears everythin
// C => clear => clears the number

// initial state of the component
const initialState = {
   result: "",
   operator: null,
   firstValue: 0,
   secondValue: 0,
   memory: "",
   readyToSwap: true,
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
   const { result, memory } = state;

   return (
      <SafeAreaView style={styles.container}>
         <StatusBar style="light" />

         {/* Display the whole operation above */}
         <Text style={styles.previous}>{memory !== "" ? memory : ""}</Text>

         {/* text to display the result / answer */}
         <Text style={styles.result}>{result == "" ? 0 : result}</Text>

         <Buttons dispatch={dispatch} />
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
   previous: {
      color: "#fff",
      textAlign: "right",
      fontSize: 35,
      margin: 15,
      marginRight: 30,
   },
});
