package cn.edu.fudan.adweb.util;

import org.json.JSONException;
import org.json.JSONObject;

public class ResponseMaker {
    public static String success() throws JSONException {
        JSONObject response = new JSONObject();
        response.put("status", 0);
        return response.toString();
    }

    public static String error(int error_code) throws JSONException {
        JSONObject response = new JSONObject();
        response.put("status", error_code);
        return response.toString();
    }
}
