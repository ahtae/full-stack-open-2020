type Result = string;

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

console.log(calculateBmi(180, 74));
