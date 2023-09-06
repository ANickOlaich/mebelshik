import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xEEEEEE);
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const light = new THREE.AmbientLight( 0xffffff ); // soft white light
scene.add( light );

const targetObject = new THREE.Object3D(); 
scene.add(targetObject);


const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
directionalLight.target = targetObject;
directionalLight.position.x = -5;
directionalLight.position.y = 5;
directionalLight.position.y = 7;

const helper = new THREE.DirectionalLightHelper( directionalLight, 5 );
scene.add( helper );

scene.add( directionalLight );

/*const geometry = new THREE.BoxGeometry( 1, 1, 1 ); 
const material = new THREE.MeshPhysicalMaterial( {color: 0x00ff00} ); 
const cube = new THREE.Mesh( geometry, material ); 
scene.add( cube );*/

const mtlLoader = new MTLLoader();

mtlLoader.load("models/test4.obj.mtl", function(materials)
{
    materials.preload();
    var objLoader = new OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load("models/test4.obj", function(object)
    {    
        
        scene.add(object);
    });
});
// instantiate a loader
const loader = new OBJLoader();
/*
// load a resource
loader.load(
	// resource URL
	'models/test1.obj',
	// called when resource is loaded
	function ( object ) {  
		scene.add( object );

	},
	// called when loading is in progresses
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);
*/
camera.position.z = 5;

const controls = new OrbitControls( camera, renderer.domElement );
controls.update();

function animate() {
	requestAnimationFrame( animate );

	//cube.rotation.x += 0.01;
	//cube.rotation.y += 0.01;

    controls.update();

	renderer.render( scene, camera );
}

console.log('three');
animate();


const App={
    data(){     //Данные приложения
        return {
            project:{
                name:'Test',
                description:'Test'
            },
            id:0
        }
    },
    methods:{   //Методы приложения
        async updateProject(){
            console.log("UpdateProject");
            const response = await fetch('/api/project',{
                method:"PUT",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                  },
                  body: JSON.stringify(this.project)

            })
        }
        /*async newProject(){       //Добавляет новый проект
            if (this.name==''){
                this.placeholderString='Имя проекта не может быть пустым'
            }else{
                const project = {
                    name:this.name,
                    description:this.description
                }
                const response = await fetch('/api/projects',{
                    method:"POST",
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                      },
                      body: JSON.stringify(project)
                })
                const result = await response.json();
                this.projects.push(result)
                this.name=''
                this.description=''
                this.placeholderString="Введите название проекта"
            }
        },
        async inArchive(id){
            const response = await fetch('/api/projects/status',{
                method:"POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                  },
                  body: JSON.stringify({
                    id:id,
                    status:"В архиве"})
            })
            const result = await response.json();
            console.log(result);
            this.projects.splice(id-1,1)
            this.projects.push(result)

        },
        removeNote(idx){
            this.notes.splice(idx,1)

        }
    },
    computed:{  //Вычисляемые данные приложения
        doubleCountComputed(){
            return this.notes.length*2
        }
    },
    watch:{     //отслеживать данные
        inputValue(value){
            console.log(value);
        }*/
    },
    async created() {
        const url=window.location.href.split('/')
        const id=(url[url.length-1]);
        console.log(id);
        try {
            const response = await fetch('/api/project',{
                method:"POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                  },
                  body: JSON.stringify({
                    id:id})
            });
            this.project = await response.json();
            console.log(this.project);
          } catch (error) {
            console.error(error);
          }

        
    },
}


Vue.createApp(App).mount('#app')

