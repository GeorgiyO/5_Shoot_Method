const RungeKutta = require("./RungeKutta");

module.exports = {solve};

/**
 * @callback FX
 * @param {number} x
 * @returns {number}
 */

/**
 * @typedef {Object} Point
 * @property {number} x
 * @property {number} y
 */
/**
 * solve with sweep method for y'' + p(x)*y' + q(x)*y = f(x)
 * @param {FX} p - y' multiplier
 * @param {FX} q - y multiplier
 * @param {number} a - left arg value
 * @param {number} b - right arg value
 * @param {number} A - left func value
 * @param {number} B - right func value
 * @param {number} n - iterations count
 * @param {FX} f - f(x)
 * @param {number} accuracy - required computational accuracy
 * @returns {Point[]}
 */
function solve(p, q, a, b, A, B, n, f, accuracy) {

    // y'' = f(x) - p(x)y' - q(x)y
    // z = y'
    let fddy = function (x, y, dy) {
        return f(x) - p(x) * dy - q(x) * y;
    }

    let h = (b - a) / n;

    let alpha = {
        top: Math.PI / 2,
        bot: -Math.PI / 2
    }

    let result;

    while (true) {

        let mid = (alpha.top + alpha.bot) / 2;
        result = RungeKutta.solve(a, A, Math.tan(mid), h, n, fddy);
        let resY = result.last().y;

        if (Math.abs(resY - B) < accuracy) break;

        if (resY > B) {
            alpha.top = mid;
        } else {
            alpha.bot = mid;
        }
    }

    return result;
}
