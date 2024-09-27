    // Scene, Camera, Renderer
    const scenediv = document.querySelector('.scene');
    const loader = new THREE.GLTFLoader();
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    scenediv.appendChild(renderer.domElement);

    if (THREE.GLTFLoader) {
        console.log('GLTFLoader is loaded');
      } else {
        console.error('GLTFLoader is not loaded');
      }


    // Load Earth model
    loader.load('/models/globe.glb', function (gltf) {
        const earth = gltf.scene;
        earth.scale.set(5,5,5); // Adjust size as needed
        earth.position.set(0, 0, 0);
        scene.add(earth);
    });

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(0, 0, 0); // Position the point light
    scene.add(pointLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(50, 50, 50); // Position the light source
    scene.add(directionalLight);


    // // Moon
    // const moonGeometry = new THREE.SphereGeometry(1, 32, 32);
    // const moonMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaaa });
    // const moon = new THREE.Mesh(moonGeometry, moonMaterial);
    // moon.position.set(15, 0, 0);
    // scene.add(moon);



      // Load Moon model
      loader.load('/models/moon.glb', function (gltf) {
        const earth = gltf.scene;
        earth.scale.set(0.2,0.2,0.2); // Adjust size as needed
        earth.position.set(15, 0, 0);
        scene.add(earth);
    });

    // // ISS
    // const issGeometry = new THREE.BoxGeometry(1, 1, 1);
    // const issMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // const iss = new THREE.Mesh(issGeometry, issMaterial);
    // iss.position.set(10, 5, 5);
    // scene.add(iss);


      // Load ISS model
      loader.load('/models/ISS_stationary.glb', function (gltf) {
        const earth = gltf.scene;
        earth.scale.set(0.1,0.1,0.1); // Adjust size as needed
        earth.position.set(0, 0, 0);
        scene.add(earth);
    });

    // Camera positions
    const cameraPositions = {
      earth: { x: 0, y: 10, z: 20 },
      moon: { x: 15, y: 5, z: 25 },
      iss: { x: 10, y: 10, z: 10 }
    };

    // Camera transition function
    function moveCamera(targetPosition) {
      gsap.to(camera.position, {
        x: targetPosition.x,
        y: targetPosition.y,
        z: targetPosition.z,
        duration: 2,
        onUpdate: function () {
          camera.lookAt(scene.position);
        }
      });
    }

    // Button event listeners
    document.getElementById("viewEarth").addEventListener("click", () => moveCamera(cameraPositions.earth));
    document.getElementById("viewMoon").addEventListener("click", () => moveCamera(cameraPositions.moon));
    document.getElementById("viewISS").addEventListener("click", () => moveCamera(cameraPositions.iss));

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }

    animate();