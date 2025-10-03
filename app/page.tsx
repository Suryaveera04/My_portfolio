"use client"

import { useEffect, useState, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Float, Environment } from "@react-three/drei"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Mail,
  Phone,
  Linkedin,
  MapPin,
  Calendar,
  Award,
  Code,
  GraduationCap,
  Trophy,
  Star,
  ExternalLink,
  Download,
  User,
  Briefcase,
  BookOpen,
  Target,
  Globe,
  Heart,
} from "lucide-react"
import type * as THREE from "three"

// Interactive floating / hover-reactive mesh
function InteractiveShape({
  position,
  color,
  shape = "box",
}: {
  position: [number, number, number]
  color: string
  shape?: "box" | "sphere" | "octahedron"
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  // Animate rotation & hover scale
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
      meshRef.current.scale.setScalar(hovered ? 1.25 : 1)
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* Choose geometry */}
        {shape === "box" && <boxGeometry args={[0.8, 0.8, 0.8]} />}
        {shape === "sphere" && <sphereGeometry args={[0.5, 32, 32]} />}
        {shape === "octahedron" && <octahedronGeometry args={[0.6]} />}
        {/* Material */}
        <meshStandardMaterial
          color={color}
          emissive={hovered ? color : "#000000"}
          emissiveIntensity={hovered ? 0.35 : 0}
        />
      </mesh>
    </Float>
  )
}

function Enhanced3DScene() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
        <Environment preset="night" />
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff6b6b" />

        <InteractiveShape position={[-4, 3, -2]} color="#ff6b6b" shape="box" />
        <InteractiveShape position={[4, -2, -1]} color="#4ecdc4" shape="sphere" />
        <InteractiveShape position={[2, 4, -3]} color="#45b7d1" shape="octahedron" />
        <InteractiveShape position={[-3, -3, -2]} color="#f9ca24" shape="box" />
        <InteractiveShape position={[5, 1, -4]} color="#6c5ce7" shape="sphere" />
        <InteractiveShape position={[-2, 0, -5]} color="#fd79a8" shape="octahedron" />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  )
}

// Animated background particles
function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null)

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  const particleCount = 100
  const positions = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20
  }

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#ffffff" transparent opacity={0.6} />
    </points>
  )
}

export default function DynamicPortfolio() {
  const [colorPhase, setColorPhase] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const [activeSection, setActiveSection] = useState("hero")

  // Enhanced dynamic color system
  useEffect(() => {
    const interval = setInterval(() => {
      setColorPhase((prev) => (prev + 0.5) % 360)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Dynamic gradient based on time and mouse position
  const dynamicGradient = `linear-gradient(${colorPhase + mousePosition.x * 45}deg, 
    hsl(${(colorPhase + 0) % 360}, 70%, 60%), 
    hsl(${(colorPhase + 120) % 360}, 70%, 60%), 
    hsl(${(colorPhase + 240) % 360}, 70%, 60%))`

  const interactiveTransform = `translate(${mousePosition.x * 5}px, ${mousePosition.y * 5}px) scale(${1 + Math.abs(mousePosition.x) * 0.02})`

  // Resume data
  const resumeData = {
    personal: {
      name: "MAYAKUNTLA SURYAVEERA",
      title: "Computer Science & Engineering Student",
      email: "suryaveera0427@gmail.com",
      phone: "+91 9483757825",
      linkedin: "https://linkedin.com/in/surya-veera-1659162ba",
      location: "Hindupur, Andhra Pradesh, India",
      dob: "04/05/2005",
    },
    summary:
      "My goal is to secure a position in an organization where I could apply my skills in project management and contribute to the company's growth.",
    education: [
      {
        degree: "Bachelor of Technology - Computer Science & Engineering (Networks)",
        institution: "Madanapalle Institute of Technology & Science",
        location: "Kadiri Road, Andhra Pradesh",
        period: "2023-2027",
        score: "8.8 CGPA",
        progress: 50,
      },
      {
        degree: "Intermediate (CBSE)",
        institution: "Sri Chaitanya Techno School",
        location: "HSR Layout, Bangalore, Karnataka",
        period: "2021-2023",
        score: "76%",
        progress: 76,
      },
      {
        degree: "Matriculation (SSC)",
        institution: "LRG Vidyalayam",
        location: "Hindupur, Andhra Pradesh",
        period: "2020-2021",
        score: "98%",
        progress: 98,
      },
    ],
    skills: {
      os: ["Windows", "Linux", "Mac OS"],
      languages: ["C", "Python", "HTML","CSS", "Java Script", "Java"],
      databases: ["SQL", "PHP"],
      interests: ["Computer Networks", "Web Development"],
    },
    interpersonal: [
      "Team Leadership",
      "Management & Coordination",
      "Decision Making & Analytical Skills",
      "Speaking and Writing Skills",
    ],
    languages: ["English", "Telugu", "Hindi", "Kannada"],
    hobbies: ["Reading", "Writing", "Gaming"],
    achievements: [
      "First prize at EPICS-2K24, College level technical Quiz (March 28, 2024)",
      "Orange Belt in Karate",
      "Student coordinator for E-Sports event in AIMEX-2K25",
      "Organized events related to Fashion in 2024",
    ],
    certifications: [
      "Veltech University Project Expo",
      "IoT Workshop Certificate",
      "NPTEL - Effective Writing",
      "NPTEL - German-1",
      "NASSCOM Digital 101",
      "Cyber Security Essentials & Digital Defence",
      "Gen-AI and Product Building from Idea to Deployment",
      "Cisco Certifiaction on Network Essential"
    ],
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Enhanced 3D Background */}
      <Enhanced3DScene />

      {/* Particle Field */}
      <div className="fixed inset-0 -z-5">
        <Canvas>
          <ParticleField />
        </Canvas>
      </div>

      {/* Dynamic gradient overlay */}
      <div
        className="fixed inset-0 opacity-10 -z-5 transition-all duration-1000"
        style={{ background: dynamicGradient }}
      />

      {/* Floating Navigation */}
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-black/20 backdrop-blur-md rounded-full px-6 py-3 border border-white/10">
          <div className="flex space-x-6">
           
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 space-y-16">
        {/* Hero Section */}
        <section id="hero" className="min-h-screen flex items-center justify-center text-center">
          <div className="transform transition-all duration-500 ease-out" style={{ transform: interactiveTransform }}>
            <div className="mb-8">
              <h1 className="text-4xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent animate-pulse">
                {resumeData.personal.name}
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 font-light">{resumeData.personal.title}</p>
            </div>

            {/* Interactive Contact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 max-w-4xl mx-auto">
              <Card className="bg-black/30 backdrop-blur-md border-purple-500/30 hover:border-purple-500/60 transition-all duration-500 transform hover:scale-105 hover:rotate-1">
                <CardContent className="p-6 text-center">
                  <Mail className="w-8 h-8 mx-auto mb-3 text-purple-400" />
                  <p className="text-gray-300 text-sm">{resumeData.personal.email}</p>
                </CardContent>
              </Card>

              <Card className="bg-black/30 backdrop-blur-md border-blue-500/30 hover:border-blue-500/60 transition-all duration-500 transform hover:scale-105">
                <CardContent className="p-6 text-center">
                  <Phone className="w-8 h-8 mx-auto mb-3 text-blue-400" />
                  <p className="text-gray-300 text-sm">{resumeData.personal.phone}</p>
                </CardContent>
              </Card>

              <Card className="bg-black/30 backdrop-blur-md border-green-500/30 hover:border-green-500/60 transition-all duration-500 transform hover:scale-105 hover:-rotate-1">
                <CardContent className="p-6 text-center">
                  <a
                    href={resumeData.personal.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:scale-110 transition-transform duration-300"
                  >
                    <Linkedin className="w-8 h-8 mx-auto mb-3 text-green-400" />
                    <p className="text-gray-300 text-sm flex items-center justify-center">
                      LinkedIn Profile
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </p>
                  </a>
                </CardContent>
              </Card>
            </div>

            <div className="flex items-center justify-center text-gray-400 mb-8">
              <MapPin className="w-5 h-5 mr-2" />
              <span>{resumeData.personal.location}</span>
            </div>

           
          </div>
        </section>

        {/* Professional Summary */}
        <section id="" className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              About Me
            </h2>
          </div>

          <Card className="bg-black/30 backdrop-blur-md border-purple-500/30 hover:border-purple-500/60 transition-all duration-500 transform hover:scale-105 max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl text-purple-400 flex items-center justify-center">
                <User className="w-6 h-6 mr-2" />
                Professional Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-lg leading-relaxed text-center">{resumeData.summary}</p>

              {/* Personal Details */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center">
                  <h4 className="text-purple-400 font-semibold mb-2">Date of Birth</h4>
                  <p className="text-gray-300">{resumeData.personal.dob}</p>
                </div>
                <div className="text-center">
                  <h4 className="text-purple-400 font-semibold mb-2">Current Focus</h4>
                  <p className="text-gray-300">Project Management & Growth</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Education Section */}
        <section id="education" className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Education Journey
            </h2>
          </div>

          <div className="space-y-8">
            {resumeData.education.map((edu, index) => (
              <Card
                key={index}
                className="bg-black/30 backdrop-blur-md border-gray-500/30 hover:border-gray-500/60 transition-all duration-500 transform hover:scale-105 hover:rotate-1"
              >
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">{edu.degree}</h3>
                      <p className="text-gray-300 mb-2 text-lg">{edu.institution}</p>
                      <p className="text-gray-400 mb-4">{edu.location}</p>

                      <div className="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-4 md:space-y-0">
                        <div className="flex items-center text-gray-400">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>{edu.period}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-yellow-400 font-semibold">{edu.score}</span>
                          <div className="flex-1 min-w-32">
                            <Progress value={edu.progress} className="h-2" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
              Technical Skills
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                category: "Operating Systems",
                skills: resumeData.skills.os,
                color: "from-red-500 to-pink-500",
                icon: <Globe className="w-6 h-6" />,
              },
              {
                category: "Programming Languages",
                skills: resumeData.skills.languages,
                color: "from-blue-500 to-purple-500",
                icon: <Code className="w-6 h-6" />,
              },
              {
                category: "Databases",
                skills: resumeData.skills.databases,
                color: "from-green-500 to-teal-500",
                icon: <BookOpen className="w-6 h-6" />,
              },
              {
                category: "Interests",
                skills: resumeData.skills.interests,
                color: "from-yellow-500 to-orange-500",
                icon: <Target className="w-6 h-6" />,
              },
            ].map((skillGroup, index) => (
              <Card
                key={index}
                className="bg-black/30 backdrop-blur-md border-gray-500/30 hover:border-gray-500/60 transition-all duration-500 transform hover:scale-110 hover:rotate-3"
              >
                <CardHeader>
                  <CardTitle
                    className={`text-lg bg-gradient-to-r ${skillGroup.color} bg-clip-text text-transparent flex items-center`}
                  >
                    {skillGroup.icon}
                    <span className="ml-2">{skillGroup.category}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {skillGroup.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"></div>
                        <span className="text-gray-300">{skill}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Interpersonal Skills */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-black/30 backdrop-blur-md border-green-500/30 hover:border-green-500/60 transition-all duration-500 transform hover:scale-105">
              <CardHeader>
                <CardTitle className="text-xl text-green-400 flex items-center">
                  <Briefcase className="w-6 h-6 mr-2" />
                  Interpersonal Skills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-3">
                  {resumeData.interpersonal.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 rounded-lg bg-green-500/10 hover:bg-green-500/20 transition-colors"
                    >
                      <Star className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">{skill}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/30 backdrop-blur-md border-pink-500/30 hover:border-pink-500/60 transition-all duration-500 transform hover:scale-105">
              <CardHeader>
                <CardTitle className="text-xl text-pink-400 flex items-center">
                  <Heart className="w-6 h-6 mr-2" />
                  Languages & Interests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 mb-3">Languages Known</h4>
                    <div className="flex flex-wrap gap-2">
                      {resumeData.languages.map((lang, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="border-pink-500/50 text-pink-300 hover:bg-pink-500/20 transition-colors"
                        >
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 mb-3">Hobbies</h4>
                    <div className="flex flex-wrap gap-2">
                      {resumeData.hobbies.map((hobby, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="border-purple-500/50 text-purple-300 hover:bg-purple-500/20 transition-colors"
                        >
                          {hobby}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Achievements & Certifications */}
        <section id="achievements" className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Achievements & Certifications
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Achievements */}
            <Card className="bg-black/30 backdrop-blur-md border-yellow-500/30 hover:border-yellow-500/60 transition-all duration-500 transform hover:scale-105">
              <CardHeader>
                <CardTitle className="text-2xl text-yellow-400 flex items-center">
                  <Trophy className="w-8 h-8 mr-3" />
                  Academic & Personal Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {resumeData.achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-4 rounded-lg bg-yellow-500/10 hover:bg-yellow-500/20 transition-colors"
                    >
                      <Award className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                      <p className="text-gray-300 leading-relaxed">{achievement}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card className="bg-black/30 backdrop-blur-md border-blue-500/30 hover:border-blue-500/60 transition-all duration-500 transform hover:scale-105">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-400 flex items-center">
                  <Award className="w-8 h-8 mr-3" />
                  Professional Certifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-3">
                  {resumeData.certifications.map((cert, index) => (
                    <div
                      key={index}
                      className="p-3 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 transition-colors border-l-4 border-blue-400"
                    >
                      <p className="text-gray-300 text-sm">{cert}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Enhanced Footer */}
        <footer className="py-16">
          <div className="bg-black/40 backdrop-blur-md rounded-2xl p-12 border border-gray-500/30 text-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Let's Build Something Amazing Together!
            </h3>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Ready to contribute to innovative projects and grow together. Let's connect and explore opportunities!
            </p>

            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6 mb-8">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-8 py-3 rounded-full transform hover:scale-105 transition-all duration-300"
              >
                <Mail className="w-5 h-5 mr-2" />
                Get In Touch
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-blue-500/50 text-blue-400 hover:bg-blue-500/20 bg-transparent font-semibold px-8 py-3 rounded-full transform hover:scale-105 transition-all duration-300"
                onClick={() => window.open(resumeData.personal.linkedin, "_blank")}
              >
                <Linkedin className="w-5 h-5 mr-2" />
                Connect on LinkedIn
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <div className="border-t border-gray-500/30 pt-8">
              <p className="text-gray-400 text-sm">
                © 2024 {resumeData.personal.name}. Crafted with passion and innovation.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
