// fix bad property names
var user = {
    n: "Tayler",
    h: "@tyler",
    l: "Seattle, WA"
};

var {n: name, h: handle, l: location } = user;

console.log(name);
console.log(handle);
console.log(location);

// Tayler
// @tyler
// Seattle, WA
