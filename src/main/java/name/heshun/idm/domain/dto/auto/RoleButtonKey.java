package name.heshun.idm.domain.dto.auto;

import java.io.Serializable;

public class RoleButtonKey implements Serializable {
    private Long roleId;

    private Long buttonId;

    private static final long serialVersionUID = 1L;

    public Long getRoleId() {
        return roleId;
    }

    public void setRoleId(Long roleId) {
        this.roleId = roleId;
    }

    public Long getButtonId() {
        return buttonId;
    }

    public void setButtonId(Long buttonId) {
        this.buttonId = buttonId;
    }
}