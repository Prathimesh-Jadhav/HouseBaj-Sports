
import running from '../assets/running.jpg'
import fitnessTracker from '../assets/fitnessTracker.webp'
import trainingBands from '../assets/trainingResistanceBands.jpg'
import waterBottle from '../assets/sportsWaterBottle.jpg'
import bag from '../assets/bag.jpg'
import basketBall from '../assets/basketBall.jpg'
import racket from '../assets/racket.jpg'
import yogaMat from '../assets/yogaMat.jpg'
import smartWaterBootle from '../assets/smartWaterBottle.jpg'
import gloves from '../assets/gloves.jpg'
import earbuds from '../assets/earbuds.jpg'
import badminton from '../assets/tennisracket.jpg'
import goggles from '../assets/goggles.jpg'
import batminton2 from '../assets/batminton2.jpg'
import cricket from '../assets/Cricket.jpg'
import swimming from '../assets/swimming.jpg'
import yoga from '../assets/yoga.jpg'
import volleyball from '../assets/volleyball.jpg'
import football from '../assets/football.jpg'
import hockey from '../assets/hockey.jpg'
import cricketBat from '../assets/cricket-bat.jpg'
import nike from '../assets/nike.webp'
import yonex from '../assets/yonex.jpg'
import mikasa from '../assets/mikasa.jpg'
import adidas from '../assets/adidas.jpg'
import hockeyStick from '../assets/hockeyStick.jpg'
import cricketGloves from '../assets/cricketGloves.webp'
import garmin from '../assets/Garmin.jpg'
import manduka from '../assets/manduka.jpg'
import assics from '../assets/kneePads.jpg'

export const categories = [
    {
        id: 1,
        name: 'Cricket',
        image: cricket
    },
    {
        id: 2,
        name: 'Running',
        image: running
    },
    {
        id: 3,
        name: 'Badminton',
        image: batminton2
    },
    {
        id: 4,
        name: 'Swimming',
        image: swimming
    },
    {
        id: 5,
        name: 'Yoga',
        image: yoga
    },
    {
        id: 6,
        name: 'VolleyBall',
        image: volleyball
    },
    {
        id: 7,
        name: 'Football',
        image: football
    },
    {
        id: 8,
        name: 'Hockey',
        image: hockey
    },
]

export const featuredProducts = [
  {
    id: 1,
    name: 'Cricket Bat - PowerPlay Edition',
    image: cricketBat, // Replace with your actual image variable or path
    price: 49.99,
    discount: "10%",
  },
  {
    id: 2,
    name: 'Running Shoes - SpeedX Pro',
    image: running,
    price: 59.99,
    discount: "15%",
  },
  {
    id: 3,
    name: 'Badminton Racket - Smash Master 3000',
    image: batminton2,
    price: 39.99,
    discount: "20%",
  },
  {
    id: 4,
    name: 'Swimming Goggles - Aqua Vision',
    image: goggles,
    price: 24.99,
    discount: "5%",
  },
]

export const testimonials = [
    { name: "Alex Johnson", role: "Marathon Runner", text: "The running accessories I bought from HouseBaj have significantly improved my performance. Quality products worth every penny!"},
    { name: "Sarah Williams", role: "Fitness Trainer", text: "As a professional trainer, I need reliable equipment. HouseBaj delivers exceptional quality that my clients and I can depend on." },
    { name: "Mark Thompson", role: "Basketball Coach", text: "HouseBaj has everything my team needs. From training gear to recovery accessories, they offer premium products that last." }
  ]


    // Sample product data
    export const products = [
      {
        id: 1,
        name: "Pro Cricket Bat",
        price: 59.99,
        category: "Cricket",
        brand: "SS",
        image: cricket,
        badge: "New",
        description: "Grade A English willow bat ideal for professional-level cricket matches."
      },
      {
        id: 2,
        name: "Elite Running Shoes",
        price: 89.99,
        category: "Running",
        brand: "Nike",
        image: nike,
        badge: "Bestseller",
        description: "Lightweight, cushioned running shoes designed for performance and comfort."
      },
      {
        id: 3,
        name: "Professional Badminton Racket",
        price: 49.99,
        category: "Badminton",
        brand: "Yonex",
        image: yonex,
        badge: null,
        description: "Carbon fiber badminton racket with high tension strings for competitive play."
      },
      {
        id: 4,
        name: "Swimming Goggles - Pro Vision",
        price: 24.99,
        category: "Swimming",
        brand: "Speedo",
        image: goggles,
        badge: null,
        description: "Anti-fog goggles with UV protection and wide field of view."
      },
      {
        id: 5,
        name: "Yoga Mat - Ultra Grip",
        price: 35.99,
        category: "Yoga",
        brand: "Lululemon",
        image: yogaMat,
        badge: null,
        description: "Eco-friendly, non-slip yoga mat ideal for all types of practice."
      },
      {
        id: 6,
        name: "Premium Volleyball",
        price: 39.99,
        category: "VolleyBall",
        brand: "Mikasa",
        image: mikasa,
        badge: "Sale",
        description: "Soft touch synthetic leather volleyball designed for indoor and outdoor use."
      },
      {
        id: 7,
        name: "Official Match Football",
        price: 54.99,
        category: "Football",
        brand: "Adidas",
        image: adidas,
        badge: null,
        description: "FIFA approved match football for professional tournaments."
      },
      {
        id: 8,
        name: "Hockey Stick - Xtreme Grip",
        price: 64.99,
        category: "Hockey",
        brand: "Grays",
        image: hockeyStick,
        badge: "New",
        description: "Carbon composite field hockey stick with enhanced grip and control."
      },
      {
        id: 9,
        name: "Cricket Gloves - Pro Series",
        price: 29.99,
        category: "Cricket",
        brand: "SG",
        image: cricketGloves,
        badge: "Bestseller",
        description: "Padded cricket gloves with superior grip and ventilation for long matches."
      },
      {
        id: 10,
        name: "Running Smartwatch",
        price: 109.99,
        category: "Running",
        brand: "Garmin",
        image: garmin,
        badge: "New",
        description: "GPS-enabled smartwatch that tracks pace, distance, and heart rate in real-time."
      },
      {
        id: 11,
        name: "Yoga Block & Strap Set",
        price: 19.99,
        category: "Yoga",
        brand: "Manduka",
        image: manduka,
        badge: null,
        description: "Supportive foam block and adjustable strap combo for improving flexibility and form."
      },
      {
        id: 12,
        name: "Volleyball Knee Pads",
        price: 22.49,
        category: "VolleyBall",
        brand: "ASICS",
        image: assics,
        badge: "Sale",
        description: "Impact-resistant knee pads with breathable mesh fabric for maximum comfort."
      }
      
    ];
    
    export const productDetails = [
      {
        id: 1,
        name: "Pro Cricket Bat",
        price: 99.99,
        category: "Cricket",
        brand: "SG",
        images: [
          cricketBat,
          "/api/placeholder/500/500",
          "/api/placeholder/500/500",
          "/api/placeholder/500/500"
        ],
        colors: ["Natural", "Black", "Red"],
        sizes: ["Short Handle", "Long Handle", "Harrow"],
        rating: 4.9,
        reviews: 143,
        stock: 18,
        description: "Professional English Willow cricket bat ideal for tournament play. Designed for power hitters and precision strokes.",
        features: [
          "Grade 1 English Willow",
          "Thick edges and curved blade",
          "Toe guard for moisture protection",
          "Superior grip and balanced pickup",
          "Pre-knocked and ready to play"
        ],
        specifications: {
          "Material": "English Willow",
          "Weight": "2.7 lbs",
          "Grip": "Rubber",
          "Handle Type": "Short Handle",
          "Recommended Use": "Professional Matches"
        }
      },
      {
        id: 2,
        name: "High-Speed Running Shoes",
        price: 79.99,
        category: "Running",
        brand: "Nike",
        images: [
          running,
          "/api/placeholder/500/500",
          "/api/placeholder/500/500"
        ],
        colors: ["Blue", "Grey", "Neon Green"],
        sizes: ["UK 7", "UK 8", "UK 9", "UK 10"],
        rating: 4.8,
        reviews: 203,
        stock: 30,
        description: "Engineered for speed and cushioning, perfect for daily runs or marathons.",
        features: [
          "Breathable mesh upper",
          "Lightweight foam midsole",
          "Non-slip rubber outsole",
          "Reflective elements for visibility",
          "Arch support for long-distance comfort"
        ],
        specifications: {
          "Material": "Mesh + EVA",
          "Weight": "250g",
          "Heel-to-Toe Drop": "8mm",
          "Cushioning": "Responsive foam",
          "Recommended Use": "Road Running"
        }
      },
      {
        id: 3,
        name: "Professional Badminton Racket",
        price: 54.99,
        category: "Badminton",
        brand: "Yonex",
        images: [
          yonex,
          "/api/placeholder/500/500",
          "/api/placeholder/500/500"
        ],
        colors: ["Black/Red", "Blue/Silver"],
        sizes: ["G4 - 3U", "G5 - 4U"],
        rating: 4.6,
        reviews: 97,
        stock: 20,
        description: "Lightweight and powerful badminton racket with high-tension string support.",
        features: [
          "Graphite shaft with isometric head shape",
          "Built-in T-Joint for stability",
          "Aerodynamic frame for fast swings",
          "Enhanced control with textured grip",
          "Includes full-length cover"
        ],
        specifications: {
          "Weight": "85g (3U)",
          "String Tension": "Up to 30 lbs",
          "Balance": "Even",
          "Frame Material": "Graphite",
          "Recommended Use": "Intermediate to Advanced"
        }
      }
    ];
    