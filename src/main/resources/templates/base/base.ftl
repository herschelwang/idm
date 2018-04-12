<#--公共基础文件-->
<#macro htmlHead title charset="utf-8" lang="zh-CN">
<!DOCTYPE html>
<html>
<head>
    <title>${title}</title>
    <meta charset="${charset}">
    <meta http-equiv="Content-Type" content="text/html; charset=${charset}">
    <meta http-equiv="Content-Language" content="${lang}">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <style type="text/css"><#if textCss??>${textCss}</#if></style>

    <script type="text/javascript">
        if (typeof(window.paas) == "undefined") {
            window.paas = {};
        }
        paas.webCfg = {
            fileServePath: "${fileServePath!}",
            applicationPath: "${applicationPath!}",
            paasWorkflowPath: "${paasWorkflowPath!}",
            paasIdmPath: "${paasIdmPath!}",
            paasMsbPath: "${paasMsbPath!}"
        };
        paas.loginUser = {
            userId: "${(paasLoginUser.id)!}",
            userName: "${(paasLoginUser.name)!}",
            orgId: "${(paasLoginUser.orgId)!}",
            orgName: "${(paasLoginUser.orgName)!}",
            topOrgId: "${(paasLoginUser.topOrgId)!}",
            topOrgName: "${(paasLoginUser.topOrgName)!}"
        }
            <#if textJs??>${textJs}</#if>
    </script>
    <#nested>
</head>
</#macro>

<#macro htmlBody class="" style="">
<body class="${class}" style="${style}">
    <#nested>
</body>
</html>
</#macro>

<#macro addScript>
    <#assign tempScript>
        <#nested>
    </#assign>
    <#if textJs??>
        <#assign textJs = textJs + tempScript>
    <#else>
        <#assign textJs = tempScript>
    </#if>
</#macro>

<#macro addStyle>
    <#assign tempCss>
        <#nested>
    </#assign>
    <#if textCss??>
        <#assign textCss = textCss + tempCss>
    <#else>
        <#assign textCss = tempCss>
    </#if>
</#macro>

<#macro modal id class="" style="">
<div class="modal fade ${class!}" id="${id!}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
     aria-hidden="true">
    <div class="modal-dialog" style="${style!}">
        <div class="modal-content">
            <#nested/>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
</#macro>

<#macro flowHiddenFeild >
<div class="process-hidden">
    <input type="hidden" id="bizPk" data-process="bizPk" name="bizPk" value="${bizPk!}">
    <input type="hidden" id="bizKey" data-process="bizKey" name="bizKey" value="${bizKey!}">
<#--审批结果-->
    <input type="hidden" data-process="result" data-intention="result" name="result">
<#--模拟下一步-->
    <input type="hidden" data-intention="next" name="next">
    <input type="hidden" data-intention="type" data-require="true">
    <#nested/>
</div>
</#macro>

<#macro suggestion bizPk="">
<script type="text/javascript">
    (function () {
        var commetsTemplate = "<% for (var i = 0; i < this.length; i++) { %>" +
                "<tr><td> <% this[i].time %> </td>" +
                "<td><span class='icon'></span> <% this[i].userName %> </td>" +
                "<td> <% this[i].activeName %> </td>" +
                "<td> <% this[i].message %></td></tr> <% } %> ";
        $.ajax({
            url: '${paasWorkflowPath}/commonFlow/getComments',
            dataType: "jsonp",
            type: "POST",
            cache: false,
            contentType: "application/x-www-form-urlencoded;charset=utf-8",
            data: {
                "bizPk": "${bizPk!}"
            },
            success: function (ret) {
                if (ret.succeed) {
                    $('#commentTable').append(heshun.util.templateEngine(commetsTemplate, ret.data));
                }
                else {
                    alert("获取审核意见失败" + ret.msg);
                }

            },
            error: function (e) {
                alert("获取审核意见失败" + e);
            }
        });

        $.ajax({
            url: '${paasWorkflowPath}/commonFlow/getForwardComments',
            dataType: "jsonp",
            type: "POST",
            cache: false,
            contentType: "application/x-www-form-urlencoded;charset=utf-8",
            data: {
                "bizPk": "${bizPk!}"
            },
            success: function (ret) {
                if (ret.succeed) {
                    $('#forwardCommentTable').append(heshun.util.templateEngine(commetsTemplate, ret.data));
                }
                else {
                    alert("获取审核意见失败" + ret.msg);
                }

            },
            error: function (e) {
                alert("获取审核意见失败" + e);
            }
        });
    })();
</script>
<div class="audit easyui-tabs" style="width:100%">
    <div title="办理痕迹" style="padding:20px">
        <table id="commentTable">
            <tr>
                <th style="width:150px"></th>
                <th style="width:100px"></th>
                <th style="width:120px"></th>
                <th></th>
            </tr>
        </table>
    </div>
    <div title="办理意见" style="padding:20px;display:none">
        <table id="forwardCommentTable">
            <tr>
                <th style="width:150px"></th>
                <th style="width:100px"></th>
                <th style="width:120px"></th>
                <th></th>
            </tr>
        </table>
    </div>
</div>
</#macro>
