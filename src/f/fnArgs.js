/* Validate function arguments.
 *
 * |Name |Desc           |
 * |-----|---------------|
 * |types|Argument types |
 * |args |Argument object|
 *
 * It throws an exception when validation failed.
 */

/* example
 * function test(a, b, c) {
 *     fnArgs([
 *         'number|string',
 *         '?Function',
 *         '...number',
 *     ], arguments);
 *     // Do something.
 * }
 * // @ts-ignore
 * test(15);
 * // @ts-ignore
 * test('test', () => {});
 * test('test', () => {}, 5);
 * // @ts-ignore
 * test(); // Throw error
 * // @ts-ignore
 * test('test', 'test'); // Throw error
 * // @ts-ignore
 * test('test', () => {}, 5, 'test') // Throw error
 */

/* module
 * env: all
 * since: 1.5.3
 */

/* typescript
 * export declare function fnArgs(types: string[], args: any): void;
 */

_('startWith last lowerCase isObj type');

exports = function(types, args) {
    const argsLen = args.length;
    const typesLen = types.length;
    let minLen = typesLen;
    let maxLen = typesLen;

    for (let i = 0; i < typesLen; i++) {
        const type = types[i].split('|');
        if (startWith(type[0], '?')) {
            type[0] = type[0].slice(1);
            if (minLen === typesLen) {
                minLen = i;
            }
        }
        if (i === typesLen - 1 && startWith(type[0], '...')) {
            maxLen = Infinity;
            type[0] = type[0].slice(3);
            if (minLen === typesLen) {
                minLen = i;
            }
        }
        types[i] = type;
    }

    if (argsLen < minLen) {
        throw Error(`Expected at least ${minLen} args but got ${argsLen}`);
    } else if (argsLen > maxLen) {
        throw Error(`Expected at most ${maxLen} args but got ${argsLen}`);
    }

    for (let i = 0; i < argsLen; i++) {
        const arg = args[i];

        if (i >= typesLen) {
            validateArg(arg, last(types), i);
        } else {
            validateArg(arg, types[i], i);
        }
    }
};

function validateArg(value, types, num) {
    let isValid = false;

    for (let i = 0, len = types.length; i < len; i++) {
        const t = lowerCase(types[i]);
        if (
            t === 'any' ||
            (t === 'object' && isObj(value)) ||
            type(value) === t
        ) {
            isValid = true;
            break;
        }
    }

    if (!isValid) {
        throw TypeError(`Argument ${num} should be type ${types.join('|')}`);
    }
}
