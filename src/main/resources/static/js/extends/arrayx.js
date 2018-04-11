/**
 * @Description: 数据增加indexOf方法
 *
 * disabled:是否包含disabled字段，默认不包含
 */
Array.prototype.indexOf = function (Object) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == Object) {
            return i;
        }
    }
    return -1;
}

Array.prototype.hasValue = function (value) {
    if (null == value) {
        return false;
    }
    for (var i = 0; i < this.length; i++) {
        if (this[i] == value) {
            return true;
        }
    }
    return false;
}


