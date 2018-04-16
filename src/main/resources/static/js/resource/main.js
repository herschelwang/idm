namespace("name.heshun.idm.resource");

$(function () {

    name.heshun.idm.resource.init;

    $('#resourceTree').tree({
        url: paas.webCfg.applicationPath + '/resource/getTree?deep=1',
        onBeforeLoad: function (node, param) {
            if (node) {
                param.self = 0;
            } else {
                param.self = 1;
            }
            return true;
        },
        onLoadSuccess: function (node, data) {
            if (node) {
                $(this).tree('select', node.target);
            } else {
                var root = $(this).tree('getRoot');
                $(this).tree('select', root.target);
            }
        },
        onSelect: function (node) {
            name.heshun.idm.resource.queryGrid();
        }
    });

    $('#resourceModal').on('shown.bs.modal', function () {
        var width = $('[comboname="superId"]').parent().width();
        var combowidth = $('[comboname="superId"]').combotree('options').width;
        if (width != combowidth) {
            $('[comboname="superId"]').combotree('resize', width);
        }
    });

    $("[data-toolar='search']").on("click", function () {
        var queryParam = $(this).parents("form").serializeObject();
        name.heshun.idm.resource.queryGrid(queryParam);
    });

    $("[data-toolar='add']").click(function () {
        $('#resourceForm').form('clear');
        var node = $('#resourceTree').tree('getSelected');
        $('#resourceForm').form('load', {
            orgId: $('#orgId').val(),
            superId: node.id,
            newFlag: 1
        });
        $('#resourceModal').modal("show");
    });

    $('#resourceModal [name="save"]').click(function () {
        var param = $('#resourceForm').serializeObject();
        if ('' == param.name) {
            alert('名称不能为空!');
            return false;
        }
        $.ajax({
            type: "POST",
            contentType: "application/x-www-form-urlencoded;charset=utf-8",
            url: paas.webCfg.applicationPath + '/resource/save',
            dataType: "json",
            data: param
        }).done(function (ret) {
            if (ret.succeed) {
                name.heshun.idm.resource.queryTree(param.superId);
                alert("保存成功!");
                $('#resourceModal').modal("hide");
            } else {
                alert("保存失败: " + ret.msg);
            }
        }).fail(function () {
            alert("保存失败!");
        });
    });

    $('#roleModal [name="selectAll"]').on('click', function () {
        $('#roleForm [name="roleId"]').prop('checked', true);
    });

    $('#roleModal [name="deselectAll"]').on('click', function () {
        $('#roleForm [name="roleId"]').prop('checked', false);
    });

    $('#roleModal [name="save"]').click(function () {
        var param = $('#roleForm').serializeObject();
        var roleIds = [];
        $("#roleForm [name = roleId]:checked").each(function () {
            roleIds.push($(this).attr("value"));
        });
        $.ajax({
            type: "POST",
            contentType: "application/x-www-form-urlencoded;charset=utf-8",
            url: paas.webCfg.applicationPath + '/resource/saveRoleResource',
            dataType: "json",
            data: {
                resourceId: $('#roleForm [name="resourceId"]').val(),
                jsonRoleIds: JSON.stringify(roleIds)
            }
        }).done(function (ret) {
            if (ret.succeed) {
                name.heshun.idm.resource.queryGrid();
                alert("保存成功!");
                $('#roleModal').modal("hide");
            } else {
                alert("保存失败: " + ret.msg);
            }
        }).fail(function () {
            alert("保存失败!");
        });
    });
});

name.heshun.idm.resource.init = function () {
    $('#mainTable').datagrid($.extend({
        url: paas.webCfg.applicationPath + '/resource/getList',
        toolbar: '#toolbar',
        queryParams: {},
        onBeforeLoad: function (param) {
            if (!param.superId) {
                return false;
            }
        },
        columns: [[
            {
                field: 'name',
                title: '名称',
                align: 'center',
                width: 20
            },
            {
                field: 'value',
                title: '资源值',
                align: 'center',
                width: 20
            },
            {
                field: 'htmlAttribute',
                title: 'HTML属性',
                align: 'center',
                width: 10
            },
            {
                field: 'url',
                width: 30,
                title: 'URL',
                align: 'center'
            }, {
                field: 'op',
                width: 20,
                title: '操作',
                align: 'center',
                formatter: function (value, row, rowIndex) {
                    var content = '';
                    content += '<div class="operation-wapper">'
                        + '<a href="javascript:void(0);" class="operation-button" onclick=name.heshun.idm.resource.resource_role(' + rowIndex + ')><i class="fa fa-users"></i>角色</a>'
                        + '<a href="javascript:void(0);" class="operation-button" onclick=name.heshun.idm.resource.resource_edit(' + rowIndex + ')><i class="fa fa-pencil-square-o"></i>编辑</a>'
                        + '<a href="javascript:void(0);" class="operation-button" onclick=name.heshun.idm.resource.resource_delete(' + rowIndex + ')><i class="fa fa-trash-o"></i>删除</a>'
                        + '</div>';
                    return content;
                }
            }
        ]]
    }, easyui_datagrid_default_setting));
}

// init-角色
name.heshun.idm.resource.resource_role = function (rowIndex) {
    var row = $('#mainTable').datagrid('getRowByIndex', rowIndex);
    $('#roleForm').form('clear');
    $('#roleForm [name="resourceId"]').val(row.id);
    $.ajax({
        type: "POST",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        url: paas.webCfg.applicationPath + '/resource/getRoleResource',
        dataType: "json",
        data: {
            id: row.id
        }
    }).done(function (ret) {
        if (ret.succeed) {
            var roleList = ret.data;
            var content = '';
            for (var i = 0; i < roleList.length; i++) {
                var role = roleList[i];
                $('#roleForm [name="roleId"]').filter('[value="' + role.roleId + '"]').prop('checked', true);
            }
            $('#roleModal').modal("show");
        } else {
            alert("数据加载失败: " + ret.msg);
        }
    }).fail(function () {
        alert("数据加载失败!");
    });
}

// init-编辑
name.heshun.idm.resource.resource_edit = function (rowIndex) {
    var row = $('#mainTable').datagrid('getRowByIndex', rowIndex);
    $.ajax({
        type: "POST",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        url: paas.webCfg.applicationPath + '/resource/get',
        dataType: "json",
        data: {
            id: row.id
        }
    }).done(function (ret) {
        if (ret.succeed) {
            $('#resourceForm').form('load', $.extend({newFlag: 0}, ret.data));
            $('#resourceModal').modal("show");
        } else {
            alert("数据加载失败: " + ret.msg);
        }
    }).fail(function () {
        alert("数据加载失败!");
    });
}

// init-删除
name.heshun.idm.resource.resource_delete = function (rowIndex) {
    if (!confirm("确定删除该资源?")) {
        return;
    }
    var row = $('#mainTable').datagrid('getRowByIndex', rowIndex);
    $.ajax({
        type: "POST",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        url: paas.webCfg.applicationPath + '/resource/delete',
        dataType: "json",
        data: {
            id: row.id
        }
    }).done(function (ret) {
        if (ret.succeed) {
            name.heshun.idm.resource.queryTree();
            alert("删除成功!");
        } else {
            alert("删除失败: " + ret.msg);
        }
    }).fail(function () {
        alert("删除失败!");
    });
}


name.heshun.idm.resource.queryGrid = function (queryParam) {
    var node = $('#resourceTree').tree('getSelected');
    if (!queryParam) {
        queryParam = {};
    }
    queryParam.superId = node.id;
    $('#mainTable').datagrid("reload", queryParam);
}

name.heshun.idm.resource.queryTree = function (id) {
    var node1;
    var node2;
    var $combotree = $('#resourceForm [comboname="superId"]').combotree('tree');
    if (typeof(id) != 'undefined') {
        node1 = $('#resourceTree').tree('find', id);
        node2 = $combotree.tree('find', id);
    } else {
        node1 = $('#resourceTree').tree('getSelected');
        node2 = $combotree.tree('getSelected');
    }
    if ($('#resourceTree').tree('isLeaf', node1.target)) {
        var parentNode = $('#resourceTree').tree('getParent', node1.target);
        if (null == parentNode) {
            $('#resourceTree').tree('reload');
        } else {
            $('#resourceTree').tree('reload', parentNode.target);
        }

    } else {
        $('#resourceTree').tree('reload', node1.target);
    }

    if ($combotree.tree('isLeaf', node2.target)) {
        var parentNode = $combotree.tree('getParent', node2.target);
        if (null == parentNode) {
            $combotree.tree('reload');
        } else {
            $combotree.tree('reload', parentNode.target);
        }
    } else {
        $combotree.tree('reload', node2.target);
    }
}





