export interface ConstructionStory {
  index: string;
  label: string;
  title: string;
  body: string;
  src: string;
  alt: string;
  slug: string;
  detailedDescription: string;
  keyPoints: string[];
  process: string[];
}

export const constructionStories: ConstructionStory[] = [
  {
    index: "01",
    label: "Context + Vision",
    title: "A considered beginning.",
    body: "Understanding place, purpose and possibility before a single massing line is drawn.",
    src: "/images/img-22.png",
    alt: "Contemporary residence at twilight, framed with warm architectural lighting",
    slug: "context-vision",
    detailedDescription: "Every exceptional building begins with deep understanding. We invest time in comprehending the unique characteristics of each site — its topography, orientation, climate, and context. This foundation ensures that every design decision responds thoughtfully to place rather than imposing a preconceived vision.",
    keyPoints: [
      "Comprehensive site analysis and feasibility studies",
      "Climate-responsive design strategies",
      "Contextual sensitivity and neighborhood integration",
      "Sustainable orientation and passive design principles",
      "Regulatory compliance and planning constraints",
    ],
    process: [
      "Initial site visit and assessment",
      "Topographical survey and analysis",
      "Climate and solar studies",
      "Contextual research and documentation",
      "Vision alignment with client brief",
    ],
  },
  {
    index: "02",
    label: "Planning + Coordination",
    title: "Every decision aligned.",
    body: "Material selection, proportion and structural engineering aligned under one discipline.",
    src: "/images/img-24.jpg",
    alt: "Project planning and design coordination over architectural drawings and material samples",
    slug: "planning-coordination",
    detailedDescription: "Precision construction requires meticulous planning. Every material choice, structural element, and engineering system is coordinated from the outset. This integrated approach eliminates conflicts, ensures efficient material usage, and maintains the highest quality standards throughout the build process.",
    keyPoints: [
      "Integrated design and build coordination",
      "Material specification and procurement planning",
      "Structural engineering alignment",
      "MEP systems coordination",
      "Quality control protocols and documentation",
    ],
    process: [
      "Detailed design development",
      "Material selection and specification",
      "Structural engineering calculations",
      "MEP systems design and routing",
      "Construction documentation preparation",
    ],
  },
  {
    index: "03",
    label: "Structure + Oversight",
    title: "Precision on site.",
    body: "Construction is guided by site discipline, structural rhythm and exacting design intent.",
    src: "/images/img-25.jpg",
    alt: "Construction professionals reviewing an active building structure at sunset",
    slug: "structure-oversight",
    detailedDescription: "On-site execution demands rigorous oversight. Our experienced team maintains constant presence during construction, ensuring that every structural element meets our exacting standards. From foundation to finishing, quality is verified at each milestone.",
    keyPoints: [
      "Daily site supervision and quality control",
      "Structural integrity verification",
      "Material quality inspections",
      "Workmanship standards enforcement",
      "Progress documentation and reporting",
    ],
    process: [
      "Foundation construction and verification",
      "Structural frame erection",
      "Envelope and enclosure systems",
      "Quality inspection at each phase",
      "Progress certification and sign-off",
    ],
  },
  {
    index: "04",
    label: "Materiality + Detail",
    title: "Texture, tone and light.",
    body: "The spatial character emerges through crafted material junctions and refined details.",
    src: "/images/img-26.jpg",
    alt: "Warm-toned architectural material palette and detailing in a contemporary building project",
    slug: "materiality-detail",
    detailedDescription: "The final character of a building emerges through careful material selection and precise detailing. We craft junctions between materials with architectural precision, ensuring that transitions between stone, wood, metal, and glass feel intentional and refined.",
    keyPoints: [
      "Curated material palette selection",
      "Custom joinery and detailing",
      "Crafted material junctions",
      "Surface finish specification",
      "Lighting integration and coordination",
    ],
    process: [
      "Material sample selection and approval",
      "Custom joinery fabrication",
      "Installation and finishing",
      "Detail refinement and quality control",
      "Final finish application and protection",
    ],
  },
  {
    index: "05",
    label: "Built Environment",
    title: "Made to endure.",
    body: "The final building stands as a refined, grounded and enduring architectural statement.",
    src: "/images/img-28.jpg",
    alt: "Urban construction skyline with tower cranes in warm daylight",
    slug: "built-environment",
    detailedDescription: "The completed building represents years of disciplined effort and attention to detail. Every element — from the structural foundation to the finest interior finish — contributes to a cohesive architectural statement that will stand the test of time.",
    keyPoints: [
      "Holistic quality assurance",
      "Systems integration and testing",
      "Landscape and exterior completion",
      "Interior finishing and furnishing",
      "Handover documentation and aftercare",
    ],
    process: [
      "Final systems testing and commissioning",
      "Landscape and exterior works completion",
      "Interior finishing and furnishing",
      "Final quality inspection and snagging",
      "Handover and aftercare commencement",
    ],
  },
];

export function getConstructionStoryBySlug(slug: string): ConstructionStory | undefined {
  return constructionStories.find((story) => story.slug === slug);
}