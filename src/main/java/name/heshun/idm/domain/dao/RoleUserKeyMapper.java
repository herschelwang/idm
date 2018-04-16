package name.heshun.idm.domain.dao;

import java.util.List;
import java.util.Map;

public interface RoleUserKeyMapper {

    /**
     * 根据角色获取用户（含未选中）
     *
     * @param roleId
     * @return
     */
    public List<Map<String, Object>> listUserByRoleId(Long roleId);
}
