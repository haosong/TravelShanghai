package cn.edu.fudan.adweb.controller;

import cn.edu.fudan.adweb.bean.User;
import cn.edu.fudan.adweb.service.UserService;
import cn.edu.fudan.adweb.util.ResponseMaker;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.*;

@Controller
@RequestMapping(value = "/user.do")
public class UserController {

    @Resource
    private UserService userService;

    @ResponseBody
    @RequestMapping(params = "action=login", produces = "application/json; charset=utf-8")
    public String login(String account, String password, HttpServletResponse httpServletResponse) throws JSONException {
        User user = userService.finUser(account);
        JSONObject response = new JSONObject();
        if (user != null && user.getPassword().equals(password)) {
            response.put("status", "0");
            response.put("user", user.toJSONObject());
            Cookie cookie = new Cookie("userId", user.getId() + "");
            cookie.setMaxAge(24 * 60 * 60);
            httpServletResponse.addCookie(cookie);
            return response.toString();
        } else {
            return ResponseMaker.error(1);
        }
    }

    @ResponseBody
    @RequestMapping(params = "action=register", produces = "application/json; charset=utf-8")
    public String register(String account, String name, String password, HttpServletResponse httpServletResponse) throws JSONException {
        JSONObject response = new JSONObject();
        if (userService.finUser(account) != null) {
            return ResponseMaker.error(1);
        }
        User user = new User("head/a.jpg", name, account, password);
        userService.addUser(user);
        response.put("status", "0");
        response.put("user", user.toJSONObject());
        Cookie cookie = new Cookie("userId", user.getId() + "");
        cookie.setMaxAge(24 * 60 * 60);
        httpServletResponse.addCookie(cookie);
        return response.toString();
    }
}
