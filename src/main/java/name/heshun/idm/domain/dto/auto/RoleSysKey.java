package name.heshun.idm.domain.dto.auto;

import java.io.Serializable;

public class RoleSysKey implements Serializable {
    private Long roleId;

    private Long sysId;

    private static final long serialVersionUID = 1L;

    public Long getRoleId() {
        return roleId;
    }

    public void setRoleId(Long roleId) {
        this.roleId = roleId;
    }

    public Long getSysId() {
        return sysId;
    }

    public void setSysId(Long sysId) {
        this.sysId = sysId;
    }
}