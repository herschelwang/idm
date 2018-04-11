/**
 * @Description: 扩展js中Number的方法，解决浮点数计算精度问题
 */

// 给Number类型增加一个div方法。
Number.prototype.div = function (arg) {
    var t1 = 0, t2 = 0, r1, r2;
    try {
        t1 = this.toString().split(".")[1].length;
    } catch (e) {
    }
    try {
        t2 = arg.toString().split(".")[1].length;
    } catch (e) {
    }
    with (Math) {
        r1 = Number(this.toString().replace(".", ""));
        r2 = Number(arg.toString().replace(".", ""));
        return (r1 / r2) * pow(10, t2 - t1);
    }
}

// 给Number类型增加一个mul方法。
Number.prototype.mul = function (arg) {
    var m = 0, s1 = this.toString(), s2 = arg.toString();
    try {
        m += s1.split(".")[1].length;
    } catch (e) {
    }
    try {
        m += s2.split(".")[1].length;
    } catch (e) {
    }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}

// 给Number类型增加一个add方法。
Number.prototype.add = function (arg) {
    var r1, r2, m;
    try {
        r1 = this.toString().split(".")[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg.toString().split(".")[1].length;
    } catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    return (this.mul(m) + arg.mul(m)) / m;
}

// 给Number类型增加一个sub方法。
Number.prototype.sub = function (arg) {
    var r1, r2, m;
    try {
        r1 = this.toString().split(".")[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg.toString().split(".")[1].length;
    } catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    return (this.mul(m) - arg.mul(m)) / m;
}