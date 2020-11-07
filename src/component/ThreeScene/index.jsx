
import React, { useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import style from './style.module.scss';

const ThreeScene = () => {
  const divRef = useRef(null);
  // eslint-disable-next-line
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x555555);
   // eslint-disable-next-line
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
     // eslint-disable-next-line
  const renderer = new THREE.WebGLRenderer({ alpha: true, color: 0xeeeeee });
  renderer.setSize(window.innerWidth, window.innerHeight); 
  const geometry = new THREE.BoxGeometry({ width: 100, height: 200, depth: 150 });
  const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  const cube = new THREE.Mesh( geometry, material );
  scene.add( cube );




  const controls = new OrbitControls(camera, renderer.domElement);// 初始化控制器
  controls.target.set(0, 0, 0);// 设置控制器的焦点，使控制器围绕这个焦点进行旋转
  controls.minDistance = 80;// 设置移动的最短距离（默认为零）
  controls.maxDistance = 400;// 设置移动的最长距离（默认为无穷）
  controls.maxPolarAngle = Math.PI / 3;//绕垂直轨道的距离（范围是0-Math.PI,默认为Math.PI）
  scene.add(controls);
  controls.update();// 照相机转动时，必须更新该控制器

  
  const animate = useCallback(()=> {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
  }, [scene, camera, renderer]);
  

  useEffect(() => {
    animate();
  }, [animate]);
  useEffect(() => {
    if (divRef.current) {
      divRef.current.appendChild( renderer.domElement);
    }
      // eslint-disable-next-line
  }, [divRef])
  
return <div ref={divRef} className={style.scene}></div>
}

export default ThreeScene;