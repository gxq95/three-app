
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import style from './style.scss';

const ThreeScene = () => {
  const divRef = useRef(null);
  // eslint-disable-next-line
  const scene = new THREE.Scene();
   // eslint-disable-next-line
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( divRef.offSetWidth, divRef.offSetHeight );
  useEffect(() => {
    if (divRef.current) {
      console.log(divRef);
      divRef.current.appendChild( renderer.domElement);
    }
      // eslint-disable-next-line
  }, [divRef])
  
  return <div ref={divRef} className={style.scene}/>
}

export default ThreeScene;