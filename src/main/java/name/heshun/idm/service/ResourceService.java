package name.heshun.idm.service;

import name.heshun.idm.domain.dto.ResourceInfo;
import name.heshun.idm.domain.dto.auto.RoleResourceKey;
import name.heshun.idm.util.PageBean;
import name.heshun.idm.util.ResultData;

import java.util.List;

/**
 * @Author: heshun
 * @Date: Create in 2018/4/13 18:59
 * @Content:
 */
public interface ResourceService {

    ResultData<PageBean<ResourceInfo>> listResource(ResourceInfo info, int page, int rows);

    ResultData<List<RoleResourceKey>> listKeyByRoleId(Long roleId);

    ResultData<List<RoleResourceKey>> listKeyByResourceId(Long resourceId);

    Void saveRoleResource(Long roleId, List<Long> resourceIds);


    ResultData<Long> insertResource(ResourceInfo info);

    ResultData<Long> updateResource(ResourceInfo info);
    ResultData<ResourceInfo> getResource(Long id);
    ResultData<Long> deleteResource(Long id);
}

