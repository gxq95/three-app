
import React, { useRef, useEffect, useCallback, useMemo } from 'react';
import * as THREE from 'three';
import { SpotLight } from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import style from './style.module.scss';

const ThreeScene = () => {
  const divRef = useRef(null);
  // eslint-disable-next-line
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x555555);


  const camera = useMemo(() => new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ), []);
  camera.position.set(-30, 40, 30);
  camera.lookAt(0, 0, 0);//锁定视角

  const renderer = useMemo(() => new THREE.WebGLRenderer({ alpha: true, color: 0xeeeeee }), []);
  renderer.setSize(window.innerWidth, window.innerHeight); 
  // renderer.shadowMap.enabled = true;


  const geometry = useMemo(() => new THREE.BoxGeometry(4, 4, 4), []);
  const material = useMemo(() => new THREE.MeshLambertMaterial( { color: 0x00ff00 } ), []);
  const cube = useMemo(() => new THREE.Mesh( geometry, material ), [geometry, material]);
  cube.position.set(-4, 3, 0);
  // cube.castShadow = true;
  scene.add( cube );


  const plane = new THREE.Mesh( new THREE.PlaneGeometry(100, 100), new THREE.MeshLambertMaterial({ color: 0xcccccc }));
  plane.position.set(15, 0, 0);
  plane.rotateX(-0.5 * Math.PI);
  // plane.receiveShadow = true;
  scene.add(plane);

  const light = new SpotLight(0xFFFFFF);
  light.position.set(-40, 60, -10);
  // light.castShadow = true;
  scene.add(light);



  const controls = new OrbitControls(camera, renderer.domElement);// 初始化控制器
  controls.target.set(0, 0, 0);// 设置控制器的焦点，使控制器围绕这个焦点进行旋转
  controls.minDistance = 1;// 设置移动的最短距离（默认为零）
  // controls.maxDistance = 400;// 设置移动的最长距离（默认为无穷）
  controls.maxPolarAngle = Math.PI / 3;//绕垂直轨道的距离（范围是0-Math.PI,默认为Math.PI）
  scene.add(controls);
  controls.update();// 照相机转动时，必须更新该控制器


  const helper = new THREE.AxesHelper(10);
  scene.add(helper);
  
  const animate = useCallback(()=> {
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    requestAnimationFrame(animate);
    renderer.render( scene, camera );
    // eslint-disable-next-line
  }, [scene, camera, renderer, cube]);
  

  useEffect(() => {
    animate();
  }, [animate]);
  useEffect(() => {
    if (divRef.current) {
      divRef.current.appendChild( renderer.domElement);
    }
  }, [divRef, renderer.domElement])
  
return <div ref={divRef} className={style.scene}></div>
}

export default ThreeScene;