export const getBgOnScore = (score: number) => {
  if (score >= 70) {
    return 'w-full max-w-[100px] text-right rounded-md p-2 bg-green-100 text-green-800';
  } else if (score >= 40) {
    return 'w-full max-w-[100px] text-right rounded-md p-2 bg-yellow-100 text-yellow-800';
  } else {
    return 'w-full max-w-[100px] text-right rounded-md p-2 bg-red-100 text-red-800';
  }
};
