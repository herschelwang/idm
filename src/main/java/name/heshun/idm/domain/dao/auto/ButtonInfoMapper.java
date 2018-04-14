package name.heshun.idm.domain.dao.auto;

import java.util.List;
import name.heshun.idm.domain.dto.auto.ButtonInfo;
import name.heshun.idm.domain.dto.auto.ButtonInfoExample;
import org.apache.ibatis.annotations.Param;

public interface ButtonInfoMapper {
    long countByExample(ButtonInfoExample example);

    int deleteByExample(ButtonInfoExample example);

    int deleteByPrimaryKey(Long id);

    int insert(ButtonInfo record);

    int insertSelective(ButtonInfo record);

    List<ButtonInfo> selectByExample(ButtonInfoExample example);

    ButtonInfo selectByPrimaryKey(Long id);

    int updateByExampleSelective(@Param("record") ButtonInfo record, @Param("example") ButtonInfoExample example);

    int updateByExample(@Param("record") ButtonInfo record, @Param("example") ButtonInfoExample example);

    int updateByPrimaryKeySelective(ButtonInfo record);

    int updateByPrimaryKey(ButtonInfo record);
}