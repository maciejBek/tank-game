 import { BLOCK_SIZE, BLOCK_TYPE } from '../utils/Constants';
import Brick from './Brick';
import Steel from './Steel';
import Grass from './Grass';
import Water from './Water';


class Map {
    constructor({ level }) {
        this.items = [];

      //  this.round1();
        this.level = level;
        switch (level) {
            case (1):
                this.round1();
                break;
            case (2):
                this.round2();
                break;
            case (3):
                this.round3();
                break;
            case (4):
                this.round4();
                break;
            case (5):
                this.round5();
                break;
        }
    }

    round1() {
        // brick walls
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 50, y: 50 }, 2, 8));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 150, y: 50 }, 2, 8));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 250, y: 100 }, 2, 6));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 350, y: 100 }, 2, 6));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 450, y: 50 }, 2, 8));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 550, y: 50 }, 2, 8));

        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 250, y: 300 }, 2, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 350, y: 300 }, 2, 2));

        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 100, y: 350 }, 4, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 450, y: 350 }, 4, 2));

        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 250, y: 400 }, 2, 7));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 350, y: 400 }, 2, 7));

        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 300, y: 425 }, 2, 2));


        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 150, y: 475 }, 2, 6));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 450, y: 475 }, 2, 6));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 550, y: 475 }, 2, 6));

        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 50, y: 475 }, 2, 6));

        // steel walls
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.STEEL, { x: 300, y: 350 }, 2, 2));
        //this.items = this.items.concat(this.buildWall(BLOCK_TYPE.STEEL, { x: 0, y: 375 }, 2, 1));
        //items = this.items.concat(this.buildWall(BLOCK_TYPE.STEEL, { x: 600, y: 375 }, 2, 1));

        // headquarter 1
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 275, y: 625 }, 1, 3));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 350, y: 625 }, 1, 3));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 300, y: 625 }, 2, 1));

        // headquarter 2
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 0, y: 400 }, 3, 1));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 50, y: 350 }, 1, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 0, y: 325 }, 3, 1));

        // headquarter 3
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 275, y: 0 }, 1, 3));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 350, y: 0 }, 1, 3));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 300, y: 50 }, 2, 1));

        // headquarter 4
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 575, y: 400 }, 3, 1));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 575, y: 350 }, 1, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 575, y: 325 }, 3, 1));
    }

    round2() {
        // brick walls
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 0, y: 100 }, 2, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 200, y: 0 }, 2, 4));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 400, y: 0 }, 2, 2));

        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 250, y: 200 }, 2, 2));

        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 350, y: 150 }, 2, 3));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 300, y: 275 }, 2, 2));

        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 450, y: 150 }, 2, 5));

        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 500, y: 150 }, 5, 2));

        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 575, y: 200 }, 1, 5));

        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 450, y: 650 }, 2, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 350, y: 525 }, 4, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 300, y: 450 }, 6, 1));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 275, y: 450 }, 1, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 250, y: 500 }, 2, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 150, y: 425 }, 2, 1));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 50, y: 425 }, 2, 1));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 0, y: 550 }, 2, 4));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 50, y: 600 }, 2, 4));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 100, y: 650 }, 2, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 300, y: 450 }, 6, 1));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 125, y: 450 }, 3, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 0, y: 450 }, 3, 2));

        // steel walls
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.STEEL, { x: 500, y: 75 }, 6, 1));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.STEEL, { x: 300, y: 325 }, 6, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.STEEL, { x: 150, y: 550 }, 1, 4));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.STEEL, { x: 0, y: 650 }, 2, 2));

        //grases
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.GRASS, { x: 0, y: 150 }, 2, 6));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.GRASS, { x: 50, y: 50 }, 6, 10));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.GRASS, { x: 50, y: 300 }, 2, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.GRASS, { x: 550, y: 325 }, 2, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.GRASS, { x: 450, y: 370 }, 6, 11));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.GRASS, { x: 600, y: 375 }, 2, 6));

        // headquarter
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 275, y: 625 }, 1, 3));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 350, y: 625 }, 1, 3));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 300, y: 625 }, 2, 1));
    }

    round3() {
        // brick walls
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 250, y: 50 }, 6, 1));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 200, y: 75 }, 10, 1));

        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 175, y: 100 }, 12, 2));

        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 150, y: 150 }, 4, 2));

        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 300, y: 150 }, 2, 4));

        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 400, y: 150 }, 4, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 450, y: 200 }, 2, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 150, y: 200 }, 2, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 150, y: 250 }, 14, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 200, y: 300 }, 2, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 300, y: 300 }, 2, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 400, y: 300 }, 2, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 200, y: 350 }, 10, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 225, y: 400 }, 1, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 275, y: 400 }, 1, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 325, y: 400 }, 1, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 375, y: 400 }, 1, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 425, y: 400 }, 1, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 200, y: 450 }, 1, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 250, y: 450 }, 1, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 300, y: 450 }, 1, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 350, y: 450 }, 1, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 400, y: 450 }, 1, 2));

        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 0, y: 600 }, 1, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 50, y: 600 }, 1, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 100, y: 600 }, 1, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 625, y: 600 }, 1, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 575, y: 600 }, 1, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 525, y: 600 }, 1, 2));


        // steel walls
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.STEEL, { x: 0, y: 650 }, 1, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.STEEL, { x: 50, y: 650 }, 1, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.STEEL, { x: 100, y: 650 }, 1, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.STEEL, { x: 175, y: 650 }, 1, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.STEEL, { x: 25, y: 550 }, 1, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.STEEL, { x: 75, y: 550 }, 1, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.STEEL, { x: 125, y: 550 }, 1, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.STEEL, { x: 625, y: 650 }, 1, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.STEEL, { x: 575, y: 650 }, 1, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.STEEL, { x: 525, y: 650 }, 1, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.STEEL, { x: 450, y: 650 }, 1, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.STEEL, { x: 600, y: 550 }, 1, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.STEEL, { x: 550, y: 550 }, 1, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.STEEL, { x: 500, y: 550 }, 1, 2));


        //grases
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.GRASS, { x: 0, y: 50 }, 4, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.GRASS, { x: 0, y: 100 }, 2, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.GRASS, { x: 550, y: 50 }, 4, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.GRASS, { x: 600, y: 100 }, 2, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.GRASS, { x: 0, y: 250 }, 2, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.GRASS, { x: 0, y: 300 }, 4, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.GRASS, { x: 600, y: 250 }, 2, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.GRASS, { x: 550, y: 300 }, 4, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.GRASS, { x: 250, y: 300 }, 2, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.GRASS, { x: 350, y: 300 }, 2, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.GRASS, { x: 250, y: 150 }, 2, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.GRASS, { x: 200, y: 200 }, 4, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.GRASS, { x: 350, y: 150 }, 2, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.GRASS, { x: 350, y: 200 }, 4, 2));

        //water
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.WATER, { x: 0, y: 350 }, 6, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.WATER, { x: 500, y: 350 }, 6, 2));


        // headquarter
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 275, y: 625 }, 1, 3));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 350, y: 625 }, 1, 3));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 300, y: 625 }, 2, 1));
    }

    round4() {
        // brick walls
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 250, y: 50 }, 4, 1));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 200, y: 75 }, 10, 1));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 175, y: 100 }, 13, 1));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 175, y: 125 }, 15, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 150, y: 150 }, 17, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 125, y: 200 }, 3, 1));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 350, y: 200 }, 6, 1));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 550, y: 200 }, 1, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 125, y: 225 }, 1, 3));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 100, y: 300 }, 2, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 200, y: 325 }, 4, 1));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 400, y: 225 }, 4, 1));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 400, y: 250 }, 3, 4));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 100, y: 350 }, 16, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 75, y: 400 }, 18, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 50, y: 450 }, 20, 1));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 150, y: 475 }, 12, 1));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 250, y: 500 }, 6, 1));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 250, y: 525 }, 4, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 50, y: 550 }, 6, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 100, y: 600 }, 4, 1));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 450, y: 550 }, 4, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 425, y: 575 }, 4, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 100, y: 600 }, 4, 1));



        // steel walls
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.STEEL, { x: 0, y: 150 }, 2, 1));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.STEEL, { x: 600, y: 100 }, 2, 1));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.STEEL, { x: 0, y: 650 }, 2, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.STEEL, { x: 600, y: 650 }, 2, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.STEEL, { x: 200, y: 250 }, 1, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.STEEL, { x: 300, y: 250 }, 1, 2));

        //grases
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.GRASS, { x: 50, y: 0 }, 4, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.GRASS, { x: 0, y: 50 }, 4, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.GRASS, { x: 0, y: 100 }, 2, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.GRASS, { x: 550, y: 0 }, 2, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.GRASS, { x: 600, y: 50 }, 2, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.GRASS, { x: 0, y: 600 }, 2, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.GRASS, { x: 50, y: 650 }, 2, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.GRASS, { x: 500, y: 650 }, 4, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.GRASS, { x: 550, y: 600 }, 4, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.GRASS, { x: 600, y: 550 }, 2, 2));

        //water
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.WATER, { x: 550, y: 300 }, 4, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.WATER, { x: 0, y: 250 }, 2, 2));


        // headquarter
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.STEEL, { x: 275, y: 625 }, 1, 3));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.STEEL, { x: 350, y: 625 }, 1, 3));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.STEEL, { x: 300, y: 625 }, 2, 1));
    }

    round5() {
        // brick walls
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 50, y: 50 }, 1, 1));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 200, y: 50 }, 1, 1));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 350, y: 0 }, 1, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 425, y: 50 }, 1, 1));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 500, y: 50 }, 1, 1));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 425, y: 125 }, 1, 1));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 500, y: 125 }, 1, 1));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 550, y: 200 }, 1, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 400, y: 150 }, 2, 3));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 550, y: 150 }, 2, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 575, y: 50 }, 1, 4));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 525, y: 250 }, 3, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 500, y: 350 }, 4, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 400, y: 350 }, 2, 1));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 200, y: 350 }, 2, 1));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 225, y: 300 }, 1, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 50, y: 350 }, 4, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 0, y: 275 }, 5, 1));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 50, y: 250 }, 3, 1));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 200, y: 150 }, 2, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 200, y: 125 }, 1, 1));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 50, y: 125 }, 1, 1));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 50, y: 150 }, 2, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 50, y: 450 }, 2, 5));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 100, y: 500 }, 1, 4));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 125, y: 575 }, 1, 1));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 100, y: 675 }, 2, 1));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 500, y: 675 }, 2, 1));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 525, y: 550 }, 3, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 250, y: 550 }, 2, 1));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 350, y: 550 }, 2, 1));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 200, y: 450 }, 2, 4));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.BRICK, { x: 400, y: 450 }, 2, 4));


        // steel walls
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.STEEL, { x: 125, y: 50 }, 1, 1));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.STEEL, { x: 125, y: 125 }, 1, 1));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.STEEL, { x: 300, y: 150 }, 2, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.STEEL, { x: 200, y: 200 }, 2, 1));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.STEEL, { x: 450, y: 200 }, 1, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.STEEL, { x: 600, y: 350 }, 2, 3));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.STEEL, { x: 500, y: 400 }, 4, 1));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.STEEL, { x: 0, y: 350 }, 2, 3));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.STEEL, { x: 50, y: 400 }, 4, 1));

        //grases
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.GRASS, { x: 400, y: 0 }, 4, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.GRASS, { x: 450, y: 50 }, 2, 6));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.GRASS, { x: 600, y: 50 }, 2, 8));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.GRASS, { x: 550, y: 200 }, 2, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.GRASS, { x: 600, y: 550 }, 2, 6));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.GRASS, { x: 550, y: 600 }, 2, 4));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.GRASS, { x: 500, y: 600 }, 2, 2));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.GRASS, { x: 350, y: 250 }, 2, 6));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.GRASS, { x: 300, y: 300 }, 2, 6));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.GRASS, { x: 250, y: 250 }, 2, 6));

        // headquarter
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.STEEL, { x: 275, y: 625 }, 1, 3));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.STEEL, { x: 350, y: 625 }, 1, 3));
        this.items = this.items.concat(this.buildWall(BLOCK_TYPE.STEEL, { x: 300, y: 625 }, 2, 1));
    }

    buildWall(blockType, startPosition, thinkness, length) {
        const wall = [];

        for (let i = 0; i < thinkness; i++) {
            let x = startPosition.x + BLOCK_SIZE * i;
            for (let j = 0; j < length; j++) {
                let y = startPosition.y + BLOCK_SIZE * j;
                switch (blockType) {
                    case BLOCK_TYPE.BRICK:
                        wall.push(new Brick({ position: { x, y } }));
                        break;
                    case BLOCK_TYPE.STEEL:
                        wall.push(new Steel({ position: { x, y } }));
                        break;
                    case BLOCK_TYPE.WATER:
                        wall.push(new Water({ position: { x, y } }));
                        break;
                    case BLOCK_TYPE.GRASS:
                        wall.push(new Grass({ position: { x, y } }));
                        break;
                    default:

                }

            }
        }

        return wall;
    }

    update() {
        let newItems = [];
        for (let i = 0; i < this.items.length; i++) {
            let item = this.items[i];
            if (!item.delete) {
                newItems.push(item);
            }
        }

        this.items = newItems;
    }

    render(state) {
        this.items.forEach(item => item.render(state));
    }
}

export default Map;

