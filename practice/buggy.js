// File có bug để test default mode
// Bug: Không handle empty array

function sumArray(numbers) {
  if (!numbers || numbers.length === 0) return 0;
  let total = 0;
  for (let i = 0; i < numbers.length; i++) {
    total += numbers[i];
  }
  return total;
}

// Test cases
console.log(sumArray([1, 2, 3]));  // Should be 6
console.log(sumArray([]));          // Should be 0 but will be NaN