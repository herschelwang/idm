/**
 * @Description: 扩展jquey方法
 *
 * disabled:是否包含disabled字段，默认不包含
 */
jQuery.prototype.serializeObject = function (disabled) {
    var obj = new Object();
    $.each(this.serializeArray(), function (index, param) {
        if (param.name in obj) {
            if (!jQuery.isArray(obj[param.name])) {
                var temp = obj[param.name];
                obj[param.name] = [];
                obj[param.name].push(temp);
            }
            obj[param.name].push(param.value);
        } else {
            obj[param.name] = param.value;
        }
    });
    if (disabled) {
        this.find(":disabled").each(function (index) {
            var name = $(this).attr("name");
            obj[name] = $(this).val();
        });
    }
    return obj;
}

jQuery.prototype.options = function () {
    var obj = new Object();
    $(this).children("option").each(function () { //遍历全部option
        obj[$(this).val()] = $(this).text()
    });
    return obj;
}

jQuery.fn.slideLeftHide = function (speed, callback) {
    this.animate({
        width: "hide",
        paddingLeft: "hide",
        paddingRight: "hide",
        marginLeft: "hide",
        marginRight: "hide"
    }, speed, callback);
}