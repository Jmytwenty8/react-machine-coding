function curryingWithLimit(limit) {
    if (limit <= 0) {
        throw new Error("Limit must be a positive integer");
    }

    return function helper(...args) {
        if (args.length >= limit) {
            const sum = (...extra) => args.slice(0, limit).reduce((acc, val) => acc + val, 0);

            return sum;
        }

        return function (...nextArgs) {
            return helper(...args, ...nextArgs);
        }
    }
}

// Test cases
console.log(curryingWithLimit(3)(1)(2)(3)());       // 6
console.log(curryingWithLimit(2)(5, 10)());         // 15
console.log(curryingWithLimit(4)(1)(2)(3)(4)(5)); // 10 (This one was already correct)
console.log(curryingWithLimit(1)(42)());            // 42
console.log(curryingWithLimit(3)(1, 2)(3, 4)());    // 6
console.log(curryingWithLimit(2)(7)(8)(9));       // 15 (This one was also correct)