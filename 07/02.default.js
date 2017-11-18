// required param is price only, the other two can be replaced by default if not provided
function calculatePayment(price, salseTax, discount){
    salseTax = typeof salseTax === 'undefined' ? 0.047 : salseTax;
    discount = typeof discount === 'undefined' ? 0 : discount;

    console.log('tax', salseTax);
    console.log('discount', discount);
}

calculatePayment(100, 0, 0);

// tax 0
// discount 0