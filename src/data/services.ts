export interface Service {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  alt: string;
  scopeList: string[];
  href: string;
}

export const servicesData: Service[] = [
  {
    id: "architecture",
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
    href: "/services#architecture",
  },
  {
    id: "construction",
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
    href: "/services#construction",
  },
  {
    id: "interiors",
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
    href: "/services#interiors",
  },
];
