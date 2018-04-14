package name.heshun.idm.util;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import java.io.IOException;

/**
 * @Author: heshun
 * @Date: Create in 2018/4/13 15:31
 * @Content:
 */
public class LongAsStringSerializer extends JsonSerializer<Long> {

    private static long JACASCRIPT_LONG_MAX = (long) Math.pow(2.0D, 52.0D);

    public static final LongAsStringSerializer instance = new LongAsStringSerializer();

    @Override
    public void serialize(Long aLong, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        if (aLong != null) {
            if (aLong.longValue() > JACASCRIPT_LONG_MAX) {
                jsonGenerator.writeString(aLong.toString());
            } else {
                jsonGenerator.writeNumber(aLong.longValue());
            }
        } else {
            jsonGenerator.writeNull();
        }
    }
}
