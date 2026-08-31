export interface ProjectGalleryItem {
  src: string;
  alt: string;
  caption?: string;
  aspect?: string;
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
}

export function getProjectById(id: string): Project | undefined {
  return projectsData.find((project) => project.id === id);
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
    heroImage: "/images/img-7.png",
    alt: "Carbon House — vertical urban townhouse with recessed black brick skin and rooftop garden",
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
        src: "/images/img-14.png",
        alt: "Garden Villa North garden gallery walkway",
        caption: "Internal garden gallery connecting master suites",
        aspect: "h-[360px] sm:h-[480px] lg:h-[560px]",
      },
      {
        src: "/images/img-18.png",
        alt: "Garden Villa North natural lighting over family lounge",
        caption: "Sunken courtyard providing indirect diffused daylight",
        aspect: "h-[360px] sm:h-[480px] lg:h-[560px]",
      },
    ],
    nextProjectId: "meridian-estate",
  },
];
