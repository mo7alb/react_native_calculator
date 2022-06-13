import { View, StyleSheet } from "react-native";
import Button from "./Button";

/**
 * a functional component that displays a single row within the calculator
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

const styles = StyleSheet.create({
   row: {
      display: "flex",
      flexDirection: "row",
   },
});
