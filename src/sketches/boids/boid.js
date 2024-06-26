export const BoidType = {
    PREY: 'prey',
    PREDATOR: 'predator',
    PLAYER_PREDATOR: 'player_predator',
};

class Boid {
    constructor(p, x, y, type) {
        this.p = p;

        if (typeof window !== "undefined") {
            this.position = p.createVector(x, y);
            this.velocity = p.createVector(p.random(1), p.random(1)).setMag(p.random(0.5, 1));
            this.acceleration = p.createVector();
        } else {
            this.position = { x: 0, y: 0 };
            this.velocity = { x: 0, y: 0 };
            this.acceleration = { x: 0, y: 0 };
        }

        this.type = type;
        this.color = p.createVector(p.random(255), p.random(255), p.random(255));
        if (this.type == BoidType.PREDATOR) {
            this.color = p.createVector(230, 0, 0);
        }
        this.size = 15;
        if (this.type == BoidType.PREDATOR) {
            this.size = 40;
        }
        this.maxForce = 0.05;
        this.maxSpeed = 4;
        if (this.type == BoidType.PREDATOR) {
            this.maxSpeed = 3.8;
        }
        this.perceptionRadius = 80;
        if (this.type == BoidType.PREDATOR) {
            this.perceptionRadius = 120;
        }
        this.shrinkRate = p.random(0.005, 0.01);
        if (this.type == BoidType.PREDATOR) {
            this.shrinkRate = p.random(0.03, 0.05);
        }
        this.minSize = 8;
        this.maxSize = 20;
        if (this.type == BoidType.PREDATOR) {
            this.maxSize = 80;
        }
        if (this.type == BoidType.PLAYER_PREDATOR) {
            this.maxSize = 30;
        }
        this.alignmentBias = 1;
        this.cohesionBias = 1;
        this.separationBias = 1;
        this.forageBias = 1;
        this.huntBias = 1;
        this.fleeBias = 2;
    }

    vectorSub(v1, v2) {
        let x = v1.x - v2.x;
        let y = v1.y - v2.y;
        return this.p.createVector(x, y);
    }

    remove(flock) {
        let idx = flock.list.indexOf(this);
        if (idx != -1) {
            flock.list.splice(idx, 1);
            return true;
        }
        return false;
    }

    update(flock) {
        this.position.add(this.velocity);
        this.wrap();
        this.velocity.add(this.acceleration).limit(this.maxSpeed);
        this.acceleration.mult(0);

        this.size -= this.shrinkRate;
        if (this.size < this.minSize) {
            return this.remove(flock);
        }

        if (this.size > this.maxSize) {
            this.size *= 2 / 3;
            flock.genBoid(this.position.x, this.position.y, this.type);
        }
        return true;
    }

    wrap() {
        if (this.position.x > this.p.width) {
            this.position.x = 0;
        } else if (this.position.x < 0) {
            this.position.x = this.p.width;
        }

        if (this.position.y > this.p.height) {
            this.position.y = 0;
        } else if (this.position.y < 0) {
            this.position.y = this.p.height;
        }
    }

    draw() {
        this.p.strokeWeight(this.size / 12);
        this.p.stroke(this.color.x, this.color.y, this.color.z);
        this.p.fill(this.color.x, this.color.y, this.color.z, 100);
        let angle = this.velocity.heading() + this.p.radians(90);

        this.p.push();
        this.p.translate(this.position.x, this.position.y);
        this.p.rotate(angle);
        this.p.triangle(
            -this.size / 3, this.size / 2,
            this.size / 3, this.size / 2,
            0, -this.size / 2
        );
        this.p.pop();
    }

    flock(flock, type = BoidType.PREY) {
        this.acceleration.add(this.align(flock, type).mult(this.alignmentBias));
        this.acceleration.add(this.cohere(flock, type).mult(this.cohesionBias));
        this.acceleration.add(this.separate(flock, type).mult(this.separationBias));
    }

    align(flock, type = BoidType.PREY) {
        let steer = this.p.createVector();
        let i = 0;

        for (let other of flock) {
            if (other.type != type) {
                continue;
            }

            if ((this.position.dist(other.position) < this.perceptionRadius) && (other != this)) {
                steer.add(other.velocity);
                i++;
            }
        }

        if (i != 0) {
            steer.div(i);
            steer.setMag(this.maxSpeed);
            steer.sub(this.velocity);
            steer.limit(this.maxForce);
        }
        return steer;
    }

    cohere(flock, type = BoidType.PREY) {
        let steer = this.p.createVector();
        let i = 0;

        for (let other of flock) {
            if (other.type != type) {
                continue;
            }

            if ((this.position.dist(other.position) < this.perceptionRadius) && (other != this)) {
                steer.add(other.position);
                i++;
            }
        }
        if (i != 0) {
            steer.div(i);
            steer.sub(this.position);
            steer.setMag(this.maxSpeed);
            steer.sub(this.velocity);
            steer.limit(this.maxForce);
        }
        return steer;
    }

    separate(flock, type) {
        let steer = this.p.createVector();
        let i = 0;

        for (let other of flock) {
            if (other.type != type) {
                continue;
            }
            let dist = this.position.dist(other.position);
            if ((dist < this.perceptionRadius) && (other != this)) {
                let diff = this.vectorSub(this.position, other.position);
                if (dist != 0) {
                    diff.div(dist);
                    steer.add(diff);
                }
                i++;
            }
        }

        if (i != 0 && steer.mag != 0) {
            steer.div(i);
            steer.setMag(this.maxSpeed);
            steer.sub(this.velocity);
            steer.limit(this.maxForce);
        }
        return steer;
    }

    colorify(flock) {
        let steer = this.p.createVector();
        let i = 0;

        for (let other of flock) {
            let dist = this.position.dist(other.position);
            if ((dist < this.perceptionRadius) && (other != this)) {
                steer.add(other.color);
                i++;
            }
        }

        if (i != 0) {
            steer.div(i);
            steer.sub(this.color);
            steer.limit(this.maxForce * 25);
        }
        this.color.add(steer);
    }

    eat(foodList) {
        for (let food of foodList) {
            let dist = this.position.dist(food.position);

            if (food.consumed == false && dist < food.size) {
                food.consumed = true;
                this.size += food.size / 2;
            }
        }
    }

    forage(foodList) {
        let nearestFood = null;
        let nearestDist = Infinity;

        for (let food of foodList) {
            let dist = this.position.dist(food.position);

            if (dist < this.perceptionRadius && dist < nearestDist) {
                nearestDist = dist;
                nearestFood = food.position.copy();
            }
        }

        if (nearestFood != null) {
            let desired = this.vectorSub(nearestFood, this.position);
            desired.setMag(this.maxSpeed);
            let steer = this.vectorSub(desired, this.velocity);
            steer.limit(this.maxForce);
            this.acceleration.add(steer.mult(this.forageBias));
        }
    }

    hunt(flock) {
        let nearestBoid = null;
        let nearestDist = Infinity;

        for (let boid of flock) {
            if (boid.type == BoidType.PREDATOR || boid.type == BoidType.PLAYER_PREDATOR || this == boid) {
                continue;
            }
            let dist = this.position.dist(boid.position);

            if (dist < this.size / 2) {
                this.size += boid.size;
                let idx = flock.indexOf(boid);
                if (idx != -1) {
                    flock.splice(idx, 1);
                }
                return;
            }

            if (boid != this && dist < this.perceptionRadius && dist < nearestDist) {
                nearestDist = dist;
                nearestBoid = boid.position.copy();
            }
        }

        let desired;
        if (nearestBoid != null) {
            desired = this.vectorSub(nearestBoid, this.position);
        } else {
            desired = this.p.createVector(this.p.random(1), this.p.random(1));
        }

        desired.setMag(this.maxSpeed);
        let steer = this.vectorSub(desired, this.velocity);
        steer.limit(this.maxForce);
        this.acceleration.add(steer);
    }

    flee(flock) {
        let steer = this.p.createVector();
        let i = 0;

        for (let other of flock) {
            if (other.type == BoidType.PREY) {
                continue;
            }
            let dist = this.position.dist(other.position);
            if ((dist < this.perceptionRadius) && (other != this)) {
                let diff = this.vectorSub(this.position, other.position);
                if (dist != 0) {
                    diff.div(dist);
                    steer.add(diff);
                }
                i++;
            }
        }

        if (i != 0 && steer.mag != 0) {
            steer.div(i);
            steer.setMag(this.maxSpeed);
            steer.sub(this.velocity);
            steer.limit(this.maxForce);
        }
        this.acceleration.add(steer.mult(this.fleeBias));
    }

    handleInput() {
        let steer = this.p.createVector();

        if (this.p.keyIsDown(this.p.LEFT_ARROW)) {
            steer.add(this.p.createVector(-1, 0));
        }
        if (this.p.keyIsDown(this.p.RIGHT_ARROW)) {
            steer.add(this.p.createVector(1, 0));
        }
        if (this.p.keyIsDown(this.p.UP_ARROW)) {
            steer.add(this.p.createVector(0, -1));
        }
        if (this.p.keyIsDown(this.p.DOWN_ARROW)) {
            steer.add(this.p.createVector(0, 1));
        }

        if (steer.mag > 0) {
            steer.setMag(this.maxSpeed);
            steer.sub(this.velocity);
            steer.limit(this.maxForce);
        }
        this.acceleration.add(steer);
    }

    munchBoid(flock) {
        for (let boid of flock) {
            if (boid.type == BoidType.PREDATOR || boid.type == BoidType.PLAYER_PREDATOR || this == boid) {
                continue;
            }
            let dist = this.position.dist(boid.position);

            if (dist < this.size / 2) {
                this.size += boid.size;
                let idx = flock.indexOf(boid);
                if (idx != -1) {
                    flock.splice(idx, 1);
                }
                return;
            }
        }
    }
}

export default Boid;

