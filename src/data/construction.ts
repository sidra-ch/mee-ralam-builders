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
    label: "Planning",
    title: "Drawings before the pour.",
    body: "Models and drawings sit on the table before reinforcement goes in the ground.",
    src: "/images/planer-3.png",
    alt: "Architects reviewing a scale house model over blueprints",
    slug: "context-vision",
    detailedDescription:
      "Planning is documented as drawings and a physical model — the stage before excavation and formwork.",
    keyPoints: [
      "Design review over construction drawings",
      "Physical model used to check massing",
      "Alignment between client, designer, and builder",
    ],
    process: [
      "Drawing set on the table",
      "Model review",
      "Mark-ups and coordination",
    ],
  },
  {
    index: "02",
    label: "Materials",
    title: "What the building is made of.",
    body: "Brick, cement, sand, gravel, and steel staged on site before they become walls and slabs.",
    src: "/images/material.png",
    alt: "Stacked bricks, cement sacks, rebar, sand, and gravel on a construction site",
    slug: "planning-coordination",
    detailedDescription:
      "Materials are photographed as they arrive: clay brick, bagged cement, reinforcement, and aggregates.",
    keyPoints: [
      "Brick and cement stores",
      "Reinforcement on the ground",
      "Sand and crushed stone for mix",
    ],
    process: [
      "Delivery and stacking",
      "Batching for concrete and mortar",
      "Use in walls and slabs",
    ],
  },
  {
    index: "03",
    label: "Foundations",
    title: "Structure in the ground.",
    body: "Footings, formwork, and column starters — the first built geometry of the project.",
    src: "/images/const-2.png",
    alt: "Workers in a foundation pit with vertical rebar and timber formwork",
    slug: "structure-oversight",
    detailedDescription:
      "Early structure is recorded as excavated footings, shuttering, and column reinforcement.",
    keyPoints: [
      "Formwork at the perimeter",
      "Column rebar cages",
      "Crew on the foundation slab",
    ],
    process: [
      "Excavation",
      "Formwork and steel",
      "Concrete pour",
    ],
  },
  {
    index: "04",
    label: "Frame",
    title: "Floors going up.",
    body: "Concrete frames, scaffolding, and crane work as the building rises.",
    src: "/images/const-3.png",
    alt: "Four-storey concrete frame with wooden scaffolding and a yellow tower crane",
    slug: "materiality-detail",
    detailedDescription:
      "Mid-build photographs show framed floors, scaffolding, and lifting equipment — not a finished interior.",
    keyPoints: [
      "Reinforced concrete frame",
      "Perimeter scaffolding",
      "Tower crane on site",
    ],
    process: [
      "Column and slab cycles",
      "Scaffold and access",
      "Envelope preparation",
    ],
  },
  {
    index: "05",
    label: "Handover",
    title: "The finished house.",
    body: "Night lighting, glass, and landscape — the building as occupied architecture.",
    src: "/images/done-project-2.png",
    alt: "Completed contemporary house at dusk with warm lighting and landscaped approach",
    slug: "built-environment",
    detailedDescription:
      "Completion is shown as the finished residential exterior at dusk — the end of the construction sequence on this site.",
    keyPoints: [
      "Completed façade and glazing",
      "Exterior lighting",
      "Landscape at the driveway",
    ],
    process: [
      "Finishes and glazing",
      "Lighting and landscape",
      "Handover",
    ],
  },
];

export function getConstructionStoryBySlug(slug: string): ConstructionStory | undefined {
  return constructionStories.find((story) => story.slug === slug);
}
