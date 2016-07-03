package cn.edu.fudan.adweb.recommander;

import cn.edu.fudan.adweb.bean.Attraction;
import cn.edu.fudan.adweb.bean.User;
import cn.edu.fudan.adweb.service.AttractionService;
import cn.edu.fudan.adweb.service.UserService;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class CFPractical {
    private static CFPractical cfPractical;
    private static Pearson pearson;
    private Set<User> userSet;
    private List<Attraction> attractionList;

    private CFPractical() {
        pearson = new Pearson(new HashSet<User>());
    }

    public static CFPractical getInstance() {
        if (cfPractical == null) {
            cfPractical = new CFPractical();
        }
        return cfPractical;
    }

    public void setUserSet(List<User> userList) {
        userSet = new HashSet<>();
        for (User user: userList) {
            userSet.add(user);
        }
    }
    public void setAttractionList(List<Attraction> attractionList) {
        this.attractionList = attractionList;
    }

    public double predictRating(User user, Attraction attraction) {
        return pearson.predictRating(user, attraction, 0.0);
    }

    public void run() {
        pearson.computeAllSimilarity(userSet);
    }

}
