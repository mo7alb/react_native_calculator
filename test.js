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
