export interface ProjectGalleryItem {
  src: string;
  alt: string;
  caption?: string;
  aspect?: string;
  video?: boolean;
  poster?: string;
}

export interface ProjectSpec {
  label: string;
  value: string;
}

export interface ProjectStory {
  overview: string;
  spatialIntent: string;
  materiality: string;
}

export interface ProjectTransformation {
  /** Image of the space before renovation/construction */
  beforeSrc: string;
  beforeAlt: string;
  /** Image of the completed space */
  afterSrc: string;
  afterAlt: string;
  /** Optional eyebrow override */
  eyebrow?: string;
  /** Optional heading override */
  heading?: string;
  /** Optional supporting text override */
  subtext?: string;
}

export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  location: string;
  year: string;
  description: string;
  heroImage: string;
  alt: string;
  video?: {
    src: string;
    poster: string;
    alt: string;
  };
  scope: string;
  featured: boolean;
  /** CSS object-position for crop-sensitive architecture */
  objectPosition?: string;
  quote?: string;
  specs?: ProjectSpec[];
  story?: ProjectStory;
  gallery?: ProjectGalleryItem[];
  nextProjectId?: string;
  /** Optional Before/After comparison data — only populate when genuine imagery exists */
  transformation?: ProjectTransformation;
  slug?: string;
}

export function getProjectById(id: string): Project | undefined {
  return projectsData.find((project) => project.id === id || project.slug === id);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getProjectById(slug);
}

export const projectsData: Project[] = [
  {
    id: "meridian-estate",
    number: "01",
    title: "Meridian Estate",
    category: "Luxury Residential",
    location: "Islamabad, Pakistan",
    year: "2024",
    description:
      "A landmark private residence defined by bold geometric massing, natural stone façades, and a seamless dialogue between interior volume and the surrounding landscape.",
    heroImage: "/images/img-1.png",
    alt: "Meridian Estate — contemporary residence with stone façade and landscaped approach at dusk",
    video: {
      src: "/videos/meridian-estate-interior.mp4",
      poster: "/images/img-15.png",
      alt: "Meridian Estate living and dining interior with warm architectural lighting",
    },
    scope: "Architecture · Construction · Interiors",
    featured: true,
    quote: "Architecture that balances commanding structural permanence with the quiet intimacy of natural daylight and textured materiality.",
    specs: [
      { label: "Typology", value: "Private Contemporary Estate" },
      { label: "Location", value: "Islamabad" },
      { label: "Scope", value: "Turnkey Architecture & Construction" },
      { label: "Completion", value: "2024" },
    ],
    story: {
      overview:
        "Conceived as an enduring sanctuary within a private enclave, Meridian Estate negotiates a subtle sloping terrain through layered cantilevered planes and deep overhangs.",
      spatialIntent:
        "The ground floor organizes living and hosting programs around a dual-aspect courtyard, allowing natural cross-ventilation and dramatic sightlines from the foyer through to the landscaped rear gardens.",
      materiality:
        "Locally sourced travertine, fluted architectural concrete, and thermal-break bronze glazing create a palette that gains depth under varying daylight conditions.",
    },
    gallery: [
      {
        src: "/images/img-13.png",
        alt: "Meridian Estate entrance façade at dusk with warm uplighting",
        caption: "Façade composition & entrance sequence at dusk",
        aspect: "h-[360px] sm:h-[480px] lg:h-[560px]",
      },
      {
        src: "/images/img-15.png",
        alt: "Meridian Estate bespoke timber joinery and curated lighting",
        caption: "Bespoke millwork and integrated warm illumination",
        aspect: "h-[360px] sm:h-[480px] lg:h-[560px]",
      },
      {
        src: "/images/img-22.png",
        alt: "Meridian Estate illuminated terraces and infinity pool at twilight",
        caption: "Terraced pavilion and exterior landscape dialogue",
        aspect: "h-[420px] sm:h-[540px] lg:h-[640px]",
      },
    ],
    nextProjectId: "the-pavilion-house",
  },
  {
    id: "the-pavilion-house",
    number: "02",
    title: "The Pavilion House",
    category: "Contemporary Villa",
    location: "Rawalpindi, Pakistan",
    year: "2023",
    description:
      "An open-plan villa conceived around a central reflecting courtyard, where each living space unfolds as a distinct pavilion connected by covered walkways and curated garden vistas.",
    heroImage: "/images/img-2.png",
    alt: "The Pavilion House — open-plan villa with reflecting courtyard and connecting covered walkways",
    scope: "Architecture · Interiors",
    featured: false,
    quote: "A series of interconnected pavilions that dissolves the boundary between interior sanctuary and tranquil outdoor landscape.",
    specs: [
      { label: "Typology", value: "Single-Family Villa" },
      { label: "Location", value: "Rawalpindi" },
      { label: "Scope", value: "Architectural Planning & Interiors" },
      { label: "Completion", value: "2023" },
    ],
    story: {
      overview:
        "The Pavilion House reinterprets regional courtyard living for a contemporary context, placing water and greenery at the programmatic heart of the home.",
      spatialIntent:
        "Four distinct pavilions — formal salon, family living, private master quarters, and guest wing — are arranged around a shallow reflecting pool that tempers the local microclimate.",
      materiality:
        "Honed limestone flooring extends seamlessly across indoor and outdoor thresholds, framed by slender charcoal steel profiles and warm teak louvers.",
    },
    gallery: [
      {
        src: "/images/img-10.png",
        alt: "The Pavilion House interior living volume with expansive glazing",
        caption: "Expansive living room opening directly to the reflecting court",
        aspect: "h-[360px] sm:h-[480px] lg:h-[560px]",
      },
      {
        src: "/images/img-14.png",
        alt: "The Pavilion House exterior covered walkway connection",
        caption: "Covered architectural walkway linking living pavilions",
        aspect: "h-[360px] sm:h-[480px] lg:h-[560px]",
      },
    ],
    nextProjectId: "obsidian-penthouse",
  },
  {
    id: "obsidian-penthouse",
    number: "03",
    title: "Obsidian Penthouse",
    category: "High-Rise Interior",
    location: "Islamabad, Pakistan",
    year: "2024",
    description:
      "A full-floor penthouse transformation in the city's premier residential tower, reinterpreted through dark materiality, bespoke joinery, and a curated art-forward program.",
    heroImage: "/images/img-3.png",
    alt: "Obsidian Penthouse — full-floor high-rise interior with dark materiality and bespoke joinery",
    scope: "Interior Architecture",
    featured: false,
    quote: "Restrained luxury articulated through monolithic dark stone, smoked oak veneers, and precision architectural lighting.",
    specs: [
      { label: "Typology", value: "Full-Floor Penthouse" },
      { label: "Location", value: "Islamabad" },
      { label: "Scope", value: "Turnkey Interior Architecture" },
      { label: "Completion", value: "2024" },
    ],
    story: {
      overview:
        "Perched atop a 28-storey tower, the Obsidian Penthouse was fully stripped back to its structural core to craft an expansive, atmospheric home.",
      spatialIntent:
        "A 360-degree perimeter terrace wraps around open-concept living suites, with acoustic acoustic wood baffles and recessed ceiling coves creating distinct intimate zones.",
      materiality:
        "Black Marquina marble, wire-brushed fumed oak, patinated brass detailing, and soft linen drapery establish an uncompromisingly refined tactile palette.",
    },
    gallery: [
      {
        src: "/images/img-19.png",
        alt: "Obsidian Penthouse main living salon with city views",
        caption: "Main salon framed by panoramic horizon views",
        aspect: "h-[360px] sm:h-[480px] lg:h-[560px]",
      },
      {
        src: "/images/img-21.png",
        alt: "Obsidian Penthouse textured stone wall with concealed uplighting",
        caption: "Textured monolithic stone wall with soft graze lighting",
        aspect: "h-[360px] sm:h-[480px] lg:h-[560px]",
      },
    ],
    nextProjectId: "lakeview-retreat",
  },
  {
    id: "lakeview-retreat",
    number: "04",
    title: "Lakeview Retreat",
    category: "Waterfront Residence",
    location: "Khanpur / Rawalpindi",
    year: "2023",
    description:
      "A private waterfront home engineered into a sloping lakeside site, with cantilevered terraces that extend the living plane directly over the water's edge.",
    heroImage: "/images/img-4.png",
    alt: "Lakeview Retreat — cantilevered waterfront residence with terraces extending over the lake",
    scope: "Architecture · Construction",
    featured: false,
    quote: "Engineering and architecture unified to hover gracefully above the shoreline, framing uninhibited natural water panoramas.",
    specs: [
      { label: "Typology", value: "Waterfront Weekend Residence" },
      { label: "Location", value: "Lakeside" },
      { label: "Scope", value: "Structural Engineering & Build" },
      { label: "Completion", value: "2023" },
    ],
    story: {
      overview:
        "Constructed on a steep rocky embankment, Lakeview Retreat required precision geotechnical anchoring to support dramatic post-tensioned concrete cantilevers.",
      spatialIntent:
        "Living spaces descend step-by-step with the natural site contours, terminating in a vast timber deck and infinity pool that seems to spill directly into the lake below.",
      materiality:
        "Off-form board-marked concrete, seasoned cedar decking, and stainless steel marine-grade hardware withstand atmospheric moisture while aging gracefully.",
    },
    gallery: [
      {
        src: "/images/img-16.png",
        alt: "Lakeview Retreat architectural exterior cantilevered over water",
        caption: "Cantilevered structural volume floating over the waterfront",
        aspect: "h-[360px] sm:h-[480px] lg:h-[560px]",
      },
      {
        src: "/images/img-17.png",
        alt: "Lakeview Retreat outdoor dining terrace overlooking the lake",
        caption: "Shaded outdoor entertaining terrace with lake vistas",
        aspect: "h-[360px] sm:h-[480px] lg:h-[560px]",
      },
    ],
    nextProjectId: "amber-courtyard",
  },
  {
    id: "amber-courtyard",
    number: "05",
    title: "Amber Courtyard",
    category: "Heritage Restoration",
    location: "Rawalpindi Historic Quarter",
    year: "2023",
    description:
      "A colonial-era courtyard mansion sensitively restored and extended, preserving its original arched verandahs and ornamental plasterwork while integrating modern amenities.",
    heroImage: "/images/img-5.png",
    alt: "Amber Courtyard — colonial mansion restoration with preserved arched verandahs and plasterwork",
    scope: "Restoration · Interiors",
    featured: false,
    quote: "Preserving historical craftsmanship while infusing contemporary structural integrity and modern residential comfort.",
    specs: [
      { label: "Typology", value: "Heritage Mansion Adaptive Reuse" },
      { label: "Location", value: "Historic Quarter" },
      { label: "Scope", value: "Conservation & Interior Architecture" },
      { label: "Completion", value: "2023" },
    ],
    story: {
      overview:
        "Amber Courtyard involved meticulous archival restoration of a historic estate, repairing century-old brick masonry and timber rafters with period-authentic techniques.",
      spatialIntent:
        "The historic central atrium was revitalized with an operable glazed roof light, bringing climate-controlled daylight deep into the ground and first-floor galleried rooms.",
      materiality:
        "Handmade terracotta tiles, restored deodar wood columns, lime-based plaster, and aged bronze light fixtures honour the building's architectural lineage.",
    },
    gallery: [
      {
        src: "/images/img-11.png",
        alt: "Amber Courtyard architectural restoration planning sketch and details",
        caption: "Heritage joinery restoration and concept sketches",
        aspect: "h-[360px] sm:h-[480px] lg:h-[560px]",
      },
      {
        src: "/images/img-15.png",
        alt: "Amber Courtyard custom timber cabinetry and arched alcove",
        caption: "Bespoke hardwood cabinetry set within restored arched niches",
        aspect: "h-[360px] sm:h-[480px] lg:h-[560px]",
      },
    ],
    transformation: {
      beforeSrc: "/images/img-10.png",
      beforeAlt: "Interior renovation in progress — bare walls, cabinets partially installed, construction materials on floor",
      afterSrc: "/images/img-9.png",
      afterAlt: "Completed premium kitchen renovation — modern cabinetry, stone countertops, and refined lighting",
      eyebrow: "Transformation",
      heading: "From raw construction\nto refined living.",
      subtext:
        "Every restoration begins in controlled disruption. Drag to witness the complete interior transformation — from stripped walls and exposed structure to a finished, curated space.",
    },
    nextProjectId: "ridge-modern",
  },
  {
    id: "ridge-modern",
    number: "06",
    title: "Ridge Modern",
    category: "Hillside Residence",
    location: "Margalla Foothills",
    year: "2024",
    description:
      "A compact hillside home that uses split-level planning to negotiate a steep gradient, offering layered terraced gardens and panoramic ridge-line views from every room.",
    heroImage: "/images/img-6.png",
    alt: "Ridge Modern — hillside split-level residence with terraced gardens and ridge-line panoramas",
    scope: "Architecture · Landscape",
    featured: false,
    objectPosition: "center 38%",
    quote: "Stepped architecture embedded into the hillside, celebrating panoramic mountain views and natural topography.",
    specs: [
      { label: "Typology", value: "Hillside Split-Level Residence" },
      { label: "Location", value: "Margalla Foothills" },
      { label: "Scope", value: "Architecture & Terraced Landscape" },
      { label: "Completion", value: "2024" },
    ],
    story: {
      overview:
        "Rooted into a 35-degree natural incline, Ridge Modern embraces split-level geometry to minimize environmental earthwork while maximizing thermal mass advantages.",
      spatialIntent:
        "Each functional level steps backward along the slope, providing every bedroom and reception salon with a private planted green roof terrace overlooking the valley.",
      materiality:
        "Local mountain stone gabion walls, zinc standing-seam cladding, and expansive high-performance insulated glass unite durability with modern elegance.",
    },
    gallery: [
      {
        src: "/images/img-9.png",
        alt: "Ridge Modern architectural material junction and stone junction",
        caption: "Precision junction between rough stone and refined steel",
        aspect: "h-[360px] sm:h-[480px] lg:h-[560px]",
      },
      {
        src: "/images/img-13.png",
        alt: "Ridge Modern tiered approach steps with ambient low-level illumination",
        caption: "Tiered hillside steps integrated with landscape planting",
        aspect: "h-[360px] sm:h-[480px] lg:h-[560px]",
      },
    ],
    nextProjectId: "carbon-house",
  },
  {
    id: "carbon-house",
    number: "07",
    title: "Carbon House",
    category: "Urban Townhouse",
    location: "Islamabad Sector F",
    year: "2023",
    description:
      "A narrow urban plot resolved through vertical stacking and a recessed black brick skin, delivering three full floors of refined living with a rooftop garden room.",
    heroImage: "/images/interior-design1.jpg",
    alt: "Carbon House — contemporary urban townhouse interior with sculptural staircase and open living volume",
    scope: "Architecture · Construction",
    featured: false,
    quote: "Maximizing volume, light, and acoustic privacy in high-density urban living through monolithic tactile masonry.",
    specs: [
      { label: "Typology", value: "Urban Multi-Story Residence" },
      { label: "Location", value: "Urban Center" },
      { label: "Scope", value: "Architectural Planning & Execution" },
      { label: "Completion", value: "2023" },
    ],
    story: {
      overview:
        "Designed for a compact 30-foot frontage, Carbon House is an exercise in vertical efficiency, privacy screening, and acoustic insulation from the street.",
      spatialIntent:
        "A central skylit steel-and-timber staircase acts as a light chimney, illuminating all three stories and connecting public entertaining zones to private family rooms above.",
      materiality:
        "Custom charcoal-fired brick laid in alternating hit-and-miss relief, black aluminium screen louvers, and polished micro-cement floors throughout.",
    },
    gallery: [
      {
        src: "/images/img-16.png",
        alt: "Carbon House exterior façade detailing and clean vertical lines",
        caption: "Charcoal masonry façade with precision aperture setbacks",
        aspect: "h-[360px] sm:h-[480px] lg:h-[560px]",
      },
      {
        src: "/images/img-21.png",
        alt: "Carbon House textured foyer wall and minimal warm lighting",
        caption: "Atmospheric foyer with textural wall finish",
        aspect: "h-[360px] sm:h-[480px] lg:h-[560px]",
      },
    ],
    nextProjectId: "garden-villa-north",
  },
  {
    id: "garden-villa-north",
    number: "08",
    title: "Garden Villa North",
    category: "Suburban Residence",
    location: "Chak Shahzad",
    year: "2024",
    description:
      "A family residence organised around an internal garden spine that draws light deep into the plan and provides every principal room with a direct connection to planted outdoor space.",
    heroImage: "/images/img-8.png",
    alt: "Garden Villa North — family residence organised around an internal garden spine",
    scope: "Architecture · Interiors · Landscape",
    featured: false,
    quote: "A biophilic family home where garden views and natural daylight choreograph everyday living routines.",
    specs: [
      { label: "Typology", value: "Suburban Garden Villa" },
      { label: "Location", value: "Chak Shahzad" },
      { label: "Scope", value: "Turnkey Architecture & Landscape" },
      { label: "Completion", value: "2024" },
    ],
    story: {
      overview:
        "Set on a generous one-acre parcel, Garden Villa North replaces standard perimeter walls with sunken garden courtyards and deep shaded loggias.",
      spatialIntent:
        "An axial glass gallery separates the formal reception pavilions from the private family suites, creating a continuous dialogue with seasonal flora and natural water features.",
      materiality:
        "Warm sandblasted granite, bleached oak cabinetry, sheer linen textures, and double-glazed low-emissivity glass ensure serene comfort year-round.",
    },
    gallery: [
      {
        src: "/images/out door.jpg",
        alt: "Garden Villa North landscaped courtyard with a water feature and lush planting",
        caption: "Private garden courtyard with water feature and layered planting",
        aspect: "h-[360px] sm:h-[480px] lg:h-[560px]",
      },
      {
        src: "/images/outdoor-img.jpg",
        alt: "Garden Villa North illuminated garden walkway with sculpted planting",
        caption: "Illuminated garden walk connecting the villa's outdoor rooms",
        aspect: "h-[360px] sm:h-[480px] lg:h-[560px]",
      },
      {
        src: "/videos/garden-villa-pool-web.mp4",
        alt: "Garden Villa North swimming pool and landscaped villa terrace",
        caption: "Swimming pool terrace and villa frontage at blue hour",
        aspect: "h-[360px] sm:h-[480px] lg:h-[560px]",
        video: true,
        poster: "/images/outdoor-img.jpg",
      },
    ],
    nextProjectId: "meridian-estate",
  },
  {
    id: "kitchen-interior",
    number: "09",
    title: "Kitchen Interior",
    category: "Interior Renovation",
    location: "Islamabad, Pakistan",
    year: "2024",
    description:
      "A considered kitchen renovation shaped around natural light, generous preparation space and a warm, tactile material palette.",
    heroImage: "/images/interior-kitchen.jpg",
    alt: "Contemporary kitchen interior with timber cabinetry, island and integrated lighting",
    video: {
      src: "/videos/kitchen-video.mp4",
      poster: "/images/interior-kitchen.jpg",
      alt: "Contemporary kitchen interior walkthrough",
    },
    scope: "Interior Design · Renovation · Joinery",
    featured: false,
    quote: "A kitchen designed as the social heart of the home, not simply a service room.",
    specs: [
      { label: "Typology", value: "Kitchen Renovation" },
      { label: "Scope", value: "Design · Joinery · Finishes" },
      { label: "Focus", value: "Material & Lighting" },
      { label: "Completion", value: "2024" },
    ],
    story: {
      overview:
        "The kitchen was reorganised to create a clearer relationship between preparation, dining and everyday family life.",
      spatialIntent:
        "A central island anchors the room while tall storage and concealed appliances keep the visual language calm and architectural.",
      materiality:
        "Timber grain, honed stone and warm integrated lighting create a durable palette with a quiet residential character.",
    },
    gallery: [
      { src: "/images/interior-kitchen.jpg", alt: "Contemporary kitchen with timber cabinetry and island", caption: "Resolved kitchen composition and island workspace" },
      { src: "/images/kitchen-project.jpg", alt: "Kitchen renovation with dark cabinetry and warm lighting", caption: "Material contrast and concealed storage" },
      { src: "/images/before-after-3.png", alt: "Kitchen renovation before and after comparison", caption: "Before / after transformation" },
      { src: "/images/interior-design.jpg", alt: "Refined interior dining and kitchen connection", caption: "Kitchen and dining relationship" },
    ],
    nextProjectId: "living-room-interior",
  },
  {
    id: "living-room-interior",
    number: "10",
    title: "Living Room Interior",
    category: "Interior Architecture",
    location: "Islamabad, Pakistan",
    year: "2024",
    description:
      "A layered living room study where proportion, joinery, light and furniture create a calm daily setting.",
    heroImage: "/images/living-room.avif",
    alt: "Refined living room with layered lighting, timber detailing and comfortable seating",
    video: {
      src: "/videos/video.mp4",
      poster: "/images/living-room.avif",
      alt: "Living room interior walkthrough with warm architectural lighting",
    },
    scope: "Interior Architecture · Styling · Lighting",
    featured: false,
    quote: "Comfort becomes architectural when every element belongs to the same visual rhythm.",
    specs: [
      { label: "Typology", value: "Family Living Room" },
      { label: "Scope", value: "Interior Architecture" },
      { label: "Focus", value: "Light · Joinery · Texture" },
      { label: "Completion", value: "2024" },
    ],
    story: {
      overview:
        "The living room was composed as a sequence of soft thresholds rather than a single furniture arrangement.",
      spatialIntent:
        "Low joinery, framed views and layered lighting keep the room open while establishing intimate zones for conversation and rest.",
      materiality:
        "Natural timber, textured upholstery and warm stone details bring depth without competing with daylight.",
    },
    gallery: [
      { src: "/images/living-room.avif", alt: "Contemporary living room with layered lighting", caption: "Living room composition" },
      { src: "/images/interior-design.jpg", alt: "Double-height living room with timber and soft daylight", caption: "Volume, daylight and crafted joinery" },
      { src: "/images/interior-design1.jpg", alt: "Curved architectural living space with sculptural staircase", caption: "Spatial continuity and sculptural detail" },
      { src: "/images/before-after-1.png", alt: "Living room interior before and after renovation", caption: "Before / after transformation" },
    ],
    nextProjectId: "construction-portfolio",
  },
  {
    id: "construction-portfolio",
    number: "11",
    title: "Construction Portfolio",
    category: "Construction & Renovation",
    location: "Islamabad, Pakistan",
    year: "2024",
    description:
      "A field record of structural work, supervision and quality control from foundations through to completed building envelope.",
    heroImage: "/images/const-3.png",
    alt: "Active multi-storey construction site with structural frame and concrete works",
    scope: "Construction · Supervision · Quality Assurance",
    featured: false,
    quote: "Precision on site is what allows a strong design to survive contact with reality.",
    specs: [
      { label: "Typology", value: "Residential Construction" },
      { label: "Scope", value: "Structure · Site · Finishes" },
      { label: "Focus", value: "Quality Control" },
      { label: "Status", value: "Delivered Works" },
    ],
    story: {
      overview:
        "Our construction process is documented through each critical stage, keeping design intent visible from the first setting-out lines to final handover.",
      spatialIntent:
        "Site coordination, sequencing and trade management are treated as one connected design responsibility.",
      materiality:
        "Concrete, steel, masonry and finish samples are reviewed as part of a disciplined quality process.",
    },
    gallery: [
      { src: "/images/const-3.png", alt: "Multi-storey building under structural construction", caption: "Structure rising on site" },
      { src: "/images/const-2.png", alt: "Foundation reinforcement and concrete construction works", caption: "Foundation and reinforcement works" },
      { src: "/images/const-4.jpg", alt: "Urban construction site with cranes and active works", caption: "Construction coordination" },
      { src: "/images/const-5.png", alt: "Masonry and structural construction on a residential build", caption: "Envelope and masonry progress" },
      { src: "/images/const-6.png", alt: "Foundation setting-out and site preparation", caption: "Early-stage site preparation" },
    ],
    nextProjectId: "outdoor-pool-retreat",
  },
  {
    id: "outdoor-pool-retreat",
    number: "12",
    title: "Outdoor & Pool Retreat",
    category: "Landscape & Outdoor",
    location: "Chak Shahzad",
    year: "2024",
    description:
      "A garden and pool composition that extends the home into a sequence of planted outdoor rooms, terraces and water.",
    heroImage: "/images/out door.jpg",
    alt: "Landscaped villa courtyard with water feature, planting and outdoor seating",
    video: {
      src: "/videos/garden-villa-pool-web.mp4",
      poster: "/images/outdoor-img.jpg",
      alt: "Swimming pool terrace surrounded by landscaped outdoor living spaces",
    },
    scope: "Landscape · Outdoor Living · Pool",
    featured: false,
    quote: "The most memorable rooms can be open to the sky.",
    specs: [
      { label: "Typology", value: "Private Garden Retreat" },
      { label: "Scope", value: "Landscape · Pool · Lighting" },
      { label: "Focus", value: "Outdoor Living" },
      { label: "Completion", value: "2024" },
    ],
    story: {
      overview:
        "The landscape plan creates a calm progression from arrival garden to shaded seating, water and evening terrace.",
      spatialIntent:
        "Planting, paving and pool edges are arranged to make the garden feel inhabited rather than simply viewed.",
      materiality:
        "Stone, dark edging, soft planting and warm landscape lighting create a tactile outdoor palette.",
    },
    gallery: [
      { src: "/images/out door.jpg", alt: "Villa garden with water feature and lush planting", caption: "Courtyard garden and water feature" },
      { src: "/images/outdoor-img.jpg", alt: "Illuminated garden walkway with sculpted planting", caption: "Garden walk at dusk" },
      { src: "/images/top-roof project.jpg", alt: "Rooftop outdoor living terrace with seating", caption: "Outdoor room above the garden" },
      { src: "/images/setting-area.jpg", alt: "Landscaped garden setting area with outdoor seating", caption: "Setting area for everyday outdoor living" },
    ],
    nextProjectId: "architecture-planning-portfolio",
  },
  {
    id: "architecture-planning-portfolio",
    number: "13",
    title: "Architecture & Planning",
    category: "Planning & Documentation",
    location: "Islamabad, Pakistan",
    year: "2024",
    description:
      "A visual record of the drawings, models, studies and decisions that turn a brief into a buildable architectural proposal.",
    heroImage: "/images/planer-3.png",
    alt: "Architectural planning model and drawings on a design desk",
    scope: "Architecture · Planning · Documentation",
    featured: false,
    quote: "Good planning is where ambition becomes clear, coordinated and buildable.",
    specs: [
      { label: "Typology", value: "Architectural Planning" },
      { label: "Scope", value: "Concept · Approvals · Documentation" },
      { label: "Focus", value: "Clarity & Coordination" },
      { label: "Completion", value: "Ongoing Practice" },
    ],
    story: {
      overview:
        "Every project begins with a careful reading of site, brief, climate and context before a line is resolved.",
      spatialIntent:
        "Models, drawings and material studies are used together to test how an idea will be experienced and built.",
      materiality:
        "The planning process makes structure, envelope, landscape and interior decisions legible as one architectural system.",
    },
    gallery: [
      { src: "/images/planer-3.png", alt: "Architectural model and drawings on a planning desk", caption: "Model study and spatial planning" },
      { src: "/images/planer-2.jpg", alt: "Architects coordinating construction plans on site", caption: "Design coordination and site review" },
      { src: "/images/planer-4.png", alt: "Construction team reviewing architectural documentation", caption: "Documentation carried into the field" },
      { src: "/images/img-14.png", alt: "Architectural drawing and planning visual", caption: "Concept development" },
    ],
    nextProjectId: "office-project",
  },
  {
    id: "office-project",
    number: "14",
    title: "Office Project",
    category: "Commercial Interior",
    location: "Islamabad, Pakistan",
    year: "2024",
    description:
      "A bright workplace interior planned for focus, collaboration and a composed visual identity.",
    heroImage: "/images/office-hero.png",
    alt: "Bright contemporary office meeting room with city views and collaborative table",
    scope: "Commercial Interior · Workplace Planning",
    featured: false,
    quote: "A workplace should support the people who use it and express the standards of the organisation within it.",
    specs: [
      { label: "Typology", value: "Contemporary Office" },
      { label: "Scope", value: "Planning · Interior · Lighting" },
      { label: "Focus", value: "Collaboration" },
      { label: "Completion", value: "2024" },
    ],
    story: {
      overview:
        "The office plan balances concentrated work with informal collaboration through clear zoning and generous daylight.",
      spatialIntent:
        "A central meeting table and perimeter glazing establish an open, connected working environment.",
      materiality:
        "Neutral surfaces, black detailing and warm timber create a professional setting with a calm, premium character.",
    },
    gallery: [
      { src: "/images/office-hero.png", alt: "Bright office meeting room with city views", caption: "Collaborative meeting space" },
      { src: "/images/office_work.png", alt: "Contemporary office interior with workspace planning", caption: "Workplace planning and daylight" },
      { src: "/images/interior-design1.jpg", alt: "Contemporary commercial interior with sculptural architectural detail", caption: "Shared-space architectural language" },
    ],
    nextProjectId: "kitchen-interior",
  },
];
