/* Css manipulation.
 *
 * ```javascript
 * $css('#test', {
 *     'color': '#fff',
 *     'background': 'black'
 * });
 * ```
 */

_('isStr isObj camelCase kebabCase isUndef contain isNum $safeNodes');

function exports(nodes, name, val)
{
    nodes = $safeNodes(nodes);

    var isGetter = isUndef(val) && isStr(name);
    if (isGetter) return getCss(nodes[0], name);

    var css = name;
    if (!isObj(css))
    {
        css = {};
        css[name] = val;
    }

    setCss(nodes, css);
}

function getCss(node, name)
{
    return node.style[camelCase(name)];
}

function setCss(nodes, css)
{
    each(nodes, function (node)
    {
        var cssText = ';';
        each(css, function (val, key)
        {
            cssText += kebabCase(key) + ':' + addPx(key, val) + ';';
        });
        node.style.cssText += cssText;
    });
}

var cssNumProps = [
    'column-count',
    'columns',
    'font-weight',
    'line-weight',
    'opacity',
    'z-index',
    'zoom'
];

function addPx(key, val)
{
    var needPx = isNum(val) && !contain(cssNumProps, kebabCase(key));

    return needPx ? val + 'px' : val;
}