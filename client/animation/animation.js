  Template.animation.rendered = function () {


        var container;

        var camera, scene, renderer;

        var mouseX = 0, mouseY = 0;

        var windowHalfX = window.innerWidth / 2;
        var windowHalfY = window.innerHeight / 2;
        var rocket;

        init();
        animate();


        function init() {

          container = document.getElementById("container");

          camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 7000 );
          camera.position.z = 100;

          // scene

          scene = new THREE.Scene();

          var ambient = new THREE.AmbientLight( 0xFFFFFF );
          scene.add( ambient );

          var directionalLight = new THREE.DirectionalLight( 0xffeedd );
          directionalLight.position.set( 0, 0, 1 );
          scene.add( directionalLight );

          // texture

          var manager = new THREE.LoadingManager();
          manager.onProgress = function ( item, loaded, total ) {

            console.log( item, loaded, total );

          };

          var texture = new THREE.Texture();

          var onProgress = function ( xhr ) {
            if ( xhr.lengthComputable ) {
              var percentComplete = xhr.loaded / xhr.total * 100;
              console.log( Math.round(percentComplete, 2) + '% downloaded' );
            }
          };

          var onError = function ( xhr ) {
          };


          var loader = new THREE.ImageLoader( manager );
          loader.load( '/UV_Grid_Sm.jpg', function ( image ) {

            texture.image = image;
            texture.needsUpdate = true;

          } );

          // model

          var loader = new THREE.OBJLoader( manager );
          loader.load( '/rocket.obj', function ( object ) {

            object.traverse( function ( child ) {
              console.log("test");
              if ( child instanceof THREE.Mesh ) {
                console.log("Go")
                child.material.map = texture;

              }

            } );
            rocket = object;
            rocket.position.y = 180;
            rocket.position.z = -3000;
            rocket.rotation.y = 90;
            scene.add( rocket );

          }, onProgress, onError );

          //

          var pointLight = new THREE.PointLight( 0xFFFFFF );

          // set its position
          pointLight.position.x = 10;
          pointLight.position.y = 50;
          pointLight.position.z = 130;

          // add to the scene
          scene.add(pointLight);

          renderer = new THREE.WebGLRenderer();
          renderer.setPixelRatio( window.devicePixelRatio );
          renderer.setSize( window.innerWidth, window.innerHeight );
          container.appendChild( renderer.domElement );

          document.addEventListener( 'mousemove', onDocumentMouseMove, false );

          //

          window.addEventListener( 'resize', onWindowResize, false );

        }

        function onWindowResize() {

          windowHalfX = window.innerWidth / 2;
          windowHalfY = window.innerHeight / 2;

          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();

          renderer.setSize( window.innerWidth, window.innerHeight );

        }

        function onDocumentMouseMove( event ) {

          mouseX = ( event.clientX - windowHalfX ) / 2;
          mouseY = ( event.clientY - windowHalfY ) / 2;

        }

        //

        function animate() {
          requestAnimationFrame( animate );
          render();

        }

        function render() {

          camera.position.x += ( mouseX - camera.position.x ) * .05;
          camera.position.y += ( - mouseY - camera.position.y ) * .05;

          camera.lookAt( scene.position );
          //rocket.position.z -= 10;
          renderer.render( scene, camera );

        }

  };



