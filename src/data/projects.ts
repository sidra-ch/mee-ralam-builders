export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
  aspect?: string;
}

export interface ProjectVideoData {
  src: string;
  poster?: string;
  title?: string;
  aspect?: "video" | "vertical" | "square" | "wide";
}

export interface ProjectMedia {
  images?: ProjectImage[];
  videos?: ProjectVideoData[];
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
  video?: ProjectVideoData;
  media?: ProjectMedia;
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
 * Portfolio is grouped from authentic Meer Alam photography and render assets only.
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
      "A two-storey residence documented from a raw concrete shell through scaffolding and brickwork to a finished façade with classical order columns, private balconies, and landscaped grounds.",
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
        caption: "Twilight elevation",
      },
      {
        src: "/images/front-elevation.avif",
        alt: "Neoclassical double-storey villa front elevation with classical columns and symmetric balconies",
        caption: "Front elevation architectural view",
      },
    ],
    exteriorImages: [
      {
        src: "/images/front-elevation.avif",
        alt: "Front elevation of luxury villa with double-height portico and fluted columns",
        caption: "Classical portico and balcony elevation",
      },
      {
        src: "/images/done-project.jpg",
        alt: "Contemporary house exterior with stacked-stone wall, wood soffit, and landscape lighting",
        caption: "Exterior stonework and perimeter lighting",
      },
    ],
    media: {
      images: [
        { src: "/images/done-project-2.png", alt: "Completed contemporary residence at dusk" },
        { src: "/images/front-elevation.avif", alt: "Front elevation with classical columns" },
        { src: "/images/done-project.jpg", alt: "Contemporary house exterior" },
      ],
    },
    nextProjectSlug: "living-room-renovation",
  },
  {
    slug: "living-room-renovation",
    id: "living-room-renovation",
    number: "02",
    title: "Living Room Renovation",
    category: "Interior · Renovation",
    description:
      "An empty room rebuilt as an expansive lounge: tray ceiling with cove lighting, marble wall accents, timber fluting, custom media joinery, and tailored lounge seating.",
    heroImage: "/images/living-room.avif",
    alt: "Completed luxury living room with marble slab walls, tray cove lighting, and plush modular sectional",
    scope: "Interior Architecture · Renovation",
    featured: true,
    video: {
      src: "/videos/living-dining-room.mp4",
      poster: "/images/living-room.avif",
      title: "Living & Dining Walkthrough",
      aspect: "vertical",
    },
    media: {
      videos: [
        {
          src: "/videos/living-dining-room.mp4",
          poster: "/images/living-room.avif",
          title: "Living & Dining Walkthrough",
          aspect: "vertical",
        },
      ],
      images: [
        { src: "/images/living-room.avif", alt: "Finished luxury living room with marble cladding" },
        { src: "/images/project-8.png", alt: "Living room with layered ceiling lighting" },
      ],
    },
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
        src: "/images/living-room.avif",
        alt: "Finished luxury living room with marble wall slabs, ambient display shelves, and sectional",
        caption: "Completed marble and timber lounge",
      },
      {
        src: "/images/project-8.png",
        alt: "Finished living room with layered ceiling lighting, rug, and dark wood media unit",
        caption: "Media joinery and ambient ceiling detail",
      },
    ],
    interiorImages: [
      {
        src: "/images/living-room.avif",
        alt: "Marble wall panelling with backlit display shelving and U-shaped sectional",
        caption: "Marble wall detailing & bespoke joinery",
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
      "Kitchen work from demolition and cabinet installation through to finished islands, stone counters, integrated wine cabinetry, and tailored lighting.",
    heroImage: "/images/kitchen-project.png",
    alt: "Luxury kitchen with marble island, dark cabinetry, and pendant lighting",
    scope: "Interior Architecture · Renovation",
    featured: true,
    video: {
      src: "/videos/interior-walkthrough.mp4",
      poster: "/images/kitchen-project.png",
      title: "Kitchen & Dining 3D Cinematic Walkthrough",
      aspect: "video",
    },
    media: {
      videos: [
        {
          src: "/videos/interior-walkthrough.mp4",
          poster: "/images/kitchen-project.png",
          title: "Kitchen & Dining 3D Walkthrough",
          aspect: "video",
        },
      ],
      images: [
        { src: "/images/kitchen-project.png", alt: "Completed kitchen island" },
        { src: "/images/interior-kitchen.png", alt: "Gloss dark-wood kitchen" },
      ],
    },
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
        caption: "Finished marble island & pendant lighting",
      },
    ],
    interiorImages: [
      {
        src: "/images/interior-kitchen.png",
        alt: "Gloss dark-wood kitchen with waterfall island, display cabinets, and under-cabinet lighting",
        caption: "Full kitchen cabinetry wall with integrated appliances",
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
      "Finished rooms embodying refined residential architecture: grand foyer stair with double-height volume, bespoke dressing suites, and bathrooms shaped with stone, timber, and layered light.",
    heroImage: "/images/interior-design.avif",
    alt: "Double-height residential foyer with curved staircase, wrought iron railing, and chandelier",
    scope: "Interior Architecture",
    featured: false,
    video: {
      src: "/videos/living-room-concept.mp4",
      poster: "/images/setting-area.avif",
      title: "Lounge Concept & Fireplace Walkthrough",
      aspect: "vertical",
    },
    media: {
      videos: [
        {
          src: "/videos/living-room-concept.mp4",
          poster: "/images/setting-area.avif",
          title: "Lounge Concept Walkthrough",
          aspect: "vertical",
        },
      ],
      images: [
        { src: "/images/interior-design.avif", alt: "Double-height grand foyer" },
        { src: "/images/setting-area.avif", alt: "Formal seating area" },
        { src: "/images/cupboard-design.avif", alt: "Walk-in wardrobe" },
      ],
    },
    afterImages: [
      {
        src: "/images/interior-design.avif",
        alt: "Completed grand foyer with double-height ceiling, curved stair, chandelier, and lounge seating",
        caption: "Double-height grand entrance foyer",
      },
      {
        src: "/images/setting-area.avif",
        alt: "Formal sitting room with wall mouldings, recessed ceiling cove lighting, and tailored sofas",
        caption: "Formal reception salon",
      },
    ],
    interiorImages: [
      {
        src: "/images/cupboard-design.avif",
        alt: "Custom walk-in wardrobe with backlit glass doors, illuminated vanity mirror, and dressing unit",
        caption: "Bespoke wardrobe & dressing joinery",
      },
      {
        src: "/images/bedroom-interior.png",
        alt: "Master bedroom with upholstered headboard, timber feature wall, and cove lighting",
        caption: "Master bedroom suite",
      },
      {
        src: "/images/washroom-interior.png",
        alt: "Bathroom with dark marble walls, backlit round mirror, and timber floating vanity",
        caption: "Marble ensuite bathroom",
      },
      {
        src: "/images/washroom-interior-2.png",
        alt: "Bathroom with glass shower, timber vanity, and beige stone tiles",
        caption: "Secondary bathroom with glass shower",
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
      "An executive office suite with DHA Quetta wall branding, timber acoustic slats, and executive lounge — paired with a panoramic high-floor boardroom.",
    heroImage: "/images/project-2.png",
    alt: "Executive office interior with DHA Quetta wall lettering, timber slats, and lounge seating",
    scope: "Interior Architecture",
    featured: false,
    afterImages: [
      {
        src: "/images/project-2.png",
        alt: "Completed executive office with DHA Quetta branded feature wall",
        caption: "Executive reception & branded lounge",
      },
      {
        src: "/images/office-design.avif",
        alt: "Panoramic executive conference room with floor-to-ceiling glass and linear recessed lighting",
        caption: "Executive boardroom with city panorama",
      },
    ],
    interiorImages: [
      {
        src: "/images/office-design.avif",
        alt: "Modern boardroom table with ergonomic seating and expansive glazed curtain wall",
        caption: "Executive boardroom suite",
      },
      {
        src: "/images/office_work.png",
        alt: "Open-plan office with linear ceiling lighting, conference table, and timber wall panelling",
        caption: "Collaborative workspace",
      },
    ],
    media: {
      images: [
        { src: "/images/project-2.png", alt: "Executive office with DHA Quetta branding" },
        { src: "/images/office-design.avif", alt: "Executive boardroom" },
        { src: "/images/office_work.png", alt: "Open-plan workspace" },
      ],
    },
    nextProjectSlug: "outdoor-living",
  },
  {
    slug: "outdoor-living",
    id: "outdoor-living",
    number: "06",
    title: "Outdoor Living",
    category: "Exterior · Landscape",
    description:
      "Completed outdoor rooms: rooftop lounge under a timber pergola, night-time textured boundary wall lighting, and a garden gazebo terrace.",
    heroImage: "/images/toproof-project.png",
    alt: "Rooftop terrace with timber pergola, lounge seating, and warm deck lighting at dusk",
    scope: "Exterior · Landscape",
    featured: false,
    afterImages: [
      {
        src: "/images/toproof-project.png",
        alt: "Finished rooftop lounge with pergola and outdoor sofa set",
        caption: "Pergola rooftop lounge",
      },
    ],
    exteriorImages: [
      {
        src: "/images/outdoor-project.png",
        alt: "Night-time textured boundary wall with ground uplights and planted base",
        caption: "Textured wall & uplighting",
      },
      {
        src: "/images/out-doorwork.png",
        alt: "Landscaped lawn with timber gazebo and outdoor seating",
        caption: "Garden pavilion",
      },
    ],
    media: {
      images: [
        { src: "/images/toproof-project.png", alt: "Finished rooftop lounge" },
        { src: "/images/outdoor-project.png", alt: "Façade lighting" },
        { src: "/images/out-doorwork.png", alt: "Garden pavilion" },
      ],
    },
    nextProjectSlug: "contemporary-residence",
  },
];
