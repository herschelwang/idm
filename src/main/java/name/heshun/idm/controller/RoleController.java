package name.heshun.idm.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

/**
 * @Author: heshun
 * @Date: Create in 2018/4/11 15:51
 * @Content:
 */

@RestController
@RequestMapping("/role")
public class RoleController {

    private static Logger LOG = LoggerFactory.getLogger(RoleController.class);

    @RequestMapping(value = "/main", method = {RequestMethod.GET, RequestMethod.POST})
    public ModelAndView main(Model model, HttpServletRequest request) {
        LOG.info("访问了角色页面");
        ModelAndView mv = new ModelAndView();
        mv.setViewName("role/main");
        return mv;
    }


}
