const tap = require("tap");

function directThrow() {
    throw new Error("foo");
}

try {
    directThrow();
} catch (error) {
    tap.equal(error.message, "foo");
}