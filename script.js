window.addEventListener("DOMContentLoaded", function() {
  // get the canvas DOM element
  var canvas = document.getElementById("renderCanvas");

  // load the 3D engine
  var engine = new BABYLON.Engine(canvas, true);

  var createScene = function() {
    // Create the scene space
    var scene = new BABYLON.Scene(engine);

    // Add a camera to the scene and attach it to the canvas

    var vrHelper = scene.createDefaultVRExperience();
    vrHelper.deviceOrientationCamera.position = new BABYLON.Vector3(40, 0, -90);

    // Sun
    var sunlight = new BABYLON.PointLight(
      "sun",
      new BABYLON.Vector3(
        200 * Math.cos(Math.PI / 4),
        0,
        200 * Math.sin(Math.PI / 4)
      ),
      scene
    );
    var sun = new BABYLON.MeshBuilder.CreateSphere(
      "astre",
      { diameter: 80 },
      scene
    );
    var solar = new BABYLON.StandardMaterial("solar", scene);
    solar.emissiveTexture = new BABYLON.Texture(
      "./textures/sun.jpg",
      scene,
      true,
      false
    );
    sun.material = solar;
    sun.position = sunlight.position;
    //sunlight.position = new BABYLON.Vector3(150, 0, 0);

    //black back
    scene.clearColor = new BABYLON.Color3(0, 0, 0);

    // Earth
    var sphere = BABYLON.MeshBuilder.CreateSphere(
      "sphere",
      { diameter: 30 },
      scene
    );
    var planete = new BABYLON.StandardMaterial("planete", scene);
    planete.ambientTexture = new BABYLON.Texture(
      "./textures/earth.jpg",
      scene,
      true,
      true
    );
    planete.specularColor = new BABYLON.Color3(0, 0, 0);
    //false permet de ne pas inverser l'axe y pour la texture
    sphere.material = planete; //texture
    sphere.isBlocker = true;
    sphere.rotation.x = Math.PI;

    // Lens flares
    var lensFlareSystem = new BABYLON.LensFlareSystem(
      "lensFlareSystem",
      sunlight,
      scene
    );
    var flare00 = new BABYLON.LensFlare(
      0.1,
      0,
      new BABYLON.Color3(1, 1, 1),
      "./textures/flare3.jpg",
      lensFlareSystem
    );
    var flare01 = new BABYLON.LensFlare(
      0.4,
      0.1,
      new BABYLON.Color3(1, 1, 1),
      "./textures/flare.jpg",
      lensFlareSystem
    );
    var flare02 = new BABYLON.LensFlare(
      0.2,
      0.2,
      new BABYLON.Color3(1, 1, 1),
      "./textures/flare.jpg",
      lensFlareSystem
    );
    var flare02 = new BABYLON.LensFlare(
      0.1,
      0.3,
      new BABYLON.Color3(1, 1, 1),
      "./textures/flare3.jpg",
      lensFlareSystem
    );
    var flare03 = new BABYLON.LensFlare(
      0.3,
      0.4,
      new BABYLON.Color3(0.5, 0.5, 1),
      "./textures/flare.jpg",
      lensFlareSystem
    );
    var flare05 = new BABYLON.LensFlare(
      0.8,
      1.0,
      new BABYLON.Color3(1, 1, 1),
      "./textures/flare2.png",
      lensFlareSystem
    );

    //Moon
    var moonlight = new BABYLON.PointLight(
      "moon",
      new BABYLON.Vector3(0, 50, 0),
      scene
    );
    moonlight.diffuse = new BABYLON.Color3(0, 0, 0);
    moonlight.specular = new BABYLON.Color3(0, 0, 0);
    var moon = BABYLON.MeshBuilder.CreateSphere(
      "moonlight",
      { diameter: 10 },
      scene
    );
    var moontexture = new BABYLON.StandardMaterial("moonTexture", scene);
    moontexture.diffuseTexture = new BABYLON.Texture(
      "./textures/moon.jpg",
      scene,
      true,
      false
    );
    moontexture.specularColor = new BABYLON.Color3(0, 0, 0);
    moon.material = moontexture;
    var hideMaterial = new BABYLON.StandardMaterial("hide", scene);
    hideMaterial.emissiveColor = new BABYLON.Color3(0, 0, 0);
    hideMaterial.ambientColor = new BABYLON.Color3(0, 0, 0);
    hideMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    hideMaterial.specularColor = new BABYLON.Color3(0, 0, 0);

    //Animations
    var alpha = 0;
    scene.registerBeforeRender(function() {
      sphere.rotation.y -= 0.01;
      moonlight.position = new BABYLON.Vector3(
        50 * Math.sin(alpha),
        0,
        50 * Math.cos(alpha)
      );
      moon.position = moonlight.position;
      if (moon.position.x <= -5 && moon.position.z <= -5) {
        moon.material = hideMaterial;
      } else {
        moon.material = moontexture;
      }
      moon.rotation.y -= 0.01;
      alpha -= 0.01;
    });

    return scene;
  };

  // call the createScene function
  var scene = createScene();

  // run the render loop
  engine.runRenderLoop(function() {
    scene.render();
  });

  // the canvas/window resize event handler
  window.addEventListener("resize", function() {
    engine.resize();
  });
});
