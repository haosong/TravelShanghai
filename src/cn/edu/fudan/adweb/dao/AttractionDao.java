package cn.edu.fudan.adweb.dao;

import cn.edu.fudan.adweb.bean.*;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Component
@Transactional
public class AttractionDao {
    @Resource
    private SessionFactory sessionFactory;

    public void insert(Wish wish) {
        this.getSession().save(wish);
    }
    public void insert(Footprint footprint) {
        this.getSession().save(footprint);
    }
    public void insert(Rating rating) {
        this.getSession().save(rating);
    }
    public void insert(Favor favor) {
        this.getSession().save(favor);
    }
    public void insert(Marker marker) {
        this.getSession().save(marker);
    }
    public void insert(Search search) {
        this.getSession().save(search);
    }

    public List<Attraction> queryAttraction(String hql) {
        Query query = this.getSession().createQuery(hql);
        return (List<Attraction>)query.list();
    }
    public List<Favor> queryFavor(String hql) {
        Query query = this.getSession().createQuery(hql);
        return (List<Favor>)query.list();
    }
    public List<Footprint> queryFootprint(String hql) {
        Query query = this.getSession().createQuery(hql);
        return (List<Footprint>)query.list();
    }
    public List<Wish> queryWish(String hql) {
        Query query = this.getSession().createQuery(hql);
        return (List<Wish>) query.list();
    }
    public List<Rating> queryRating(String hql) {
        Query query = this.getSession().createQuery(hql);
        return (List<Rating>) query.list();
    }
    public List<Marker> queryMarker(String hql) {
        Query query = this.getSession().createQuery(hql);
        return (List<Marker>) query.list();
    }
    public List<Search> querySearch(String hql, int limit) {
        Query query = this.getSession().createQuery(hql);
        query.setFirstResult(0);
        query.setMaxResults(limit);
        return (List<Search>) query.list();
    }

    public void deleteFootprint(Footprint footprint) {
        this.getSession().delete(footprint);
    }
    public void deleteWish(Wish wish) {
        this.getSession().delete(wish);
    }
    public void deleteFavor(Favor favor) {
        this.getSession().delete(favor);
    }

    public int count(String hql) {
        Query query = this.getSession().createQuery(hql);
        return ((Number)query.uniqueResult()).intValue();
    }

    public SessionFactory getSessionFactory() {
        return sessionFactory;
    }

    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    private Session getSession(){
        return getSessionFactory().getCurrentSession();
    }
}
