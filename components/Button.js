import { Dimensions, TouchableOpacity, StyleSheet, Text } from "react-native";

// calculate the width of each button with respect to
// the width of the device
const buttonWidth = Dimensions.get("window").width / 5;
// calculate the height of each button with respect to
// the height of the device
const buttonHeight = Dimensions.get("window").height / 11;

/**
 * A functional component that makes up a single button in the calculator
 * @param {Object} param0 component props containing value (value of the button), color, size and onPress funtion to handle onPress
 * @returns JSX of a react functional component
 */
export default function Button({ value, color, size, onPress }) {
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

// styles related to a button
const styles = StyleSheet.create({
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
