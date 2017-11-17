// destructing function invocation
function getUser() {
    return {
        name: "Tayler",
        handle: "@tyler",
        location: "Seattle, WA"
    };
}

var {name, handle, location} = getUser();