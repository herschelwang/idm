$.extend($.fn.datagrid.methods, {
    /**
     * 通过行ID获取行
     * @param jq    : 行索引
     * @param id    : 行ID
     */
    getRowById: function (jqGrid, id) {
        var rows = $(jqGrid).datagrid('getRows');
        var idField = $(jqGrid).datagrid('options').idField;
        for (var i = 0; i < rows.length; i++) {
            if (id == rows[i][idField]) {
                return rows[i];
            }
        }
        return null;
    },
    /**
     * 通过行号获取行
     * @param jq    :
        * @param rowIndex    : 行ID
     */
    getRowByIndex: function (jqGrid, rowIndex) {
        var rows = $(jqGrid).datagrid('getRows');
        if (0 <= rowIndex && rowIndex < rows.length) {
            return rows[rowIndex];
        } else {
            return null;
        }
    }
});

$.extend($.fn.datagrid.defaults.editors, {
    buttonGroup: {
        init: function (container, options) {
            var rowIndex = $(container).parents(".datagrid-row").attr("datagrid-row-index");
            var input = $(options.formatter(rowIndex)).appendTo(container);
            return input;
        },
        destroy: function (target) {
            $(target).remove();
        },
        getValue: function (target) {
            return null;
        },
        setValue: function (target, value) {
        },
        resize: function (target, width) {
        }
    }
});

$.extend($.fn.datagrid.defaults.editors, {
    bootDatepicker: {
        init: function (container, options) {
            var input = $('<input type="text">').appendTo(container);
            input.datepicker(options);
            return input;


        },
        destroy: function (target) {
            $(target).datepicker('destroy');
        },
        getValue: function (target) {
            return $(target).val();
        },
        setValue: function (target, value) {
            $(target).val(value);
            $(target).datepicker('update', value);
        },
        resize: function (target, width) {
            $(target)._outerWidth(width);
        }
    }
});

$.extend($.fn.pagination.defaults, {layout: ['list', 'sep', 'first', 'prev', 'links', 'next', 'last']});

var easyui_datagrid_default_setting = {
    width: 'auto',
    height: 'auto',
    fitColumns: true,
    collapsible: true,
    animate: true,
    striped: true,
    singleSelect: true,
    border: true,
    loadMsg: '正在加载数据,请稍后!',
    pagination: true,
    pageList: [10, 25, 50, 100],
    rownumbers: true,
    pageSize: 10
};