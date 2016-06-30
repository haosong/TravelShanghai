package cn.edu.fudan.adweb.bean;

import org.json.JSONException;
import org.json.JSONObject;

import javax.persistence.*;

@Entity
@Table(name = "user")
public class User {
    private int id;
    private String head;
    private String name;
    private String account;
    private String password;

    public User() {
    }

    public User(String head, String name, String account, String password) {
        this.head = head;
        this.name = name;
        this.account = account;
        this.password = password;
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
    @Column(name = "head")
    public String getHead() {
        return head;
    }

    public void setHead(String head) {
        this.head = head;
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
    @Column(name = "account")
    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    @Basic
    @Column(name = "password")
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public JSONObject toJSONObject() {
        JSONObject user = new JSONObject();
        try {
            user.put("id", id);
            user.put("head", head);
            user.put("name", name);
            user.put("account", account);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return user;
    }
}
