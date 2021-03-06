/* Shortcut for Object.freeze.
 *
 * Use Object.defineProperties if Object.freeze is not supported.
 *
 * |Name  |Desc            |
 * |------|----------------|
 * |obj   |Object to freeze|
 * |return|Object passed in|
 */

/* example
 * const a = {b: 1};
 * freeze(a);
 * a.b = 2;
 * console.log(a); // -> {b: 1}
 */

/* module
 * env: all
 */

/* typescript
 * export declare function freeze<T>(obj: T): T;
 */

_('keys');

exports = function(obj) {
    if (Object.freeze) return Object.freeze(obj);

    keys(obj).forEach(function(prop) {
        if (!Object.getOwnPropertyDescriptor(obj, prop).configurable) return;

        Object.defineProperty(obj, prop, {
            writable: false,
            configurable: false
        });
    });

    return obj;
};
