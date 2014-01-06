var camera, scene, renderer;
var geometry, material, mesh;
var obj_count = 9;
var obj_size = 500;
var obj_spacing = obj_size * 2.22;
var random_vector;

init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, obj_size * 50 );
    camera.position.z = obj_size * 5;

    scene = new THREE.Scene();

    geometry = new THREE.IcosahedronGeometry(obj_size);
    material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );

    mesh = new Array();
    random_vector = new Array();
    for (i = 0; i < obj_count; ++i)
    {
        mesh[i] = new THREE.Mesh( geometry, material );
        random_vector[i] = new Array();
        random_vector[i][0] = Math.random();
        if (Math.random() > 0.5) random_vector[i][0] *= -1;
        random_vector[i][1] = Math.random();
        if (Math.random() > 0.5) random_vector[i][1] *= -1;
        random_vector[i][2] = Math.random();
        if (Math.random() > 0.5) random_vector[i][2] *= -1;
    }
    for (i = 0; i < obj_count; ++i)
    {
        if (i % 3 === 1) 
        {
            mesh[i].position.x -= obj_spacing;
        }
        else if (i % 3 === 2)
        {
            mesh[i].position.x += obj_spacing;
        }
        if (i > 2 && i <= 5)
        {
            mesh[i].position.z += obj_spacing;
            mesh[i].position.y -= obj_spacing;
        }
        else if (i > 5)
        {
            mesh[i].position.z -= obj_spacing;
            mesh[i].position.y += obj_spacing;
        }
        scene.add( mesh[i] );
    }

    renderer = new THREE.CanvasRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    document.body.appendChild( renderer.domElement );

}

function animate() {

    // note: three.js includes requestAnimationFrame shim
    requestAnimationFrame( animate );

    for (m = 0; m < obj_count; ++m)
    {
        switch (m % 3)
        {
            case 0: mesh[m].rotation.x += 0.01; break;
            case 1: mesh[m].rotation.y += 0.01; break;
            case 2: mesh[m].rotation.z += 0.01; break;
        }
        mesh[m].position.x += random_vector[m][0];
        mesh[m].position.y += random_vector[m][1];
        mesh[m].position.z += random_vector[m][2];
    }
    renderer.render( scene, camera );

}
