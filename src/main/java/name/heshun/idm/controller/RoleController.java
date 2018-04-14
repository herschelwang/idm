package name.heshun.idm.controller;

import name.heshun.idm.domain.dto.ResourceInfo;
import name.heshun.idm.domain.dto.auto.RoleInfo;
import name.heshun.idm.domain.dto.auto.RoleResourceKey;
import name.heshun.idm.service.ResourceService;
import name.heshun.idm.service.RoleService;
import name.heshun.idm.util.JsonUtils;
import name.heshun.idm.util.PageBean;
import name.heshun.idm.util.ResultData;
import name.heshun.idm.util.TreeNode;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.*;

/**
 * @Author: heshun
 * @Date: Create in 2018/4/11 15:51
 * @Content:
 */

@RestController
@RequestMapping("/role")
public class RoleController {
    private static Logger LOGGER = LoggerFactory.getLogger(RoleController.class);

    @Resource
    private RoleService roleService;

    @Resource
    private ResourceService resourceService;

    @RequestMapping(value = "/main", method = {RequestMethod.GET, RequestMethod.POST})
    public ModelAndView main(Model model, HttpServletRequest request) {
        LOGGER.info("访问了角色页面");
        ModelAndView mv = new ModelAndView();
        mv.setViewName("role/main");
        return mv;
    }


    @RequestMapping(value = "/listRole", produces = "text/html;charset=UTF-8",
            method = {RequestMethod.GET, RequestMethod.POST})
    public String listRole(HttpServletRequest request,
                           @RequestParam(required = false) String callback,
                           @RequestParam(name = "name", required = false, defaultValue = "") String name,
                           @RequestParam(name = "page", required = false, defaultValue = "1") int page,
                           @RequestParam(name = "rows", required = false, defaultValue = "10") int rows) {
        RoleInfo info = new RoleInfo();
        info.setName(name);
        ResultData<PageBean<RoleInfo>> ret = roleService.listRole(info, page, rows);
        String json = "";
        if (ret.isSuccess()) {
            json = JsonUtils.getJson(ret.getData());
        } else {
            json = "[]";
        }
        if (StringUtils.isEmpty(callback)) {
            return json;
        } else {
            return callback + "(" + json + ")";
        }
    }

    @RequestMapping(value = "/insert", produces = "text/html;charset=UTF-8",
            method = {RequestMethod.GET, RequestMethod.POST})
    public String insert(@RequestParam(name = "name", required = false, defaultValue = "") String name,
                         @RequestParam(name = "isDefault", required = false, defaultValue = "0") Byte isDefault,
                         @RequestParam(name = "description", required = false, defaultValue = "") String description,
                         @RequestParam(name = "remark", required = false, defaultValue = "") String remark)
            throws ServletException, IOException {
        RoleInfo info = new RoleInfo();
        info.setName(name);
        info.setDescription(description);
        info.setRemark(remark);
        info.setIsDefault(isDefault);
        ResultData<Long> ret = roleService.insertRole(info);
        return JsonUtils.getJson(ret);
    }

    @RequestMapping(value = "/update", produces = "text/html;charset=UTF-8",
            method = {RequestMethod.GET, RequestMethod.POST})
    public String update(@RequestParam(name = "name", required = false, defaultValue = "") String name,
                         @RequestParam(name = "isDefault", required = false, defaultValue = "0") Byte isDefault,
                         @RequestParam(name = "description", required = false, defaultValue = "") String description,
                         @RequestParam(name = "remark", required = false, defaultValue = "") String remark)
            throws ServletException, IOException {
        RoleInfo info = new RoleInfo();
        info.setName(name);
        info.setDescription(description);
        info.setRemark(remark);
        info.setIsDefault(isDefault);
        ResultData<Long> ret = roleService.updateRole(info);
        return JsonUtils.getJson(ret);
    }

    @RequestMapping(value = "/delete", produces = "text/html;charset=UTF-8",
            method = {RequestMethod.GET, RequestMethod.POST})
    public String delete(@RequestParam(name = "id", required = false, defaultValue = "") Long id)
            throws ServletException, IOException {
        ResultData<Long> ret = roleService.deleteRole(id);
        return JsonUtils.getJson(ret);
    }

    @RequestMapping(value = "/getRoleAndUserByRoleId", produces = "text/html;charset=UTF-8",
            method = {RequestMethod.GET, RequestMethod.POST})
    public String getRoleAndUserByRoleId(@RequestParam(name = "roleId", required = false, defaultValue = "") Long roleId) {
        ResultData<List<Map<String, Object>>> ret = roleService.getRoleAndUserByRoleId(roleId);
        return JsonUtils.getJson(ret);

    }

    @RequestMapping(value = "/getRoleAndFunctionByRoleId", produces = "text/html;charset=UTF-8",
            method = {RequestMethod.GET, RequestMethod.POST})
    public String getRoleAndFunctionByRoleId(@RequestParam(name = "roleId", required = false, defaultValue = "") Long roleId) {
        ResultData<List<Map<String, Object>>> ret = roleService.getRoleAndFunctionByRoleId(roleId);
        return JsonUtils.getJson(ret);

    }

    @RequestMapping(value = "/getRoleAndButtonByRoleId", produces = "text/html;charset=UTF-8",
            method = {RequestMethod.GET, RequestMethod.POST})
    public String getRoleAndButtonByRoleId(@RequestParam(name = "roleId", required = false, defaultValue = "") Long roleId) {
        ResultData<List<Map<String, Object>>> ret = roleService.getRoleAndButtonByRoleId(roleId);
        return JsonUtils.getJson(ret);

    }

    @RequestMapping(value = "/getRoleAndSysByRoleId", produces = "text/html;charset=UTF-8",
            method = {RequestMethod.GET, RequestMethod.POST})
    public String getRoleAndSysByRoleId(@RequestParam(name = "roleId", required = false, defaultValue = "") Long roleId) {
        ResultData<List<Map<String, Object>>> ret = roleService.getRoleAndSysByRoleId(roleId);
        return JsonUtils.getJson(ret);

    }

    @RequestMapping(value = "/assignUser2Role", produces = "text/html;charset=UTF-8",
            method = {RequestMethod.GET, RequestMethod.POST})
    public String assignUser2Role(@RequestParam(name = "roleId", required = false, defaultValue = "") Long roleId,
                                  @RequestParam(name = "jsonUserId", required = false, defaultValue = "") String jsonUserId) {
        List<Long> userIds = JsonUtils.getList(jsonUserId, Long.class);
        ResultData<Void> ret = roleService.assignUser2Role(roleId, userIds);
        return JsonUtils.getJson(ret);
    }

    @RequestMapping(value = "/assignFunction2Role", produces = "text/html;charset=UTF-8",
            method = {RequestMethod.GET, RequestMethod.POST})
    public String assignFunction2Role(@RequestParam(name = "roleId", required = false, defaultValue = "") Long roleId,
                                      @RequestParam(name = "jsonFunctionId", required = false, defaultValue = "") String jsonFunctionId) {
        List<Long> functionIds = JsonUtils.getList(jsonFunctionId, Long.class);
        ResultData<Void> ret = roleService.assignFunction2Role(roleId, functionIds);
        return JsonUtils.getJson(ret);
    }

    @RequestMapping(value = "/assignButton2Role", produces = "text/html;charset=UTF-8",
            method = {RequestMethod.GET, RequestMethod.POST})
    public String assignButton2Role(@RequestParam(name = "roleId", required = false, defaultValue = "") Long roleId,
                                    @RequestParam(name = "jsonButtonId", required = false, defaultValue = "") String jsonButtonId) {
        List<Long> buttonIds = JsonUtils.getList(jsonButtonId, Long.class);
        ResultData<Void> ret = roleService.assignButton2Role(roleId, buttonIds);
        return JsonUtils.getJson(ret);
    }

    @RequestMapping(value = "/assignSys2Role", produces = "text/html;charset=UTF-8",
            method = {RequestMethod.GET, RequestMethod.POST})
    public String assignSys2Role(@RequestParam(name = "roleId", required = false, defaultValue = "") Long roleId,
                                 @RequestParam(name = "jsonSysId", required = false, defaultValue = "") String jsonSysId) {
        List<Long> sysIds = JsonUtils.getList(jsonSysId, Long.class);
        ResultData<Void> ret = roleService.assignSys2Role(roleId, sysIds);
        return JsonUtils.getJson(ret);
    }

    /******************************************************************************************************************/

    @RequestMapping(value = "/getResourceTree", method = {RequestMethod.GET, RequestMethod.POST})
    public String getResourceTree() {
        ResourceInfo info = new ResourceInfo();
        info.setDeep(1);
        PageBean<ResourceInfo> data = resourceService.listResource(info, 1, 1000).getData();

        Collection<TreeNode> treeNodes = new ArrayList<>();
        for (ResourceInfo resourceInfo : data.getList()) {
            TreeNode treeNode = new TreeNode();
            treeNode.setId(String.valueOf(resourceInfo.getId()));
            treeNode.setText(resourceInfo.getName());
            treeNode.setSuperId(String.valueOf(resourceInfo.getSuperId()));
            Map<String, String> attributes = new HashMap<>();
            attributes.put("code", resourceInfo.getCode());
            attributes.put("value", resourceInfo.getValue());
            treeNode.setAttributes(attributes);
            treeNodes.add(treeNode);
        }

        Collection<TreeNode> rootNodes = TreeNode.buildTree(treeNodes);
        return JsonUtils.getJson(rootNodes);
    }

    @RequestMapping(value = "/getRoleResource", method = {RequestMethod.GET, RequestMethod.POST})
    public String getRoleResource(@RequestParam(name = "id", required = false, defaultValue = "") Long id) {
        ResultData<List<RoleResourceKey>> ret = new ResultData<>();
        try {
            List<RoleResourceKey> roleInfos = resourceService.listKeyByRoleId(id).getData();
            ret.setData(roleInfos);
            ret.setSuccess(true);
        } catch (Exception e) {
            LOGGER.warn(e.getMessage(), e);
            ret.setMessage(e.getMessage());
        }
        return JsonUtils.getJson(ret);
    }

    @RequestMapping(value = "/saveRoleResource", method = {RequestMethod.GET, RequestMethod.POST})
    public String saveRoleResource(@RequestParam(name = "roleId", required = false, defaultValue = "") Long roleId,
                                   @RequestParam(name = "jsonResourceIds", required = false, defaultValue = "") String jsonResourceIds) {
        ResultData<Void> ret = new ResultData<>();
        try {
            List<Long> resourceIds = JsonUtils.getList(jsonResourceIds, Long.class);
            resourceService.saveRoleResource(roleId, resourceIds);
            ret.setSuccess(true);
        } catch (Exception e) {
            LOGGER.warn(e.getMessage(), e);
            ret.setMessage(e.getMessage());
        }
        return JsonUtils.getJson(ret);
    }
}
