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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
