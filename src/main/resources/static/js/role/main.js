namespace("name.heshun.idm.role");

$(function () {
    name.heshun.idm.role.init();

    $('#resourceTree').tree({
        url: paas.webCfg.applicationPath + '/role/getResourceTree',
        checkbox: true,
        cascadeCheck: false,
        onBeforeCheck: function (node, checked) {
            return !$(node.target).hasClass('check-disabaled');
        }
    });

    $('#resourceModal [name="selectAll"]').on('click', function () {
        var roots = $('#resourceTree').tree('getChecked', 'unchecked');

        for (i = 0; i < roots.length; i++) {
            $('#resourceTree').tree('check', roots[i].target);
        }
    });

    $('#resourceModal [name="deselectAll"]').on('click', function () {
        var roots = $('#resourceTree').tree('getChecked');
        for (i = 0; i < roots.length; i++) {
            $('#resourceTree').tree('uncheck', roots[i].target);
        }
    });

    $('#resourceModal [name="save"]').click(function () {
        var param = $('#resourceForm').serializeObject();
        var resourceIds = [];
        var nodes = $('#resourceTree').tree('getChecked');
        for (var i = 0; i < nodes.length; i++) {
            resourceIds.push(nodes[i].id);
        }
        $.ajax({
            type: "POST",
            contentType: "application/x-www-form-urlencoded;charset=utf-8",
            url: paas.webCfg.applicationPath + '/role/saveRoleResource',
            dataType: "json",
            data: {
                roleId: $('#resourceForm [name="roleId"]').val(),
                jsonResourceIds: JSON.stringify(resourceIds)
            }
        }).done(function (ret) {
            if (ret.succeed) {
                alert("保存成功");
                $('#resourceModal').modal("hide");
            } else {
                alert("保存失败:" + ret.msg);
            }
        }).fail(function () {
            alert("保存失败");
        });
    });
});

name.heshun.idm.role.init = function () {
    $('#roleTable').datagrid({
        url: paas.webCfg.applicationPath + '/role/listRole',
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
        pageList: [15, 30, 50, 100],
        rownumbers: true,
        toolbar: '#toolbar',
        pageSize: 15,
        queryParams: {
            name: ''
        },
        columns: [[
            {
                field: 'id',
                title: '角色id',
                align: 'center',
                width: 50
            },
            {
                field: 'name',
                title: '角色名称',
                align: 'center',
                width: 50
            },
            {
                field: 'isDefault',
                width: 50,
                title: '是否默认',
                align: 'center',
                formatter: function (value, row, rowIndex) {
                    if ("1" == value) {
                        return "是";
                    } else {
                        return "否";
                    }
                }
            },
            {
                field: 'description',
                width: 70,
                align: 'center',
                title: '角色说明'
            },
            {
                field: 'remark',
                width: 100,
                align: 'center',
                title: '备注'
            },
            {
                field: 'op',
                width: 200,
                title: '操作',
                align: 'center',
                formatter: function (value, row, rowIndex) {
                    var tmpGap = "&nbsp;&nbsp;&nbsp;";
                    var op = "";
                    op += "<a href='javascript:void(0);' onclick='name.heshun.idm.role.lookAssignFn(" + rowIndex + ")'>功能</a>" + tmpGap;
                    op += "<a href='javascript:void(0);' onclick='name.heshun.idm.role.lookAssignBtn(" + rowIndex + ")'>按钮</a>" + tmpGap;
                    op += "<a href='javascript:void(0);' onclick='name.heshun.idm.role.lookAssignPerson(" + rowIndex + ")'>人员</a>" + tmpGap;
                    op += "<a href='javascript:void(0);' onclick='name.heshun.idm.role.lookAssignSys(" + rowIndex + ")'>系统</a>" + tmpGap;
                    op += "<a href='javascript:void(0);' onclick='role_resource(" + rowIndex + ")'>资源</a>" + tmpGap;
                    return op;
                }
            }
        ]]
    });

    $('#updateRole').click(function () {
        name.heshun.idm.role.updateRole();
    });

    $('#updateRoleToUser').click(function () {
        name.heshun.idm.role.updateRoleToUser();
    });

    $('#updateRoleToFn').click(function () {
        name.heshun.idm.role.updateRoleToFn();
    });

    $('#updateRoleToBtn').click(function () {
        name.heshun.idm.role.updateRoleToBtn();
    });

    $('#updateRoleToDataSubject').click(function () {
        name.heshun.idm.role.updateRoleToDataSubject();
    });

    $('#updateSysToRole').click(function () {
        name.heshun.idm.role.updateSysToRole();
    });

    $('.selectpicker').selectpicker({
        'size': 9,
        'width': '420px',
        'countSelectedText': '{0} of {1} selected'
    });
}

// init-功能
name.heshun.idm.role.lookAssignFn = function (rowIndex) {
    var row = $('#roleTable').datagrid('getRowByIndex', rowIndex);
    $('#lableForFnSelect').text(row.name);
    $.ajax({
        type: "GET",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        url: "getRoleAndFunctionByRoleId",
        dataType: "json",
        data: {
            roleId: row.id
        }, // 以json格式传递
        success: function (ret) {
            if (ret.succeed) {
                $('#lookRoleFnModal').modal("show");
                var item = document.getElementById('fnSelect');
                item.options.length = 0;
                var sval = [];
                var data = ret.data;
                for (var i = 0; i < data.length; i++) {
                    item.add(new Option("【" + data[i].MODULENAME + "】" + data[i].FUNCTIONNAME, data[i].FUNCTIONID));
                    if (data[i].ROLEID != null && data[i].ROLEID != '') {
                        sval.push(data[i].FUNCTIONID);
                    }
                }
                var select = $('#fnSelect');
                select.selectpicker('refresh');
                select.selectpicker('val', sval);
                select.selectpicker('refresh');
            } else {
                alert("错误：" + ret.msg);
            }
        }
    });
}

// init-按钮
name.heshun.idm.role.lookAssignBtn = function (rowIndex) {
    var row = $('#roleTable').datagrid('getRowByIndex', rowIndex);
    $('#lableForBtnSelect').text(row.name);
    $.ajax({
        type: "GET",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        url: "getRoleAndButtonByRoleId",
        dataType: "json",
        data: {
            roleId: row.id
        }, // 以json格式传递
        success: function (ret) {
            if (ret.succeed) {
                $('#lookRoleBtnModal').modal("show");
                var item = document.getElementById('btnSelect');
                item.options.length = 0;
                var sval = [];
                var data = ret.data;
                for (var i = 0; i < data.length; i++) {
                    item.add(new Option(data[i].BUTTONNAME, data[i].BUTTONID));
                    if (data[i].ROLEID != null && data[i].ROLEID != '') {
                        sval.push(data[i].BUTTONID);
                    }
                }
                var select = $('#btnSelect');
                select.selectpicker('refresh');
                select.selectpicker('val', sval);
                select.selectpicker('refresh');
            } else {
                alert("错误：" + ret.msg);
            }
        }
    });
}

// init-人员
name.heshun.idm.role.lookAssignPerson = function (rowIndex) {
    var row = $('#roleTable').datagrid('getRowByIndex', rowIndex);
    $('#lableForUserSelect').text(row.name);
    $.ajax({
        type: "GET",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        url: "getRoleAndUserByRoleId",
        dataType: "json",
        data: {
            roleId: row.id
        }, // 以json格式传递
        success: function (ret) {
            if (ret.succeed) {
                $('#lookRoleUserModal').modal("show");
                var item = document.getElementById('userSelect');
                item.options.length = 0;
                var sval = [];
                var data = ret.data;
                for (var i = 0; i < data.length; i++) {
                    item.add(new Option(data[i].USERNAME, data[i].USERID));
                    if (data[i].ROLEID != null && data[i].ROLEID != '') {
                        sval.push(data[i].USERID);
                    }
                }
                var select = $('#userSelect');
                select.selectpicker('refresh');
                select.selectpicker('val', sval);
                select.selectpicker('refresh');
            } else {
                alert("错误：" + ret.msg);
            }
        }
    });
}

// init-系统
name.heshun.idm.role.lookAssignSys = function (rowIndex) {
    var row = $('#roleTable').datagrid('getRowByIndex', rowIndex);
    $('#lableForSysSelect').text(row.name);
    $.ajax({
        type: "GET",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        url: paas.webCfg.applicationPath + '/role/getRoleAndSysByRoleId',
        dataType: "json",
        data: {
            roleId: row.id
        }, // 以json格式传递
        success: function (ret) {
            if (ret.succeed) {
                $('#lookRoleSysModal').modal("show");
                var item = document.getElementById('sysSelect');
                item.options.length = 0;
                var sval = [];
                var data = ret.data;
                for (var i = 0; i < data.length; i++) {
                    item.add(new Option(data[i].SYSNAME, data[i].SYSID));
                    if (data[i].ROLEID != null && data[i].ROLEID != '') {
                        sval.push(data[i].SYSID);
                    }
                }
                var select = $('#sysSelect');
                select.selectpicker('refresh');
                select.selectpicker('val', sval);
                select.selectpicker('refresh');
            } else {
                alert("错误：" + ret.msg);
            }
        }
    });
}

// init-资源
var role_resource = function (rowIndex) {
    var row = $('#roleTable').datagrid('getRowByIndex', rowIndex);
    $('#resourceForm').form('clear');
    $('#resourceForm [name="roleId"]').val(row.id);
    $('#resourceTree .check-disabaled').removeClass('check-disabaled');

    var roots = $('#resourceTree').tree('getChecked');
    for (i = 0; i < roots.length; i++) {
        $('#resourceTree').tree('uncheck', roots[i].target);
    }
    $.ajax({
        type: "POST",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        url: paas.webCfg.applicationPath + '/role/getRoleResource',
        dataType: "json",
        data: {
            id: row.id
        }
    }).done(function (ret) {
        if (ret.succeed) {
            var roleResourceList = ret.data;
            for (var i = 0; i < roleResourceList.length; i++) {
                var roleResource = roleResourceList[i];
                var node = $('#resourceTree').tree('find', roleResource.resourceId);
                if (node) {
                    $('#resourceTree').tree('check', node.target);
                }
            }
            $('#resourceModal').modal("show");
        } else {
            alert("数据加载失败: " + ret.msg);
        }
    }).fail(function () {
        alert("数据加载失败!");
    });
}

// init-
name.heshun.idm.role.updateRole = function () {
    $('#roleForm').form('submit', {
        url: paas.webCfg.applicationPath + '/role/' + $("#action").val(),
        onSubmit: function () {
            return $(this).form('validate');
        },
        success: function (result) {
            var ret = JSON.parse(result);
            if (ret.succeed) {
                alert("保存成功!");
                $("#editRoleModal").modal("hide");
                $('#roleTable').datagrid('reload');
            } else {
                alert("保存失败: " + ret.msg);
            }
        }
    });
}

// init-
name.heshun.idm.role.updateRoleToUser = function () {
    var row = $('#roleTable').datagrid('getSelected');
    var userIds = $('#userSelect').val() ? $('#userSelect').val() : [];
    $.ajax({
        type: "POST",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        url: paas.webCfg.applicationPath + '/role/assignUser2Role',
        dataType: "json",
        data: {
            roleId: row.id,
            jsonUserId: JSON.stringify(userIds)
        },
        success: function (ret) {
            if (ret.succeed) {
                alert("保存成功!");
            } else {
                alert("保存失败: " + ret.msg);
            }
            $("#lookRoleUserModal").modal("hide");
        }
    });
}

// init-
name.heshun.idm.role.updateRoleToFn = function () {
    var row = $('#roleTable').datagrid('getSelected');
    var functionIds = $('#fnSelect').val() ? $('#fnSelect').val() : [];
    $.ajax({
        type: "POST",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        url: paas.webCfg.applicationPath + '/role/assignFunction2Role',
        dataType: "json",
        data: {
            roleId: row.id,
            jsonFunctionId: JSON.stringify(functionIds)
        },
        success: function (ret) {
            if (ret.succeed) {
                alert("保存成功!");
            } else {
                alert("保存失败: " + ret.msg);
            }
            $("#lookRoleFnModal").modal("hide");
        }
    });
}

// init-
name.heshun.idm.role.updateRoleToBtn = function () {
    var row = $('#roleTable').datagrid('getSelected');
    var buttonIds = $('#btnSelect').val() ? $('#btnSelect').val() : [];
    $.ajax({
        type: "POST",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        url: paas.webCfg.applicationPath + '/role/assignButton2Role',
        dataType: "json",
        data: {
            roleId: row.id,
            jsonButtonId: JSON.stringify(buttonIds)
        },
        success: function (ret) {
            if (ret.succeed) {
                alert("保存成功!");
            } else {
                alert("保存失败: " + ret.msg);
            }
            $("#lookRoleBtnModal").modal("hide");
        }
    });
}

// init-
name.heshun.idm.role.updateRoleToDataSubject = function () {

}

// init-
name.heshun.idm.role.updateSysToRole = function () {
    var row = $('#roleTable').datagrid('getSelected');
    var sysIds = $('#sysSelect').val() ? $('#sysSelect').val() : [];
    $.ajax({
        type: "POST",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        url: paas.webCfg.applicationPath + '/role/assignSys2Role',
        dataType: "json",
        data: {
            roleId: row.id,
            jsonSysId: JSON.stringify(sysIds)
        },
        success: function (ret) {
            if (ret.succeed) {
                alert("保存成功!");
            } else {
                alert("保存失败: " + ret.msg);
            }
            $("#lookRoleSysModal").modal("hide");
        }
    });
}

// ftl-新增
name.heshun.idm.role.add = function () {
    $('#roleForm').form('clear');
    $("#action").val("insert");
    $('#editRoleModal').modal("show");
};

// ftl-修改
name.heshun.idm.role.modify = function () {
    var row = $('#roleTable').datagrid('getSelected');
    if (!row) {
        alert("请选择要修改的记录!");
        return;
    }
    $('#roleForm').form('load', row);
    $("#action").val("update");
    $('#editRoleModal').modal("show");
}

// ftl-删除
name.heshun.idm.role.del = function () {
    var row = $('#roleTable').datagrid('getSelected');
    if (!row) {
        alert('请选择要删除的记录!');
        return;
    }
    var r = confirm("是否要删除角色: " + row.name);
    if (r) {
        $.ajax({
            type: "POST",
            contentType: "application/x-www-form-urlencoded;charset=utf-8",
            url: paas.webCfg.applicationPath + '/role/delete',
            dataType: "json",
            data: {
                'id': row.id
            },
            success: function (ret) {
                if (ret.succeed) {
                    alert("删除成功");
                    name.heshun.idm.role.queryGrid();
                } else {
                    alert("删除失败:" + ret.msg);
                }
                $("#editRoleModal").modal("hide");
            }
        });
    }
}

// ftl-查询
name.heshun.idm.role.queryGrid = function () {
    var grid = $('#roleTable');
    var queryParams = grid.datagrid('options').queryParams;
    queryParams.name = $('#qroleName').val();
    grid.datagrid('reload');
}

// ftl-全选
name.heshun.idm.role.selectAllUser = function () {
    $('#userSelect').selectpicker('selectAll');
}

// ftl-全取消
name.heshun.idm.role.deSelectAllUser = function () {
    $('#userSelect').selectpicker('deselectAll');
};

// ftl-全选
name.heshun.idm.role.selectAllFn = function () {
    $('#fnSelect').selectpicker('selectAll');
};

// ftl-全取消
name.heshun.idm.role.deSelectAllFn = function () {
    $('#fnSelect').selectpicker('deselectAll');
};

// ftl-全选
name.heshun.idm.role.selectAllBtn = function () {
    $('#btnSelect').selectpicker('selectAll');
};

// ftl-全取消
name.heshun.idm.role.deSelectAllBtn = function () {
    $('#btnSelect').selectpicker('deselectAll');
};

// ftl-全选
name.heshun.idm.role.selectAllSys = function () {
    $('#sysSelect').selectpicker('selectAll');
};

// ftl-全取消
name.heshun.idm.role.deSelectAllSys = function () {
    $('#sysSelect').selectpicker('deselectAll');
};

