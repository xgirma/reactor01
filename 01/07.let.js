function discountedPrices(prices, discount) {
  let discounted = [];
  for (let i = 0; i < prices.length; i++) {
    let discountedPrice = prices[i] * (1 - discount);
    let finalPrice = Math.round(discountedPrice * 100) / 100;
    discounted.push(finalPrice);
  }
  
  console.log('i: ', i);
  console.log('discountedPrice: ', discountedPrice);
  console.log('finalPrice: ', finalPrice);
  
  return discounted;
}

console.log(discountedPrices([100, 200, 300], .5));
// console.log('i: ', i);
//                    ^
// ReferenceError: i is not defined


function multiply(first, second){
  var multiple = [];
  
  for(let i = 0; i < first.length; i++){
    let result = first[i] * second[i];
    multiple.push(result);
  }
  
  console.log('i: ', i);
  console.log('result: ', result);
  
  return multiple;
}

console.log(multiply([1,2,3], [4,5,6]));

// Uncaught ReferenceError: i is not defined
