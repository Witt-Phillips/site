import Boid from './boid.js';
import { BoidType } from './boid.js';

class Flock {
    /**
     * @param {p5} p5 - The p5 instance.
     * @param {number} preyNum - The number of prey boids.
     * @param {number} predatorNum - The number of predator boids.
     */
    constructor(p5, preyNum = 10, predatorNum = 0) {
        this.p5 = p5; // Store the p5 instance
        /** @type {Boid[]} */
        this.list = [];
        for (let i = 0; i < preyNum; i++) {
            this.genBoid(p5.random(p5.width), p5.random(p5.height));
        }
        for (let i = 0; i < predatorNum; i++) {
            this.genBoid(p5.random(p5.width), p5.random(p5.height), BoidType.PREDATOR);
        }
    }

    /**
     * Generates a new boid at the specified coordinates and adds it to the flock.
     * @param {number} x - The x-coordinate for the new boid.
     * @param {number} y - The y-coordinate for the new boid.
     * @param {string} type - The type of the new boid.
     */
    genBoid(x, y, type = BoidType.PREY) {
        this.list.push(new Boid(this.p5, x, y, type));
    }

    /**
     * Runs the simulation for the flock, making each boid perform its actions and rendering them.
     * @param {object} foodList - The list of food items available for the boids.
     * @param {number} aliSli - Alignment bias.
     * @param {number} cohSli - Cohesion bias.
     * @param {number} sepSli - Separation bias.
     * @param {number} fleeSli - Flee bias.
     * @param {number} huntSli - Hunt bias.
     * @param {number} eatSli - Forage bias.
     */
    run(foodList, aliSli, cohSli, sepSli, fleeSli, huntSli, eatSli) {
        for (let boid of this.list) {
            boid.alignmentBias = aliSli;
            boid.cohesionBias = cohSli;
            boid.separationBias = sepSli;
            boid.fleeBias = fleeSli;
            boid.huntBias = huntSli;
            boid.forageBias = eatSli;

            switch (boid.type) {
                case BoidType.PREY:
                    boid.eat(foodList.list);
                    boid.forage(foodList.list);
                    boid.flock(this.list);
                    boid.flee(this.list);
                    boid.colorify(this.list);
                    break;
                case BoidType.PREDATOR:
                    boid.hunt(this.list);
                    break;
                case BoidType.PLAYER_PREDATOR:
                    boid.flock(this.list, BoidType.PLAYER_PREDATOR);
                    boid.handleInput();
                    boid.munchBoid(this.list);
                    boid.colorify(this.list);
                    break;
                default:
                    console.error("invalid type reached in boid.run()");
                    break;
            }

            if (boid.update(this)) {
                boid.draw();
            }
        }
    }
}

export default Flock;
