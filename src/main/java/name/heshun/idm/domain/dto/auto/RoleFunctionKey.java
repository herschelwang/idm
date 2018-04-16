package name.heshun.idm.domain.dto.auto;

import java.io.Serializable;

public class RoleFunctionKey implements Serializable {
    private Long roleId;

    private Long functionId;

    private static final long serialVersionUID = 1L;

    public Long getRoleId() {
        return roleId;
    }

    public void setRoleId(Long roleId) {
        this.roleId = roleId;
    }

    public Long getFunctionId() {
        return functionId;
    }

    public void setFunctionId(Long functionId) {
        this.functionId = functionId;
    }
}