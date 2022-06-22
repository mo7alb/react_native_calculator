import React from "react";
import Row from "./Row";

export default function Buttons({ dispatch }) {
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
      // check if . was tapped on
      if (value === ".") {
         dispatch({ type: ". tapped" });
      }
   };

   return (
      <React.Fragment>
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
      </React.Fragment>
   );
}
