class Observer {
    constructor() {
        this.x = 0;
        this.y = 0;
    }

    zmiana(x,y) {
        this.x = x;
        this.y =y;
    }

    pokaz(){
        return this.x,this.y;
    }    
}