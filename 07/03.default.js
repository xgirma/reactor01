// required param is price only, the other two can be replaced by default if not provided
function calculatePayment(price, salseTax = 0.047, discount = 0){
    console.log('tax', salseTax);
    console.log('discount', discount);
}

calculatePayment(100, 0, 0);

// tax 0
// discount 0