package cn.edu.fudan.adweb.bean;

import org.json.JSONException;
import org.json.JSONObject;

import javax.persistence.*;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;

@Entity
@Table(name = "rating")
public class Rating {
    private int id;
    private int userId;
    private int attractionId;
    private Integer rating;
    private String content;
    private Timestamp time;
    private String attachment;
    private String userName;
    private String userHead;

    public Rating() {
    }

    public Rating(int userId, String userName, String userHead, int attractionId, Integer rating, String content, String attachment, Timestamp time) {
        this.userId = userId;
        this.userName = userName;
        this.userHead = userHead;
        this.attractionId = attractionId;
        this.rating = rating;
        this.content = content;
        this.time = time;
        this.attachment = attachment;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "userId")
    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    @Basic
    @Column(name = "attractionId")
    public int getAttractionId() {
        return attractionId;
    }

    public void setAttractionId(int attractionId) {
        this.attractionId = attractionId;
    }

    @Basic
    @Column(name = "rating")
    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    @Basic
    @Column(name = "content")
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @Basic
    @Column(name = "time")
    public Timestamp getTime() {
        return time;
    }

    public void setTime(Timestamp time) {
        this.time = time;
    }

    @Basic
    @Column(name = "attachment")
    public String getAttachment() {
        return attachment;
    }

    public void setAttachment(String attachment) {
        this.attachment = attachment;
    }

    @Basic
    @Column(name = "userName")
    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    @Basic
    @Column(name = "userHead")
    public String getUserHead() {
        return userHead;
    }

    public void setUserHead(String userHead) {
        this.userHead = userHead;
    }

    public JSONObject toJSONObject() {
        JSONObject rating = new JSONObject();
        try {
            rating.put("id", id);
            rating.put("userId", userId);
            rating.put("userName", userName);
            rating.put("userHead", userHead);
            rating.put("attractionId", attractionId);
            rating.put("rating", this.rating.intValue());
            rating.put("content", content);
            rating.put("time", new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(time));
            rating.put("attachment", attachment);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return rating;
    }

}
