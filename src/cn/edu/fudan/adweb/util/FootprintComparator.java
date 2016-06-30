package cn.edu.fudan.adweb.util;

import cn.edu.fudan.adweb.bean.Attraction;

import java.util.Comparator;

public class FootprintComparator implements Comparator<Attraction> {
    @Override
    public int compare(Attraction o1, Attraction o2) {
        if (null != o1 && null != o2) {
            return (o2.getFootprint().compareTo(o1.getFootprint()));
        }
        return 0;
    }
}
