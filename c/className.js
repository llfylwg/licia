/* Utility for conditionally joining class names.
 *
 * |Name    |Type               |Desc              |
 * |--------|-------------------|------------------|
 * |...class|string object array|Class names       |
 * |return  |string             |Joined class names|
 * 
 * ```javascript
 * className('a', 'b', 'c'); // -> 'a b c'
 * className('a', false, 'b', 0, 1, 'c'); // -> 'a b 1 c'
 * className('a', ['b', 'c']); // -> 'a b c'
 * className('a', {b: false, c: true}); // -> 'a c'
 * className('a', ['b', 'c', {d: true, e: false}]); // -> 'a b c d';
 * ```
 */

_('each isStr isNum isArr isObj');

function exports() 
{
    var ret = [];

    each(arguments, function (arg) 
    {
        if (!arg) return;
        if (isStr(arg) || isNum(arg)) return ret.push(arg);
        if (isArr(arg)) return ret.push(exports.apply(null, arg));
        if (!isObj(arg)) return;
        
        each(arg, function (val, key)
        {
            if (val) ret.push(key);
        });
    });

    return ret.join(' ');
}