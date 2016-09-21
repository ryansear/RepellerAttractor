function Boid() {
	this.force = createVector(0,0);
	this.acc = createVector(random(.1, .9), random(-.9, .1));
	this.vel = createVector(random(-3, 3), random(-3, 3));
	this.loc = createVector(random(width), random(height));



	this.render = function() {
		push();
  		fill(55, 80, 250);
  		ellipse(this.loc.x, this.loc.y, 20, 20)
		pop();
		push();
  		fill(255, 100, 0);
  		noStroke();
  		ellipse(this.loc.x, this.loc.y, 10, 10);
  	pop();

	}

	this.update = function(force) {
		this.force = force; // Incase we want to send f
		this.fear = random(100, 200);
		//calc force vector
		this.force = p5.Vector.sub(this.loc,mover.loc);
		this.force.normalize();
		this.force.mult(.1);
		// If in range of Mover--run for your life!
		if(this.loc.dist(mover.loc) < 50){
			this.applyForce(this.force);
			this.vel.add(this.force);
			this.vel.limit(random(3,6));
		} else if(this.loc.dist(mover.loc) < 90){
			this.applyForce(this.force);
			this.vel.add(this.force);
			this.vel.limit(random(1,2));
		}else{
			//this.vel.add(this.force);
			this.vel.limit(1);
		}
		this.loc.add(this.vel);
		this.acc.mult(0);
	}
	//bounce off walls
	this.checkEdges = function() {
		if (this.loc.x > width || this.loc.x < 0) this.vel.x *= -1;
		if (this.loc.y > height || this.loc.y < 0) this.vel.y *= -1;
	}
}
