function init() {
    const params = {
        enable: false
    };

    let speedAnimation = 1.5;

    const container = document.querySelector('.threejs');
    const width = container.clientWidth;
    const height = container.clientHeight;

    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 100);
    camera.position.set(0, 1, 4);
    camera.lookAt(scene.position);

    const geometry = new THREE.TorusKnotGeometry(1, 0.4, 400, 40);
    const material = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        emissive: 0x0,
        wireframe: true,
 
    });
    let mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const ambientLight = new THREE.AmbientLight(0xe7e7e7, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 30);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);



    let renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        precision: 'highp'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    container.appendChild(renderer.domElement);

    let composer = new THREE.EffectComposer(renderer);
    
    const renderPass = new THREE.RenderPass(scene, camera);
    composer.addPass(renderPass);

    const effectGrayScale = new THREE.ShaderPass(THREE.LuminosityShader);
    composer.addPass(effectGrayScale);

    let effectSobel = new THREE.ShaderPass(THREE.SobelOperatorShader);
    effectSobel.uniforms.resolution.value.x = window.innerHeight * window.devicePixelRatio;
    effectSobel.uniforms.resolution.value.y = window.innerWidth * window.devicePixelRatio;
    composer.addPass(effectSobel);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enabled = false; 


    
    function animate() {
        requestAnimationFrame(animate);
        
        if (mesh) {
            mesh.rotation.x += (0.0025*speedAnimation);
            mesh.rotation.y += (0.005*speedAnimation);
        }
        if (params.enable) {
            composer.render();
        } else {
            renderer.render(scene, camera);
        }
    }


    animate();
}

init();
