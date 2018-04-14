package name.heshun.idm.domain.dao.auto;

import java.util.List;
import name.heshun.idm.domain.dto.auto.RoleInfo;
import name.heshun.idm.domain.dto.auto.RoleInfoExample;
import org.apache.ibatis.annotations.Param;

public interface RoleInfoMapper {
    long countByExample(RoleInfoExample example);

    int deleteByExample(RoleInfoExample example);

    int deleteByPrimaryKey(Long id);

    int insert(RoleInfo record);

    int insertSelective(RoleInfo record);

    List<RoleInfo> selectByExample(RoleInfoExample example);

    RoleInfo selectByPrimaryKey(Long id);

    int updateByExampleSelective(@Param("record") RoleInfo record, @Param("example") RoleInfoExample example);

    int updateByExample(@Param("record") RoleInfo record, @Param("example") RoleInfoExample example);

    int updateByPrimaryKeySelective(RoleInfo record);

    int updateByPrimaryKey(RoleInfo record);
}