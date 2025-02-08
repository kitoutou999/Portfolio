function init() {
    const container = document.querySelector('.threejs');
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 100);
    camera.position.set(0, 0, 5);
    camera.lookAt(scene.position);

    const geometry = new THREE.TorusKnotGeometry(1, 0.4, 400, 40);
    const material = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        emissive: 0x000000,
        wireframe: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const ambientLight = new THREE.AmbientLight(0xe7e7e7, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 30);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);


    function animate() {
        requestAnimationFrame(animate);
        mesh.rotation.x += 0.0025;
        mesh.rotation.y += 0.005;
        renderer.render(scene, camera);
    }
    
    animate();
}

init();