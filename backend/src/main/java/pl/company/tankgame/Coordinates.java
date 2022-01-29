package pl.company.tankgame;

public class Coordinates {

    private Integer playerId;
    private Integer x;
    private Integer y;

    public Coordinates() {
    }

    public Coordinates(Integer playerId, Integer x, Integer y) {
        this.playerId = playerId;
        this.x = x;
        this.y = y;
    }

    public Integer getPlayerId() {
        return playerId;
    }

    public void setPlayerId(Integer playerId) {
        this.playerId = playerId;
    }

    public Integer getX() {
        return x;
    }

    public void setX(Integer x) {
        this.x = x;
    }

    public Integer getY() {
        return y;
    }

    public void setY(Integer y) {
        this.y = y;
    }
}