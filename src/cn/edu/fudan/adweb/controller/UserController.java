package cn.edu.fudan.adweb.controller;

import cn.edu.fudan.adweb.bean.User;
import cn.edu.fudan.adweb.service.UserService;
import cn.edu.fudan.adweb.util.ResponseMaker;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.*;
import java.io.*;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;

@Controller
@RequestMapping(value = "/user.do")
public class UserController {

    @Resource
    private UserService userService;

    private final static String RUNTIME_PATH = "C:/Users/亚中/IdeaProjects/adweb/out/artifacts/myssh_war_exploded/";

    @ResponseBody
    @RequestMapping(params = "action=login", produces = "application/json; charset=utf-8")
    public String login(String account, String password, HttpServletResponse httpServletResponse) throws JSONException, UnsupportedEncodingException {
        User user = userService.finUser(account);
        JSONObject response = new JSONObject();
        if (user != null && user.getPassword().equals(password)) {
            response.put("status", "0");
            response.put("user", user.toJSONObject());
            Cookie cookie = new Cookie("userId", String.valueOf(user.getId()));
            cookie.setMaxAge(24 * 60 * 60);
            httpServletResponse.addCookie(cookie);
            cookie = new Cookie("userName", URLEncoder.encode(user.getName(), "utf-8"));
            cookie.setMaxAge(24 * 60 * 60);
            httpServletResponse.addCookie(cookie);
            cookie = new Cookie("userHead", URLEncoder.encode(user.getHead(), "utf-8"));
            cookie.setMaxAge(24 * 60 * 60);
            httpServletResponse.addCookie(cookie);
            return response.toString();
        } else {
            return ResponseMaker.error(1);
        }
    }

    @ResponseBody
    @RequestMapping(params = "action=register", produces = "text/plain; charset=utf-8")
    public String register(@RequestParam("account") String account,
                           @RequestParam("name") String name,
                           @RequestParam("password") String password,
                           @RequestParam("head") MultipartFile head, HttpServletResponse httpServletResponse) throws JSONException, IOException {
        if (userService.finUser(account) != null) {
            return "Failed!";
        }
        User user;
        if (head != null) {
            String fileName = "head/" + account + head.getOriginalFilename();
            File file = new File(RUNTIME_PATH + fileName);
            byte[] bytes = head.getBytes();
            BufferedOutputStream bufferedOutputStream =
                    new BufferedOutputStream(new FileOutputStream(file));
            bufferedOutputStream.write(bytes);
            bufferedOutputStream.close();
            user = new User(fileName, name, account, password);
        } else {
            user = new User("head/default.jpg", name, account, password);
        }
        userService.addUser(user);
        Cookie cookie = new Cookie("userId", user.getId() + "");
        cookie.setMaxAge(24 * 60 * 60);
        httpServletResponse.addCookie(cookie);
        cookie = new Cookie("userName", URLEncoder.encode(user.getName(), "utf-8"));
        cookie.setMaxAge(24 * 60 * 60);
        httpServletResponse.addCookie(cookie);
        cookie = new Cookie("userHead", URLEncoder.encode(user.getHead(), "utf-8"));
        cookie.setMaxAge(24 * 60 * 60);
        httpServletResponse.addCookie(cookie);
        return "Success!";
    }
}
