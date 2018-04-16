package name.heshun.idm.service;

import name.heshun.idm.domain.dto.auto.ButtonInfo;
import name.heshun.idm.domain.dto.auto.FunctionInfo;
import name.heshun.idm.domain.dto.auto.ModuleInfo;
import name.heshun.idm.domain.dto.auto.RoleInfo;
import name.heshun.idm.util.PageBean;
import name.heshun.idm.util.ResultData;

import java.util.List;
import java.util.Map;


/**
 * @Author: heshun
 * @Date: Create in 2018/4/13 14:37
 * @Content:
 */
public interface RoleService {

    /**
     * 获取角色列表
     *
     * @param info
     * @param page
     * @param rows
     * @return
     */
    ResultData<PageBean<RoleInfo>> listRole(RoleInfo info, int page, int rows);

    ResultData<List<RoleInfo>> listRole(RoleInfo info);

    ResultData<List<RoleInfo>> listRoleByUserId(Long userId);

    /**
     * 新增角色信息
     *
     * @param info
     * @return
     */
    ResultData<Long> insertRole(RoleInfo info);

    /**
     * 更新角色信息
     *
     * @param info
     * @return
     */
    ResultData<Long> updateRole(RoleInfo info);

    /**
     * 删除角色信息
     *
     * @param id
     * @return
     */
    ResultData<Long> deleteRole(Long id);

    /**
     * 获取角色用户信息
     *
     * @param roleId
     * @return
     */
    ResultData<List<Map<String, Object>>> listUserByRoleId(Long roleId);

    /**
     * 获取角色功能(菜单)信息
     *
     * @param roleId
     * @return
     */
    ResultData<List<Map<String, Object>>> getRoleAndFunctionByRoleId(Long roleId);

    /**
     * 获取角色按钮信息
     *
     * @param roleId
     * @return
     */
    ResultData<List<Map<String, Object>>> getRoleAndButtonByRoleId(Long roleId);

    /**
     * 获取角色系统信息
     *
     * @param roleId
     * @return
     */
    ResultData<List<Map<String, Object>>> getRoleAndSysByRoleId(Long roleId);

    /**
     * 给角色分配用户
     *
     * @param roleId
     * @param userIds
     * @return
     */
    ResultData<Void> assignUser2Role(Long roleId, List<Long> userIds);

    /**
     * 给角色分配功能(菜单)
     *
     * @param roleId
     * @param functionIds
     * @return
     */
    ResultData<Void> assignFunction2Role(Long roleId, List<Long> functionIds);

    /**
     * 给角色分配按钮
     *
     * @param roleId
     * @param buttonIds
     * @return
     */
    ResultData<Void> assignButton2Role(Long roleId, List<Long> buttonIds);

    /**
     * 给角色分配系统
     *
     * @param roleId
     * @param sysIds
     * @return
     */
    ResultData<Void> assignSys2Role(Long roleId, List<Long> sysIds);


    /**
     * 根据角色获取模块列表
     *
     * @param roleIds
     * @return
     */
    ResultData<List<ModuleInfo>> getModuleListByRoleIds(List<String> roleIds);

    /**
     * 根据角色获取功能列表
     *
     * @param roleIds
     * @return
     */
    ResultData<List<FunctionInfo>> getFunctionListByRoleId(List<String> roleIds);

    /**
     * 根据角色和模块获取功能列表
     *
     * @param roleIds
     * @param moduleId
     * @return
     */
    ResultData<List<FunctionInfo>> getFunctionListByRoleIdAndModuleId(List<String> roleIds, String moduleId);

    /**
     * 根据角色和功能获取按钮列表
     *
     * @param roleIds
     * @param functionId
     * @return
     */
    ResultData<List<ButtonInfo>> getButtonListByRoleIdAndFunctionId(List<String> roleIds, String functionId);
}
