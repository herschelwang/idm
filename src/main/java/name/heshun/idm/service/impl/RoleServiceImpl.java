package name.heshun.idm.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import name.heshun.idm.constant.IsDeleteEnum;
import name.heshun.idm.domain.dao.RoleUserKeyMapper;
import name.heshun.idm.domain.dao.auto.RoleInfoMapper;
import name.heshun.idm.domain.dto.auto.*;
import name.heshun.idm.service.RoleService;
import name.heshun.idm.util.PageBean;
import name.heshun.idm.util.ResultData;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * @Author: heshun
 * @Date: Create in 2018/4/15 23:37
 * @Content:
 */
@Service
public class RoleServiceImpl implements RoleService {

    @Resource
    private RoleInfoMapper roleInfoMapper;
    @Resource
    private RoleUserKeyMapper roleUserKeyMapper;

    @Override
    public ResultData<PageBean<RoleInfo>> listRole(RoleInfo info, int page, int rows) {
        ResultData<PageBean<RoleInfo>> ret = new ResultData<>();
        PageBean<RoleInfo> data = new PageBean<>();
        // 分页插件
        PageHelper.startPage(page, rows);
        // 查询
        RoleInfoExample example = new RoleInfoExample();
        // 1. 未删除
        example.createCriteria().andIsDeleteEqualTo(IsDeleteEnum.NOT_DELTE.getKey());
        // 2. 条件
        if (StringUtils.isNotBlank(info.getName())) {
            example.createCriteria().andNameLike("%" + info.getName() + "%");
        }

        List<RoleInfo> list = roleInfoMapper.selectByExample(example);
        PageInfo<RoleInfo> pageInfo = new PageInfo<>(list);

        data.setList(pageInfo.getList());
        data.setTotalCount((int) pageInfo.getTotal());

        ret.setData(data);
        ret.setSuccess(true);
        return ret;
    }

    @Override
    public ResultData<List<RoleInfo>> listRole(RoleInfo info) {
        return null;
    }

    @Override
    public ResultData<List<RoleInfo>> listRoleByUserId(Long userId) {
        return null;
    }

    @Override
    public ResultData<Long> insertRole(RoleInfo info) {
        ResultData<Long> ret = new ResultData<>();
        info.setGmtCreate(new Date());
        int result = roleInfoMapper.insertSelective(info);
        if (result > 0) {
            ret.setData(info.getId());
            ret.setSuccess(true);
        }
        return ret;
    }

    @Override
    public ResultData<Long> updateRole(RoleInfo info) {
        ResultData<Long> ret = new ResultData<>();
        info.setGmtModified(new Date());
        int result = roleInfoMapper.updateByPrimaryKeySelective(info);
        if (result > 0) {
            ret.setData(info.getId());
            ret.setSuccess(true);
        }
        return ret;
    }

    @Override
    public ResultData<Long> deleteRole(Long id) {
        ResultData<Long> ret = new ResultData<>();
        RoleInfo info = roleInfoMapper.selectByPrimaryKey(id);
        info.setIsDelete(IsDeleteEnum.IS_DELETE.getKey());
        info.setGmtModified(new Date());
        int result = roleInfoMapper.updateByPrimaryKeySelective(info);
        if (result > 0) {
            ret.setData(info.getId());
            ret.setSuccess(true);
        }
        return ret;
    }

    @Override
    public ResultData<List<Map<String, Object>>> listUserByRoleId(Long roleId) {
        ResultData<List<Map<String, Object>>> ret = new ResultData<>();
        List<Map<String, Object>> data = roleUserKeyMapper.listUserByRoleId(roleId);
        ret.setData(data);
        ret.setSuccess(true);
        return ret;
    }

    @Override
    public ResultData<List<Map<String, Object>>> getRoleAndFunctionByRoleId(Long roleId) {
        return null;
    }

    @Override
    public ResultData<List<Map<String, Object>>> getRoleAndButtonByRoleId(Long roleId) {
        return null;
    }

    @Override
    public ResultData<List<Map<String, Object>>> getRoleAndSysByRoleId(Long roleId) {
        return null;
    }

    @Override
    public ResultData<Void> assignUser2Role(Long roleId, List<Long> userIds) {
        return null;
    }

    @Override
    public ResultData<Void> assignFunction2Role(Long roleId, List<Long> functionIds) {
        return null;
    }

    @Override
    public ResultData<Void> assignButton2Role(Long roleId, List<Long> buttonIds) {
        return null;
    }

    @Override
    public ResultData<Void> assignSys2Role(Long roleId, List<Long> sysIds) {
        return null;
    }

    @Override
    public ResultData<List<ModuleInfo>> getModuleListByRoleIds(List<String> roleIds) {
        return null;
    }

    @Override
    public ResultData<List<FunctionInfo>> getFunctionListByRoleId(List<String> roleIds) {
        return null;
    }

    @Override
    public ResultData<List<FunctionInfo>> getFunctionListByRoleIdAndModuleId(List<String> roleIds, String moduleId) {
        return null;
    }

    @Override
    public ResultData<List<ButtonInfo>> getButtonListByRoleIdAndFunctionId(List<String> roleIds, String functionId) {
        return null;
    }
}
