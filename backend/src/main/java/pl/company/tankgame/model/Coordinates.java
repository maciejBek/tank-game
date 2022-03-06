package pl.company.tankgame.model;

public class Coordinates {

    private Integer x;
    private Integer y;
    private Integer roomId;
    private Integer playerId;

    public Coordinates() {

    }

    public Coordinates(Integer x, Integer y, Integer roomId, Integer playerId) {
        this.x = x;
        this.y = y;
        this.roomId = roomId;
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

    public Integer getRoomId() {
        return roomId;
    }

    public void setRoomId(Integer roomId) {
        this.roomId = roomId;
    }

    public Integer getPlayerId() {
        return playerId;
    }

    public void setPlayerId(Integer playerId) {
        this.playerId = playerId;
    }
}