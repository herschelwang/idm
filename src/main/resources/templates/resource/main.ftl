<#include "../base/base.ftl">
<@htmlHead title="${serverName!}-角色管理">

<script type="text/javascript" src="${applicationPath!}/js/resource/main.js"></script>

<style type="text/css">
    .form-page .datagrid .operation-button {
        margin-left: 10px;
        height: 30px;
        line-height: 30px;
        display: inline-block;
    }

    .form-page .datagrid-row.datagrid-row-selected .operation-button {
        color: #fff;
    }

    #roleModal .form-horizontal .form-group {
        margin-bottom: 0;
    }

    #roleModal label {
        margin: 0;
        line-height: 30px;
        padding-right: 0px;
        text-align: left;
        width: 100%;
        background-color: #ffffff;
        display: inline-block;
        font-weight: 500;
        height: 100%;
        padding-bottom: 0px;
        border-right: 0px solid #d8d8d8;
    }
</style>
</@htmlHead>

<@htmlBody class="form-page">
<div class="container-fluid">
    <div class="page-content">
        <div class="page-header" id="page-header">
            <div class="page-title">资源管理</div>
        </div>

        <div class="row">
            <div class="col-xs-3">
                <ul id="resourceTree" style="min-height:400px;padding:10px 10px;border:1px solid #D4D4D4"></ul>
            </div>
            <div class="col-xs-9">
                <div class="row">
                    <div class="col-xs-12">
                        <div id="toolbar">
                            <div style="float:left">
                                <button type="button" data-toolar="add" class="btn btn-sm btn-primary">添加资源</button>
                            </div>
                            <div data-search="base" style="float:right">
                                <form class="form-inline">
                                    <div class="radio-inline form-group">
                                        <label>
                                            <input type="radio" name="deep" value="0" checked>仅子级
                                        </label>
                                    </div>
                                    <div class="radio-inline">
                                        <label>
                                            <input type="radio" name="deep" value="1">遍历子级
                                        </label>
                                    </div>
                                    <div class="form-group">
                                        <label for="name">名称：</label>
                                        <input type="text" class="form-control" name="name">
                                    </div>
                                    <button type="button" data-toolar="search" class="btn btn-sm btn-primary">查找
                                    </button>
                                </form>
                            </div>
                            <div style="clear:both"></div>
                        </div>
                        <table id="mainTable" class="list"></table>
                    </div>
                </div>
            </div><!--row-->
        </div>
    </div>
</div>

<!-- 资源-->
<div id="resourceModal" class="modal fade" tabindex="-1">
    <div class="modal-dialog" style="width: 800px;">
        <div class="modal-content" style="width: 800px;">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="bigger">
                    <span class="modal-title">资源管理</span>
                </h4>
            </div>
            <div class="modal-body overflow-visible" style="min-height:280px;">
                <form id="resourceForm" class="form-horizontal">
                    <div class="row">
                        <div class="col-xs-6" style="text-align:left">
                            <div class="form-group">
                                <label class="col-sm-5 control-label" for="name">父级<span
                                        class="needfield">*</span>:</label>
                                <div class="col-sm-7">
                                    <input type="text" name="superId" class="easyui-combotree"
                                           data-options="cls:'form-control',height:32,url:'${serverPath!}/resource/getTree?deep=1&self=1'"/>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-5 control-label" for="name">名称<span
                                        class="needfield">*</span>:</label>
                                <div class="col-sm-7">
                                    <input type="text" class="form-control" name="name"/>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-5 control-label" for="cssClass">样式类:</label>
                                <div class="col-sm-7">
                                    <input type="text" class="form-control" name="cssClass"/>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-5 control-label" for="cssStyle">样式:</label>
                                <div class="col-sm-7">
                                    <input type="text" class="form-control" name="cssStyle"/>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-5 control-label" for="target">打开方式:</label>
                                <div class="col-sm-7">
                                    <input type="text" class="form-control" name="target"/>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-5 control-label" for="url">地址:</label>
                                <div class="col-sm-7">
                                    <input type="text" class="form-control" name="url"/>
                                </div>
                            </div>
                        </div><!--col-->
                        <div class="col-xs-6" style="text-align:left">
                            <div class="form-group">
                                <label class="col-sm-5 control-label" for="value">资源值:</label>
                                <div class="col-sm-7">
                                    <input type="text" class="form-control" name="value"/>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-5 control-label" for="htmlAttribute">HTML标识:</label>
                                <div class="col-sm-7">
                                    <input type="text" class="form-control" name="htmlAttribute"/>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-5 control-label" for="orderNo">排序号:</label>
                                <div class="col-sm-7">
                                    <input type="text" class="form-control easyui-numberbox"
                                           data-options="cls:'form-control',height:32,min:0" name="orderNo"/>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-5 control-label" for="description">说明:</label>
                                <div class="col-sm-7">
                                    <textarea name="description" class="form-control" rows="3"></textarea>
                                </div>
                            </div>
                        </div><!--col-->
                    </div>
                    <input type="hidden" name="id">
                    <input type="hidden" name="newFlag">
                </form>
            </div>

            <div class="modal-footer">
                <button type="button" name="save" class="btn btn-md btn-primary">确定</button>
            </div>
        </div>
    </div>
</div><!-- 资源送检单位 -->


<!-- 权限 -->
<div id="roleModal" class="modal fade" tabindex="-1">
    <div class="modal-dialog" style="width: 800px;">
        <div class="modal-content" style="width: 800px;">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="bigger">
                    <span class="modal-title">角色管理</span>
                </h4>
            </div>
            <div class="modal-body overflow-visible" style="min-height:280px;margin:0 auto;">
                <div class="row">
                    <div class="col-xs-12">
                        <p style="font-size:16px;">请选择该资源的角色</p>
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
                        <p><i class="fa fa-list"></i>权限列表</p>
                    </div>
                </div>

                <form id="roleForm" class="form-horizontal">
                    <div class="container-fluid">
                        <div class="row">
                            <#if roleList??>
                                <#list roleList as role>
                                    <div class="col-xs-3" style="text-align:left">
                                        <div class="form-group">
                                            <div class="checkbox">
                                                <label>
                                                    <input type="checkbox" name="roleId" value="${role.id}">
                                                    <span title="${role.description}">${role.name}</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </#list>
                            </#if>
                        </div>
                    </div>
                    <input type="hidden" name="resourceId">
                </form>
            </div>

            <div class="modal-footer">
                <button type="button" name="save" class="btn btn-md btn-primary">确定</button>
            </div>
        </div>
    </div>
</div><!-- 权限 -->

</@htmlBody>

