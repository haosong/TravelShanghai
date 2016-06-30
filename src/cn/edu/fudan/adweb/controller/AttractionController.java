package cn.edu.fudan.adweb.controller;

import cn.edu.fudan.adweb.bean.*;
import cn.edu.fudan.adweb.constant.DBConf;
import cn.edu.fudan.adweb.service.AttractionService;
import cn.edu.fudan.adweb.service.UserService;
import cn.edu.fudan.adweb.util.*;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(value = "/attraction.do")
public class AttractionController {
    @Resource
    private AttractionService attractionService;
    @Resource
    private UserService userService;

    private final static String RUNTIME_PATH = "C:/Users/亚中/IdeaProjects/adweb/web/";


    @ResponseBody
    @RequestMapping(params = "action=get", produces = "application/json; charset=utf-8")
    public String getAttractions(double x1, double y1, double x2, double y2, String sort, String type) throws JSONException {
        double lng1 = Math.min(x1, x2);
        double lng2 = Math.max(x1, x2);
        double lat1 = Math.min(y1, y2);
        double lat2 = Math.max(y1, y2);
        JSONArray response = new JSONArray();
        List<Attraction> attractionList;
        switch (type) {
            case "all":
                attractionList = attractionService.getAttractions(lng1, lat1, lng2, lat2); break;
            default:
                attractionList = attractionService.getAttractions(lng1, lat1, lng2, lat2, type);
        }
        switch (sort) {
            case "rating":
                Collections.sort(attractionList, new RatingComparator());break;
            case "favor":
                Collections.sort(attractionList, new FavorComparator()); break;
            case "footprint":
                Collections.sort(attractionList, new FootprintComparator()); break;
            case "wish":
                Collections.sort(attractionList, new WishComparator()); break;
        }
        if (attractionList.size() > 0) {
            JSONObject record = new JSONObject();
            JSONArray attractions = new JSONArray();
            Attraction now = attractionList.get(0), pre;
            record.put("type", now.getType());
            attractions.put(now.toJSONObject());
            for (int i = 1; i < attractionList.size(); i++) {
                pre = now; now = attractionList.get(i);
                if (!now.getType().equals(pre.getType())) {
                    record.put("attractions", attractions);
                    response.put(record);
                    record = new JSONObject(); attractions = new JSONArray();
                    record.put("type", now.getType());
                    attractions.put(now.toJSONObject());
                } else {
                    attractions.put(now.toJSONObject());
                }
            }
            record.put("attractions", attractions);
            response.put(record);
        }
        return response.toString();
    }

    @ResponseBody
    @RequestMapping(params = "action=getBound", produces = "application/json; charset=utf-8")
    public String getBound(@RequestParam("attractionId") int attractionId) throws JSONException {
        JSONArray response = new JSONArray();
        Attraction attraction = attractionService.findAttraction(attractionId);
        if (attraction != null) {
            String[] points = attraction.getBounds().split(",");
            for (int i = 0; i < points.length; i += 2) {
                JSONObject point = new JSONObject();
                point.put("lng", points[i]);
                point.put("lat", points[i + 1]);
                response.put(point);
            }
        }
        return response.toString();
    }

    @ResponseBody
    @RequestMapping(params = "action=footprint", produces = "application/json; charset=utf-8")
    public String addFootprint(@CookieValue("userId") int userId, int attractionId) throws JSONException {
        if (attractionService.findFootprint(userId, attractionId) != null) {
            return ResponseMaker.error(-1);
        } else {
            Footprint footprint = new Footprint(userId, attractionId, new Timestamp(System.currentTimeMillis()));
            attractionService.insert(footprint);
            return ResponseMaker.success();
        }
    }

    @ResponseBody
    @RequestMapping(params = "action=favor", produces = "application/json; charset=utf-8")
    public String addFavor(@CookieValue("userId") int userId, int attractionId) throws JSONException {
        if (attractionService.findFavor(userId, attractionId) != null) {
            return ResponseMaker.error(-1);
        } else {
            Favor favor = new Favor(userId, attractionId, new Timestamp(System.currentTimeMillis()));
            attractionService.insert(favor);
            return ResponseMaker.success();
        }
    }

    @ResponseBody
    @RequestMapping(params = "action=wish", produces = "application/json; charset=utf-8")
    public String addWish(@CookieValue("userId") int userId,
                          @RequestParam("attractionId") int attractionId) throws JSONException {
        if (attractionService.findWish(userId, attractionId) != null) {
            return ResponseMaker.error(-1);
        } else {
            Wish wish = new Wish(userId, attractionId, new Timestamp(System.currentTimeMillis()));
            attractionService.insert(wish);
            return ResponseMaker.success();
        }
    }

    @RequestMapping(params = "action=addRating")
    public String addRating(@CookieValue("userId") int userId,
                            @RequestParam("attractionId") int attractionId,
                            @RequestParam("rating") int rating,
                            @RequestParam("content") String content,
                            @RequestParam("file") MultipartFile attachment) throws JSONException, IOException {
        Rating rating2;
        User user = userService.findUser(userId);
        Timestamp currentTime = new Timestamp(System.currentTimeMillis());
        if (!attachment.isEmpty()) {
            String fileName = RUNTIME_PATH + "upload/" + new SimpleDateFormat("yyyyMMddHHmmss").format(currentTime) + attachment.getName();
            File file = new File(fileName);
            byte[] bytes = attachment.getBytes();
            BufferedOutputStream bufferedOutputStream =
                    new BufferedOutputStream(new FileOutputStream(file));
            bufferedOutputStream.write(bytes);
            bufferedOutputStream.close();
            rating2 = new Rating(userId, user.getName(), user.getHead(), attractionId, rating, content, "upload/" + file.getName(), currentTime);
        } else {
            rating2 = new Rating(userId, user.getName(), user.getHead(), attractionId, rating, content, "", currentTime);
        }
        attractionService.insert(rating2);
        return "redirect:index.html#/view/" + attractionId + "/detail";
    }

    @ResponseBody
    @RequestMapping(params = "action=getRating", produces = "application/json; charset=utf-8")
    public String getRating(int attractionId) throws JSONException {
        List<Rating> ratingList = attractionService.getRating(attractionId);
        JSONArray response = new JSONArray();
        for (Rating rating: ratingList) {
            response.put(rating.toJSONObject());
        }
        return response.toString();
    }

    @ResponseBody
    @RequestMapping(params = "action=addMarker", produces = "application/json; charset=utf-8")
    public String addMarker(@RequestParam("attractionId") int attractionId,
                            @RequestParam("lat") String latParam,
                            @RequestParam("lng") String lngParam,
                            @RequestParam("type") String typeParam,
                            @RequestParam("label") String labelParam) throws JSONException {
        String[] lats = latParam.substring(1).split(",");
        String[] lngs = lngParam.substring(1).split(",");
        String[] types = typeParam.substring(1).split(",");
        String[] labels = labelParam.substring(1).split(",");
        double lat, lng; int type; String label;
        for (int i = 0; i < lats.length; i++) {
            lat = Double.parseDouble(lats[i]);
            lng = Double.parseDouble(lngs[i]);
            type = Integer.parseInt(types[i]);
            label = labels[i];
            Marker marker = new Marker(attractionId, lat, lng, type, label);
            attractionService.insert(marker);
        }
        return ResponseMaker.success();
    }

    @ResponseBody
    @RequestMapping(params = "action=getMarker", produces = "application/json; charset=utf-8")
    public String getMarker(int attractionId) throws JSONException {
        JSONArray response = new JSONArray();
        List<Marker> markerList = attractionService.getMarker(attractionId);
        for (Marker marker: markerList) {
            response.put(marker.toJSONObject());
        }
        return response.toString();
    }
}
