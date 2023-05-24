// BMI = kg / pituus * pituus

interface Values {
  cm: number;
  kg: number;
}

const parseArguments = (args: string[]): Values => {
  if (args.length < 4) throw new Error("Not enough arguments.");
  if (args.length > 4) throw new Error("Too many arguments.");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      cm: Number(args[2]),
      kg: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const calculateBmi = (cm: number, kg: number): string => {
  const cmToM = cm / 100;
  const bmi = kg / (cmToM * cmToM);

  console.log("bmi", bmi);

  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi > 24.9) {
    return "Overweight";
  } else {
    return "Normal (healthy weight)";
  }
};

try {
  const { cm, kg } = parseArguments(process.argv);
  console.log(calculateBmi(cm, kg));
} catch (error: unknown) {
  let errorMessage = "Something strange happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}

// console.log(calculateBmi(180, 74));
