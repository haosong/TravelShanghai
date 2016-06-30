package cn.edu.fudan.adweb.bean;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import javax.persistence.*;

@Entity
@Table(name = "attraction")
public class Attraction {
    private int id;
    private Double lng;
    private Double lat;
    private String name;
    private String information;
    private String introduction;
    private Integer rating5;
    private Integer rating4;
    private Integer rating3;
    private Integer rating2;
    private Integer rating1;
    private Double rating;
    private Integer favor;
    private Integer footprint;
    private Integer wish;
    private String type;
    private String bounds;

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
    @Column(name = "lng")
    public Double getLng() {
        return lng;
    }

    public void setLng(Double lng) {
        this.lng = lng;
    }

    @Basic
    @Column(name = "lat")
    public Double getLat() {
        return lat;
    }

    public void setLat(Double lat) {
        this.lat = lat;
    }

    @Basic
    @Column(name = "name")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Basic
    @Column(name = "information")
    public String getInformation() {
        return information;
    }

    public void setInformation(String information) {
        this.information = information;
    }

    @Basic
    @Column(name = "introduction")
    public String getIntroduction() {
        return introduction;
    }

    public void setIntroduction(String introduction) {
        this.introduction = introduction;
    }

    @Basic
    @Column(name = "rating")
    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    @Basic
    @Column(name = "favor")
    public Integer getFavor() {
        return favor;
    }

    public void setFavor(Integer favor) {
        this.favor = favor;
    }

    @Basic
    @Column(name = "footprint")
    public Integer getFootprint() {
        return footprint;
    }

    public void setFootprint(Integer footprint) {
        this.footprint = footprint;
    }

    @Basic
    @Column(name = "wish")
    public Integer getWish() {
        return wish;
    }

    public void setWish(Integer wish) {
        this.wish = wish;
    }

    @Basic
    @Column(name = "rating5")
    public Integer getRating5() {
        return rating5;
    }

    public void setRating5(Integer rating5) {
        this.rating5 = rating5;
    }

    @Basic
    @Column(name = "rating4")
    public Integer getRating4() {
        return rating4;
    }

    public void setRating4(Integer rating4) {
        this.rating4 = rating4;
    }

    @Basic
    @Column(name = "rating3")
    public Integer getRating3() {
        return rating3;
    }

    public void setRating3(Integer rating3) {
        this.rating3 = rating3;
    }

    @Basic
    @Column(name = "rating2")
    public Integer getRating2() {
        return rating2;
    }

    public void setRating2(Integer rating2) {
        this.rating2 = rating2;
    }

    @Basic
    @Column(name = "rating1")
    public Integer getRating1() {
        return rating1;
    }

    public void setRating1(Integer rating1) {
        this.rating1 = rating1;
    }

    @Basic
    @Column(name = "type")
    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Basic
    @Column(name = "bounds")
    public String getBounds() {
        return bounds;
    }

    public void setBounds(String bounds) {
        this.bounds = bounds;
    }

    public JSONObject toJSONObject() {
        JSONObject attraction = new JSONObject();
        try {
            attraction.put("id", id);
            attraction.put("lng", lng);
            attraction.put("lat", lat);
            String[] points = bounds.split(",");
            JSONArray attractionBounds = new JSONArray();
            JSONObject point;
            for (int i = 0; i < points.length; i += 2) {
                point = new JSONObject();
                point.put("lat", Double.parseDouble(points[i]));
                point.put("lng", Double.parseDouble(points[i + 1]));
                attractionBounds.put(point);
            }
            attraction.put("bounds", attractionBounds);
            attraction.put("name", name);
            attraction.put("information", information);
            attraction.put("introduction", introduction);
            attraction.put("rating", rating);
            attraction.put("footprint", footprint);
            attraction.put("favor", favor);
            attraction.put("wish", wish);
            int totalRecord = rating1 + rating2 + rating3 + rating4 + rating5;
            attraction.put("rating5", 100 * rating5 / totalRecord);
            attraction.put("rating4", 100 * rating4 / totalRecord);
            attraction.put("rating3", 100 * rating3 / totalRecord);
            attraction.put("rating2", 100 * rating2 / totalRecord);
            attraction.put("rating1", 100 * rating1 / totalRecord);
            attraction.put("type", type);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return attraction;
    }
}
