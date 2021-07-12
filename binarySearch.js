
console.time("Creating array with random numbers in")
var range = initRangeOfRandomNumbers(-25_000_000, 25_000_000, 50_000_000)
console.timeEnd("Creating array with random numbers in")

console.time("Searching complete in")
var result = binarySearchProducts(range)
console.timeEnd("Searching complete in")
console.log(result)

function initRangeOfNumbers(from, to) {
  var range = Math.abs(from) + Math.abs(to)
  var array = []
  for(i = 0, n = from; i <= range; ++i, ++n) {
    array[i] = n
  }
  return array
}

function initRangeOfRandomNumbers(from, to, length) {
  return [...Array(length)].map((n) => (
    n = Math.round(Math.random() * (to - from) + from))
  )
}

function isNumberEven(num) {
  return !(num % 2)
}

function binarySearchProducts(arr) {
  var isEven = isNumberEven(arr.length)

  var mid = isEven ? arr.length / 2 - 1 : Math.floor(arr.length / 2)
  var min1, min2, max1, max2

  // Start iterate from middle of array l - left iterator, r - right iterator [------##------] [#-------------#]
  for(l = mid, r = isEven ? mid + 1 : mid; l >= 0; --l, ++r) {
    var lower   = arr[l] < arr[r] ? arr[l] : arr[r],
          higher  = arr[l] < arr[r] ? arr[r] : arr[l]

    // get 2 lower id's
    if(lower < min2) {
      min2 = lower < min1 ? min1 : lower > min1 ? lower : min2
      min1 = lower < min1 ? lower : min1
      if(higher < min2) {
        min2 =  higher > min1 ? higher : min2
      }
    }
    // and 2 higher id's
    if(higher > max1) {
      max1 =  higher > max2 ? max2 :  higher < max2 ? higher : max1
      max2 =  higher > max2 ? higher : max2
      if(lower > max1) {
        max1 = lower < max2 ? lower : max1
      }
    }
    if(!min1 && !max1) {
      min1 = lower, min2 =  higher
      max1 = lower, max2 =  higher
    }
  }

  var result = []
  min2 < 0 && result.push(min1, min2)
  max1 > 0 && result.push(max1, max2)

  return result
}