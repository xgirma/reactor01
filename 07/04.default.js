function isRequired(name){
    throw new Error(name + ' is required');
}

// required param is price only, the other two can be replaced by default if not provided
function calculatePayment(price = isRequired('price'), salseTax = 0.047, discount = 0){
    console.log('tax', salseTax);
    console.log('discount', discount);
}

calculatePayment();

// Error: price is required