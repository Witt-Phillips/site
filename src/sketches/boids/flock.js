import Boid, { BoidType } from './boid';

class Flock {
    constructor(p5, preyNum = 10, predatorNum = 0) {
        this.p5 = p5;
        this.list = [];

        if (typeof window !== "undefined") {
            for (let i = 0; i < preyNum; i++) {
                this.genBoid(p5.random(p5.width), p5.random(p5.height));
            }
            for (let i = 0; i < predatorNum; i++) {
                this.genBoid(p5.random(p5.width), p5.random(p5.height), BoidType.PREDATOR);
            }
        }
    }

    genBoid(x, y, type = BoidType.PREY) {
        this.list.push(new Boid(this.p5, x, y, type));
    }

    run(foodList, aliSli, cohSli, sepSli, fleeSli, huntSli, eatSli) {
        if (typeof window !== "undefined") {
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
}

export default Flock;
