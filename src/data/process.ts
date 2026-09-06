export interface ProcessStage {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  slug: string;
}

export const processStagesData: ProcessStage[] = [
  {
    step: "01",
    title: "Discovery",
    subtitle: "Brief Development · Site Analysis · Feasibility",
    description:
      "Every project begins with deep listening. We invest time in understanding the client's programme, lifestyle requirements, and long-term vision before a single line is drawn. Parallel site analysis — topography, orientation, access, and planning context — ensures the design is grounded in reality from day one.",
    deliverables: [
      "Client brief document",
      "Site analysis report",
      "Feasibility assessment",
      "Project programme",
      "Fee proposal",
    ],
    slug: "discovery",
  },
  {
    step: "02",
    title: "Concept Design",
    subtitle: "Spatial Strategy · Massing Studies · Design Intent",
    description:
      "We develop the governing design idea — the moves that give the project its spatial character and experiential identity. Concept design is presented through hand drawings, physical models, and digital visualisations so clients can inhabit the proposal before it is committed to.",
    deliverables: [
      "Concept design drawings",
      "Physical or digital massing model",
      "Materials & mood direction",
      "Indicative cost estimate",
      "Planning strategy",
    ],
    slug: "concept-design",
  },
  {
    step: "03",
    title: "Design Development",
    subtitle: "Detailed Design · Engineering Coordination · Approvals",
    description:
      "The approved concept is resolved in full detail. We coordinate structural, MEP, and landscape engineers under a single integrated model, ensuring all systems are designed in concert rather than retrofitted. Regulatory approvals are managed in parallel to keep the programme on track.",
    deliverables: [
      "Developed design drawings",
      "Structural & services coordination",
      "Planning approval submission",
      "Updated cost plan",
      "Specification outline",
    ],
    slug: "design-development",
  },
  {
    step: "04",
    title: "Construction Documentation",
    subtitle: "Technical Drawings · Specifications · Tender Package",
    description:
      "Comprehensive technical documentation is prepared to an exacting standard — the instructions from which the building is built. Clear, unambiguous drawings and specifications eliminate site ambiguity, protect the client's interests, and form the contractual basis for tendering.",
    deliverables: [
      "Full construction drawing set",
      "Technical specifications",
      "Schedule of finishes",
      "Tender package & bill of quantities",
      "Contractor pre-qualification",
    ],
    slug: "construction-documentation",
  },
  {
    step: "05",
    title: "Construction & Delivery",
    subtitle: "Site Administration · Quality Assurance · Milestone Sign-Off",
    description:
      "On site, we maintain an active presence — inspecting works, certifying progress payments, and resolving technical queries in real time. Our role is to protect design intent through to completion while keeping the project on programme and within agreed budget tolerances.",
    deliverables: [
      "Regular site inspection reports",
      "Progress payment certifications",
      "Technical queries & RFI responses",
      "Defects snagging list",
      "Practical completion certificate",
    ],
    slug: "construction-delivery",
  },
  {
    step: "06",
    title: "Handover & Aftercare",
    subtitle: "Post-Completion Support · Defects Liability · Documentation",
    description:
      "Completion is not the end of our commitment. We manage the defects liability period, coordinate any remedial works, and provide the client with a full as-built documentation package. Our aftercare programme ensures the building performs as designed over the long term.",
    deliverables: [
      "As-built drawing set",
      "Building manual & maintenance guide",
      "Warranty & guarantee register",
      "Defects liability management",
      "Final account settlement",
    ],
    slug: "handover-aftercare",
  },
];

export function getProcessStageBySlug(slug: string): ProcessStage | undefined {
  return processStagesData.find((stage) => stage.slug === slug);
}
