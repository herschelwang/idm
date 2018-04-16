package name.heshun.idm.domain.dto.auto;

import java.io.Serializable;

public class RoleUserKey implements Serializable {
    private Long roleId;

    private Long userId;

    private static final long serialVersionUID = 1L;

    public Long getRoleId() {
        return roleId;
    }

    public void setRoleId(Long roleId) {
        this.roleId = roleId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}