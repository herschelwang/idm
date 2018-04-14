package name.heshun.idm.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import name.heshun.idm.constant.Constant;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

/**
 * @Author: heshun
 * @Date: Create in 2018/4/13 15:26
 * @Content:
 */
public class JsonUtils {

    public static ObjectMapper buildObjectMapper() {
        ObjectMapper mapper = new ObjectMapper();
        SimpleModule simpleModule = new SimpleModule();
        simpleModule.addSerializer(Long.class, LongAsStringSerializer.instance);
        simpleModule.addSerializer(Long.TYPE, LongAsStringSerializer.instance);
        mapper.registerModule(simpleModule);
        mapper.setDateFormat(new SimpleDateFormat(Constant.DATE_FORMAT));
        return mapper;
    }

    public static String getJson(Object object) {
        ObjectMapper mapper = buildObjectMapper();
        String json = getJson(object, mapper);
        return json;
    }

    public static String getJson(Object object, ObjectMapper mapper) {
        try {
            String json = mapper.writeValueAsString(object);
            return json;
        } catch (JsonProcessingException var3) {
            throw new RuntimeException(var3);
        }
    }

    public static <T> T getObject(String json, Class<T> clazz) {
        ObjectMapper mapper = buildObjectMapper();
        try {
            T t = mapper.readValue(json, clazz);
            return t;
        } catch (IOException var4) {
            throw new RuntimeException(var4);
        }
    }

    public static <T> List<T> getList(String json, Class<T> clazz) {
        ObjectMapper mapper = buildObjectMapper();
        try {
            JavaType javaType = mapper.getTypeFactory().constructParametricType(ArrayList.class, new Class[]{clazz});
            List<T> list = (List) mapper.readValue(json, javaType);
            return list;
        } catch (IOException var5) {
            throw new RuntimeException(var5);
        }
    }

    public static JsonNode readTree(String json) {
        ObjectMapper mapper = buildObjectMapper();

        try {
            JsonNode node = mapper.readTree(json);
            return node;
        } catch (IOException var3) {
            throw new RuntimeException(var3);
        }
    }

}
