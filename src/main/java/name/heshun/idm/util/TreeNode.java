package name.heshun.idm.util;

import java.io.Serializable;
import java.util.*;

/**
 * @Author: heshun
 * @Date: Create in 2018/4/14 16:18
 * @Content:
 */
public class TreeNode implements Serializable {
    private static final long serialVersionUID = 1L;
    public static final String STATE_OPEN = "open";
    public static final String STATE_CLOSED = "closed";
    private String id;
    private String superId;
    private String text;
    private String state;
    private boolean checked = false;
    private Map<String, String> attributes;
    private List<TreeNode> children;

    public static Collection<TreeNode> buildTree(Collection<TreeNode> treeNodes) {
        List<TreeNode> root = new ArrayList();
        Map<String, TreeNode> treeMap = new HashMap();
        Iterator var4 = treeNodes.iterator();

        TreeNode treeNode;
        while (var4.hasNext()) {
            treeNode = (TreeNode) var4.next();
            treeNode.setState(STATE_OPEN);
            treeNode.setChildren(new ArrayList());
            treeMap.put(treeNode.getId(), treeNode);
        }

        var4 = treeNodes.iterator();

        while (true) {
            while (var4.hasNext()) {
                treeNode = (TreeNode) var4.next();
                String superNodeId = treeNode.getSuperId();
                if (superNodeId != null && !"".equals(superNodeId)) {
                    TreeNode superNode = (TreeNode) treeMap.get(superNodeId);
                    if (superNode == null) {
                        root.add(treeNode);
                    } else {
                        superNode.setState(STATE_CLOSED);
                        List<TreeNode> children = superNode.getChildren();
                        children.add(treeNode);
                    }
                } else {
                    root.add(treeNode);
                }
            }
            return root;
        }
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSuperId() {
        return superId;
    }

    public void setSuperId(String superId) {
        this.superId = superId;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public boolean isChecked() {
        return checked;
    }

    public void setChecked(boolean checked) {
        this.checked = checked;
    }

    public Map<String, String> getAttributes() {
        return attributes;
    }

    public void setAttributes(Map<String, String> attributes) {
        this.attributes = attributes;
    }

    public List<TreeNode> getChildren() {
        return children;
    }

    public void setChildren(List<TreeNode> children) {
        this.children = children;
    }
}
