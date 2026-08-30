export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  heroImage: string;
  alt: string;
  scope: string;
  featured: boolean;
}

export const projectsData: Project[] = [
  {
    id: "meridian-estate",
    title: "Meridian Estate",
    category: "Luxury Residential",
    description:
      "A landmark private residence defined by bold geometric massing, natural stone façades, and a seamless dialogue between interior volume and the surrounding landscape.",
    heroImage: "/images/img-1.png",
    alt: "Meridian Estate — contemporary residence with stone façade and landscaped approach at dusk",
    scope: "Architecture · Construction · Interiors",
    featured: true,
  },
  {
    id: "the-pavilion-house",
    title: "The Pavilion House",
    category: "Contemporary Villa",
    description:
      "An open-plan villa conceived around a central reflecting courtyard, where each living space unfolds as a distinct pavilion connected by covered walkways and curated garden vistas.",
    heroImage: "/images/img-2.png",
    alt: "The Pavilion House — open-plan villa with reflecting courtyard and connecting covered walkways",
    scope: "Architecture · Interiors",
    featured: false,
  },
  {
    id: "obsidian-penthouse",
    title: "Obsidian Penthouse",
    category: "High-Rise Interior",
    description:
      "A full-floor penthouse transformation in the city's premier residential tower, reinterpreted through dark materiality, bespoke joinery, and a curated art-forward program.",
    heroImage: "/images/img-3.png",
    alt: "Obsidian Penthouse — full-floor high-rise interior with dark materiality and bespoke joinery",
    scope: "Interior Architecture",
    featured: false,
  },
  {
    id: "lakeview-retreat",
    title: "Lakeview Retreat",
    category: "Waterfront Residence",
    description:
      "A private waterfront home engineered into a sloping lakeside site, with cantilevered terraces that extend the living plane directly over the water's edge.",
    heroImage: "/images/img-4.png",
    alt: "Lakeview Retreat — cantilevered waterfront residence with terraces extending over the lake",
    scope: "Architecture · Construction",
    featured: false,
  },
  {
    id: "amber-courtyard",
    title: "Amber Courtyard",
    category: "Heritage Restoration",
    description:
      "A colonial-era courtyard mansion sensitively restored and extended, preserving its original arched verandahs and ornamental plasterwork while integrating modern amenities.",
    heroImage: "/images/img-5.png",
    alt: "Amber Courtyard — colonial mansion restoration with preserved arched verandahs and plasterwork",
    scope: "Restoration · Interiors",
    featured: false,
  },
  {
    id: "ridge-modern",
    title: "Ridge Modern",
    category: "Hillside Residence",
    description:
      "A compact hillside home that uses split-level planning to negotiate a steep gradient, offering layered terraced gardens and panoramic ridge-line views from every room.",
    heroImage: "/images/img-6.png",
    alt: "Ridge Modern — hillside split-level residence with terraced gardens and ridge-line panoramas",
    scope: "Architecture · Landscape",
    featured: false,
  },
  {
    id: "carbon-house",
    title: "Carbon House",
    category: "Urban Townhouse",
    description:
      "A narrow urban plot resolved through vertical stacking and a recessed black brick skin, delivering three full floors of refined living with a rooftop garden room.",
    heroImage: "/images/img-7.png",
    alt: "Carbon House — vertical urban townhouse with recessed black brick skin and rooftop garden",
    scope: "Architecture · Construction",
    featured: false,
  },
  {
    id: "garden-villa-north",
    title: "Garden Villa North",
    category: "Suburban Residence",
    description:
      "A family residence organised around an internal garden spine that draws light deep into the plan and provides every principal room with a direct connection to planted outdoor space.",
    heroImage: "/images/img-8.png",
    alt: "Garden Villa North — family residence organised around an internal garden spine",
    scope: "Architecture · Interiors · Landscape",
    featured: false,
  },
];
