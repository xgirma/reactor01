function discountedPrices (prices, discount) {
    var discounted;
    var i;
    var discountedPrice;
    var finalPrice;


    discounted = [];
    for(i = 0; i < prices.length; i++){
        discountedPrice = prices[i] * (1 - discount);
        finalPrice = Math.round(discountedPrice * 100) / 100;
        discounted.push(finalPrice);
    }

    console.log('i: ', i);
    console.log('discountedPrice: ', discountedPrice);
    console.log('finalPrice: ', finalPrice);

    return discounted;
}

console.log(discountedPrices([100,200,300], .5));
console.log('last: ', discounted);
// i:  3
// discountedPrice:  150
// finalPrice:  150
// [ 50, 100, 150 ]
// ReferenceError: discounted is not defined
