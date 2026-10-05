
export interface ServiceImage {
  src: string;
  alt: string;
}

export interface Service {
  id: string;

  /** URL segment used by /services/[slug] */
  slug: string;

  number: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  alt: string;
  scopeList: string[];

  /** Editorial gallery for the detail page — one feature image + two supporting */
  gallery: ServiceImage[];
  video?: {
    src: string;
    poster: string;
    title: string;
    description: string;
  };

  href: string;
  detailedDescription: string;
  featuredImage: string;
}

export const servicesData: Service[] = [
  {
    id: "architecture",
    slug: "architecture-planning",
    number: "01",
    title: "Architecture & Planning",
    subtitle:
      "Complete Building Design · Blueprints · Site Planning",
    description:
      "Complete architectural services from concept to construction drawings. We design residential, commercial, and public buildings with full technical documentation, structural planning, and regulatory approvals.",
    image: "/images/planer-3.png",
    alt: "Architectural planning models and blueprints on design desk",

    scopeList: [
      "Complete building design & architecture",
      "Structural engineering plans",
      "Site planning & layout drawings",
      "Electrical & plumbing layouts",
      "Building permits & approvals",
      "3D visualization & renders",
    ],

    gallery: [
      {
        src: "/images/planer-3.png",
        alt: "Architectural planning model and drawings",
      },
      {
        src: "/images/planer-2.jpg",
        alt: "Architects coordinating on-site with blueprints",
      },
      {
        src: "/images/planer-4.png",
        alt: "Construction team reviewing architectural plans",
      },
      {
        src: "/images/planer-1.webp",
        alt: "Architectural drawing and technical documentation",
      },
      {
        src: "/images/front elevation.jpg",
        alt: "Building front elevation design",
      },
      {
        src: "/images/front-elevation.avif",
        alt: "Detailed architectural elevation",
      },
    ],

    video: {
      src: "/videos/approach-interior.mp4",
      poster: "/images/planer-3.png",
      title: "Architecture Planning Process",
      description:
        "From concept sketches to complete blueprints — our full architectural planning workflow.",
    },

    href: "/services/architecture-planning",

    detailedDescription:
      "We provide complete architectural services for all types of buildings. Our team creates detailed blueprints, structural plans, and technical drawings that serve as the foundation for successful construction. Whether it's a new home, office building, or commercial space, we handle everything from initial design concepts to final construction documentation and regulatory approvals.",

    featuredImage: "/images/planer-3.png",
  },

  {
    id: "construction",
    slug: "precision-construction",
    number: "02",
    title: "Construction & Building",
    subtitle:
      "Full Construction · Structural Work · Site Management",
    description:
      "Complete construction services from foundation to finishing. Our experienced workers handle all aspects of building construction including structural work, masonry, concrete, roofing, and site management.",
    image: "/images/const-3.png",
    alt: "Construction workers on site with structural frame and concrete works",

    scopeList: [
      "Complete building construction",
      "Foundation & structural work",
      "Masonry & brickwork",
      "Concrete work & finishing",
      "Roofing & waterproofing",
      "Site supervision & management",
    ],

    gallery: [
      {
        src: "/images/const-3.png",
        alt: "Construction workers on multi-storey building site",
      },
      {
        src: "/images/const-2.png",
        alt: "Foundation reinforcement and concrete pouring by workers",
      },
      {
        src: "/images/const-5.png",
        alt: "Masonry workers on residential construction",
      },
      {
        src: "/images/const-6.png",
        alt: "Site preparation and foundation layout team",
      },
    ],

    video: {
      src: "/videos/video.mp4",
      poster: "/images/const-3.png",
      title: "Construction Process",
      description: "See our construction team in action — from foundation to finishing.",
    },

    href: "/services/precision-construction",

    detailedDescription:
      "Our construction division delivers complete building services with skilled workers and professional site management. From laying foundations to final finishing touches, we handle every aspect of construction with precision and quality. Our team includes experienced masons, carpenters, electricians, and plumbers working together to bring architectural designs to reality.",

    featuredImage: "/images/const-3.png",
  },

  {
    id: "renovation",
    slug: "home-renovation",
    number: "03",
    title: "Home Renovation",
    subtitle:
      "Complete Home Makeover · Interior Remodeling · Modernization",
    description:
      "Complete home renovation services including interior remodeling, kitchen and bathroom upgrades, electrical and plumbing work, flooring, painting, and complete home modernization.",
    image: "/images/planer-1.webp",
    alt: "Home renovation showing completed interior with modern finishes",

    scopeList: [
      "Complete home renovation",
      "Kitchen remodeling & upgrades",
      "Bathroom renovation",
      "Electrical & plumbing updates",
      "Flooring installation",
      "Painting & finishing",
    ],

    gallery: [
      {
        src: "/images/interior-design.jpg",
        alt: "Renovated living room with modern finishes",
      },
      {
        src: "/images/interior-kitchen.jpg",
        alt: "Renovated kitchen with new cabinetry and fixtures",
      },
      {
        src: "/images/before-after-1.png",
        alt: "Home renovation before and after comparison",
      },
      {
        src: "/images/before-after-2.png",
        alt: "Interior renovation transformation",
      },
      {
        src: "/images/before-after-3.png",
        alt: "Kitchen renovation before and after",
      },
      {
        src: "/images/interior-design1.jpg",
        alt: "Modern home interior after renovation",
      },
    ],

    video: {
      src: "/videos/interior-walkthrough.mp4",
      poster: "/images/interior-design.jpg",
      title: "Home Renovation",
      description: "Complete home transformation — see our renovation work from start to finish.",
    },

    href: "/services/home-renovation",

    detailedDescription:
      "We specialize in complete home renovations that transform outdated spaces into modern, functional living areas. Our renovation services include kitchen and bathroom remodeling, electrical and plumbing upgrades, flooring installation, painting, and complete interior modernization. We work closely with homeowners to understand their vision and deliver renovations that exceed expectations while staying on budget and schedule.",

    featuredImage: "/images/interior-design.jpg",
  },

  {
    id: "office-interior",
    slug: "office-interior",
    number: "04",
    title: "Office Interior",
    subtitle:
      "Workplace Fit-Out · Interior Planning · Office Styling",
    description:
      "Interior-focused office solutions for modern workspaces. We design and deliver polished office interiors through workspace planning, fit-out detailing, lighting, material selection, and finish coordination.",
    image: "/images/office-hero.png",
    alt: "Contemporary office interior with refined workspace planning and material finishes",

    scopeList: [
      "Office interior fit-out",
      "Workspace planning & zoning",
      "Joinery, partitions & detailing",
      "Lighting, finishes & material coordination",
      "Furniture layout & workplace functionality",
      "Professional interior styling for offices",
    ],

    gallery: [
      {
        src: "/images/office-hero.png",
        alt: "Bright office workspace with collaborative meeting layout",
      },
      {
        src: "/images/office_work.png",
        alt: "Contemporary office interior with refined workstation planning",
      },
      {
        src: "/images/office-design.avif",
        alt: "Office interior elevation and material palette for workspace design",
      },
      {
        src: "/images/planer-2.jpg",
        alt: "Office interior planning and detailing for efficient layout",
      },
    ],

    video: {
      src: "/videos/living-dining-room.mp4",
      poster: "/images/office-hero.png",
      title: "Office Interior",
      description: "Refined workspace transformations — see our office interior work.",
    },

    href: "/services/office-interior",

    detailedDescription:
      "We create professional office interiors that balance productivity, comfort, and brand presence. Our office interior work includes workplace planning, fit-out detailing, material selection, lighting, joinery, and final styling so each space feels efficient, polished, and tailored to how the team works.",

    featuredImage: "/images/office-hero.png",
  },

  {
    id: "interiors",
    slug: "interior-architecture",
    number: "05",
    title: "Interior Design",
    subtitle:
      "Interior Styling · Space Planning · Material Selection",
    description:
      "Professional interior design services for residential and commercial spaces. We create beautiful, functional interiors with expert space planning, material selection, furniture design, and complete interior styling.",
    image: "/images/interior-design1.jpg",
    alt: "Professional interior design showing styled living space",

    scopeList: [
      "Interior design & styling",
      "Space planning & layout",
      "Material & finish selection",
      "Furniture design & procurement",
      "Lighting design",
      "Color consultation",
    ],

    gallery: [
      {
        src: "/images/interior-design1.jpg",
        alt: "Styled living room interior design",
      },
      {
        src: "/images/interior-kitchen.jpg",
        alt: "Designed kitchen interior with custom cabinetry",
      },
      {
        src: "/images/bedroom-interior.png",
        alt: "Designed bedroom with custom furniture",
      },
      {
        src: "/images/washroom-interior.png",
        alt: "Luxury bathroom interior design",
      },
      {
        src: "/images/interior-design.jpg",
        alt: "Professional interior styling and decor",
      },
      {
        src: "/images/cupboard-design.avif",
        alt: "Custom furniture and joinery design",
      },
    ],

    video: {
      src: "/videos/interior-walkthrough.mp4",
      poster: "/images/interior-design1.jpg",
      title: "Interior Design",
      description: "Beautiful, functional interiors — see our design work and styling.",
    },

    href: "/services/interior-architecture",

    detailedDescription:
      "Our interior design services transform spaces into beautiful, functional environments. We work with clients to understand their lifestyle, preferences, and needs, then create custom interior designs that reflect their personality while maximizing space and functionality. From material selection and furniture design to complete room styling, we handle every aspect of interior design with professional expertise.",

    featuredImage: "/images/interior-design1.jpg",
  },

  {
    id: "park",
    slug: "park-landscaping",
    number: "06",
    title: "Park & Landscaping",
    subtitle:
      "Park Development · Landscape Design · Outdoor Spaces",
    description:
      "Complete park development and landscaping services. We design and build public parks, private gardens, outdoor recreational spaces, walking paths, fountains, and complete landscape architecture projects.",
    image: "/images/out door.jpg",
    alt: "Park development with landscaping workers planting and outdoor construction",

    scopeList: [
      "Park development & construction",
      "Landscape design & planning",
      "Garden development",
      "Walking paths & tracks",
      "Fountains & water features",
      "Outdoor lighting & irrigation",
    ],

    gallery: [
      {
        src: "/images/out door.jpg",
        alt: "Developed park with landscaped gardens and water features",
      },
      {
        src: "/images/outdoor-img.jpg",
        alt: "Landscaped garden walkway with planting",
      },
      {
        src: "/images/top roof-img.jpg",
        alt: "Rooftop garden and outdoor living space",
      },
      {
        src: "/images/setting-area.jpg",
        alt: "Park seating area and landscaping",
      },
      {
        src: "/images/outdoor-project.png",
        alt: "Outdoor construction and landscaping work",
      },
    ],

    video: {
      src: "/videos/garden-villa-pool-web.mp4",
      poster: "/images/out door.jpg",
      title: "Park & Landscaping",
      description: "Creating beautiful outdoor spaces — see our park development work.",
    },

    href: "/services/park-landscaping",

    detailedDescription:
      "We specialize in park development and comprehensive landscaping services. Our team designs and builds public parks, private gardens, recreational spaces, and complete outdoor environments. From initial landscape planning to planting, irrigation systems, outdoor lighting, and hardscaping, we create beautiful, functional outdoor spaces that communities enjoy. Our landscaping expertise includes water features, walking paths, seating areas, and sustainable planting design.",

    featuredImage: "/images/out door.jpg",
  },

];

export function getServiceBySlug(
  slug: string
): Service | undefined {
  return servicesData.find((service) => service.slug === slug);
}
