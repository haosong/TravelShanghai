package cn.edu.fudan.adweb.service;

import cn.edu.fudan.adweb.bean.User;
import cn.edu.fudan.adweb.dao.UserDao;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class UserService {

    @Resource
    private UserDao userDao;

    public User findUser(int id) {
        String hql = String.format("from User where id='%d'", id);
        List<User> users = userDao.query(hql);
        if (users != null && users.size() > 0) {
            return users.get(0);
        }
        return null;
    }

    public User finUser(String account) {
        String hql = "from User where account ='" + account + "'";
        List<User> users = userDao.query(hql);
        if (users != null && users.size() > 0) {
            return users.get(0);
        }
        return null;
    }

    public void addUser(User user) {
        userDao.insert(user);
    }


    public List<User> getUser() {
        String hql = "from User";
        return userDao.query(hql);
    }

}
