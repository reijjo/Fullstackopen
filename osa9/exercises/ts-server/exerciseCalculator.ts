// [3, 0, 2, 4.5, 0, 3, 1] daily exercises:
// monday3, tuesday 0, wednesday 2, thursday 4.5, friday 0, saturday 3, sunday 1

// const dailyExercises: number[] = [3, 0, 2, 4.5, 0, 3, 1];
// const dailyExercises: Array<number> = [3, 0, 2, 4.5, 0, 3, 1];
// const dailyExercises: number[];
// const dailyExercises: Array<number>;

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDesc: string;
  target: number;
  avgTime: number;
}

interface Hours {
  targetValue: number;
  dailyValues: Array<number>;
}

const parseArgs = (args: string[]): Hours => {
  if (args.length < 4) throw new Error("Not enough arguments.");

  return {
    targetValue: Number(args[2]),
    dailyValues: args.slice(3).map((arg) => Number(arg)),
  };
};

export const calculateExercises = (
  dailyExercises: number[],
  target: number
): Result => {
  const periodLength = dailyExercises.length;
  const trainingDays = dailyExercises.filter((hours) => hours > 0).length;
  const totalHours = dailyExercises.reduce((sum, hours) => sum + hours, 0);
  const avgTime = totalHours / periodLength;
  const success = avgTime >= target;

  let rating = 1;
  let ratingDesc = "Shitty job.";

  if (success) {
    rating = 3;
    ratingDesc = "Nice";
  } else if (avgTime >= target - 1) {
    rating = 2;
    ratingDesc = "not too bad but could be better";
  }

  const result: Result = {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDesc,
    target,
    avgTime,
  };

  return result;
};

try {
  const { targetValue, dailyValues } = parseArgs(process.argv);
  console.log(calculateExercises(dailyValues, targetValue));
} catch (error: unknown) {
  let errorMessage = "Something strange happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}

// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
