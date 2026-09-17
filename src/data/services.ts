
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
      "Concept Design · Regulatory Approvals · Technical Documentation",
    description:
      "We translate client vision into resolved architectural form — from initial massing studies and spatial programming through to full construction documentation and approvals management. Every design decision is grounded in site, climate, and the way people inhabit space.",
    image: "/images/architecture-hero.jpg",
    alt: "Contemporary architectural elevation with layered volumes, landscaped approach and warm lighting",

    scopeList: [
      "Site analysis & feasibility studies",
      "Concept design & schematic development",
      "Planning applications & regulatory approvals",
      "Construction documentation & specifications",
      "Tender management & contractor selection",
      "Contract administration & site inspection",
    ],

    gallery: [
      {
        src: "/images/office-hero.png",
        alt: "Contemporary office interior with bespoke reception joinery and workspace planning",
      },
      {
        src: "/images/out door img.jpg",
        alt: "Private outdoor architectural garden with layered planting and warm lighting",
      },
      {
        src: "/images/interior-kitchen.jpg",
        alt: "Contemporary kitchen with timber cabinetry, island workspace and integrated lighting",
      },
      {
        src: "/images/living-room.avif",
        alt: "Refined living room with layered lighting, timber detailing and comfortable seating",
      },
      {
        src: "/images/top roof-img.jpg",
        alt: "Rooftop terrace with a considered outdoor living arrangement at dusk",
      },
      {
        src: "/images/planer-3.png",
        alt: "Architectural planning model and drawings used to resolve the building concept",
      },
    ],

    video: {
      src: "/videos/architecture-kitchen.mp4",
      poster: "/images/interior-kitchen.jpg",
      title: "From plan to lived space",
      description:
        "A closer look at how proportion, light and material decisions come together in a resolved interior.",
    },

    href: "/services/architecture-planning",

    detailedDescription:
      "Architecture at Meer Alam is fundamentally about understanding place and purpose. We begin every project with deep site analysis — studying topography, climate, orientation, and context to ensure our designs respond intelligently to their environment. Our planning process integrates technical precision with creative vision, navigating regulatory requirements while pushing for exceptional design outcomes.",

    featuredImage: "/images/top roof-img.jpg",
  },

  {
    id: "construction",
    slug: "precision-construction",
    number: "02",
    title: "Precision Construction",
    subtitle:
      "Project Management · Structural Build · Quality Assurance",
    description:
      "Our construction division brings the same discipline to the build as the design. We self-deliver structural works and coordinate specialist trades under a single point of accountability, maintaining exacting quality standards from foundation to finish.",
    image: "/images/const-3.png",
    alt: "Precision construction — structural steel frame and formwork on an active residential build site",

    scopeList: [
      "Full structural construction & civil works",
      "Specialist trade coordination",
      "Programme management & milestone reporting",
      "Materials procurement & supply chain management",
      "On-site quality control & sign-off procedures",
      "Defects liability & post-completion support",
    ],

    gallery: [
      {
        src: "/images/const-2.png",
        alt: "Foundation reinforcement and structural engineering works on site",
      },
      {
        src: "/images/const-4.jpg",
        alt: "Active construction site with tower cranes and coordinated field trades",
      },
      {
        src: "/images/const-5.png",
        alt: "Masonry, envelope and structural execution on a luxury residential build",
      },
    ],

    video: {
      src: "/videos/video.mp4",
      poster: "/images/const-6.png",
      title: "Construction Process",
      description: "Witness the precision and scale of our structural builds, from foundation to finishing.",
    },

    href: "/services/precision-construction",

    detailedDescription:
      "Precision construction is the physical realization of architectural intent. Our build teams operate with the same attention to detail that informs our designs — coordinating structural systems, managing quality control, and maintaining strict adherence to programme and budget. We don't just construct buildings; we ensure that every element serves the original design vision.",

    featuredImage: "/images/const-6.png",
  },

  {
    id: "interiors",
    slug: "interior-architecture",
    number: "03",
    title: "Interior Architecture",
    subtitle:
      "Spatial Design · Material Curation · Bespoke Joinery",
    description:
      "Interior architecture at Meer Alam is a continuation of the building's design logic — not a decorative afterthought. We craft spatial sequences, specify materials with precision, and commission bespoke joinery that makes each interior unmistakably its own.",
    image: "/images/interior-design.jpg",
    alt: "Bespoke interior — walnut joinery, stone surfaces and warm ambient lighting in a residential living room",

    scopeList: [
      "Interior concept development & mood direction",
      "Space planning & furniture layout",
      "Material, finish & fixture specification",
      "Bespoke joinery design & manufacture",
      "Lighting design & electrical coordination",
      "Art consultation & styling",
    ],

    gallery: [
      {
        src: "/images/interior-kitchen.jpg",
        alt: "Bespoke kitchen joinery, stone island and warm ambient lighting detail",
      },
      {
        src: "/images/bedroom-interior.png",
        alt: "Master suite interior architecture with textured wall surfaces and ambient lighting",
      },
      {
        src: "/images/cupboard-design.avif",
        alt: "Warm-toned architectural joinery and wardrobe detailing in a contemporary interior",
      },
    ],

    video: {
      src: "/videos/interior video.mp4",
      poster: "/images/interior-design.jpg",
      title: "Tactile Materials",
      description: "A closer look at the bespoke joinery, soft lighting, and material curation that defines our interior spaces.",
    },

    href: "/services/interior-architecture",

    detailedDescription:
      "Interior architecture extends the building's narrative into its most intimate spaces. We approach interiors as spatial sequences rather than decorative treatments — crafting experiences through materiality, light, and proportion. Every interior decision responds to the broader architectural concept while addressing how people truly live within the space.",

    featuredImage: "/images/interior-design1.jpg",
  },
];

export function getServiceBySlug(
  slug: string
): Service | undefined {
  return servicesData.find((service) => service.slug === slug);
}
