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
  href: string;
}

export const servicesData: Service[] = [
  {
    id: "architecture",
    slug: "architecture-planning",
    number: "01",
    title: "Architecture & Planning",
    subtitle: "Concept Design · Regulatory Approvals · Technical Documentation",
    description:
      "We translate client vision into resolved architectural form — from initial massing studies and spatial programming through to full construction documentation and approvals management. Every design decision is grounded in site, climate, and the way people inhabit space.",
    image: "/images/img-9.png",
    alt: "Architectural elevation drawing and site model for a contemporary residential project",
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
        src: "/images/img-24.jpg",
        alt: "Project planning and design coordination over architectural drawings and material samples",
      },
      {
        src: "/images/img-16.png",
        alt: "Architectural exterior façade detailing and clean vertical lines",
      },
      {
        src: "/images/img-13.png",
        alt: "Contemporary residence façade at dusk with warm entrance lighting",
      },
    ],
    href: "/services/architecture-planning",
  },
  {
    id: "construction",
    slug: "precision-construction",
    number: "02",
    title: "Precision Construction",
    subtitle: "Project Management · Structural Build · Quality Assurance",
    description:
      "Our construction division brings the same discipline to the build as the design. We self-deliver structural works and coordinate specialist trades under a single point of accountability, maintaining exacting quality standards from foundation to finish.",
    image: "/images/img-10.png",
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
        src: "/images/img-25.jpg",
        alt: "Construction professionals reviewing an active building structure at sunset",
      },
      {
        src: "/images/img-28.jpg",
        alt: "Urban construction skyline with tower cranes in warm daylight",
      },
      {
        src: "/images/img-12.png",
        alt: "Craftspeople completing a refined residential interior",
      },
    ],
    href: "/services/precision-construction",
  },
  {
    id: "interiors",
    slug: "interior-architecture",
    number: "03",
    title: "Interior Architecture",
    subtitle: "Spatial Design · Material Curation · Bespoke Joinery",
    description:
      "Interior architecture at Meer Alam is a continuation of the building's design logic — not a decorative afterthought. We craft spatial sequences, specify materials with precision, and commission bespoke joinery that makes each interior unmistakably its own.",
    image: "/images/img-11.png",
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
        src: "/images/img-15.png",
        alt: "Bespoke timber joinery and warm ambient lighting detail",
      },
      {
        src: "/images/img-21.png",
        alt: "Textured stone interior wall with concealed warm uplighting",
      },
      {
        src: "/images/img-26.jpg",
        alt: "Warm-toned architectural material palette and detailing in a contemporary interior",
      },
    ],
    href: "/services/interior-architecture",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return servicesData.find((service) => service.slug === slug);
}
