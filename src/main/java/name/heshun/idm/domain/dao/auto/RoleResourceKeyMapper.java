package name.heshun.idm.domain.dao.auto;

import java.util.List;
import name.heshun.idm.domain.dto.auto.RoleResourceKey;
import name.heshun.idm.domain.dto.auto.RoleResourceKeyExample;
import org.apache.ibatis.annotations.Param;

public interface RoleResourceKeyMapper {
    long countByExample(RoleResourceKeyExample example);

    int deleteByExample(RoleResourceKeyExample example);

    int deleteByPrimaryKey(@Param("roleId") Long roleId, @Param("resourceId") Long resourceId);

    int insert(RoleResourceKey record);

    int insertSelective(RoleResourceKey record);

    List<RoleResourceKey> selectByExample(RoleResourceKeyExample example);

    int updateByExampleSelective(@Param("record") RoleResourceKey record, @Param("example") RoleResourceKeyExample example);

    int updateByExample(@Param("record") RoleResourceKey record, @Param("example") RoleResourceKeyExample example);
}