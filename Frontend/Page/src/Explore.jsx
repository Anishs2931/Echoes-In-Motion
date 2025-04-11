import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useNavigate } from 'react-router-dom';
import './Explore.css';

const Explore = () => {
  const mountRef = useRef(null);
  const navigate = useNavigate();
  const [selectedMarker, setSelectedMarker] = useState(null);
  const markerRefs = useRef({});
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());

  // Define the points (countries/states) on the globe
  const markers = [
    {
      id: 'india',
      name: 'India',
      color: '#FFAC1C',
      lat: 20.5937,
      lng: 78.9629,
      videoUrl: '/videos/india_stories.mp4',
      description: 'Traditional folk tales from India'
    },
    {
      id: 'japan',
      name: 'Japan',
      color: '#DC3545',
      lat: 36.2048,
      lng: 138.2529,
      videoUrl: '/videos/japan_stories.mp4',
      description: 'Ancient stories from Japan'
    },
    {
      id: 'brazil',
      name: 'Brazil',
      color: '#28A745',
      lat: -14.2350,
      lng: -51.9253,
      videoUrl: '/videos/brazil_stories.mp4',
      description: 'Vibrant tales from Brazil'
    },
    {
      id: 'egypt',
      name: 'Egypt',
      color: '#FFC107',
      lat: 26.8206,
      lng: 30.8025,
      videoUrl: '/videos/egypt_stories.mp4',
      description: 'Mythical stories from ancient Egypt'
    },
    {
      id: 'ireland',
      name: 'Ireland',
      color: '#17A2B8',
      lat: 53.1424,
      lng: -7.6921,
      videoUrl: '/videos/ireland_stories.mp4',
      description: 'Celtic folklore from Ireland'
    }
  ];

  // Convert latitude and longitude to 3D coordinates
  const latLongToVector3 = (lat, lon, radius) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    const x = -radius * Math.sin(phi) * Math.cos(theta);
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);
    return new THREE.Vector3(x, y, z);
  };

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    controls.enablePan = false;
    controls.minDistance = 3;
    controls.maxDistance = 8;

    // Earth geometry
    const earthGeometry = new THREE.SphereGeometry(2, 64, 64);
    
    // Create Earth material with texture
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load('/earth-texture.jpg'),
      bumpMap: new THREE.TextureLoader().load('/earth-bump.jpg'),
      bumpScale: 0.05,
      specularMap: new THREE.TextureLoader().load('/earth-specular.jpg'),
      specular: new THREE.Color(0x333333),
      shininess: 5
    });
    
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);

    // Star field background
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
      color: 0xFFFFFF,
      size: 0.1
    });

    const starVertices = [];
    for (let i = 0; i < 10000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;
      starVertices.push(x, y, z);
    }

    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);

    // Add markers for each location
    markers.forEach(marker => {
      const markerPosition = latLongToVector3(marker.lat, marker.lng, 2.05);
      
      // Create marker
      const markerGeometry = new THREE.SphereGeometry(0.05, 16, 16);
      const markerMaterial = new THREE.MeshBasicMaterial({ color: marker.color });
      const markerMesh = new THREE.Mesh(markerGeometry, markerMaterial);
      
      markerMesh.position.copy(markerPosition);
      markerMesh.userData = { markerId: marker.id };
      
      // Add pulse effect
      const pulseGeometry = new THREE.SphereGeometry(0.07, 16, 16);
      const pulseMaterial = new THREE.MeshBasicMaterial({ 
        color: marker.color,
        transparent: true,
        opacity: 0.4
      });
      const pulse = new THREE.Mesh(pulseGeometry, pulseMaterial);
      pulse.position.copy(markerPosition);
      
      // Store reference to marker
      markerRefs.current[marker.id] = {
        marker: markerMesh,
        pulse: pulse,
        info: marker
      };
      
      scene.add(markerMesh);
      scene.add(pulse);
    });

    // Handle window resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    // Handle clicks on markers
    const handleClick = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.current.setFromCamera(mouse.current, camera);
      
      // Find intersections with markers
      const markerObjects = Object.values(markerRefs.current).map(ref => ref.marker);
      const intersects = raycaster.current.intersectObjects(markerObjects);
      
      if (intersects.length > 0) {
        const markerId = intersects[0].object.userData.markerId;
        const marker = markers.find(m => m.id === markerId);
        
        if (marker) {
          setSelectedMarker(marker);
        }
      }
    };

    renderer.domElement.addEventListener('click', handleClick);

    // Animation variables
    let pulseScale = 1;
    let pulseDirection = 0.01;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Pulse effect for markers
      pulseScale += pulseDirection;
      if (pulseScale > 1.2) {
        pulseDirection = -0.01;
      } else if (pulseScale < 1) {
        pulseDirection = 0.01;
      }
      
      Object.values(markerRefs.current).forEach(ref => {
        ref.pulse.scale.set(pulseScale, pulseScale, pulseScale);
      });
      
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('click', handleClick);
      mountRef.current.removeChild(renderer.domElement);
      
      // Dispose of geometries and materials
      earthGeometry.dispose();
      earthMaterial.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
      
      Object.values(markerRefs.current).forEach(ref => {
        ref.marker.geometry.dispose();
        ref.marker.material.dispose();
        ref.pulse.geometry.dispose();
        ref.pulse.material.dispose();
      });
    };
  }, []);

  const playVideo = (videoUrl) => {
    // Navigate to video player with the selected video
    navigate(`/stories/video`, { state: { videoUrl, marker: selectedMarker } });
  };

  return (
    <div className="explore-container">
      <div className="globe-container" ref={mountRef}></div>

      {selectedMarker && (
        <div className="info-card">
          <div className="card">
            <div className="card-header" style={{ backgroundColor: selectedMarker.color }}>
              <h2>{selectedMarker.name}</h2>
            </div>
            <div className="card-body">
              <p>{selectedMarker.description}</p>
              <button 
                className="btn btn-primary watch-btn"
                onClick={() => playVideo(selectedMarker.videoUrl)}
                style={{ backgroundColor: selectedMarker.color, borderColor: selectedMarker.color }}
              >
                Watch Stories
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="title-container">
        <h1>Explore Cultural Stories From Around The World</h1>
        <p>Click on markers to discover traditional tales from different regions</p>
      </div>

      <button 
        className="btn btn-secondary back-btn"
        onClick={() => navigate('/')}
      >
        Back to Home
      </button>
    </div>
  );
};

export default Explore;