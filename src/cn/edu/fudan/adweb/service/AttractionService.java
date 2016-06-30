package cn.edu.fudan.adweb.service;

import cn.edu.fudan.adweb.bean.*;
import cn.edu.fudan.adweb.constant.DBConf;
import cn.edu.fudan.adweb.dao.AttractionDao;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

@Service
public class AttractionService {
    @Resource
    private AttractionDao attractionDao;

    public List<Attraction> getAttractions(double x1, double y1, double x2, double y2) {
        String hql = String.format("from Attraction where lng>='%f'and lng<='%f' and lat>='%f' and lat<='%f' order by type", x1, x2, y1, y2);
        return getAttractions(attractionDao.queryAttraction(hql));
    }

    public List<Attraction> getAttractions(double x1, double y1, double x2, double y2, String type) {
        String hql = String.format("from Attraction where lng>='%f'and lng<='%f' and lat>='%f' and lat<='%f' and type='%s' order by type", x1, x2, y1, y2, type);
        return getAttractions(attractionDao.queryAttraction(hql));
    }

    private List<Attraction> getAttractions(List<Attraction> attractionList) {
        Map<String, String> params = new HashMap<>();
        for (Attraction attraction: attractionList) {
            params.put("attractionId", String.valueOf(attraction.getId()));
            attraction.setFavor(count(DBConf.DB_TABLE_FAVOR, params));
            attraction.setWish(count(DBConf.DB_TABLE_WISH, params));
            attraction.setFootprint(count(DBConf.DB_TABLE_FOOTPRINT, params));
            params.put("rating", "5");
            attraction.setRating5(count(DBConf.DB_TABLE_RATING, params));
            params.put("rating", "4");
            attraction.setRating4(count(DBConf.DB_TABLE_RATING, params));
            params.put("rating", "3");
            attraction.setRating3(count(DBConf.DB_TABLE_RATING, params));
            params.put("rating", "2");
            attraction.setRating2(count(DBConf.DB_TABLE_RATING, params));
            params.put("rating", "1");
            attraction.setRating1(count(DBConf.DB_TABLE_RATING, params));
            double totalRating = attraction.getRating5() * 5.0 + attraction.getRating4() * 4.0
                    + attraction.getRating3() * 3.0 + attraction.getRating2() * 2.0 + attraction.getRating1() * 1.0,
                    totalRecord = attraction.getRating5() + attraction.getRating4() + attraction.getRating3()
                            + attraction.getRating2() + attraction.getRating1();
            if (totalRecord > 0) {
                attraction.setRating(totalRating / totalRecord);
            }
        }
        return attractionList;
    }

    public void insert(Wish wish) {
        attractionDao.insert(wish);
    }
    public void insert(Footprint footprint) {
        attractionDao.insert(footprint);
    }
    public void insert(Favor favor) {
        attractionDao.insert(favor);
    }
    public void insert(Rating rating) {
        attractionDao.insert(rating);
    }
    public void insert(Marker marker) {
        attractionDao.insert(marker);
    }

    public Attraction findAttraction(int attractionId) {
        String hql = String.format("from %s where id='%s'", DBConf.DB_TABLE_ATTRACTION, attractionId);
        List<Attraction> attractions = attractionDao.queryAttraction(hql);
        if (attractions != null && attractions.size() > 0) {
            return attractions.get(0);
        }
        return null;
    }
    public Favor findFavor(int userId, int attractionId) {
        String hql = "from Favor where userId ='" + userId + "' and attractionId = '" + attractionId + "'";
        List<Favor> favors = attractionDao.queryFavor(hql);
        if (favors != null && favors.size() > 0) {
            return favors.get(0);
        }
        return null;
    }
    public Footprint findFootprint(int userId, int attractionId) {
        String hql = "from Footprint where userId ='" + userId + "' and attractionId = '" + attractionId + "'";
        List<Footprint> footprints = attractionDao.queryFootprint(hql);
        if (footprints != null && footprints.size() > 0) {
            return footprints.get(0);
        }
        return null;
    }
    public Wish findWish(int userId, int attractionId) {
        String hql = "from Wish where userId ='" + userId + "' and attractionId = '" + attractionId + "'";
        List<Wish> wishes = attractionDao.queryWish(hql);
        if (wishes != null && wishes.size() > 0) {
            return wishes.get(0);
        }
        return null;
    }

    private int count(String dbTable, Map<String, String> params) {
        String hql = String.format("select count(id) from %s", dbTable);
        if (params != null && !params.isEmpty()) {
            Iterator iterator = params.entrySet().iterator();
            hql += " where";
            while (iterator.hasNext()) {
                Map.Entry entry = (Map.Entry) iterator.next();
                if (iterator.hasNext()) {
                    hql += String.format(" %s='%s' and", entry.getKey(), entry.getValue());
                } else {
                    hql += String.format(" %s='%s'", entry.getKey(), entry.getValue());
                }
            }
        }
        return attractionDao.count(hql);
    }

    public List<Marker> getMarker(int attractionId) {
        String hql = String.format("from %s where attractionId ='%d'", DBConf.DB_TABLE_MARKER, attractionId);
        return attractionDao.queryMarker(hql);
    }
    public List<Rating> getRating(int attractionId) {
        String hql = String.format("from %s where attractionId ='%d' order by time desc", DBConf.DB_TABLE_RATING, attractionId);
        return attractionDao.queryRating(hql);
    }

}
