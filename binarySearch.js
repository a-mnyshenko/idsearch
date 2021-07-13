// Please use --max-old-space-size=4096 and higher for arrays bigger than 100_000_000

console.time("Creating array with random numbers in\t\t")
const range = initRangeOfRandomNumbers(-25_000_000, 25_000_000, 100_000_000)
console.timeEnd("Creating array with random numbers in\t\t")

console.time("Understandable binary searching complete in\t")
const resultBinary = binarySearchProducts(range)
console.timeEnd("Understandable binary searching complete in\t")

console.time("Fast binary searching complete in\t\t")
const resultFastBinary = fasterBinarySearchProducts(range)
console.timeEnd("Fast binary searching complete in\t\t")

console.time("Default searching complete in\t\t\t")
const resultDefaultSearch = searchProducts(range)
console.timeEnd("Default searching complete in\t\t\t")

console.time("ForEach searching complete in\t\t\t")
const resultForEach = searchForEach(range)
console.timeEnd("ForEach searching complete in\t\t\t")

console.log("\n\nUnderstandable binary: \t\t\t\t", resultBinary)
console.log("Fast binary: \t\t\t\t\t", resultFastBinary)
console.log("Default for with 1 oterator: \t\t\t", resultDefaultSearch)
console.log("ForEach: \t\t\t\t\t", resultForEach)

function initRangeOfNumbers(from, to) {
  const range = Math.abs(from) + Math.abs(to)
  const array = []
  for(i = 0, n = from; i <= range; i++, ++n) {
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
  const isEven = isNumberEven(arr.length)
  const mid = isEven ? arr.length / 2 - 1 : Math.floor(arr.length / 2)
  let min1, min2, max1, max2

  // Start iterate from middle of array l - left iterator, r - right iterator [------##------] [#-------------#]
  for(l = mid, r = isEven ? mid + 1 : mid; l > 0 || r < arr.length; --l, ++r) {
    const lower   = arr[l] < arr[r] ? arr[l] : arr[r],
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

  console.log(arr.length)

  const result = []
  min2 < 0 && result.push(min1, min2)
  max1 > 0 && result.push(max1, max2)

  return result
}

function fasterBinarySearchProducts(arr) {
  const isEven = isNumberEven(arr.length)
  const mid = isEven ? arr.length / 2 - 1 : Math.floor(arr.length / 2)
  let min1, min2, max1, max2

  // Start iterate from middle of array l - left iterator, r - right iterator [------##------] [#-------------#]
  for(l = mid, r = isEven ? mid + 1 : mid; l > 0 || r < arr.length; --l, ++r) {
    // get 2 lower id's
    if(arr[l] <= min2 || arr[r] <= min2) {
      const firstLower = arr[l] < arr[r]
      if (firstLower) {
        min2 = arr[l] < min1 ? min1 : arr[l] > min1 ? arr[l] : min2
        min1 = arr[l] < min1 ? arr[l] : min1
      }
      else  {
        min2 = arr[r] < min1 ? min1 : arr[r] > min1 ? arr[r] : min2
        min1 = arr[r] < min1 ? arr[r] : min1
      }

      if(firstLower && arr[r] < min2 || !firstLower && arr[l] < min2) {
        min2 = firstLower && arr[r] > min1 ? arr[r] : min2
        min2 = !firstLower && arr[l] > min1 ? arr[l] : min2
      }
    }
    // and 2 higher id's
    if(arr[l] >= max1 || arr[r] >= max1) {
      const firstLower = arr[l] < arr[r]
      if  (firstLower) {
        max1 = arr[r] > max2 ? max2 : arr[r] < max2 ? arr[r] : max1
        max2 = arr[r] > max2 ? arr[r] : max2
      }
      else {
        max1 = arr[l] > max2 ? max2 :  arr[l] < max2 ? arr[l] : max1
        max2 = arr[l] > max2 ? arr[l] : max2
      }
      if(firstLower && arr[l] >= max1 || !firstLower && arr[r] >= max1) {
        max1 = firstLower && arr[l] > max1 ? arr[l] : max1
        max1 = !firstLower && arr[r] > max1 ? arr[r] : max1
      }
    }
    if(!min1 && !max1) {
      const firstLower = arr[l] < arr[r]
      min1 = firstLower ? arr[l] : arr[r], min2 = firstLower ? arr[r] : arr[l]
      max1 = firstLower ? arr[r] : arr[l], max2 = firstLower ? arr[l] : arr[r]
    }
  }
  const result = []
  min2 < 0 && result.push(min1, min2)
  max1 > 0 && result.push(max1, max2)

  return result
}

function searchProducts(arr) {
  let min1, min2, max1, max2
  for(i = 0; i < arr.length - 1; ++i) {
    // get 2 lower id's
    if(arr[i] < min2) {
      min2 = arr[i] < min1 ? min1 : arr[i] > min1 ? arr[i] : min2
      min1 = arr[i] < min1 ? arr[i] : min1
    }
    // and 2 higher id's
    if(arr[i] > max1) {
      max1 =  arr[i] > max2 ? max2 : arr[i] < max2 ? arr[i] : max1
      max2 =  arr[i] > max2 ? arr[i] : max2
    }
    if(!min2 && !max1) {
      min2 = arr[i], min1 = arr[i]
      max1 = arr[i], max2 = arr[i]
    }
  }

  const result = []
  min2 < 0 && result.push(min1, min2)
  max1 > 0 && result.push(max1, max2)

  return result
}

function searchForEach(arr) {
  let min1, min2, max1, max2
  arr.forEach(value => {
    if(value < min2) {
      min2 = value < min1 ? min1 : value > min1 ? value : min2
      min1 = value < min1 ? value : min1
    }
    // and 2 higher id's
    if(value > max1) {
      max1 =  value > max2 ? max2 : value < max2 ? value : max1
      max2 =  value > max2 ? value : max2
    }
    if(!min2 && !max1) {
      min2 = value, min1 = value
      max1 = value, max2 = value
    }
  });
    // get 2 lower id's

  const result = []
  min2 < 0 && result.push(min1, min2)
  max1 > 0 && result.push(max1, max2)

  return result
}
