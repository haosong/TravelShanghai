package cn.edu.fudan.adweb.listener;

import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

public class SessionListener implements HttpSessionListener {

    private static int activeSessions = 0;

    @Override
    public void sessionCreated(HttpSessionEvent httpSessionEvent) {
        System.out.println("hhhh");
        activeSessions++;
    }

    @Override
    public void sessionDestroyed(HttpSessionEvent httpSessionEvent) {
        activeSessions--;
    }

    public static int getActiveSessions() {
        return activeSessions;
    }
}
