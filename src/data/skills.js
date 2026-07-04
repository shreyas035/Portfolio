import {
  SiPython, SiJavascript, SiCplusplus,
  SiReact, SiHtml5, SiTailwindcss, SiFlutter,
  SiGit, SiGithub,
  SiPostgresql, SiMysql, SiMongodb,
  SiPostman, SiTensorflow, SiPytorch, SiOpencv,
} from "react-icons/si";
import { FaRobot, FaDatabase, FaCode, FaCss3Alt, FaBrain, FaEye, FaJava } from "react-icons/fa";

export const skillCategories = [
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    icon: "🧠",
    color: "#06b6d4",
    gradient: "linear-gradient(135deg, #06b6d4, #3b82f6)",
    skills: [
      { name: "Machine Learning", level: 88, icon: FaBrain, color: "#06b6d4" },
      { name: "Computer Vision", level: 85, icon: FaEye, color: "#3b82f6" },
      { name: "OpenCV", level: 90, icon: SiOpencv, color: "#5c3df5" },
      { name: "Deep Learning", level: 80, icon: FaBrain, color: "#ec4899" },
      { name: "TensorFlow / Keras", level: 78, icon: SiTensorflow, color: "#FF6F00" },
      { name: "PyTorch", level: 75, icon: SiPytorch, color: "#EE4C2C" },
    ],
  },
  {
    id: "languages",
    title: "Programming Languages",
    icon: "💻",
    color: "#6366f1",
    gradient: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    skills: [
      { name: "Python", level: 90, icon: SiPython, color: "#3776AB" },
      { name: "Java", level: 75, icon: FaJava, color: "#ED8B00" },
      { name: "C++", level: 80, icon: SiCplusplus, color: "#00599C" },
      { name: "JavaScript", level: 75, icon: SiJavascript, color: "#F7DF1E" },
      { name: "C", level: 70, icon: FaCode, color: "#A8B9CC" },
    ],
  },
  {
    id: "robotics",
    title: "Robotics & IoT",
    icon: "🤖",
    color: "#10b981",
    gradient: "linear-gradient(135deg, #10b981, #059669)",
    skills: [
      { name: "Arduino IDE", level: 85, icon: FaRobot, color: "#00979D" },
      { name: "ESP32 Systems", level: 80, icon: FaRobot, color: "#E7352C" },
      { name: "PID Controllers", level: 78, icon: FaRobot, color: "#10b981" },
      { name: "UAV Design", level: 70, icon: FaRobot, color: "#3b82f6" },
    ],
  },
  {
    id: "frontend",
    title: "Frontend Development",
    icon: "🎨",
    color: "#ec4899",
    gradient: "linear-gradient(135deg, #ec4899, #f43f5e)",
    skills: [
      { name: "React.js", level: 72, icon: SiReact, color: "#61DAFB" },
      { name: "Flutter", level: 65, icon: SiFlutter, color: "#02569B" },
      { name: "HTML5", level: 85, icon: SiHtml5, color: "#E34F26" },
      { name: "CSS3", level: 80, icon: FaCss3Alt, color: "#1572B6" },
      { name: "Tailwind CSS", level: 70, icon: SiTailwindcss, color: "#06B6D4" },
    ],
  },
  {
    id: "tools",
    title: "DevOps & Tools",
    icon: "🔧",
    color: "#8b5cf6",
    gradient: "linear-gradient(135deg, #8b5cf6, #6366f1)",
    skills: [
      { name: "Git", level: 85, icon: SiGit, color: "#F05032" },
      { name: "GitHub", level: 88, icon: SiGithub, color: "#ffffff" },
      { name: "VS Code", level: 90, icon: FaCode, color: "#007ACC" },
      { name: "Postman", level: 75, icon: SiPostman, color: "#FF6C37" },
      { name: "Databases (SQL/NoSQL)", level: 78, icon: FaDatabase, color: "#336791" },
    ],
  },
];
