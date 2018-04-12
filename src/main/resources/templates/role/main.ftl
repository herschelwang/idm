<#include "../base/base.ftl">
<@htmlHead title="统一身份管系统-角色管理">
<link rel="stylesheet" type="text/css" href="${applicationPath!}/css/base/common.css">
<link rel="stylesheet" type="text/css" href="${applicationPath!}/css/iconfont/iconfont.css">
<link rel="stylesheet" type="text/css" href="${applicationPath!}/webjars/font-awesome/css/font-awesome.min.css">
<link rel="stylesheet" type="text/css" href="${applicationPath!}/webjars/bootstrap/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="${applicationPath!}/webjars/bootstrap/css/bootstrap-theme.min.css">
<link rel="stylesheet" type="text/css" href="${applicationPath!}/webjars/bootstrap-select/css/bootstrap-select.min.css">
<link rel="stylesheet" type="text/css" href="${applicationPath!}/lib/jquery-easyui/themes/bootstrap/easyui.css">
<link rel="stylesheet" type="text/css" href="${applicationPath!}/lib/jquery-easyui/themes/icon.css">

<script type="text/javascript" src="${applicationPath!}/webjars/jquery/jquery.min.js"></script>
<script type="text/javascript" src="${applicationPath!}/webjars/bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript" src="${applicationPath!}/webjars/bootstrap-select/js/bootstrap-select.min.js"></script>
<script type="text/javascript" src="${applicationPath!}/webjars/bootstrap-select/js/i18n/defaults-zh_CN.min.js"></script>
<script type="text/javascript" src="${applicationPath!}/webjars/jquery-cookie/jquery.cookie.js"></script>
<script type="text/javascript" src="${applicationPath!}/lib/jquery-easyui/jquery.easyui.min.js"></script>
<script type="text/javascript" src="${applicationPath!}/lib/jquery-easyui/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="${applicationPath!}/js/extends/easyuix.js"></script>
<script type="text/javascript" src="${applicationPath!}/js/extends/jqueryx.js"></script>
<script type="text/javascript" src="${applicationPath!}/js/widget/namespace.js"></script>
<script type="text/javascript" src="${applicationPath!}/js/widget/util.js"></script>

<script type="text/javascript" src="${applicationPath!}/js/app/role/main.js"></script>
</@htmlHead>

<@htmlBody class="skin1">
<input type="hidden" name="action" id="action" value=''>
<div>
    <table id="roleTable"></table>
</div>
<div id="toolbar">
    <a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'fa fa-plus-circle',plain:true"
       onclick="name.heshun.idm.role.add()">新增</a>
    <a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'fa fa-edit',plain:true"
       onclick="name.heshun.idm.role.modify()">修改</a>
    <a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'fa fa-cut',plain:true"
       onclick="name.heshun.idm.role.del()">删除</a>
    <span class='mainRoleQuery'>角色名: <input name="qroleName" id="qroleName" style="width:150px;">
		<a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'fa fa-search',plain:true"
           onclick="name.heshun.idm.role.queryGrid()">查询</a>
    </span>
</div>

    <@modal  id="editRoleModal" style="width:650px; ">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title" id="myModalLabel">角色信息</h4>
    </div>
    <form id="roleForm" method="post" enctype="multipart/form-data">
        <div class="modal-body">
            <p><label for="roleName">角色名称:</label>
                <input type="text" class="formData  easyui-validatebox" required="true" id="roleName" name="name"/>
            </p>
            <p><label for="isDefault">是否默认:</label>
                <input type="radio" name="isDefault" value="0" id="no">否</input>
                <input type="radio" name="isDefault" value="1" id="yes">是</input>
            </p>
            <p><label for="roleDesp">角色说明:</label>
                <input type="text" class="formData" id="roleDesp" name="description"/>
            </p>
            <p style="height:120px;"><label for="remark">备注:</label>
                <input id="remark" name="remark" class="easyui-textbox formData" multiline="true" style="width:300px">
            </p>

            <input type="hidden" class="formData" id="roleId" name="id"/>
        </div>
    </form>
    <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
        <button type="button" id="updateRole" class="btn btn-primary">保存</button>
    </div>
    </@modal>

    <@modal  id="editAssignFnModal">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title" id="myModalLabel">功能授权</h4>
    </div>
    <div class="modal-body">

    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
        <button type="button" id="updateRoleFnAssigned" class="btn btn-primary">保存</button>
    </div>
    </@modal>

    <@modal  id="lookRoleUserModal" style="width:600px;">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title" id="myModalLabel1">
            人员信息 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font color='green' size='3px;'>当前角色--><span
                id="lableForUserSelect"></span></font>
        </h4>
    </div>
    <div class="modal-body" style="height:360px;">
        <a href="javascript:void(0);" onclick="name.heshun.idm.role.selectAllUser()">全选</a>&nbsp;&nbsp;&nbsp;&nbsp;
        <a href="javascript:void(0);" onclick="name.heshun.idm.role.deSelectAllUser()">全取消</a>
        <select id="userSelect" class="selectpicker2 show-tick form-control" multiple data-live-search="true">
        </select>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
        <button type="button" id="updateRoleToUser" class="btn btn-primary">保存</button>
    </div>
    </@modal>

    <@modal  id="lookRoleFnModal" style="width:600px;">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title" id="myModalLabel2">
            功能信息 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font color='green' size='3px;'>当前角色--><span
                id="lableForFnSelect"></span></font>
        </h4>
    </div>
    <div class="modal-body" style="height:360px;">
        <a href="javascript:void(0);" onclick="name.heshun.idm.role.selectAllFn()">全选</a>&nbsp;&nbsp;&nbsp;&nbsp;
        <a href="javascript:void(0);" onclick="name.heshun.idm.role.deSelectAllFn()">全取消</a>
        <select id="fnSelect" class="selectpicker2 show-tick form-control" multiple data-live-search="true">
        </select>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
        <button type="button" id="updateRoleToFn" class="btn btn-primary">保存</button>
    </div>
    </@modal>

    <@modal  id="lookRoleBtnModal" style="width:600px;">
    <div class="modal-header">
        <button type="button" class="close"
                data-dismiss="modal" aria-hidden="true">
            &times;
        </button>
        <h4 class="modal-title" id="myModalLabel3">
            按钮信息 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font color='green' size='3px;'>当前角色--><span
                id="lableForBtnSelect"></span></font>
        </h4>
    </div>
    <div class="modal-body" style="height:360px;">
        <a href="javascript:void(0);" onclick="name.heshun.idm.role.selectAllBtn()">全选</a>&nbsp;&nbsp;&nbsp;&nbsp;
        <a href="javascript:void(0);" onclick="name.heshun.idm.role.deSelectAllBtn()">全取消</a>
        <select id="btnSelect" class="selectpicker2 show-tick form-control" multiple data-live-search="true">
        </select>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
        <button type="button" id="updateRoleToBtn" class="btn btn-primary">保存</button>
    </div>
    </@modal>

    <@modal  id="lookRoleSysModal" style="width:600px;">
    <div class="modal-header">
        <button type="button" class="close"
                data-dismiss="modal" aria-hidden="true">
            &times;
        </button>
        <h4 class="modal-title" id="myModalLabel4">
            系统信息 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font color='green' size='3px;'>当前角色--><span
                id="lableForSysSelect"></span></font>
        </h4>
    </div>
    <div class="modal-body" style="height:360px;">
        <a href="javascript:void(0);" onclick="name.heshun.idm.role.selectAllSys()">全选</a>&nbsp;&nbsp;&nbsp;&nbsp;
        <a href="javascript:void(0);" onclick="name.heshun.idm.role.deSelectAllSys()">全取消</a>
        <select id="sysSelect" class="selectpicker2 show-tick form-control" multiple data-live-search="true">
        </select>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
        <button type="button" id="updateSysToRole" class="btn btn-primary">保存</button>
    </div>
    </@modal>

    <@modal  id="lookRoleSysModal" style="width:600px;">
    <div class="modal-header">
        <button type="button" class="close"
                data-dismiss="modal" aria-hidden="true">
            &times;
        </button>
        <h4 class="modal-title" id="myModalLabel4">
            系统信息 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font color='green' size='3px;'>当前角色--><span
                id="lableForSysSelect"></span></font>
        </h4>
    </div>
    <div class="modal-body" style="height:360px;">
        <a href="javascript:void(0);" onclick="name.heshun.idm.role.selectAllSys()">全选</a>&nbsp;&nbsp;&nbsp;&nbsp;
        <a href="javascript:void(0);" onclick="name.heshun.idm.role.deSelectAllSys()">全取消</a>
        <select id="sysSelect" class="selectpicker2 show-tick form-control" multiple data-live-search="true"></select>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
        <button type="button" id="updateSysToRole" class="btn btn-primary">保存</button>
    </div>
    </@modal>



<!-- 资源 -->
<div id="resourceModal" class="modal fade" tabindex="-1">
    <div class="modal-dialog" style="width: 400px;">
        <div class="modal-content" style="width: 400px;">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="bigger">
                    <span class="modal-title">角色资源管理</span>
                </h4>
            </div>
            <div class="modal-body overflow-visible" style="min-height:280px;width:300px;margin:0 auto;">
                <div class="row">
                    <div class="col-xs-12">
                        <p style="font-size:16px;">请选择该角色的资源</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-6" style="text-align:right;border-right:1px solid #D0D0D0">
                        <a href="javascript:void(0);" name="selectAll">全部展开</a>
                    </div>
                    <div class="col-xs-6" style="text-align:left">
                        <a href="javascript:void(0);" name="deselectAll">全部关闭</a>
                    </div>
                </div>
                <div class="row" style="margin-top:10px;">
                    <div class="col-xs-12" style="text-align:left">
                        <p><i class="fa fa-list"></i>资源列表</p>
                    </div>
                </div>

                <form id="resourceForm" class="form-horizontal">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-xs-12" style="text-align:left">
                                <ul id="resourceTree"
                                    style="min-height:400px;padding:10px 10px;border:1px solid #D4D4D4"></ul>
                            </div>
                        </div>
                    </div>
                    <input type="hidden" name="roleId">
                </form>
            </div>

            <div class="modal-footer">
                <button type="button" name="save" class="btn btn-md btn-primary">确定</button>
            </div>
        </div>
    </div>
</div><!-- 资源 -->
</@htmlBody>
