// Resume Image
import resumePng1 from './project-files/Julius-Sale-Resume-pg1.png';
import resumePng2 from './project-files/Julius-Sale-Resume-pg2.png';

// Nature Images
import coulonImg from './project-files/nature/coulon.jpg';
import hawaiiImg from './project-files/nature/hawaii.jpg';
import ranierImg from './project-files/nature/ranier.jpg';
import oregonImg from './project-files/nature/oregon.jpg';
import rustonImg from './project-files/nature/ruston.jpg';
import blancaImg from './project-files/nature/blanca.jpg';

// DK Project Images
// import dk1Image from './project-files/dk-images/DK1.png';
// import dk2Image from './project-files/dk-images/DK2.png';
// import dk3Image from './project-files/dk-images/DK3.png';

// Web Project Images
import homepageImg from './project-files/web-project/homepage.png';
import aboutMeImg from './project-files/web-project/aboutMe.png';
import projectsImg from './project-files/web-project/projects.png';
import contactImg from './project-files/web-project/contact.png';

// Capstone Project Images
import vr1Image from './project-files/capstone-images/VR1.png';
import vr2Image from './project-files/capstone-images/VR2.png';
import vr3Image from './project-files/capstone-images/VR3.png';
import vr4Image from './project-files/capstone-images/VR4.png';
import vr5Image from './project-files/capstone-images/VR5.png';
import vr6Image from './project-files/capstone-images/VR6.png';
import vr7Image from './project-files/capstone-images/VR7.png';
import vr8Image from './project-files/capstone-images/VR8.png';

export const aboutMeGallery = [
  { 
    src: coulonImg, 
    alt: 'Sunset view over the water at Gene Coulon Memorial Beach Park in Renton, WA' 
  },
  {
    src: hawaiiImg, 
    alt: 'Aerial view of the coastline and mountains of Maui, Hawaii'
  },
  { 
    src: ranierImg, 
    alt: 'Above clouds sunset at Mount Rainier Sunset point' 
  },
  { 
    src: oregonImg, 
    alt: 'The sea coast at Seaside in Oregon' 
  },
  { 
    src: rustonImg, 
    alt: 'The Ruston Point ship vessel at Ruston in Tacoma, WA' 
  },
  { 
    src: blancaImg, 
    alt: 'The vibrant turquoise water of Blanca Lake in the Cascade mountains' 
  }
];

export const projects = [
  // {
  //   id: 1,
  //   title: "PE project",
  //   description: "Another project",
  //   imageUrls: [
  //       "https://placehold.co/600x400/8d82c4/ffffff?text=PE+Image+1",
  //       "https://placehold.co/600x400/8d82c4/ffffff?text=PE+Image+2",
  //       "https://placehold.co/600x400/8d82c4/ffffff?text=PE+Image+3",
  //   ],
  //   liveUrl: "#",
  //   repoUrl: "https://github.com/rPhoenix10"
  // },
  {
    id: 1,
    title: "Ancora Training Portfolio",
    description: "This personal portfolio website, built with React and modern CSS, showcases the skills I developed during the Ancora Training program.",
    imageUrls: [
        homepageImg,
        aboutMeImg,
        projectsImg,
        contactImg,
    ],
    repoUrl: "https://github.com/rPhoenix10/rphoenix10.github.io"
  },

  {
    id: 2,
    title: "Virtual Keys (Capstone Project)",
    description: "A collaborative web application developed as a capstone project at Bellevue College, focusing on secure digital asset management.",
    imageUrls: [
        vr1Image,
        vr2Image,
        vr3Image,
        vr4Image,
        vr5Image,
        vr6Image,
        vr7Image,
        vr8Image,
    ],
    repoUrl: "https://github.com/rPhoenix10/Capstone"
  },
];

export const personalInfo = {
  name: 'Julius Sale',
  tagline: 
    'Nature Lover. Code Enthusiast.|Crafting Web & App Solutions.|Junior Software Engineer.'
};

export const aboutMe = {
  paragraphs: [
    "I am a Junior Software Developer based in Kent, WA, holding a Bachelor of Science in Computer Science from Bellevue College. My foundation is built upon formal study in Data Structures, Algorithms, and Object-Oriented Programming (C/C++, Python), complemented by practical application skills in modern development and React from the Ancora Training program.",

    "I thrive on technical challenges and applied my expertise in System Integration as a contributor to the complex Digital Keys VR Capstone project. I am eager to apply my comprehensive skills in a professional setting and contribute to impactful solutions in Systems, Backend, or specialized engineering environments."
  ]
};

export const github = {
  username: 'rPhoenix10'
};

export const links = {
  github: 'https://github.com/rPhoenix10',
  linkedin: 'https://www.linkedin.com/in/kim-julius-sale-0722531a0/',
  resumePdf: `./Julius-Sale-Resume.pdf`,
  resumePng: [resumePng1, resumePng2]
};

