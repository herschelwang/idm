package name.heshun.idm.domain.dao.auto;

import java.util.List;
import name.heshun.idm.domain.dto.auto.FunctionInfo;
import name.heshun.idm.domain.dto.auto.FunctionInfoExample;
import org.apache.ibatis.annotations.Param;

public interface FunctionInfoMapper {
    long countByExample(FunctionInfoExample example);

    int deleteByExample(FunctionInfoExample example);

    int deleteByPrimaryKey(Long id);

    int insert(FunctionInfo record);

    int insertSelective(FunctionInfo record);

    List<FunctionInfo> selectByExample(FunctionInfoExample example);

    FunctionInfo selectByPrimaryKey(Long id);

    int updateByExampleSelective(@Param("record") FunctionInfo record, @Param("example") FunctionInfoExample example);

    int updateByExample(@Param("record") FunctionInfo record, @Param("example") FunctionInfoExample example);

    int updateByPrimaryKeySelective(FunctionInfo record);

    int updateByPrimaryKey(FunctionInfo record);
}