package cn.edu.fudan.adweb.bean;

import org.json.JSONException;
import org.json.JSONObject;

import javax.persistence.*;

@Entity
@Table(name = "marker")
public class Marker {
    private int id;
    private int attractionId;
    private double lat;
    private double lng;
    private int type;
    private String label;

    public Marker() {
    }

    public Marker(int attractionId, double lat, double lng, int type, String label) {
        this.attractionId = attractionId;
        this.lat = lat;
        this.lng = lng;
        this.type = type;
        this.label = label;
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
    @Column(name = "attractionId")
    public int getAttractionId() {
        return attractionId;
    }

    public void setAttractionId(int attractionId) {
        this.attractionId = attractionId;
    }

    @Basic
    @Column(name = "lat")
    public double getLat() {
        return lat;
    }

    public void setLat(double lat) {
        this.lat = lat;
    }

    @Basic
    @Column(name = "lng")
    public double getLng() {
        return lng;
    }

    public void setLng(double lng) {
        this.lng = lng;
    }

    @Basic
    @Column(name = "type")
    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    @Basic
    @Column(name = "label")
    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public JSONObject toJSONObject() {
        JSONObject marker = new JSONObject();
        try {
            marker.put("id", id);
            marker.put("lng", lng);
            marker.put("lat", lat);
            marker.put("type", type);
            marker.put("text", label);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return marker;
    }
}
