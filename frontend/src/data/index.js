import gymImg from '../assets/gym.jpg'
import cycling from '../assets/cycling.jpg'
import running from '../assets/running.jpg'
import teamsports from '../assets/teamsports.webp'
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

export const categories = [
    {
        id: 1,
        name: 'Fitness',
        image: gymImg
    },
    {
        id: 2,
        name: 'Running',
        image: cycling
    },
    {
        id: 3,
        name: 'Cycling',
        image: running
    },
    {
        id: 4,
        name: 'Team Sports',
        image: teamsports
    },
]

export const  featuredProducts = [
  {
    id: 1,
    name: 'Pro Fitness Tracker',
    image: fitnessTracker,
    price: 19.99,
    discount: "10%",
  },
  {
    id: 2,
    name: 'Premium Water Bottle',
    image: waterBottle,
    price: 29.99,
    discount: "20%",
  },
  {
    id: 3,
    name: 'Training Resistance Bands',
    image: trainingBands,
    price: 32.99,
    discount: "15%",
  },
  {
    id: 4,
    name: 'Elite Sports Backpack',
    image: bag,
    price: 89.99,
    discount: "5%",
  }
]

export const testimonials = [
    { name: "Alex Johnson", role: "Marathon Runner", text: "The running accessories I bought from HouseBaj have significantly improved my performance. Quality products worth every penny!"},
    { name: "Sarah Williams", role: "Fitness Trainer", text: "As a professional trainer, I need reliable equipment. HouseBaj delivers exceptional quality that my clients and I can depend on." },
    { name: "Mark Thompson", role: "Basketball Coach", text: "HouseBaj has everything my team needs. From training gear to recovery accessories, they offer premium products that last." }
  ]


    // Sample product data
 export  const products = [
      {
        id: 1,
        name: "Pro Training Basketball",
        price: 49.99,
        category: "Basketball",
        brand: "Nike",
        image: basketBall,
        badge: "New",
        description: "Professional-grade training basketball with superior grip and durability."
      },
      {
        id: 2,
        name: "Premium Tennis Racket",
        price: 129.99,
        category: "Tennis",
        brand: "Wilson",
        image: racket,
        badge: "Bestseller",
        description: "Tournament-level tennis racket with carbon fiber frame for power and control."
      },
      {
        id: 3,
        name: "Ultra Grip Yoga Mat",
        price: 35.99,
        category: "Yoga",
        brand: "Lululemon",
        image: yogaMat,
        badge: null,
        description: "Extra thick yoga mat with non-slip surface for stability during practice."
      },
      {
        id: 4,
        name: "Smart Water Bottle",
        price: 24.99,
        category: "Accessories",
        brand: "HydroFlask",
        image: smartWaterBootle,
        badge: null,
        description: "Insulated water bottle that keeps drinks cold for 24 hours or hot for 12 hours."
      },
      {
        id: 5,
        name: "Performance Gym Gloves",
        price: 29.99,
        category: "Training",
        brand: "Under Armour",
        image: gloves,
        badge: null,
        description: "Breathable gym gloves with padded palm for enhanced grip and comfort."
      },
      {
        id: 6,
        name: "Wireless Sport Earbuds",
        price: 89.99,
        category: "Electronics",
        brand: "Beats",
        image: earbuds,
        badge: "Sale",
        description: "Sweat-resistant wireless earbuds with 8-hour battery life for intense workouts."
      },
      {
        id: 7,
        name: "Professional Badminton Set",
        price: 59.99,
        category: "Badminton",
        brand: "Yonex",
        image: badminton,
        badge: null,
        description: "Complete badminton set with 4 rackets, shuttlecocks, and carrying case."
      },
      {
        id: 8,
        name: "Swimming Goggles",
        price: 19.99,
        category: "Swimming",
        brand: "Speedo",
        image: goggles,
        badge: null,
        description: "Anti-fog swimming goggles with UV protection and adjustable strap."
      },
      {
        id: 9,
        name: "Carbon Fiber Tennis Racket",
        price: 149.99,
        category: "Tennis",
        brand: "Babolat",
        image: badminton,
        badge: "New",
        description: "Lightweight carbon fiber tennis racket for advanced players."
      },
      {
        id: 10,
        name: "Pro Basketball Shoes",
        price: 129.99,
        category: "Basketball",
        brand: "Nike",
        image: "/api/placeholder/300/300",
        badge: null,
        description: "High-performance basketball shoes with ankle support and cushioned sole."
      },
      {
        id: 11,
        name: "Compression Running Shorts",
        price: 34.99,
        category: "Training",
        brand: "Under Armour",
        image: "/api/placeholder/300/300",
        badge: "Sale",
        description: "Moisture-wicking compression shorts with reflective details for visibility."
      },
      {
        id: 12,
        name: "Fitness Tracker Watch",
        price: 99.99,
        category: "Electronics",
        brand: "Garmin",
        image: "/api/placeholder/300/300",
        badge: null,
        description: "Waterproof fitness tracker with heart rate monitor and sleep tracking."
      }
    ];

    export const productDetails = [
      {
        id: 1,
        name: "Pro Training Basketball",
        price: 49.99,
        category: "Basketball",
        brand: "Nike",
        images: [
          basketBall,
          "/api/placeholder/500/500",
          "/api/placeholder/500/500",
          "/api/placeholder/500/500"
        ],
        colors: ["Orange", "Black", "Blue"],
        sizes: ["Size 5", "Size 6", "Size 7"],
        rating: 4.8,
        reviews: 124,
        stock: 25,
        description: "Professional-grade training basketball with superior grip and durability. Perfect for both indoor and outdoor courts, this ball delivers consistent performance in all conditions.",
        features: [
          "Premium composite leather cover",
          "Deep channel design for superior ball control",
          "Suitable for indoor and outdoor use",
          "Official size and weight",
          "Advanced moisture-wicking technology"
        ],
        specifications: {
          "Material": "Composite Leather",
          "Weight": "22 oz",
          "Recommended Use": "Indoor/Outdoor",
          "Inflation": "8-10 PSI",
          "Official Size": "Size 7 (29.5\")"
        }
      },
      {
        id: 2,
        name: "Premium Tennis Racket",
        price: 129.99,
        category: "Tennis",
        brand: "Wilson",
        images: [
          racket,
          badminton,
          batminton2
        ],
        colors: ["Black/Green", "White/Blue", "Red/Black"],
        sizes: ["27 inches", "27.5 inches", "28 inches"],
        rating: 4.6,
        reviews: 89,
        stock: 12,
        description: "Tournament-level tennis racket with carbon fiber frame for power and control.",
        features: [
          "Carbon fiber construction for optimal power",
          "Vibration dampening technology",
          "Ergonomic grip for comfort",
          "Large sweet spot for forgiveness",
          "Includes protective cover"
        ],
        specifications: {
          "Head Size": "100 sq. inches",
          "Weight": "10.4 oz",
          "Length": "27 inches",
          "Balance": "4 pts HL",
          "String Pattern": "16x19"
        }
      },
      {
        id: 3,
        name: "Ultra Grip Yoga Mat",
        price: 35.99,
        category: "Yoga",
        brand: "Lululemon",
        images: [
          racket,
          badminton,
          "/api/placeholder/500/500"
        ],
        colors: ["Purple", "Black", "Blue", "Green"],
        sizes: ["Standard", "Extra Long"],
        rating: 4.7,
        reviews: 210,
        stock: 43,
        description: "Extra thick yoga mat with non-slip surface for stability during practice.",
        features: [
          "6mm thickness for joint protection",
          "Non-slip texture on both sides",
          "Eco-friendly TPE material",
          "Easy to clean and maintain",
          "Includes carrying strap"
        ],
        specifications: {
          "Material": "TPE (Thermoplastic Elastomer)",
          "Thickness": "6mm",
          "Length": "72 inches",
          "Width": "24 inches",
          "Weight": "2.5 lbs"
        }
      }
    ];