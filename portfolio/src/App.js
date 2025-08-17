import { useState, useEffect, useRef } from 'react';
import { User, Code, Laptop, Mail, Github, Linkedin, X } from 'lucide-react';
import * as THREE from 'three';

const App = () => {
  // Define content data from Aditya Pandey's resume
  const portfolioData = {
    name: "Aditya Pandey",
    tagline: "Full Stack Developer & Machine Learning Enthusiast",
    bio: "To leverage my technical skills and passion for problem-solving to contribute to an impactful project and grow as a professional in the tech industry.",
    skills: [
      { name: "SQL", emoji: "🔍" },
      { name: "Python", emoji: "🐍" },
      { name: "HTML", emoji: "📄" },
      { name: "CSS", emoji: "🎨" },
      { name: "JavaScript", emoji: "💻" },
      { name: "React", emoji: "⚛️" },
      { name: "Data Structures", emoji: "📊" },
      { name: "MERN", emoji: "🌐" },
      { name: "Node.js", emoji: "🟩" },
      { name: "Express.js", emoji: "🚀" },
      { name: "Redux", emoji: "🔴" },
      { name: "Docker", emoji: "🐳" },
      { name: "Microsoft Azure", emoji: "☁️" },
      { name: "Git", emoji: "⚙️" },
      { name: "Java", emoji: "☕" },
      { name: "C Programming", emoji: "🖥️" },
      { name: "AWS", emoji: "☁️" },
      { name: "C#", emoji: " sharp" },
      { name: "Machine Learning", emoji: "🧠" },
      { name: "MEAN", emoji: "🌐" },
      { name: "MongoDB", emoji: "🌿" },
      { name: "Firebase", emoji: "🔥" },
      { name: "REST API", emoji: "🔗" },
      { name: "TypeScript", emoji: "💙" },
      { name: "VS Code", emoji: "💻" },
    ],
    projects: [
      {
        id: 1,
        title: "Face and Speech Emotion Recognition",
        description: "A project that uses deepface, transformer, web2vec2, matplotlib, and pyaudio for facial and speech emotion recognition.",
        techStack: "Python, deepface, transformer, web2vec2, matplotlib, pyaudio",
        links: [
          { name: "View Code", url: "#" },
        ],
      },
      {
        id: 2,
        title: "Transport Management System",
        description: "Developed a full-stack transport system using MERN stack. Integrated real-time vehicle tracking with Google Maps API. Implemented automated route optimization, reducing delays by 40%.",
        techStack: "MERN, React.js, Node.js, Express.js, MongoDB, Google Maps API, Firebase, JWT",
        links: [
          { name: "View Code", url: "#" },
          { name: "Live Demo", url: "#" },
        ],
      },
      {
        id: 3,
        title: "Restaurant Website",
        description: "This project is for ordering food from a restaurant. It was part of a full-stack internship.",
        techStack: "MERN Stack",
        links: [
          { name: "View Code", url: "#" },
          { name: "Live Demo", url: "#" },
        ],
      },
      {
        id: 4,
        title: "Student Management System",
        description: "This project is designed to maintain student records.",
        techStack: "HTML, CSS, JavaScript",
        links: [
          { name: "View Code", url: "#" },
          { name: "Live Demo", url: "#" },
        ],
      },
      {
        id: 5,
        title: "Online College Library Management System",
        description: "A full-fledged functional system with user authentication, book tracking, and admin management.",
        techStack: "HTML, CSS, JavaScript, PHP, Git/GitHub",
        links: [
          { name: "View Code", url: "#" },
          { name: "Live Demo", url: "#" },
        ],
      },
    ],
  };

  const [activeLink, setActiveLink] = useState('about');
  const [modalContent, setModalContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef(null);

  const handleLinkClick = (id) => {
    setActiveLink(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Function to call the Gemini API
  const getAiDescription = async (projectName, projectDescription) => {
    setLoading(true);
    let chatHistory = [];
    // Prompt the LLM to write a detailed project description
    const prompt = `Write a professional and detailed project description for a portfolio website. The project is titled "${projectName}" and the existing short description is: "${projectDescription}". Elaborate on the features, technologies used, and the value this project provides. Keep the tone professional and concise, suitable for a resume or portfolio.`;
    
    chatHistory.push({ role: "user", parts: [{ text: prompt }] });
    const payload = { contents: chatHistory };
    const apiKey = "";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    let response;
    try {
      response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (result.candidates && result.candidates.length > 0 &&
        result.candidates[0].content && result.candidates[0].content.parts &&
        result.candidates[0].content.parts.length > 0) {
        const text = result.candidates[0].content.parts[0].text;
        setModalContent({ title: projectName, description: text });
      } else {
        setModalContent({ title: "Error", description: "Failed to generate description. Please try again." });
      }
    } catch (error) {
      console.error("API call failed:", error);
      setModalContent({ title: "Error", description: "Network error. Failed to generate description." });
    } finally {
      setLoading(false);
    }
  };

  // Three.js background animation logic - 3D Geometric Web
  useEffect(() => {
    let camera, scene, renderer, points, lines;
    let mouse = new THREE.Vector2();
    let tempParticles = [];
    
    const particleCount = 250; // Increased particle count for more density
    const maxConnectionDistance = 300; // Increased distance for more connections
    const maxDistanceToCursor = 400; // Increased cursor interaction radius
    
    const positionsArray = new Float32Array(particleCount * 3);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const init = () => {
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000);
      camera.position.z = 1000;
      scene = new THREE.Scene();

      // Initialize particles randomly across a large area
      for (let i = 0; i < particleCount; i++) {
        const x = THREE.MathUtils.randFloatSpread(2500);
        const y = THREE.MathUtils.randFloatSpread(2500);
        const z = THREE.MathUtils.randFloatSpread(500);

        positionsArray[i * 3] = x;
        positionsArray[i * 3 + 1] = y;
        positionsArray[i * 3 + 2] = z;
        tempParticles.push(new THREE.Vector3(x, y, z));
      }

      // Points geometry
      const pointsGeometry = new THREE.BufferGeometry();
      pointsGeometry.setAttribute('position', new THREE.BufferAttribute(positionsArray, 3));
      const pointsMaterial = new THREE.PointsMaterial({ color: 0x5C80FF, size: 4 });
      points = new THREE.Points(pointsGeometry, pointsMaterial);
      scene.add(points);

      // Lines geometry
      const linesGeometry = new THREE.BufferGeometry();
      const lineMaterial = new THREE.LineBasicMaterial({ color: 0x5C80FF, transparent: true, opacity: 0.2 });
      lines = new THREE.LineSegments(linesGeometry, lineMaterial);
      scene.add(lines);

      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);

      document.addEventListener('mousemove', onDocumentMouseMove, false);
      document.addEventListener('touchmove', onDocumentTouchMove, false);
      window.addEventListener('resize', onWindowResize, false);
    };

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const onDocumentMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const onDocumentTouchMove = (event) => {
      event.preventDefault();
      mouse.x = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
    };

    const animate = () => {
      requestAnimationFrame(animate);
      render();
    };

    const render = () => {
      const time = Date.now() * 0.0001;
      const mouseVector = new THREE.Vector3(mouse.x * 1000, mouse.y * 500, 0);
      const linePositions = [];

      // Animate particles and check for connections
      for (let i = 0; i < particleCount; i++) {
        const p = tempParticles[i];
        p.z = 250 * Math.sin(p.x * 0.005 + p.y * 0.005 + time);

        // Check for connections to other particles
        for (let j = i + 1; j < particleCount; j++) {
          const p2 = tempParticles[j];
          const distance = p.distanceTo(p2);
          if (distance < maxConnectionDistance) {
            linePositions.push(p.x, p.y, p.z);
            linePositions.push(p2.x, p2.y, p2.z);
          }
        }

        // Apply mouse interaction force
        const distToCursor = p.distanceTo(mouseVector);
        if (distToCursor < maxDistanceToCursor) {
          const force = (maxDistanceToCursor - distToCursor) / maxDistanceToCursor * 0.05;
          p.x += (p.x - mouseVector.x) * force;
          p.y += (p.y - mouseVector.y) * force;
        }

        positionsArray[i * 3] = p.x;
        positionsArray[i * 3 + 1] = p.y;
        positionsArray[i * 3 + 2] = p.z;
      }

      points.geometry.attributes.position.needsUpdate = true;
      lines.geometry.dispose();
      lines.geometry = new THREE.BufferGeometry();
      lines.geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
      
      renderer.render(scene, camera);
    };

    init();
    animate();

    return () => {
      document.removeEventListener('mousemove', onDocumentMouseMove);
      document.removeEventListener('touchmove', onDocumentTouchMove);
      window.removeEventListener('resize', onWindowResize);
      renderer.dispose();
      while(scene.children.length > 0){ 
        scene.remove(scene.children[0]); 
      }
    };
  }, []);

  return (
    <div className="bg-gray-950 text-gray-200 min-h-screen font-sans relative overflow-hidden">
      
      {/* Three.js canvas for the background animation */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0"></canvas>

      {/* Modal for displaying AI description */}
      {modalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950 bg-opacity-70 backdrop-blur-sm">
          <div className="bg-gray-800 rounded-2xl shadow-xl p-8 max-w-2xl w-full relative border border-teal-500">
            <button
              onClick={() => setModalContent(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
            >
              <X size={24} />
            </button>
            <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 mb-4">
              {modalContent.title}
            </h3>
            <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{modalContent.description}</p>
          </div>
        </div>
      )}

      {/* Navigation Header */}
      <header className="fixed top-0 z-50 w-full bg-gray-900 bg-opacity-80 backdrop-blur-md shadow-lg rounded-b-xl">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#" className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
            {portfolioData.name}
          </a>
          <div className="hidden md:flex space-x-8">
            <button
              onClick={() => handleLinkClick('about')}
              className={`hover:text-teal-400 transition duration-300 ${activeLink === 'about' ? 'text-teal-400 font-semibold' : 'text-gray-300'}`}
            >
              About
            </button>
            <button
              onClick={() => handleLinkClick('skills')}
              className={`hover:text-teal-400 transition duration-300 ${activeLink === 'skills' ? 'text-teal-400 font-semibold' : 'text-gray-300'}`}
            >
              Skills
            </button>
            <button
              onClick={() => handleLinkClick('projects')}
              className={`hover:text-teal-400 transition duration-300 ${activeLink === 'projects' ? 'text-teal-400 font-semibold' : 'text-gray-300'}`}
            >
              Projects
            </button>
            <button
              onClick={() => handleLinkClick('contact')}
              className={`hover:text-teal-400 transition duration-300 ${activeLink === 'contact' ? 'text-teal-400 font-semibold' : 'text-gray-300'}`}
            >
              Contact
            </button>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-10 pt-24 space-y-24 relative z-10">

        {/* Hero & About Me Section */}
        <section id="about" className="flex flex-col md:flex-row items-center justify-center text-center md:text-left md:space-x-12">
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-teal-400 shadow-xl mb-6 md:mb-0">
            <img 
              src="https://placehold.co/500x500/0F172A/94A3B8?text=Aditya" 
              alt="Aditya Pandey" 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
              Hello, I'm {portfolioData.name}
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-4">{portfolioData.tagline}</p>
            <p className="text-lg text-gray-300 leading-relaxed">
              {portfolioData.bio}
            </p>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-12">
          <div className="flex items-center justify-center mb-8">
            <Code className="w-10 h-10 text-blue-400 mr-4" />
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              My Skills
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {portfolioData.skills.map((skill, index) => (
              <span key={index} className="bg-gray-800 text-gray-300 py-2 px-5 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 text-sm md:text-base">
                {skill.emoji} {skill.name}
              </span>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-12">
          <div className="flex items-center justify-center mb-8">
            <Laptop className="w-10 h-10 text-teal-400 mr-4" />
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
              My Projects
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioData.projects.map((project) => (
              <div key={project.id} className="bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col hover:shadow-2xl transition-shadow duration-300">
                <h3 className="text-2xl font-semibold mb-2 text-teal-300">{project.title}</h3>
                <p className="text-gray-400 mb-4 flex-grow">{project.description}</p>
                <div className="flex flex-wrap gap-2 text-sm text-gray-500 mb-4">
                  {project.techStack.split(', ').map((tech, index) => (
                    <span key={index} className="bg-gray-700 rounded-full px-3 py-1">{tech}</span>
                  ))}
                </div>
                <div className="flex space-x-4 mt-auto">
                  {project.links.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      className="inline-block bg-blue-500 text-white font-medium py-2 px-6 rounded-full hover:bg-blue-600 transition-colors duration-300 text-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.name}
                    </a>
                  ))}
                  <button
                    onClick={() => getAiDescription(project.title, project.description)}
                    className="inline-block bg-purple-500 text-white font-medium py-2 px-6 rounded-full hover:bg-purple-600 transition-colors duration-300 text-sm"
                    disabled={loading}
                  >
                    {loading ? "Generating..." : "✨ Get AI-Enhanced Description"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-12">
          <div className="flex items-center justify-center mb-8">
            <Mail className="w-10 h-10 text-purple-400 mr-4" />
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              Contact Me
            </h2>
          </div>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-lg text-gray-300 mb-6">
              I'm always open to new opportunities and collaborations. Feel free to reach out to me via email or connect with me on social media.
            </p>
            <a 
              href="mailto:adityapandey0456@gmail.com" 
              className="inline-block bg-pink-500 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-pink-600 transition-colors duration-300"
            >
              Email Me
            </a>
            <div className="flex justify-center space-x-6 mt-8">
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Github size={40} className="hover:scale-110 transition-transform duration-300" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Linkedin size={40} className="hover:scale-110 transition-transform duration-300" />
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-center py-6 text-gray-500 text-sm rounded-t-xl mt-12">
        <p>&copy; 2024 Aditya Pandey. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default App;
