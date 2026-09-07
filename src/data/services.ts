export interface ServiceImage {
  src: string;
  alt: string;
}

export interface Service {
  id: string;
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  alt: string;
  scopeList: string[];
  gallery: ServiceImage[];
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
    subtitle: "Concept Design · Technical Documentation · 3D Visualization",
    description:
      "We translate a brief into resolved architectural form — from drawings and models through to construction documentation. Every decision is grounded in site, climate, and how people inhabit space.",
    image: "/images/planer-3.png",
    alt: "Architects reviewing a house model over construction drawings",
    scopeList: [
      "Site analysis & feasibility studies",
      "Concept design & schematic development",
      "Planning applications & regulatory approvals",
      "Construction documentation & specifications",
      "3D visualization of interiors and massing",
      "Contract administration & site inspection",
    ],
    gallery: [
      {
        src: "/images/planer-3.png",
        alt: "Physical house model on architectural drawings during a design review",
      },
      {
        src: "/images/3d-art.png",
        alt: "Kitchen wireframe overlay illustrating 3D visualization over a real interior",
      },
      {
        src: "/images/done-project.jpg",
        alt: "Twilight visualization of a contemporary two-storey residence",
      },
    ],
    href: "/services/architecture-planning",
    detailedDescription:
      "Architecture at Meer Alam starts with the site and the brief. We work through drawings, models, and visualization so structure, daylight, and material choices are resolved before construction begins.",
    featuredImage: "/images/done-project-2.png",
  },
  {
    id: "construction",
    slug: "precision-construction",
    number: "02",
    title: "Precision Construction",
    subtitle: "Foundations · Structure · Site Oversight",
    description:
      "Construction is delivered with the same discipline as the design — foundations, formwork, and trade coordination under one point of accountability.",
    image: "/images/const-2.png",
    alt: "Foundation works with rebar columns, formwork, and site crew",
    scopeList: [
      "Full structural construction & civil works",
      "Specialist trade coordination",
      "Programme management & milestone reporting",
      "Materials procurement on site",
      "On-site quality control",
      "Defects liability & post-completion support",
    ],
    gallery: [
      {
        src: "/images/const-3.png",
        alt: "Multi-storey frame under construction with tower crane and scaffolding",
      },
      {
        src: "/images/planer-2.jpg",
        alt: "Site supervisors reviewing a concrete frame and crane at golden hour",
      },
      {
        src: "/images/service-1.png",
        alt: "Interior drywall and ceiling lighting installation during renovation",
      },
    ],
    href: "/services/precision-construction",
    detailedDescription:
      "Site work is documented from excavation and reinforcement through framed structures and interior fit-out. Oversight stays on the building, not on a separate contractor narrative.",
    featuredImage: "/images/const-3.png",
  },
  {
    id: "interiors",
    slug: "interior-architecture",
    number: "03",
    title: "Interior Architecture",
    subtitle: "Kitchens · Living · Bathrooms · Joinery",
    description:
      "Interiors continue the building’s design logic — spatial sequence, materials, and bespoke joinery rather than decoration applied after the fact.",
    image: "/images/kitchen-project.png",
    alt: "Completed luxury kitchen with marble island and dark cabinetry",
    scopeList: [
      "Interior concept development",
      "Space planning & furniture layout",
      "Material, finish & fixture specification",
      "Bespoke joinery design & manufacture",
      "Lighting design & electrical coordination",
      "Kitchen and bathroom fit-out",
    ],
    gallery: [
      {
        src: "/images/bedroom-interior.png",
        alt: "Bedroom interior with timber feature wall and cove lighting",
      },
      {
        src: "/images/washroom-interior.png",
        alt: "Bathroom with marble walls, backlit mirror, and timber vanity",
      },
      {
        src: "/images/interior-design.png",
        alt: "Residential foyer with curved stair and chandelier",
      },
    ],
    href: "/services/interior-architecture",
    detailedDescription:
      "From kitchens and living rooms to bathrooms and foyers, interiors are specified as architecture: light, joinery, and stone working as one system.",
    featuredImage: "/images/interior-kitchen.png",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return servicesData.find((service) => service.slug === slug);
}
