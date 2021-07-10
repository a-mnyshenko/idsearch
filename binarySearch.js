const range = initRangeOfNumbers(-3455555, 3455555)

console.time("Searching complete in:")
let result = binarySearchProducts(range)
console.timeEnd("Searching complete in:")
console.log(result)

function initRangeOfNumbers(from, to) {
  const range = Math.abs(from) + Math.abs(to)
  const array = []
  for(i = 0, n = from; i <= range; ++i, ++n) {
    array[i] = n
  }
  return array
}

function isNumberEven(num) {
  return !(num % 2)
}

function binarySearchProducts(arr) {
  const isEven = isNumberEven(arr.length)

  let mid = isEven ? arr.length / 2 - 1 : Math.floor(arr.length / 2)
  let minValue, minValueNext, maxValuePrev, maxValue

  // Start iterate from middle of array l - left iterator, r - right iterator ------##------ | #-------------#
  for(l = mid, r = isEven ? mid + 1 : mid; l >= 0; --l, ++r) {
    let leftLess = arr[l] < arr[r]

    if(minValue > arr[l] || minValue > arr[r]) {
      minValueNext = minValue
      minValue = leftLess ? arr[l] : arr[r]
    }

    if(maxValue < arr[l] || maxValue < arr[r]) {
      maxValuePrev = maxValue
      maxValue = leftLess ? arr[r] : arr[l]
    }

    if(!minValue && !maxValue) {
      minValue = leftLess ? arr[l] : arr[r]
      maxValue = leftLess ? arr[r] : arr[l]
    }
  }

  const result = []
  minValueNext < 0 ? result.push(minValue, minValueNext) : null
  maxValuePrev > 0 ? result.push(maxValuePrev, maxValue) : null

  return result
}