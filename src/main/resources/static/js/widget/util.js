namespace("heshun.util");

//解决IE8及以下console未定义问题
window.console = window.console || (function () {
    var c = {};
    c.log = c.warn = c.debug = c.info = c.error = c.time = c.dir = c.profile
        = c.clear = c.exception = c.trace = c.assert = function () {
    };
    return c;
})();

heshun.util.templateEngine = function (html, options) {
    var reg = /<%([^%>]+)?%>/g,
        regExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g, code = 'var r=[];\n',
        cursor = 0;
    var add = function (line, js) {
        js ?
            (code += line.match(regExp) ? line + '\n' : 'r.push(' + line + ');\n') :
            (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
        return add;
    };
    while (match = reg.exec(html)) {
        add(html.slice(cursor, match.index))(match[1], true);
        cursor = match.index + match[0].length;
    }
    add(html.substr(cursor, html.length - cursor));
    code += 'return r.join("");';
    return new Function(code.replace(/[\r\t\n]/g, '')).apply(options);
}

heshun.util.regex = {
    not_empty: function (value) {
        return value !== null && $.trim(value).length > 0;
    },

    min_length: function (value, min_len, all_rules) {
        var length = $.trim(value).length, result = (length >= min_len);
        if (!all_rules['not_empty']) {
            result = result || length === 0;
        }
        return result;
    },

    max_length: function (value, max_len) {
        return $.trim(value).length <= max_len;
    },

    regex: function (value, regexp) {
        return regexp.test(value);
    },

    email: function (value) {
        // by Scott Gonzalez:
        // http://projects.scottsplayground.com/email_address_validation/
        var regex = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
        return regex.test($.trim(value));
    },

    url: function (value) {
        // by Scott Gonzalez: http://projects.scottsplayground.com/iri/
        var regex = /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
        return regex.test(value);
    },

    exact_length: function (value, exact_length, all_rules) {
        var length = $.trim(value).length, result = (length === exact_length);
        if (!all_rules['not_empty']) {
            result = result || length === 0;
        }
        return result;
    },

    equals: function (value, target) {
        return value === target;
    },

    ip: function (value) {
        var regex = /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/i;
        return regex.test($.trim(value));
    },

    credit_card: function (value) {
        // accept only spaces, digits and dashes
        if (/[^0-9 \-]+/.test(value)) {
            return false;
        }
        var nCheck = 0, nDigit = 0, bEven = false;

        value = value.replace(/\D/g, "");

        for (var n = value.length - 1; n >= 0; n--) {
            var cDigit = value.charAt(n);
            nDigit = parseInt(cDigit, 10);
            if (bEven) {
                if ((nDigit *= 2) > 9) {
                    nDigit -= 9;
                }
            }
            nCheck += nDigit;
            bEven = !bEven;
        }

        return (nCheck % 10) === 0;
    },

    alpha: function (value) {
        var regex = /^[a-z]*$/i;
        return regex.test(value);
    },

    alpha_numeric: function (value) {
        var regex = /^[a-z0-9]*$/i;
        return regex.test(value);
    },

    alpha_dash: function (value) {
        var regex = /^[a-z0-9_\-]*$/i;
        return regex.test(value);
    },

    digit: function (value) {
        var regex = /^\d*$/;
        return regex.test(value);
    },
    //数字
    numeric: function (value) {
        var regex = /^([\+\-]?[0-9]+(\.[0-9]+)?)?$/;
        return regex.test(value);
    },

    // an integer not less than zero
    //整数
    integer_zero: function (value) {
        var regex = /^\d+$/;
        return regex.test(value);
    },

    // same as numeric
    decimal: function (value) {
        var regex = /^([\+\-]?[0-9]+(\.[0-9]+)?)?$/;
        return regex.test(value);
    },
    //金额
    money: function (value) {
        var regex = /^[0-9]+(\.[0-9]{1,2})?$/;
        return regex.test(value);
    },

    matches: function (value, param) {
        return value === this.$form.find('[name="' + param + '"]').val();
    }
}

heshun.util.close = function () {
    var isIE = function () { //ie?
        if (!!window.ActiveXObject || "ActiveXObject" in window) {
            return true;
        } else {
            return false;
        }
    }
    var ua = navigator.userAgent;
    //  var ie= /msie/.test(navigator.userAgent.toLowerCase());

    if (isIE()) {
        window.opener = null;
        window.open('', '_self', '');
        window.close();
    } else {
        window.close();
    }
}

hehsun.util.openWindow = function (url) {
    window.open(url, "_blank", "scrollbars=yes,fullscreen=yes,resizable=yes,directories=yes,location=yes,menubar=yes");
}

hehsun.util.location = {
    getQuery: function (name, location) {
        var regex = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var _location = location || window.location;
        var result = _location.search.substr(1).match(regex);
        if (result != null)
            return unescape(result[2]);
        return null;
    }
}
