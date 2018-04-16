package name.heshun.idm.constant;

/**
 * @Author: heshun
 * @Date: Create in 2018/4/16 10:22
 * @Content:
 */
public enum IsDeleteEnum {
    NOT_DELTE((byte) 0, "未删除"),
    IS_DELETE((byte) 1, "已删除");

    private final Byte key;
    private final String value;

    IsDeleteEnum(Byte key, String value) {
        this.key = key;
        this.value = value;
    }

    public Byte getKey() {
        return key;
    }

    public String getValue() {
        return value;
    }
}
