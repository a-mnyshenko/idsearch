const range = initRangeOfRandomNumbers(-25000000, 25000000, 128)

console.time("Searching complete in:")
let result = binarySearchProducts(range)
console.timeEnd("Searching complete in:")
console.log(result)
console.log(range.sort((a, b) => a - b).reverse())

function initRangeOfNumbers(from, to) {
  const range = Math.abs(from) + Math.abs(to)
  const array = []
  for(i = 0, n = from; i <= range; ++i, ++n) {
    array[i] = n
  }
  return array
}

function initRangeOfRandomNumbers(from, to, length) {
  return [...Array(length)].map((n) => (
    n = Math.floor(Math.random() * (to - from) + from))
  )
}

function isNumberEven(num) {
  return !(num % 2)
}

function binarySearchProducts(arr) {
  const isEven = isNumberEven(arr.length)

  let mid = isEven ? arr.length / 2 - 1 : Math.floor(arr.length / 2)
  let minValue, minValuePrev, maxValue, maxValueNext

  function swapMin(lower, higher) {
    let tmp = minValue
    minValuePrev = lower > tmp && lower < minValuePrev ? lower : tmp
    minValue = lower < minValue ? lower : minValue

    if(higher < minValuePrev) {
      minValuePrev = higher
    }

    if(!minValue) {
      minValuePrev = higher
      minValue = lower
    }
  }

  function swapMax(higher, lower) {
    let tmp = maxValueNext
    maxValue = higher < tmp && higher > maxValue ? higher : tmp
    maxValueNext = higher > maxValueNext ? higher : maxValueNext

    if(lower > maxValue){
      maxValue = lower
    }

    if(!maxValue) {
      maxValueNext = higher
      maxValue = lower
    }
  }

  // Start iterate from middle of array l - left iterator, r - right iterator ------##------ | #-------------#
  for(l = mid, r = isEven ? mid + 1 : mid; l >= 0; --l, ++r) {
    let leftLess = arr[l] < arr[r]

    if([arr[l]] < minValuePrev || [arr[r]] < minValuePrev) {
      leftLess ? swapMin(arr[l], arr[r]) : swapMin(arr[r], arr[l])
    }

    if([arr[l]] > maxValue || [arr[r]] > maxValue) {
      leftLess ? swapMax(arr[r], arr[l]) : swapMax(arr[l], arr[r])
    }

    if (!minValue && !maxValue) {
       leftLess ? swapMin(arr[l], arr[r]) : swapMin(arr[r], arr[l])
       leftLess ? swapMax(arr[r], arr[l]) : swapMax(arr[l], arr[r])
    }
  }

  console.log(minValue, minValuePrev, maxValue, maxValueNext)

  return
}