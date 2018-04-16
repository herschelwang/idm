package name.heshun.idm.domain.dao.auto;

import java.util.List;

import name.heshun.idm.domain.dto.auto.ResourceInfoExample;
import org.apache.ibatis.annotations.Param;

public interface ResourceInfoMapper {
    long countByExample(ResourceInfoExample example);

    int deleteByExample(ResourceInfoExample example);

    int deleteByPrimaryKey(Long id);

    int insert(ResourceInfo record);

    int insertSelective(ResourceInfo record);

    List<ResourceInfo> selectByExample(ResourceInfoExample example);

    ResourceInfo selectByPrimaryKey(Long id);

    int updateByExampleSelective(@Param("record") ResourceInfo record, @Param("example") ResourceInfoExample example);

    int updateByExample(@Param("record") ResourceInfo record, @Param("example") ResourceInfoExample example);

    int updateByPrimaryKeySelective(ResourceInfo record);

    int updateByPrimaryKey(ResourceInfo record);
}