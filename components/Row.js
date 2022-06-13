import { View, StyleSheet } from "react-native";
import Button from "./Button";

/**
 *
 * @param {Object} props props passed to the component - contain buttonPressed functions and an array called buttons
 * @returns JSX of a react functional component
 */
export default function Row({ buttonPressed, buttons }) {
   return (
      <View style={styles.row}>
         {buttons.map((button, index) => (
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
