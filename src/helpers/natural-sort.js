import naturalCompare from 'natural-compare-lite';

export default key => (a, b) => {
  const A = a[key].toUpperCase();
  const B = b[key].toUpperCase();

  return naturalCompare(A, B);
};
