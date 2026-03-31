// Buggy code to test acceptEdits mode

function findMax(arr) {
  if (!arr || arr.length === 0) return undefined;
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}

// Test
console.log(findMax([3, 1, 4, 1, 5]));  // Should be 5
console.log(findMax([]));                 // Will crash - arr[0] is undefined