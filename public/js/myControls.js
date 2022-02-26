console.log('hello controls');

class MyControls {
    constructor(camera) {
        // set up my controls
        this.camera = camera;

        this.speed = 0;
        this.acceleration = 0;

        this.keys = {};

        document.body.addEventListener('keydown',(ev) => {
            this.keys[ev.key] = true;
        } )
        document.body.addEventListener('keyup',(ev) => {
            this.keys[ev.key] = false;
        } )
    }

    update(avatar, allAstronauts, scene){

        if (this.keys["h"]) {
            console.log('Pressed H: Teleporting home');
            this.camera.position.z = 0;
            this.camera.position.x = 0;
        }

        if(this.keys["f"]){
            console.log(`Pressed F: teleporting to a random friend`);
            console.log(allAstronauts);
            if(allAstronauts.length > 0 ){
                const randomIdx = Math.floor(Math.random() * (allAstronauts.length));
                const randomFriend= allAstronauts[randomIdx].avatar;

                this.camera.position.x = randomFriend.position.x;
                // this.camera.position.y = randomFriend.position.y-1.5;
                this.camera.position.z = randomFriend.position.z+2.5;
            }
        }

        if(this.keys["g"]){
            console.log(`Pressed G: creating guides to fellow friends`);
            console.log(allAstronauts);

            if(allAstronauts.length > 0 ){

                allAstronauts.forEach((astro, ind) => {
                    let avatar = astro.avatar;
                    let points = [];

                    let origin = this.camera.position;
                    let dest = avatar.position;

                    let test = new THREE.Vector3( origin.x, origin.y, origin.z )
                    console.log(test);

                    points.push( test );
                    points.push( new THREE.Vector3( dest.x, dest.y, dest.z ) );

                    let geometry = new THREE.BufferGeometry().setFromPoints( points );
                    let material = new THREE.LineBasicMaterial( { color: 0xffff00 } );
                    let line = new THREE.Line( geometry, material );
                    scene.add( line );
                });

                //this.camera.position.x = randomFriend.position.x;
                // this.camera.position.y = randomFriend.position.y-1.5;
                //this.camera.position.z = randomFriend.position.z+2.5;
            }
        }




        if (this.keys["w"]) {
            this.camera.position.z -= 0.1;
        }
        if (this.keys["a"]) {
            this.camera.position.x -= 0.1;
        }
        if (this.keys["s"]) {
            this.camera.position.z += 0.1;
        }
        if (this.keys["d"]) {
            this.camera.position.x += 0.1;
        }
        if (this.keys[" "]){
            this.acceleration += 0.005;
            if(this.acceleration >= 0.05 ){
                this.acceeleration = 0.05
            }
        }

        this.speed += this.acceleration;

        if(this.acceleration > 0){
            this.acceleration -= 0.001
        }
        
        if(this.speed >= 0.001){
            this.speed -= 0.01;
        }

        if(this.speed <= 0 ){
                this.speed = 0;
            }

        this.camera.position.z -= this.speed;

        avatar.position.set(this.camera.position.x,0,this.camera.position.z);

    }
}