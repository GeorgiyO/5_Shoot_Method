
module.exports = {solve};

/**
 * z = y'
 * @param x0            - аргумент foo(t0)
 * @param y0            - значение foo(t0)
 * @param z0            - значение foo'(t0)
 * @param h             - шаг итерации
 * @param n             - количество итераций
 * @param f             - функция f(x, y, z)
 * @returns [{x, y}]
 */
function solve(x0, y0, z0, h, n, f) {
    let k1, k2, k3, k4,
        l1, l2, l3, l4;
    let values = [{
        x: x0,
        y: y0,
        z: z0
    }];
    for (let i = 0; i < n; i++) {
        let prev = values.last();

        k1 = h * prev.z;
        l1 = h * f(prev.x, prev.y, prev.z);

        k2 = h * (prev.z + l1/2);
        l2 = h * f(prev.x + h/2, prev.y + k1/2, prev.z + l1/2);

        k3 = h * (prev.z + l2/2);
        l3 = h * f(prev.x + h/2, prev.y + k2/2, prev.z + l2/2);

        k4 = h * (prev.z + l3);
        l4 = h * f(prev.x + h, prev.y + k3, prev.z + l3);

        values.push({
            x: prev.x + h,
            y: prev.y + (k1 + 2*k2 + 2*k3 + k4) / 6,
            z: prev.z + (l1 + 2*l2 + 2*l3 + l4) / 6
        });
    }
    return values;
}