package name.heshun.idm.domain.dao.auto;

import java.util.List;
import name.heshun.idm.domain.dto.auto.ModuleInfo;
import name.heshun.idm.domain.dto.auto.ModuleInfoExample;
import org.apache.ibatis.annotations.Param;

public interface ModuleInfoMapper {
    long countByExample(ModuleInfoExample example);

    int deleteByExample(ModuleInfoExample example);

    int deleteByPrimaryKey(Long id);

    int insert(ModuleInfo record);

    int insertSelective(ModuleInfo record);

    List<ModuleInfo> selectByExample(ModuleInfoExample example);

    ModuleInfo selectByPrimaryKey(Long id);

    int updateByExampleSelective(@Param("record") ModuleInfo record, @Param("example") ModuleInfoExample example);

    int updateByExample(@Param("record") ModuleInfo record, @Param("example") ModuleInfoExample example);

    int updateByPrimaryKeySelective(ModuleInfo record);

    int updateByPrimaryKey(ModuleInfo record);
}