type Result = string;

interface BmiValues {
  value1: number;
  value2: number;
}

const parseArguments = (args: Array<string>): BmiValues => {
  if (args.length < 4) {
    throw new Error('Not enough arguments!');
  }

  if (args.length > 4) {
    throw new Error('Too many arguments!');
  }

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const calculateBmi = (height: number, weight: number): Result => {
  const result = (weight / (height * height)) * 10000;

  switch (true) {
    case result >= 0 && result < 18.5:
      return 'Underweight';
    case result >= 18.5 && result <= 24.9:
      return 'Normal (healthy weight)';
    case result >= 25.0 && result <= 29.9:
      return 'Overweight';
    case result > 30:
      return 'Obese';
    default:
      throw new Error('Abnormal Results. Try again!');
  }
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  console.log(calculateBmi(value1, value2));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}
