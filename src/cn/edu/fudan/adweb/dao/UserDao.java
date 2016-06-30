package cn.edu.fudan.adweb.dao;

import cn.edu.fudan.adweb.bean.User;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Component
@Transactional
public class UserDao {

    @Resource
    private SessionFactory sessionFactory;

    public List<User> query(String hql) {
        Query query = this.getSession().createQuery(hql);
        return (List<User>)query.list();
    }

    public void insert(User user) {
        this.getSession().save(user);
    }

    public SessionFactory getSessionFactory() {
        return sessionFactory;
    }

    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    private Session getSession(){
        return sessionFactory.getCurrentSession();
    }

}
