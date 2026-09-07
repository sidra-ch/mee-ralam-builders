export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
  aspect?: string;
}

export interface Project {
  /** URL slug — used by /projects/[slug] */
  slug: string;
  /** Alias of slug, kept for existing card/list props */
  id: string;
  number: string;
  title: string;
  category: string;
  /** Only set when a real location is visible in the work or confirmed */
  location?: string;
  description: string;
  heroImage: string;
  alt: string;
  scope: string;
  featured: boolean;
  objectPosition?: string;
  beforeImages?: ProjectImage[];
  constructionImages?: ProjectImage[];
  afterImages?: ProjectImage[];
  interiorImages?: ProjectImage[];
  exteriorImages?: ProjectImage[];
  renovationImages?: ProjectImage[];
  gallery?: ProjectImage[];
  nextProjectSlug?: string;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projectsData.find((project) => project.slug === slug || project.id === slug);
}

/** @deprecated Use getProjectBySlug */
export function getProjectById(id: string): Project | undefined {
  return getProjectBySlug(id);
}

/**
 * Portfolio is grouped from actual Meer Alam photography only.
 * Invented estates, years, and cities are not used.
 *
 * Excluded from galleries (marketing overlays, third-party branding, or collages):
 * - project-1.png, project-3.png, Screenshot 2026-09-07 055647.png
 * - planer-1.webp (Wajid Construction mark)
 * - many-project.png (15-image collage)
 * - const-4.jpg (generic high-rise skyline, not a documented Meer Alam building)
 */
export const projectsData: Project[] = [
  {
    slug: "contemporary-residence",
    id: "contemporary-residence",
    number: "01",
    title: "Contemporary Residence",
    category: "Residential Architecture",
    description:
      "A two-storey house documented from a raw concrete shell through scaffolding and brickwork to a finished façade with glass balconies, dark frames, and night-time lighting.",
    heroImage: "/images/done-project-2.png",
    alt: "Completed two-storey contemporary house at dusk with warm exterior lighting and landscaped driveway",
    scope: "Architecture · Construction",
    featured: true,
    renovationImages: [
      {
        src: "/images/before-after-4.png",
        alt: "House transformation in three stages: unfinished concrete shell, scaffolding with brickwork, and completed modern façade",
        caption: "Before, during, and after — exterior envelope",
      },
    ],
    constructionImages: [
      {
        src: "/images/const-5.png",
        alt: "Two-storey brick and concrete house under construction with wooden scaffolding",
        caption: "Structural shell and scaffolding",
      },
    ],
    afterImages: [
      {
        src: "/images/done-project-2.png",
        alt: "Finished contemporary residence at dusk with glass railings and carport",
      },
    ],
    exteriorImages: [
      {
        src: "/images/done-project.jpg",
        alt: "Contemporary house exterior with stacked-stone wall, wood soffit, and landscape lighting",
      },
    ],
    nextProjectSlug: "living-room-renovation",
  },
  {
    slug: "living-room-renovation",
    id: "living-room-renovation",
    number: "02",
    title: "Living Room Renovation",
    category: "Interior · Renovation",
    description:
      "An empty room rebuilt as a lounge: tray ceiling with cove lighting, wood-slat feature wall, media joinery, and a furnished seating layout.",
    heroImage: "/images/project-8.png",
    alt: "Completed living room with beige sectional, tray ceiling lighting, and floating timber media console",
    scope: "Interior Architecture · Renovation",
    featured: true,
    renovationImages: [
      {
        src: "/images/before-after-1.png",
        alt: "Side-by-side living room: empty unfinished room versus furnished lounge with wood slat wall and cove lighting",
        caption: "Empty shell to furnished lounge",
      },
      {
        src: "/images/before-after-2.png",
        alt: "Before and after living room with wood-panelled media wall, tray ceiling, and modular seating",
        caption: "Media wall and ceiling lighting upgrade",
      },
    ],
    afterImages: [
      {
        src: "/images/project-8.png",
        alt: "Finished living room with layered ceiling lighting, rug, and dark wood media unit",
      },
    ],
    nextProjectSlug: "kitchen-interior",
  },
  {
    slug: "kitchen-interior",
    id: "kitchen-interior",
    number: "03",
    title: "Kitchen Interior",
    category: "Interior · Kitchen",
    description:
      "Kitchen work from demolition and cabinet installation through to finished islands, stone counters, and integrated lighting.",
    heroImage: "/images/kitchen-project.png",
    alt: "Luxury kitchen with marble island, dark cabinetry, and pendant lighting",
    scope: "Interior Architecture · Renovation",
    featured: true,
    renovationImages: [
      {
        src: "/images/before-after-3.png",
        alt: "Kitchen renovation comparison: stripped cabinets and plaster versus finished two-tone kitchen with built-in ovens",
        caption: "Demolition through to completed kitchen",
      },
    ],
    constructionImages: [
      {
        src: "/images/project-4.png",
        alt: "Kitchen and living area during renovation with cabinets in place, protected flooring, and tools on site",
        caption: "Joinery installation in progress",
      },
    ],
    afterImages: [
      {
        src: "/images/kitchen-project.png",
        alt: "Completed kitchen island with marble top, bar stools, and linear pendant lights",
      },
    ],
    interiorImages: [
      {
        src: "/images/interior-kitchen.png",
        alt: "Gloss dark-wood kitchen with waterfall island, display cabinets, and under-cabinet lighting",
      },
    ],
    nextProjectSlug: "residential-interiors",
  },
  {
    slug: "residential-interiors",
    id: "residential-interiors",
    number: "04",
    title: "Residential Interiors",
    category: "Interior Architecture",
    description:
      "Finished rooms from the same residential interior language: foyer stair, bedroom, and bathrooms with stone, timber, and layered light.",
    heroImage: "/images/interior-design.png",
    alt: "Grand foyer with curved staircase, glass balustrade, and crystal chandelier",
    scope: "Interior Architecture",
    featured: false,
    afterImages: [
      {
        src: "/images/interior-design.png",
        alt: "Completed foyer with curved stair, glass railing, and chandelier",
      },
    ],
    interiorImages: [
      {
        src: "/images/bedroom-interior.png",
        alt: "Master bedroom with upholstered headboard, timber feature wall, and cove lighting",
        caption: "Bedroom",
      },
      {
        src: "/images/washroom-interior.png",
        alt: "Bathroom with dark marble walls, backlit round mirror, and timber floating vanity",
        caption: "Bathroom",
      },
      {
        src: "/images/washroom-interior-2.png",
        alt: "Bathroom with glass shower, timber vanity, and beige stone tiles",
        caption: "Bathroom",
      },
    ],
    nextProjectSlug: "dha-quetta-office",
  },
  {
    slug: "dha-quetta-office",
    id: "dha-quetta-office",
    number: "05",
    title: "DHA Quetta Office",
    category: "Commercial Interior",
    location: "DHA Quetta",
    description:
      "An executive office interior with DHA Quetta wall branding, timber slats, and a waiting lounge — shown alongside a completed open-plan workspace.",
    heroImage: "/images/project-2.png",
    alt: "Executive office interior with DHA Quetta wall lettering, timber slats, and lounge seating",
    scope: "Interior Architecture",
    featured: false,
    afterImages: [
      {
        src: "/images/project-2.png",
        alt: "Completed executive office with DHA Quetta branded feature wall",
      },
    ],
    interiorImages: [
      {
        src: "/images/office_work.png",
        alt: "Open-plan office with linear ceiling lighting, conference table, and timber wall panelling",
        caption: "Workspace",
      },
    ],
    nextProjectSlug: "outdoor-living",
  },
  {
    slug: "outdoor-living",
    id: "outdoor-living",
    number: "06",
    title: "Outdoor Living",
    category: "Exterior · Landscape",
    description:
      "Completed outdoor rooms: rooftop lounge under a pergola, night-time façade lighting, and a garden gazebo terrace.",
    heroImage: "/images/toproof-project.png",
    alt: "Rooftop terrace with timber pergola, lounge seating, and warm deck lighting at dusk",
    scope: "Exterior · Landscape",
    featured: false,
    afterImages: [
      {
        src: "/images/toproof-project.png",
        alt: "Finished rooftop lounge with pergola and outdoor sofa set",
      },
    ],
    exteriorImages: [
      {
        src: "/images/outdoor-project.png",
        alt: "Night-time textured boundary wall with ground uplights and planted base",
        caption: "Façade lighting",
      },
      {
        src: "/images/out-doorwork.png",
        alt: "Landscaped lawn with timber gazebo and outdoor seating",
        caption: "Garden pavilion",
      },
    ],
    nextProjectSlug: "contemporary-residence",
  },
];
