package cn.edu.fudan.adweb.bean;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "search")
public class Search {
    private int id;
    private Integer userId;
    private Timestamp time;
    private Integer attractionId;

    public Search() {
    }

    public Search(Integer userId, Integer attractionId, Timestamp time) {
        this.userId = userId;
        this.attractionId = attractionId;
        this.time = time;
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
    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    @Basic
    @Column(name = "attractionId")
    public Integer getAttractionId() {
        return attractionId;
    }

    public void setAttractionId(Integer attractionId) {
        this.attractionId = attractionId;
    }

    @Basic
    @Column(name = "time")
    public Timestamp getTime() {
        return time;
    }

    public void setTime(Timestamp time) {
        this.time = time;
    }
}
