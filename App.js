import { useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import {
   Dimensions,
   SafeAreaView,
   TouchableOpacity,
   StyleSheet,
   Text,
   View,
} from "react-native";

const buttonWidth = Dimensions.get("window").width / 5;
const buttonHeight = Dimensions.get("window").height / 11;

export default function App() {
   const [answerValue, setAnswerValue] = useState(0);
   const [readyToReplace, setReadyToReplace] = useState(true);
   const [memoryValue, setMemoryValue] = useState();
   const [operatorValue, setOperatorValue] = useState();
   const chainMemoryValue = useRef(0);

   const calculateEquals = () => {
      const current = Number.parseFloat(answerValue);
      const previous = Number.parseFloat(memoryValue);

      let result = 0;
      switch (operatorValue) {
         case "/":
            result = previous / current;
            break;
         case "X":
            result = previous * current;
            break;
         case "+":
            result = previous + current;
            break;
         case "-":
            result = previous - current;
            break;
      }

      setAnswerValue(result);
      setMemoryValue(0);
      setReadyToReplace(true);

      return result;
   };

   const onButtonPress = value => {
      if (Number.isInteger(value)) {
         // check if the button tapped is a number
         setAnswerValue(handleNumber(value));
      } else if (value === "C") {
         // check if the clear button was tapped
         setAnswerValue(0);
         setMemoryValue(0);
         setOperatorValue(0);
         setReadyToReplace(true);
         chainMemoryValue.current = 0;
      } else if (typeof value === "string") {
         // check if the value is that of an operator

         // check if the operator is +/-
         if (value === "+/-") {
            setAnswerValue(previous => previous * -1);
            return;
         }

         // check if the operator is %
         if (value === "%") {
            setAnswerValue(previous => previous * 0.01);
            return;
         }

         setMemoryValue(answerValue);
         if (chainMemoryValue.current !== 0)
            setMemoryValue(chainMemoryValue.current);
         setReadyToReplace(true);
         setOperatorValue(value);
      }

      if (value === "=") {
         // check if the equal sign was tapped
         if (operatorValue === 0) return;

         chainMemoryValue.current = calculateEquals();
      }
   };

   const handleNumber = value => {
      // executes when the button tapped is a number
      if (readyToReplace) {
         setReadyToReplace(false);
         return value;
      } else {
         let number = answerValue * 10;
         number += value;

         return number;
      }
   };

   return (
      <SafeAreaView style={styles.container}>
         <StatusBar style="light" />
         {/* text to display the result */}
         <Text style={styles.result}>{answerValue}</Text>
         {/* create a row of buttons below results */}
         <View style={styles.row}>
            <Button color="grey" value="C" onPress={onButtonPress} />
            <Button color="grey" value="+/-" onPress={onButtonPress} />
            <Button color="grey" value="%" onPress={onButtonPress} />
            <Button color="blue" value="/" onPress={onButtonPress} />
         </View>
         <View style={styles.row}>
            <Button color="black" value={7} onPress={onButtonPress} />
            <Button color="black" value={8} onPress={onButtonPress} />
            <Button color="black" value={9} onPress={onButtonPress} />
            <Button color="blue" value="X" onPress={onButtonPress} />
         </View>
         <View style={styles.row}>
            <Button color="black" value={4} onPress={onButtonPress} />
            <Button color="black" value={5} onPress={onButtonPress} />
            <Button color="black" value={6} onPress={onButtonPress} />
            <Button color="blue" value="-" onPress={onButtonPress} />
         </View>
         <View style={styles.row}>
            <Button color="black" value={1} onPress={onButtonPress} />
            <Button color="black" value={2} onPress={onButtonPress} />
            <Button color="black" value={3} onPress={onButtonPress} />
            <Button color="blue" value="+" onPress={onButtonPress} />
         </View>
         <View style={styles.row}>
            <Button
               color="black"
               value={0}
               size="double"
               onPress={onButtonPress}
            />
            <Button color="black" value="." onPress={onButtonPress} />
            <Button color="blue" value="=" onPress={onButtonPress} />
         </View>
      </SafeAreaView>
   );
}

/**
 *
 */
function Button({ value, color, size, onPress }) {
   return (
      <TouchableOpacity
         onPress={() => onPress(value)}
         style={[
            styles.button,
            color === "blue" ? styles.blueButton : "",
            color === "grey" ? styles.greyButton : "",
            size === "double" ? styles.doubleSize : "",
         ]}
      >
         <Text style={styles.buttonText}>{value}</Text>
      </TouchableOpacity>
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
   row: {
      display: "flex",
      flexDirection: "row",
   },
   button: {
      width: buttonWidth,
      height: buttonHeight,
      borderRadius: 50,
      backgroundColor: "#333",
      margin: 10,
      display: "flex",
      justifyContent: "center",
   },
   buttonText: {
      color: "white",
      fontSize: 32,
      textAlign: "center",
   },
   blueButton: {
      backgroundColor: "#0984E3",
   },
   greyButton: {
      backgroundColor: "#A6A6A6",
   },
   doubleSize: {
      width: buttonWidth * 2.22,
   },
});
