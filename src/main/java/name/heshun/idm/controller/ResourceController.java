package name.heshun.idm.controller;

import name.heshun.idm.domain.dto.ResourceInfo;
import name.heshun.idm.service.ResourceService;
import name.heshun.idm.service.RoleService;
import name.heshun.idm.util.JsonUtils;
import name.heshun.idm.util.PageBean;
import name.heshun.idm.util.ResultData;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

/**
 * @Author: heshun
 * @Date: Create in 2018/4/14 15:36
 * @Content: 资源(进系统级的管理员使用)
 */
@RestController
@RequestMapping(value = "/resource")
public class ResourceController {
    private static final Logger LOGGER = LoggerFactory.getLogger(ResourceController.class);

    @Resource
    private ResourceService resourceService;
    @Resource
    private RoleService roleService;

    @RequestMapping(value = "/main", method = {RequestMethod.GET, RequestMethod.POST})
    public ModelAndView main(Model model, HttpServletRequest request) {
        LOGGER.info("访问了资源页面");
        ModelAndView mv = new ModelAndView();
        mv.setViewName("resource/main");
        return mv;
    }

    @RequestMapping(value = "/getList", method = {RequestMethod.GET, RequestMethod.POST})
    public String getList(HttpServletRequest request,
                          @RequestParam(name = "superId", required = false, defaultValue = "") Long superId,
                          @RequestParam(name = "name", required = false, defaultValue = "") String name,
                          @RequestParam(name = "deep", required = false, defaultValue = "0") int deep,
                          @RequestParam(name = "page", required = false, defaultValue = "1") int page,
                          @RequestParam(name = "rows", required = false, defaultValue = "10") int rows) {
        ResourceInfo info = new ResourceInfo();
        info.setSuperId(superId);
        info.setName(name);
        info.setDeep(deep);
        ResultData<PageBean<ResourceInfo>> ret = resourceService.listResource(info, page, rows);
        return JsonUtils.getJson(ret.getData());
    }

    @RequestMapping(value = "/save", method = {RequestMethod.GET, RequestMethod.POST})
    public String save(HttpServletRequest request,
                       @RequestParam(name = "id", required = false, defaultValue = "") Long id,
                       @RequestParam(name = "name", required = false, defaultValue = "") String name,
                       @RequestParam(name = "cssClass", required = false, defaultValue = "") String cssClass,
                       @RequestParam(name = "cssStyle", required = false, defaultValue = "") String cssStyle,
                       @RequestParam(name = "target", required = false, defaultValue = "") String target,
                       @RequestParam(name = "url", required = false, defaultValue = "") String url,
                       @RequestParam(name = "value", required = false, defaultValue = "") String value,
                       @RequestParam(name = "htmlAttribute", required = false, defaultValue = "") String htmlAttribute,
                       @RequestParam(name = "discription", required = false, defaultValue = "") String description,
                       @RequestParam(name = "superId", required = false, defaultValue = "") Long superId,
                       @RequestParam(name = "orderNo", required = false, defaultValue = "") Short orderNo,
                       @RequestParam(name = "newFlag", required = false, defaultValue = "0") int newFlag) {
        ResultData<Long> ret = new ResultData<>();
        ResourceInfo info = new ResourceInfo();
        info.setId(id);
        info.setName(name);
        info.setCssClass(cssClass);
        info.setCssStyle(cssStyle);
        info.setTarget(target);
        info.setUrl(url);
        info.setValue(value);
        info.setHtmlAttribute(htmlAttribute);
        info.setDescription(description);
        info.setSuperId(superId);
        info.setOrderNo(orderNo);
        try {
            if (1 == newFlag) {
                if (StringUtils.isEmpty(info.getName())) {
                    ret.setMessage("名称不能为空!");
                    return JsonUtils.getJson(ret);
                }
                ret = resourceService.insertResource(info);
            } else {
                ret = resourceService.updateResource(info);
            }
        } catch (Exception e) {
            LOGGER.warn(e.getMessage(), e);
            ret.setMessage(e.getMessage());
        }
        return JsonUtils.getJson(ret);
    }

    @RequestMapping(value = "/get", method = {RequestMethod.GET, RequestMethod.POST})
    public String get(HttpServletRequest request,
                      @RequestParam(name = "id", required = false, defaultValue = "") Long id) {
        ResultData<ResourceInfo> ret = resourceService.getResource(id);
        return JsonUtils.getJson(ret);
    }

    @RequestMapping(value = "/delete", method = {RequestMethod.GET, RequestMethod.POST})
    public String delete(HttpServletRequest request,
                         @RequestParam(name = "id", required = false, defaultValue = "") Long id) {
        ResultData<Long> ret = resourceService.deleteResource(id);
        return JsonUtils.getJson(ret);
    }
}
