function getDate() {
  var date = new Date();
  
  function formatDate() {
    console.log('inside nested function: ', date);
    return date.toDateString().slice(4);
  }
  
  return formatDate();
}

getDate();
console.log('outside: ', date);
// inside nested function:  2017-11-16T09:06:00.589Z
// ReferenceError: date is not defined
