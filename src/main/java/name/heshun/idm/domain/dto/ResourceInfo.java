package name.heshun.idm.domain.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

public class ResourceInfo implements Serializable {
    private Long id;

    private Date gmtCreate;

    private Date gmtModified;

    private Byte isDelete;

    private Long superId;

    private Byte isEnabled;

    private String name;

    private String code;

    private String value;

    private Short orderNo;

    private String cssType;

    private String cssClass;

    private String htmlAttribute;

    private String url;

    private String description;

    private String target;

    private static final long serialVersionUID = 1L;

    //
    private int deep;

    private int self;

    private String superCode;

    private List<String> roleIds;

    private List<ResourceInfo> resourceInfos;

    private int sonNum;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getGmtCreate() {
        return gmtCreate;
    }

    public void setGmtCreate(Date gmtCreate) {
        this.gmtCreate = gmtCreate;
    }

    public Date getGmtModified() {
        return gmtModified;
    }

    public void setGmtModified(Date gmtModified) {
        this.gmtModified = gmtModified;
    }

    public Byte getIsDelete() {
        return isDelete;
    }

    public void setIsDelete(Byte isDelete) {
        this.isDelete = isDelete;
    }

    public Long getSuperId() {
        return superId;
    }

    public void setSuperId(Long superId) {
        this.superId = superId;
    }

    public Byte getIsEnabled() {
        return isEnabled;
    }

    public void setIsEnabled(Byte isEnabled) {
        this.isEnabled = isEnabled;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code == null ? null : code.trim();
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value == null ? null : value.trim();
    }

    public Short getOrderNo() {
        return orderNo;
    }

    public void setOrderNo(Short orderNo) {
        this.orderNo = orderNo;
    }

    public String getCssType() {
        return cssType;
    }

    public void setCssType(String cssType) {
        this.cssType = cssType == null ? null : cssType.trim();
    }

    public String getCssClass() {
        return cssClass;
    }

    public void setCssClass(String cssClass) {
        this.cssClass = cssClass == null ? null : cssClass.trim();
    }

    public String getHtmlAttribute() {
        return htmlAttribute;
    }

    public void setHtmlAttribute(String htmlAttribute) {
        this.htmlAttribute = htmlAttribute == null ? null : htmlAttribute.trim();
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url == null ? null : url.trim();
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description == null ? null : description.trim();
    }

    public String getTarget() {
        return target;
    }

    public void setTarget(String target) {
        this.target = target == null ? null : target.trim();
    }

    public int getDeep() {
        return deep;
    }

    public void setDeep(int deep) {
        this.deep = deep;
    }

    public int getSelf() {
        return self;
    }

    public void setSelf(int self) {
        this.self = self;
    }

    public String getSuperCode() {
        return superCode;
    }

    public void setSuperCode(String superCode) {
        this.superCode = superCode;
    }

    public List<String> getRoleIds() {
        return roleIds;
    }

    public void setRoleIds(List<String> roleIds) {
        this.roleIds = roleIds;
    }

    public List<ResourceInfo> getResourceInfos() {
        return resourceInfos;
    }

    public void setResourceInfos(List<ResourceInfo> resourceInfos) {
        this.resourceInfos = resourceInfos;
    }

    public int getSonNum() {
        return sonNum;
    }

    public void setSonNum(int sonNum) {
        this.sonNum = sonNum;
    }
}