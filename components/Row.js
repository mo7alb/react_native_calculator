import { View, StyleSheet } from "react-native";
import Button from "./Button";

/**
 * A functional component that represents a single row
 * @param {Object} props props passed to the component - contain buttonPressed functions and an array called buttons
 * @returns JSX of a react functional component
 */
export default function Row({ buttonPressed, buttons }) {
   return (
      // return a view with the row styles
      <View style={styles.row}>
         {/* iterate over the buttons passed to the component */}
         {buttons.map((button, index) => (
            // for each button return a custom Button component
            <Button
               key={index}
               value={button.value}
               color={button.color}
               size={button.size == undefined ? "" : button.size}
               onPress={buttonPressed}
            />
         ))}
      </View>
   );
}

// styles for the row component
const styles = StyleSheet.create({
   row: {
      display: "flex",
      flexDirection: "row",
   },
});
