let myMesh;

function createEnvironment(scene) {


  // Earth
  let planet1Texture = new THREE.TextureLoader().load("../assets/earth.jpeg");
  let planet1Material = new THREE.MeshBasicMaterial({ map: planet1Texture });
  let planet1Geom = new THREE.SphereGeometry(3, 12, 16);
  planet1 = new THREE.Mesh(planet1Geom, planet1Material);
  planet1.position.set(150, 2, 40);

  //Naboo
  let planet2Texture = new THREE.TextureLoader().load("../assets/naboo.jpeg");
  let planet2Material = new THREE.MeshBasicMaterial({ map: planet2Texture });
  let planet2Geom = new THREE.SphereGeometry(3, 12, 16);
  planet2 = new THREE.Mesh(planet2Geom, planet2Material);
  planet2.position.set(-90, 2, 30);

  //Tatooine
  let planet3Texture = new THREE.TextureLoader().load("../assets/tatooine.jpeg");
  let planet3Material = new THREE.MeshBasicMaterial({ map: planet3Texture });
  let planet3Geom = new THREE.SphereGeometry(10, 12, 16);
  planet3 = new THREE.Mesh(planet3Geom, planet3Material);
  planet3.position.set(-30, 80, 170);

  //Starter
  let planet4Texture = new THREE.TextureLoader().load("../assets/texture.png");
  let planet4Material = new THREE.MeshBasicMaterial({ map: planet4Texture });
  let planet4Geom = new THREE.SphereGeometry(1, 12, 16);
  planet4 = new THREE.Mesh(planet4Geom, planet4Material);
  planet4.position.set(0, 0, 0);

  //Ice
  let planet5Texture = new THREE.TextureLoader().load("../assets/ice.jpeg");
  let planet5Material = new THREE.MeshBasicMaterial({ map: planet5Texture });
  let planet5Geom = new THREE.SphereGeometry(2, 12, 16);
  planet5 = new THREE.Mesh(planet5Geom, planet5Material);
  planet5.position.set(-40, 50, 10);


  // Add to scene:
  scene.add(planet1);
  scene.add(planet2);
  scene.add(planet3);
  scene.add(planet4);
  scene.add(planet5);
  scene.add(createStars(scene));
}


// Create Stars
// From: https://medium.com/nerd-for-tech/adding-a-custom-star-field-background-with-three-js-79a1d18fd35d
let starsT1 = {};
let starsT2 = {};
function createStars(scene){


  const getRandomParticlePos = (particleCount) => {
    const arr = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i++) {
        arr[i] = (Math.random() - 0.5) * 250;
      }
      return arr;
  };


   // Geometry
  const geometrys = [new THREE.BufferGeometry(), new THREE.BufferGeometry()];

  geometrys[0].setAttribute(
    "position",
    new THREE.BufferAttribute(getRandomParticlePos(500), 3)
  );
  geometrys[1].setAttribute(
    "position",
    new THREE.BufferAttribute(getRandomParticlePos(1500), 3)
  );

  const loader = new THREE.TextureLoader();

  // material
  const materials = [
    new THREE.PointsMaterial({
      size: 2,
      map: loader.load(
        "https://raw.githubusercontent.com/Kuntal-Das/textures/main/sp1.png"
      ),
      transparent: true
      // color: "#ff0000"
    }),
    new THREE.PointsMaterial({
      size: 1,
      map: loader.load(
        "https://raw.githubusercontent.com/Kuntal-Das/textures/main/sp2.png"
      ),
      transparent: true
      // color: "#0000ff"
    })
  ];

  starsT1 = new THREE.Points(geometrys[0], materials[0]);
  starsT2 = new THREE.Points(geometrys[1], materials[1]);
  scene.add(starsT1);
  scene.add(starsT2);
}

function updateEnvironment(scene,camera=null) {
   planet1.rotation.y += 0.0007;
   planet2.rotation.y += 0.0015;
   planet3.rotation.x += 0.005;
   planet4.rotation.y += 0.0025;
   planet5.rotation.z += 0.0075;


  if(starsT1.position && starsT2.position && camera){
    starsT1.position.x = camera.position.x * 0.0001;
    starsT1.position.y = camera.position.y * -0.0001;

    starsT2.position.x = camera.position.x * 0.0001;
    starsT2.position.y = camera.position.y * -0.0001;
  }
    

}