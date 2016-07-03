package cn.edu.fudan.adweb.recommander;

import cn.edu.fudan.adweb.bean.Attraction;
import cn.edu.fudan.adweb.bean.Rating;
import cn.edu.fudan.adweb.bean.User;
import cn.edu.fudan.adweb.service.AttractionService;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class Pearson {

    @Resource
    private AttractionService attractionService;

    /**
     * Constructor for Pearson
     * @param userSet the set of users on which Pearson will operate
     * Examples of use:
     * Set users = .... load from files
     * Pearson pearson = new Pearson(users);
     */
    public Pearson(final Set<User> userSet){
        setup(userSet);
    }

    /**
     * YOU SHOULD IMPLEMENT THIS METHOD
     * Computes the pearson correlation coefficient (similarity) between 2 users. This has to be implemented by the student.
     * @param a The first User to compare
     * @param b The second User
     * @return the pearson User similarity between the 2 users
     */
    public double computeSimilarity(final User a, final User b) {
        Set<Attraction> commonAttractions = getCommonAttractions(a, b);
        double aAverageRating = getUserMeanRating(a.getId());
        double bAverageRating = getUserMeanRating(b.getId());
        double top = 0;
        double bottomA = 0;
        double bottomB = 0;
        for (Attraction attraction: commonAttractions) {
            double ad = findRating(a.getId(), attraction) - aAverageRating;
            double bd = findRating(b.getId(), attraction) - bAverageRating;
            top += (ad * bd);
            bottomA += (ad * ad);
            bottomB += (bd * bd);
        }
        double bottom = Math.sqrt(bottomA * bottomB);
        if(bottom > 0) {
            if(commonAttractions.size() < 50) {
                return (commonAttractions.size() * 1.0 / 50) * (top / bottom);
            } else {
                return top / bottom;
            }
        } else {
            return 0;
        }
    }

    /**
     * Predicts the rating for a Attraction for the given User using the Pearson similarity metric
     * @param user the User for which the rating will be prdicted
     * @param m the Attraction for which the rating will be made
     * @param minThreshold the maximum dissimilarity threshold (<i>L</i> as described in Social Information Filtering)
     * @return the predicted rating that the owner of that User would have made for that Attraction
     */
    public double predictRating(final User user, final Attraction m, final double minThreshold) {
        Set<User> neighbours = computeNeighbours(user, minThreshold);
        double top = 0;
        double bottom = 0;
        for (User p: neighbours) {
            if (findRating(p.getId(), m) > 0) {
                top += getPearson(user, p) * findRating(p.getId(), m)- getUserMeanRating(p.getId());
                bottom += Math.abs(getPearson(user, p));
            }
        }
        if (bottom > 0) {
            double prediction = getUserMeanRating(user.getId()) + top / bottom;
            if(prediction < MIN_RATING) {
                prediction = MIN_RATING;
            }
            if(prediction > MAX_RATING) {
                prediction = MAX_RATING;
            }
            return prediction;
        } else {
            return (m.getRating() + MAX_RATING) * WEIGHT;
        }
    }

    /**
     * Computes the set of neighbours that will be used in the prediction of a Attraction rating for a given user.
     * Note that its suggested that you implement this method but not necessary
     * @param user	The User for which the neighbourhood will be found
     * @param simThreshold the maximum dissimilarity threshold for the neigbours
     * @return the set of neighbours that are most similar to the given User
     */
    protected Set<User> computeNeighbours(final User user, final double simThreshold){
        Set<User> n = new HashSet<User>();
        for (User candidate: userSet) {
            if(user.getId() != candidate.getId()) {
                if(getPearson(user, candidate) > simThreshold) {
                    n.add(candidate);
                }
            }
        }
        return n;
    }

    /////////////////////////////////////////////////////////////////////////////////////////
    //		DO NOT EDIT BELOW THIS LINE UNLESS YOU KNOW WHAT YOU ARE DOING!
    /////////////////////////////////////////////////////////////////////////////////////////

    private static double MIN_RATING = 1;
    private static double MAX_RATING = 5;
    private static double WEIGHT = (MAX_RATING + MIN_RATING) / 2;
    private double[][] simMatrix = null;//hold all the computed Pearson values
    private Set<User> userSet;

    private void setup(final Set<User> users){
        simMatrix = new double[users.size()][users.size()];
        this.userSet = users;
        computeAllSimilarity(users);
    }

    public void computeAllSimilarity(final Set<User> set){
        for (User a: set){
            for (User b: set) {
                setSim(a, b, computeSimilarity(a, b));
            }
        }
    }

    /**
     * Stores the Pearson correlation coefficent (similary value) in memory between 2 users
     * @param a First User
     * @param b Second User
     * @param value similarity between to 2.
     *
     * Note - do not edit this method or your code WILL fail.
     */
    private void setSim(final User a, final User b, final double value) {
        simMatrix[a.getId()][b.getId()] = value;
        simMatrix[b.getId()][a.getId()] = value;
    }

    /**
     * Retrieves the previously computed Pearson value between 2 users from memory
     * @param user
     * @param candidate
     * @return the MSD value for the 2 users
     *
     * Note - do not edit this method or your code WILL fail.
     */
    private double getPearson(final User user, final User candidate) {
        if (attractionService != null) {
            return simMatrix[user.getId()][candidate.getId()];
        }
        return 0;
    }

    /**
     * @return Returns the set of users that the similarity metric is working on.
     */
    public Set<User> getUserSet() {
        return userSet;
    }

    /**
     * Computes the average rating given by a user for a set of given Attractions
     * Note that its suggested that you implement this method but not necessary
     * @param user The User in question
     * @param commonAttractions The set of Attractions for which ratings were given
     * @return the average rating given by user p for the set of Attractions
     */
    protected double calcAverageRating(final User user, final Set<Attraction> commonAttractions) {
        if (attractionService == null) {
            return 0;
        }
        double total = 0;
        for (Attraction attraction: commonAttractions) {
            total = total + findRating(user.getId(), attraction);
        }
        return total / commonAttractions.size();
    }

    private double getUserMeanRating(int userId) {
        return WEIGHT;
    }

    private double findRating(int userId, Attraction attraction) {
        if (attractionService != null) {
            return attractionService.findRating(userId, attraction.getId()).getRating();
        }
        return 0;
    }

    private List<Rating> getRatingByUser(int userId) {
        if (attractionService == null) {
            return new ArrayList<>();
        }
        return attractionService.getRatingByUser(userId);
    }

    private Attraction findAttraction(int attractioId) {
        if (attractionService == null) {
            return null;
        }
        return attractionService.findAttraction(attractioId);
    }

    /**YOU SHOULD IMPLEMENT THIS METHOD
     * Returns the a set of attraction that are common between the two profiles.
     * @param a One profile to compare
     * @param b The other profile to compare
     * @return a set of Attraction objects
     */
    private Set<Attraction> getCommonAttractions (User a, User b) {
        Set<Attraction> commonAttractions = new HashSet<>();
        List<Rating> aRatingList = getRatingByUser(a.getId());
        List<Rating> bRatingList = getRatingByUser(b.getId());
        for (int i = 0; i < aRatingList.size(); i++) {
            for (int j = 0; j < bRatingList.size(); j++) {
                if (aRatingList.get(i).getAttractionId() == bRatingList.get(j).getAttractionId()) {
                    commonAttractions.add(findAttraction(aRatingList.get(i).getAttractionId()));
                }
            }
        }
        return commonAttractions;
    }
}
