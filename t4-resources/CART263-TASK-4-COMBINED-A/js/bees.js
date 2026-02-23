class Bee {
    constructor(x, y, width, height, home) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.home = home;
        this.isreturn = false;
    }

    return() {
        this.isreturn = true;
    }

    renderBee() {
        this.beeElement = document.createElement('img');
        this.beeElement.src = 'assets/bee.svg';
        this.beeElement.style.position = 'absolute';
        this.beeElement.classList.add('bee');
        this.beeElement.style.width = this.width + 'px';
        this.beeElement.style.height = this.height + 'px';

        document.body.appendChild(this.beeElement);
        return this.beeElement;
    }

    animateBee() {
        let bee = this;
        let direction = 1;
        let speed = 5;

        setTimeout(() => { // bees wander for 10 seconds before going back to the hive
            bee.return();
        }, 10000);

        function moveBee() {
            if (!bee.isreturn) {

                bee.x += speed * direction;

                //bees wrap around when they go off screen
                if (bee.x > window.innerWidth) {
                    bee.x = -bee.width;
                }
                if (bee.x < -bee.width) {
                    bee.x = window.innerWidth;
                    direction = 1;
                }
            } else {
                //calculate center of hive as target
                let targetX = bee.home.x + (bee.home.size / 2) - (bee.width / 2);
                let targetY = bee.home.y + (bee.home.height / 2) - (bee.height / 2);


                // if the bees go past the nearest hive, the bees wrap around and goes to the nearest hive
                let hasPassedHive = (direction === 1 && bee.x > targetX + 50) ||
                    (direction === -1 && bee.x < targetX - 50);

                if (hasPassedHive) {
                    bee.x = (direction === 1) ? -bee.width : window.innerWidth;
                }

                // make sure bee moves at constant speed by claculating the distance
                //to the target
                let dx = targetX - bee.x;
                let dy = targetY - bee.y;
                let distance = Math.sqrt(dx * dx + dy * dy);


                if (distance > 1) {

                    bee.x += (dx / distance) * speed;
                    bee.y += (dy / distance) * speed;
                }


                if (distance < 5) {
                    bee.beeElement.remove();
                    bee.home.beeEntered();
                    return;
                }
            }

            bee.beeElement.style.left = bee.x + "px";
            bee.beeElement.style.top = bee.y + "px";

            requestAnimationFrame(moveBee);
        }

        moveBee();
    }
}

