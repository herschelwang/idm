package name.heshun.idm;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@MapperScan("name.heshun.idm.**.dao")
@SpringBootApplication
public class IdmApplication {

	public static void main(String[] args) {
		SpringApplication.run(IdmApplication.class, args);
	}
}
