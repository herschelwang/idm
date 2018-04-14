package name.heshun.idm.util;

import java.io.Serializable;

/**
 * @Author: heshun
 * @Date: Create in 2018/4/13 15:02
 * @Content:
 */
public class ResultData<T> implements Serializable {
    private static final long serialVersionUID = 1L;

    private boolean success;

    private String message;

    private String code;

    private T data;

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}
