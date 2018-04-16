package name.heshun.idm.domain.dao.auto;

import java.util.List;
import name.heshun.idm.domain.dto.auto.SysInfo;
import name.heshun.idm.domain.dto.auto.SysInfoExample;
import org.apache.ibatis.annotations.Param;

public interface SysInfoMapper {
    long countByExample(SysInfoExample example);

    int deleteByExample(SysInfoExample example);

    int deleteByPrimaryKey(Long id);

    int insert(SysInfo record);

    int insertSelective(SysInfo record);

    List<SysInfo> selectByExample(SysInfoExample example);

    SysInfo selectByPrimaryKey(Long id);

    int updateByExampleSelective(@Param("record") SysInfo record, @Param("example") SysInfoExample example);

    int updateByExample(@Param("record") SysInfo record, @Param("example") SysInfoExample example);

    int updateByPrimaryKeySelective(SysInfo record);

    int updateByPrimaryKey(SysInfo record);
}