// interface calculatorValues {
//   value1: number;
//   value2: number;
//   value3: number;
//   value4: number;
//   value5: number;
//   value6: number;
//   value7: number;
//   value8: number;
// }

const parseArguments = (args: Array<string>): Array<number> => {
  if (args.length < 4) {
    throw new Error('Not enough arguments!');
  }

  const totalSum = args.slice(2).reduce((sum, num) => sum + num, '');

  if (!isNaN(Number(totalSum))) {
    const numbers: Array<number> = [];

    args.slice(2).forEach((num) => numbers.push(Number(num)));

    return numbers;
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  exerciseHours: Array<number>,
  target: number
): Result => {
  const periodLength = exerciseHours.length;
  const trainingDays = exerciseHours.filter((hour) => hour !== 0).length;
  const success = exerciseHours.every((hour) => hour >= target);
  const average = exerciseHours.length
    ? exerciseHours.reduce((sum, hour) => sum + hour, 0) / exerciseHours.length
    : 0;
  const rating = average >= target ? 3 : Math.ceil(average) === target ? 2 : 1;
  const ratingDescription =
    rating === 3
      ? 'Great job!'
      : rating === 2
      ? 'not too bad but could be better'
      : ':(';

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const arr = parseArguments(process.argv);
  const dailyHours = arr.slice(1);
  const target = arr[0];

  console.log(calculateExercises(dailyHours, target));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}
