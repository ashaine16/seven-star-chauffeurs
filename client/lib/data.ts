/* ── Seven Star Chauffeurs — Shared Data Layer ── */

export const SITE_URL = "https://sevenstarchauffeurs.com";
export const BRAND = "Seven Star Chauffeurs";
export const TAGLINE = "Discretion, driven.";
export const PHONE = "+1 (604) 000 0000";
export const PHONE_RAW = "+16040000000";
export const EMAIL = "reservations@sevenstarchauffeurs.ca";

/* ── Vehicles ── */
export interface VehicleData {
  slug: string;
  make: string;
  model: string;
  fullName: string;
  tagline: string;
  description: string;
  longDescription: string;
  specs: { label: string; value: string }[];
  features: string[];
  bestFor: string[];
  image: string;
  imageAlt: string;
  seoTitle: string;
  seoDescription: string;
  engineSpec: string;
  seatingCapacity: number;
}

export const VEHICLES: VehicleData[] = [
  {
    slug: "rolls-royce-phantom",
    make: "Rolls-Royce",
    model: "Phantom",
    fullName: "Rolls-Royce Phantom",
    tagline: "The benchmark for chauffeured luxury.",
    description:
      "A cabin of hand-stitched leather and star-field headliner, gliding in near-silence. The Rolls-Royce Phantom is the definitive expression of what it means to be driven.",
    longDescription:
      "The Rolls-Royce Phantom is the flagship of the Seven Star fleet and the most iconic chauffeured vehicle in the world. Its 6.75-litre twin-turbo V12 delivers effortless, whisper-quiet power, while the rear cabin envelops passengers in hand-stitched leather, lambswool carpets, and the celebrated Starlight Headliner — over 1,300 fibre-optic lights hand-woven into the roof lining. Every surface is finished by hand at the Goodwood atelier in England. For airport arrivals, corporate engagements, and occasions that demand the absolute pinnacle of automotive luxury, the Phantom is without equal. Seven Star reserves this vehicle for one engagement at a time, ensuring it arrives in showroom condition for every client.",
    specs: [
      { label: "Engine", value: "6.75L Twin-Turbo V12" },
      { label: "Power", value: "563 hp" },
      { label: "Cabin", value: "Rear executive seating" },
      { label: "Headliner", value: "Starlight fibre-optic" },
      { label: "Interior", value: "Hand-stitched leather" },
      { label: "Noise level", value: "Near-silent cabin" },
    ],
    features: [
      "Starlight Headliner with 1,300+ fibre-optic lights",
      "Rear-hinged coach doors for effortless entry",
      "Lambswool floor carpets and hand-finished wood veneers",
      "Rear privacy partition available",
      "Champagne cooler and crystal flutes",
      "Wi-Fi connectivity and USB-C charging",
    ],
    bestFor: ["Airport arrivals at YVR", "Corporate engagements", "VIP diplomatic transport", "Special celebrations"],
    image: "/fleet/phantom.webp",
    imageAlt: "Rolls-Royce Phantom — Seven Star Chauffeurs' flagship luxury vehicle in Vancouver",
    seoTitle: "Rolls-Royce Phantom Chauffeur Vancouver",
    seoDescription:
      "Hire a Rolls-Royce Phantom with private chauffeur in Vancouver. Starlight headliner, hand-stitched leather, near-silent V12. Seven Star Chauffeurs — by appointment only.",
    engineSpec: "6.75L Twin-Turbo V12",
    seatingCapacity: 4,
  },
  {
    slug: "rolls-royce-ghost",
    make: "Rolls-Royce",
    model: "Ghost Series II",
    fullName: "Rolls-Royce Ghost Series II",
    tagline: "A driver's Rolls-Royce.",
    description:
      "Effortless performance paired with the pinnacle of rear-cabin refinement. The Ghost Series II is the executive's choice.",
    longDescription:
      "The Rolls-Royce Ghost Series II is the most dynamic vehicle in the Rolls-Royce range, designed for those who appreciate both driving excellence and rear-cabin luxury. Its 6.75-litre twin-turbo V12 is paired with an all-wheel-drive system and all-wheel steering, delivering a ride that is simultaneously commanding and serene. The interior features the Illuminated Fascia — a constellation of 850 stars behind the dashboard — and rear seats that recline, heat, and massage. For corporate clients who require single-driver continuity across a full day of engagements, the Ghost is the natural choice. Seven Star assigns a dedicated chauffeur to each Ghost engagement, ensuring seamless transitions between meetings, dinners, and events.",
    specs: [
      { label: "Engine", value: "6.75L Twin-Turbo V12" },
      { label: "Power", value: "563 hp" },
      { label: "Drive", value: "All-wheel drive + all-wheel steering" },
      { label: "Interior", value: "Illuminated Fascia (850 stars)" },
      { label: "Rear seats", value: "Recline, heat, massage" },
      { label: "Wheelbase", value: "Extended wheelbase" },
    ],
    features: [
      "Illuminated Fascia with 850 embedded stars",
      "All-wheel drive and all-wheel steering",
      "Rear seats with recline, heat, and massage",
      "Micro-environment purification system",
      "Bespoke audio system by Rolls-Royce",
      "Planar suspension for magic-carpet ride",
    ],
    bestFor: ["Corporate day charters", "Executive engagements", "Multi-stop business itineraries", "NDA-required engagements"],
    image: "/fleet/ghost.webp",
    imageAlt: "Rolls-Royce Ghost Series II — executive chauffeur vehicle in Vancouver",
    seoTitle: "Rolls-Royce Ghost Chauffeur Vancouver",
    seoDescription:
      "Hire a Rolls-Royce Ghost Series II with dedicated chauffeur in Vancouver. All-wheel drive, Illuminated Fascia, executive seating. Seven Star Chauffeurs.",
    engineSpec: "6.75L Twin-Turbo V12",
    seatingCapacity: 4,
  },
  {
    slug: "rolls-royce-cullinan-black-badge",
    make: "Rolls-Royce",
    model: "Cullinan Black Badge",
    fullName: "Rolls-Royce Cullinan Black Badge",
    tagline: "Unrelenting presence.",
    description:
      "The darker, more assertive expression of Rolls-Royce SUV craftsmanship. The Cullinan Black Badge commands every arrival.",
    longDescription:
      "The Rolls-Royce Cullinan Black Badge is the most commanding SUV ever created. The Black Badge treatment darkens every chrome surface to a deep, lustrous black, adds 29 additional horsepower, and firms the suspension for a more assertive driving character. Inside, the cabin is finished in contrast-stitched technical carbon fibre and the deepest black leather. For weddings, the Cullinan Black Badge is Seven Star's signature vehicle — its presence at a venue entrance is unmistakable. Custom livery, red-carpet arrival choreography, and photographer liaison are all part of the wedding engagement. The vehicle's commanding height and coach doors create a dramatic reveal for the bridal party.",
    specs: [
      { label: "Engine", value: "6.75L Twin-Turbo V12 (Black Badge)" },
      { label: "Power", value: "592 hp" },
      { label: "Body", value: "Luxury SUV" },
      { label: "Finish", value: "Darkened chrome, Black Badge" },
      { label: "Interior", value: "Technical carbon fibre + black leather" },
      { label: "Presence", value: "Commanding height, coach doors" },
    ],
    features: [
      "Black Badge darkened chrome and Spirit of Ecstasy",
      "Coach doors with dramatic bridal reveal",
      "Custom wedding livery available",
      "Red-carpet arrival choreography",
      "Photographer liaison and timing coordination",
      "Climate-controlled cabin for all seasons",
    ],
    bestFor: ["Weddings and bridal arrivals", "Red-carpet events", "Statement arrivals", "Luxury SUV experiences"],
    image: "/fleet/cullinan.webp",
    imageAlt: "Rolls-Royce Cullinan Black Badge — wedding chauffeur vehicle in Vancouver",
    seoTitle: "Rolls-Royce Cullinan Black Badge Chauffeur Vancouver",
    seoDescription:
      "Hire a Rolls-Royce Cullinan Black Badge with chauffeur in Vancouver. Perfect for weddings, red-carpet arrivals, and statement events. Seven Star Chauffeurs.",
    engineSpec: "6.75L Twin-Turbo V12 (Black Badge)",
    seatingCapacity: 5,
  },
  {
    slug: "mercedes-maybach-gls-600",
    make: "Mercedes-Maybach",
    model: "GLS 600",
    fullName: "Mercedes-Maybach GLS 600",
    tagline: "First-class for six.",
    description:
      "Reclining rear thrones, champagne flutes, and Executive Seating beyond what a sedan can offer. The Maybach GLS 600 is the ultimate hourly charter vehicle.",
    longDescription:
      "The Mercedes-Maybach GLS 600 is the world's most luxurious SUV, designed to deliver a first-class airline experience on the road. The rear cabin features two individual executive seats that recline to a near-flat position, each with heating, ventilation, massage, and individual climate zones. Between the seats, a refrigerated champagne compartment holds silver-plated flutes. The 4.0-litre biturbo V8 with EQ Boost delivers 550 horsepower with the refinement expected of the Maybach name. Seven Star offers the Maybach GLS 600 as its signature hourly charter vehicle — available for two-hour minimums, full-day retainers, and multi-day engagements. The itinerary remains open for revision throughout the engagement.",
    specs: [
      { label: "Engine", value: "4.0L Biturbo V8 + EQ Boost" },
      { label: "Power", value: "550 hp" },
      { label: "Rear seats", value: "Executive recliners with massage" },
      { label: "Climate", value: "5-zone automatic" },
      { label: "Audio", value: "Burmester 3D surround" },
      { label: "Capacity", value: "Up to 6 passengers" },
    ],
    features: [
      "Individual executive rear thrones with full recline",
      "Refrigerated champagne compartment with silver flutes",
      "Burmester 3D surround sound system",
      "5-zone climate control",
      "MBUX rear entertainment screens",
      "Maybach-specific suspension for magic-carpet ride",
    ],
    bestFor: ["Hourly charter engagements", "Wine country tours", "Multi-stop luxury itineraries", "VIP group transport"],
    image: "/fleet/maybach.webp",
    imageAlt: "Mercedes-Maybach GLS 600 — hourly charter chauffeur vehicle in Vancouver",
    seoTitle: "Mercedes-Maybach GLS 600 Chauffeur Vancouver",
    seoDescription:
      "Hire a Mercedes-Maybach GLS 600 with private chauffeur in Vancouver. Executive recliners, champagne service, Burmester audio. Seven Star Chauffeurs.",
    engineSpec: "4.0L Biturbo V8 + EQ Boost",
    seatingCapacity: 6,
  },
  {
    slug: "cadillac-escalade-iq",
    make: "Cadillac",
    model: "Escalade IQ",
    fullName: "Cadillac Escalade IQ",
    tagline: "Silent, immense, forward.",
    description:
      "Among the first fully-electric luxury chauffeur vehicles in Western Canada. The Escalade IQ represents the future of chauffeured luxury.",
    longDescription:
      "The Cadillac Escalade IQ is among the first fully-electric luxury chauffeur vehicles operating in Western Canada. Powered by GM's Ultium platform, it delivers over 750 horsepower with zero emissions and near-silent operation — the only sound is the whisper of air over its sculpted body. The interior features a 55-inch diagonal LED display, executive rear seating, and a cabin that is measurably quieter than any combustion-powered vehicle in its class. Seven Star deploys the Escalade IQ on the Sea-to-Sky Highway between Vancouver and Whistler, where its electric range, commanding presence, and silent operation make it the ideal vehicle for one of the most scenic drives in the world. Scenic stopovers at Shannon Falls and Tantalus Lookout are arranged on request.",
    specs: [
      { label: "Powertrain", value: "Fully electric (Ultium)" },
      { label: "Power", value: "750+ hp" },
      { label: "Range", value: "450+ km" },
      { label: "Display", value: "55-inch diagonal LED" },
      { label: "Emissions", value: "Zero" },
      { label: "Cabin noise", value: "Near-silent" },
    ],
    features: [
      "Fully electric with zero emissions",
      "55-inch diagonal pillar-to-pillar LED display",
      "Super Cruise hands-free driving capability",
      "Executive rear seating with massage",
      "AKG Studio Reference 36-speaker audio",
      "Over-the-air updates for latest features",
    ],
    bestFor: ["Vancouver to Whistler transfers", "Sea-to-Sky scenic drives", "Eco-conscious luxury transport", "Tech-forward clients"],
    image: "/fleet/escalade-iq.webp",
    imageAlt: "Cadillac Escalade IQ — electric luxury chauffeur vehicle on the Sea-to-Sky Highway",
    seoTitle: "Cadillac Escalade IQ Chauffeur Vancouver",
    seoDescription:
      "Hire a fully-electric Cadillac Escalade IQ with chauffeur in Vancouver. 750+ hp, zero emissions, Sea-to-Sky specialist. Seven Star Chauffeurs.",
    engineSpec: "Fully Electric (Ultium Platform)",
    seatingCapacity: 7,
  },
  {
    slug: "luxury-party-bus",
    make: "Private",
    model: "Luxury Party Bus",
    fullName: "Luxury Party Bus",
    tagline: "For celebrations that travel.",
    description:
      "A touring coach reserved exclusively for weddings, galas, and private milestones. Lounge seating for up to fourteen guests.",
    longDescription:
      "The Seven Star Luxury Party Bus is a private touring coach designed for celebrations that move between venues. Unlike conventional party buses, this vehicle is finished to the same standard as the rest of the Seven Star fleet: premium lounge seating for up to fourteen guests, an onboard bar with glassware and refrigeration, ambient lighting that can be tuned to any colour, and a climate-controlled cabin that maintains comfort regardless of season. A dedicated host chauffeur manages the experience from the front, coordinating arrivals, departures, and venue transitions. The party bus is Seven Star's signature vehicle for bachelor and bachelorette evenings, gala after-parties, wedding guest transport, and private celebrations that deserve more than a standard limousine.",
    specs: [
      { label: "Capacity", value: "Up to 14 guests" },
      { label: "Seating", value: "Premium lounge configuration" },
      { label: "Bar", value: "Onboard with refrigeration" },
      { label: "Lighting", value: "Ambient, colour-tuneable" },
      { label: "Climate", value: "Full climate control" },
      { label: "Host", value: "Dedicated host chauffeur" },
    ],
    features: [
      "Premium lounge seating for up to 14 guests",
      "Onboard bar with refrigeration and glassware",
      "Colour-tuneable ambient lighting",
      "Professional sound system",
      "Dedicated host chauffeur (separate from driver)",
      "Multi-venue coordination and timing",
    ],
    bestFor: ["Bachelor and bachelorette parties", "Wedding guest transport", "Gala and premiere after-parties", "Private celebrations"],
    image: "/fleet/party-bus.webp",
    imageAlt: "Seven Star Luxury Party Bus — private touring coach for events in Vancouver",
    seoTitle: "Luxury Party Bus Vancouver",
    seoDescription:
      "Hire a luxury party bus in Vancouver for up to 14 guests. Onboard bar, lounge seating, dedicated host. Seven Star Chauffeurs — by appointment only.",
    engineSpec: "Diesel Touring Coach",
    seatingCapacity: 14,
  },
];

/* ── Services ── */
export interface ServiceData {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  longDescription: string;
  bullets: string[];
  detailedSections: { heading: string; content: string }[];
  faq: { question: string; answer: string }[];
  image: string;
  imageAlt: string;
  vehicle: string;
  seoTitle: string;
  seoDescription: string;
}

export const SERVICES: ServiceData[] = [
  {
    slug: "airport-chauffeur-yvr",
    eyebrow: "Arrivals & Departures",
    title: "Airport Transfers at YVR",
    description:
      "Meet-and-greet at International Arrivals, luggage handled in silence, and a Phantom at the kerb before you reach the sliding doors.",
    longDescription:
      "Seven Star Chauffeurs provides the most exclusive airport transfer service at Vancouver International Airport (YVR). From the moment your flight touches down, your engagement is already underway. Your chauffeur monitors your flight in real time, adjusting arrival timing to the minute. At International Arrivals, a discreet meet-and-greet with a name board awaits — luggage is handled in silence, and a Rolls-Royce Phantom or Mercedes-Maybach GLS 600 is staged at the kerb before you reach the sliding doors. For departures, your chauffeur arrives early, assists with luggage, and ensures a seamless transition from vehicle to terminal. Seven Star's airport service covers all YVR terminals, including domestic, international, and the South Terminal for private aviation.",
    bullets: [
      "Flight monitoring with live ETA recalibration",
      "Luggage service and kerbside greet",
      "Executive seating with chilled refreshments",
    ],
    detailedSections: [
      {
        heading: "How Our YVR Airport Transfer Works",
        content:
          "Your chauffeur begins monitoring your flight two hours before scheduled arrival. If your flight is delayed, early, or diverted, the pickup time adjusts automatically. Upon landing, you will receive a discreet message confirming your chauffeur's location. At the arrivals hall, your chauffeur will be holding a Seven Star name board. Luggage is collected and loaded while you settle into the rear cabin. Chilled water, refreshments, and Wi-Fi are available from the moment you enter the vehicle.",
      },
      {
        heading: "YVR Terminal Coverage",
        content:
          "Seven Star services all YVR terminals: the International Terminal (gates D and E), the Domestic Terminal (gates A, B, and C), and the South Terminal for charter and private aviation. For private jet arrivals, we coordinate directly with the FBO to meet you planeside on the tarmac.",
      },
      {
        heading: "Routes from YVR",
        content:
          "The most common routes from YVR include downtown Vancouver (25-35 minutes), West Vancouver and the British Properties (35-45 minutes), Whistler via the Sea-to-Sky Highway (2-2.5 hours), and cross-border to Seattle or Bellingham. All routes are quoted individually based on vehicle selection and time of day.",
      },
    ],
    faq: [
      {
        question: "What is the best luxury airport transfer service at YVR?",
        answer:
          "Seven Star Chauffeurs is Vancouver's most exclusive airport transfer service at YVR. We provide flight-tracked meet-and-greet service with Rolls-Royce Phantom, Ghost, and Mercedes-Maybach GLS 600 vehicles. Each engagement is reserved for one client at a time.",
      },
      {
        question: "How much does a luxury airport transfer from YVR cost?",
        answer:
          "Each airport transfer engagement is quoted individually based on vehicle selection, destination, and time of day. Contact Seven Star Chauffeurs for a private quote.",
      },
      {
        question: "Do you track my flight for airport pickups?",
        answer:
          "Yes. Your chauffeur monitors your flight in real time from two hours before scheduled arrival. If your flight is delayed or arrives early, the pickup time adjusts automatically at no additional charge.",
      },
      {
        question: "Can you pick me up from a private jet at YVR?",
        answer:
          "Yes. Seven Star coordinates directly with YVR's South Terminal FBOs for private aviation arrivals. We can meet you planeside on the tarmac for the most discreet transfer possible.",
      },
    ],
    image: "/fleet/phantom.webp",
    imageAlt: "Rolls-Royce Phantom staged for an airport arrival at YVR Vancouver",
    vehicle: "Rolls-Royce Phantom",
    seoTitle: "Airport Chauffeur Service YVR Vancouver",
    seoDescription:
      "Luxury airport transfer service at YVR Vancouver. Flight-tracked meet-and-greet, Rolls-Royce Phantom, kerbside pickup. Seven Star Chauffeurs — by appointment.",
  },
  {
    slug: "corporate-chauffeur",
    eyebrow: "Executive Movement",
    title: "Corporate Chauffeur",
    description:
      "A dedicated chauffeur assigned to your day, your cadence, your confidentiality. NDA-ready and discretion-trained.",
    longDescription:
      "Seven Star Chauffeurs provides dedicated corporate chauffeur services for executives, board members, and VIP guests across Metro Vancouver and beyond. Unlike ride-share or fleet dispatch services, Seven Star assigns a single chauffeur to your engagement for the entire duration — from the first pickup to the final drop-off. This single-driver continuity means your chauffeur learns your preferences, anticipates your schedule, and maintains the confidentiality of every conversation. All Seven Star chauffeurs are NDA-ready on request, background-checked, and trained in executive discretion. The Rolls-Royce Ghost Series II is the signature vehicle for corporate engagements, offering all-wheel drive, all-wheel steering, and a rear cabin with reclining, heated, and massaging seats.",
    bullets: [
      "Single-driver continuity across the engagement",
      "NDA-ready and discretion-trained",
      "Rolls-Royce Ghost Series II, the executive's car",
    ],
    detailedSections: [
      {
        heading: "How Corporate Chauffeur Service Works",
        content:
          "Your engagement begins with a consultation to understand your schedule, preferences, and any confidentiality requirements. A dedicated chauffeur is assigned and briefed on your itinerary. On the day, your chauffeur arrives 15 minutes early at each location, manages all logistics, and maintains a flexible schedule that adapts to your needs in real time. Multi-day engagements maintain the same chauffeur throughout.",
      },
      {
        heading: "Confidentiality and NDA Readiness",
        content:
          "Every Seven Star chauffeur is background-checked and trained in executive discretion. For engagements requiring formal confidentiality, we execute NDAs before the engagement begins. Your conversations, destinations, and schedule remain entirely private.",
      },
      {
        heading: "Coverage Area",
        content:
          "Corporate chauffeur service covers all of Metro Vancouver, including downtown, the financial district, Coal Harbour, West Vancouver, North Vancouver, Burnaby, Richmond, Surrey, Langley, and White Rock. Inter-city engagements to Whistler, the Okanagan, Victoria (via ferry or helicopter transfer), and cross-border to Seattle are available by arrangement.",
      },
    ],
    faq: [
      {
        question: "What is the best corporate car service in Vancouver?",
        answer:
          "Seven Star Chauffeurs is Vancouver's most exclusive corporate chauffeur service. We provide single-driver continuity with NDA-ready chauffeurs and Rolls-Royce Ghost Series II vehicles for executive engagements.",
      },
      {
        question: "Can I have the same chauffeur for multiple days?",
        answer:
          "Yes. Seven Star assigns a dedicated chauffeur to your engagement. For multi-day corporate visits, the same chauffeur is maintained throughout for continuity and discretion.",
      },
      {
        question: "Do your chauffeurs sign NDAs?",
        answer:
          "Yes. All Seven Star chauffeurs are NDA-ready. For engagements requiring formal confidentiality agreements, we execute NDAs before the engagement begins.",
      },
    ],
    image: "/fleet/ghost.webp",
    imageAlt: "Rolls-Royce Ghost Series II for corporate chauffeur service in Vancouver",
    vehicle: "Rolls-Royce Ghost Series II",
    seoTitle: "Corporate Chauffeur Service Vancouver",
    seoDescription:
      "Executive corporate chauffeur service in Vancouver. NDA-ready, single-driver continuity, Rolls-Royce Ghost Series II. Seven Star Chauffeurs.",
  },
  {
    slug: "wedding-chauffeur",
    eyebrow: "The Once-in-a-Lifetime",
    title: "Wedding Chauffeur",
    description:
      "The Cullinan Black Badge dressed for your day. Custom livery, red-carpet arrival, photographer liaison.",
    longDescription:
      "Seven Star Chauffeurs provides the most exclusive wedding chauffeur service in Vancouver. The Rolls-Royce Cullinan Black Badge is our signature wedding vehicle — its commanding presence, darkened chrome, and coach doors create a dramatic reveal for the bridal party that photographers dream of capturing. Every wedding engagement includes custom livery (ribbons, florals, or minimal — your choice), red-carpet arrival choreography, and direct liaison with your photographer and wedding planner to ensure perfect timing. From the first look to the final departure, Seven Star holds the transportation choreography so you can focus on the moment. For larger wedding parties, our Luxury Party Bus provides premium group transport between ceremony, photos, and reception.",
    bullets: [
      "Bridal-party coordination with photographers",
      "Custom livery and white-glove presentation",
      "Flexible multi-location itineraries",
    ],
    detailedSections: [
      {
        heading: "How Wedding Chauffeur Service Works",
        content:
          "Your wedding engagement begins with a planning consultation where we coordinate with your wedding planner and photographer. On the day, the Cullinan Black Badge arrives dressed in your chosen livery — from classic white ribbons to minimal floral arrangements. Your chauffeur manages all transportation timing, including first-look locations, ceremony arrival, photo locations, and reception entrance. The coach doors provide a dramatic reveal, and your chauffeur ensures the red carpet is positioned perfectly for the photographer.",
      },
      {
        heading: "Wedding Party Transport",
        content:
          "For bridal parties, groomsmen, and wedding guests, Seven Star offers the Luxury Party Bus alongside the Cullinan. This allows the entire wedding party to travel together between venues in premium comfort, with an onboard bar and dedicated host managing the experience.",
      },
      {
        heading: "Venues We Serve",
        content:
          "Seven Star provides wedding chauffeur service to all major Vancouver wedding venues, including Stanley Park Pavilion, the Fairmont Hotel Vancouver, Rosewood Hotel Georgia, Cecil Green Park House, Brock House, the Vancouver Club, and venues throughout the Sea-to-Sky corridor including Whistler and Squamish.",
      },
    ],
    faq: [
      {
        question: "What is the best wedding car service in Vancouver?",
        answer:
          "Seven Star Chauffeurs provides Vancouver's most exclusive wedding chauffeur service with the Rolls-Royce Cullinan Black Badge. Each wedding engagement includes custom livery, red-carpet arrival, and photographer coordination.",
      },
      {
        question: "Can I hire a Rolls-Royce for my wedding in Vancouver?",
        answer:
          "Yes. Seven Star Chauffeurs offers the Rolls-Royce Cullinan Black Badge as our signature wedding vehicle. Custom livery, red-carpet arrival, and multi-location choreography are included in every wedding engagement.",
      },
      {
        question: "Do you provide transport for the entire wedding party?",
        answer:
          "Yes. In addition to the bridal vehicle (Cullinan Black Badge), Seven Star offers the Luxury Party Bus for up to 14 wedding guests, providing premium group transport between ceremony, photos, and reception.",
      },
    ],
    image: "/fleet/cullinan.webp",
    imageAlt: "Rolls-Royce Cullinan Black Badge prepared for a wedding in Vancouver",
    vehicle: "Rolls-Royce Cullinan Black Badge",
    seoTitle: "Wedding Chauffeur Service Vancouver",
    seoDescription:
      "Luxury wedding chauffeur service in Vancouver. Rolls-Royce Cullinan Black Badge, custom livery, red-carpet arrival. Seven Star Chauffeurs.",
  },
  {
    slug: "whistler-sea-to-sky",
    eyebrow: "The Coastal Highway",
    title: "Whistler & Sea-to-Sky",
    description:
      "The Cadillac Escalade IQ. Silent-running electric on the most photographed highway in the world.",
    longDescription:
      "Seven Star Chauffeurs operates the most exclusive private transfer service between Vancouver and Whistler along the legendary Sea-to-Sky Highway. The Cadillac Escalade IQ — fully electric, near-silent, and commanding — is our signature vehicle for this route. The 120-kilometre journey passes through some of British Columbia's most dramatic scenery: the Howe Sound coastline, Shannon Falls, the Tantalus Range viewpoint, and Brandywine Falls. Seven Star offers scenic stopovers at any point along the route, transforming a simple transfer into a curated experience. Whether you are heading to Whistler for skiing, a corporate retreat, a wedding, or a weekend escape, the Escalade IQ delivers you in silence and luxury.",
    bullets: [
      "Round-trip or one-way between Vancouver and Whistler",
      "Scenic-stop itineraries curated by request",
      "Fully-electric luxury SUV",
    ],
    detailedSections: [
      {
        heading: "The Sea-to-Sky Experience",
        content:
          "The Sea-to-Sky Highway (Highway 99) is consistently rated one of the most scenic drives in the world. Seven Star's Whistler transfer transforms this journey from a commute into an experience. Your chauffeur can arrange stopovers at Shannon Falls Provincial Park, the Sea-to-Sky Gondola in Squamish, the Tantalus Lookout, Brandywine Falls, and any other point of interest along the route. The Escalade IQ's panoramic roof and near-silent electric drivetrain make the scenery the centrepiece.",
      },
      {
        heading: "Whistler Destinations",
        content:
          "Seven Star provides door-to-door service to all Whistler destinations, including Whistler Village, the Four Seasons Resort, the Fairmont Chateau Whistler, Nita Lake Lodge, and private residences throughout Whistler and Pemberton. Ski-season transfers include equipment handling.",
      },
      {
        heading: "Why Electric for the Sea-to-Sky",
        content:
          "The Cadillac Escalade IQ's fully-electric drivetrain is ideally suited to the Sea-to-Sky Highway. Its 450+ kilometre range comfortably covers the round trip, its instant torque handles the highway's elevation changes effortlessly, and its near-silent operation allows passengers to enjoy the scenery without engine noise. It is also the most environmentally responsible choice for travelling through some of British Columbia's most pristine natural landscapes.",
      },
    ],
    faq: [
      {
        question: "How do I get from Vancouver to Whistler in luxury?",
        answer:
          "Seven Star Chauffeurs provides private luxury transfers between Vancouver and Whistler in the fully-electric Cadillac Escalade IQ. The journey takes approximately 2-2.5 hours with optional scenic stopovers along the Sea-to-Sky Highway.",
      },
      {
        question: "How much does a private transfer from Vancouver to Whistler cost?",
        answer:
          "Each Vancouver-to-Whistler transfer is quoted individually based on vehicle selection, number of passengers, and whether scenic stopovers are requested. Contact Seven Star Chauffeurs for a private quote.",
      },
      {
        question: "Can you stop at Shannon Falls or the Sea-to-Sky Gondola?",
        answer:
          "Yes. Seven Star offers curated scenic stopovers at Shannon Falls, the Sea-to-Sky Gondola, Tantalus Lookout, Brandywine Falls, and any other point of interest along the route. Simply request your preferred stops when booking.",
      },
    ],
    image: "/fleet/escalade-iq.webp",
    imageAlt: "Cadillac Escalade IQ on the Sea-to-Sky Highway between Vancouver and Whistler",
    vehicle: "Cadillac Escalade IQ",
    seoTitle: "Whistler & Sea-to-Sky Private Transfer",
    seoDescription:
      "Luxury private transfer Vancouver to Whistler via Sea-to-Sky Highway. Fully-electric Cadillac Escalade IQ, scenic stopovers. Seven Star Chauffeurs.",
  },
  {
    slug: "nightlife-events",
    eyebrow: "After Dark",
    title: "Nightlife & Events",
    description:
      "The touring coach for galas, premieres, and bachelor(ette) evenings. Climate-controlled lounge seating for up to fourteen.",
    longDescription:
      "Seven Star Chauffeurs provides premium nightlife and event transportation for groups of up to fourteen guests. The Luxury Party Bus is a private touring coach designed for celebrations that move between venues — galas, premieres, bachelor and bachelorette parties, milestone birthdays, and corporate entertainment evenings. Unlike standard party buses, the Seven Star touring coach is finished to luxury standards: premium lounge seating, an onboard bar with refrigeration and proper glassware, colour-tuneable ambient lighting, and a professional sound system. A dedicated host chauffeur manages the experience from the front, coordinating arrivals, departures, and venue transitions so your group can focus entirely on the celebration.",
    bullets: [
      "Lounge seating for up to fourteen",
      "Onboard bar and ambient lighting",
      "Dedicated host beyond the driver",
    ],
    detailedSections: [
      {
        heading: "How Nightlife & Events Service Works",
        content:
          "Your engagement begins with an itinerary consultation. Share your venue list, timing preferences, and any special requests. On the evening, the party bus arrives at your starting location with the bar stocked and lighting set to your preference. Your dedicated host manages all logistics — coordinating with venue security, managing arrival timing, and ensuring smooth transitions between stops. The driver handles all navigation and parking.",
      },
      {
        heading: "Popular Event Routes",
        content:
          "Seven Star's nightlife service covers all of Metro Vancouver's entertainment districts, including Yaletown, Gastown, Granville Street, Coal Harbour, and Kitsilano. For gala events, we service the Vancouver Convention Centre, the Chan Centre, Queen Elizabeth Theatre, and the Orpheum. Cross-venue routes are customised to your group's preferences.",
      },
      {
        heading: "Bachelor & Bachelorette Parties",
        content:
          "The party bus is Seven Star's most popular vehicle for bachelor and bachelorette celebrations. The onboard bar, sound system, and ambient lighting create a mobile celebration space, while the dedicated host ensures the evening runs on schedule. Multi-venue itineraries are our specialty — from dinner to drinks to dancing, with seamless transitions between each stop.",
      },
    ],
    faq: [
      {
        question: "What is the best party bus service in Vancouver?",
        answer:
          "Seven Star Chauffeurs operates Vancouver's most exclusive luxury party bus. Premium lounge seating for up to 14 guests, onboard bar, ambient lighting, and a dedicated host chauffeur. By appointment only.",
      },
      {
        question: "How many people can fit in the party bus?",
        answer:
          "The Seven Star Luxury Party Bus accommodates up to 14 guests in premium lounge seating. A dedicated host chauffeur manages the experience separately from the driver.",
      },
    ],
    image: "/fleet/party-bus.webp",
    imageAlt: "Seven Star Luxury Party Bus for nightlife and events in Vancouver",
    vehicle: "Luxury Party Bus",
    seoTitle: "Luxury Nightlife & Event Transport Vancouver",
    seoDescription:
      "Luxury party bus and event transportation in Vancouver. Up to 14 guests, onboard bar, dedicated host. Seven Star Chauffeurs — by appointment.",
  },
  {
    slug: "hourly-charter",
    eyebrow: "By the Hour",
    title: "Hourly Charter",
    description:
      "The Mercedes-Maybach GLS 600 on retainer. Two-hour minimum, champagne service, revisable itinerary.",
    longDescription:
      "Seven Star Chauffeurs offers hourly charter service with the Mercedes-Maybach GLS 600 — the world's most luxurious SUV, available on retainer for two hours, eight hours, or a full day. Hourly charter is the most flexible engagement type: your itinerary remains open for revision throughout, your chauffeur adapts to your schedule in real time, and the vehicle is exclusively yours for the duration. The Maybach GLS 600's rear cabin features individual executive seats that recline to a near-flat position, a refrigerated champagne compartment with silver-plated flutes, Burmester 3D surround sound, and 5-zone climate control. Whether you are exploring Vancouver's wine country, attending multiple meetings, or simply want a luxury vehicle at your disposal, hourly charter delivers first-class flexibility.",
    bullets: [
      "Minimum two-hour bookings",
      "Champagne and refreshment service",
      "Dynamic itinerary, revise en route",
    ],
    detailedSections: [
      {
        heading: "How Hourly Charter Works",
        content:
          "Reserve the Maybach GLS 600 for a minimum of two hours. Your chauffeur arrives at your specified location, and from that moment, the vehicle and chauffeur are exclusively yours. There is no fixed route — your itinerary can be revised at any point during the engagement. Need to add a stop? Change a destination? Extend the booking? Simply inform your chauffeur.",
      },
      {
        heading: "Popular Charter Itineraries",
        content:
          "Common hourly charter uses include wine-country tours through the Fraser Valley, shopping excursions to Robson Street and South Granville, multi-meeting corporate days, real estate viewings, and exploratory tours of Vancouver for visiting executives or dignitaries. Full-day charters are popular for wedding-day transportation coordination.",
      },
      {
        heading: "What is Included",
        content:
          "Every hourly charter includes the Mercedes-Maybach GLS 600, a dedicated chauffeur, chilled champagne and refreshments, Wi-Fi connectivity, and the flexibility to revise your itinerary at any point. Extended charters (8+ hours) include a chauffeur meal break, which is coordinated to align with your schedule.",
      },
    ],
    faq: [
      {
        question: "What is the minimum booking for hourly charter?",
        answer:
          "Seven Star Chauffeurs requires a minimum two-hour booking for hourly charter service with the Mercedes-Maybach GLS 600. Extended bookings of 8 hours or a full day are available.",
      },
      {
        question: "Can I change my itinerary during the charter?",
        answer:
          "Yes. Hourly charter is Seven Star's most flexible engagement type. Your itinerary remains open for revision throughout the booking — simply inform your chauffeur of any changes.",
      },
    ],
    image: "/fleet/maybach.webp",
    imageAlt: "Mercedes-Maybach GLS 600 for hourly charter service in Vancouver",
    vehicle: "Mercedes-Maybach GLS 600",
    seoTitle: "Hourly Charter Chauffeur Service Vancouver",
    seoDescription:
      "Hourly charter chauffeur service in Vancouver. Mercedes-Maybach GLS 600, champagne service, flexible itinerary. Seven Star Chauffeurs — by appointment.",
  },
];

/* ── Areas Served ── */
export interface AreaData {
  slug: string;
  city: string;
  region: string;
  description: string;
  longDescription: string;
  highlights: string[];
  popularServices: string[];
  landmarks: string[];
  seoTitle: string;
  seoDescription: string;
  lat: number;
  lng: number;
}

export const AREAS: AreaData[] = [
  {
    slug: "luxury-chauffeur-vancouver",
    city: "Vancouver",
    region: "Metro Vancouver",
    description: "Vancouver is the heart of Seven Star Chauffeurs' operations. From Coal Harbour to Kitsilano, Shaughnessy to Yaletown, we provide luxury chauffeur service across every neighbourhood in the city.",
    longDescription: "Seven Star Chauffeurs is headquartered in Vancouver, British Columbia, and provides luxury chauffeur service across every neighbourhood in the city. Vancouver is home to Canada's most vibrant luxury market, with world-class hotels, Michelin-starred restaurants, and a thriving corporate district centred on Burrard Street and Coal Harbour. Our fleet of Rolls-Royce, Mercedes-Maybach, and Cadillac vehicles is available 24 hours a day for airport transfers from YVR, corporate engagements, weddings, nightlife, and hourly charter. Whether you need a Rolls-Royce Phantom for an arrival at the Fairmont Pacific Rim or a Maybach GLS 600 for a day of meetings in the financial district, Seven Star delivers the most exclusive chauffeured experience in Vancouver.",
    highlights: ["Downtown financial district", "Coal Harbour and Canada Place", "Shaughnessy and Kerrisdale", "Yaletown and False Creek", "Kitsilano and Point Grey", "UBC campus and Pacific Spirit Park"],
    popularServices: ["Airport transfers from YVR", "Corporate chauffeur", "Wedding chauffeur", "Hourly charter", "Nightlife and events"],
    landmarks: ["Fairmont Pacific Rim", "Rosewood Hotel Georgia", "Vancouver Convention Centre", "Stanley Park", "Canada Place"],
    seoTitle: "Luxury Chauffeur Service Vancouver",
    seoDescription: "Vancouver's most exclusive luxury chauffeur service. Rolls-Royce, Maybach, Escalade IQ. Airport transfers, corporate, weddings. Seven Star Chauffeurs.",
    lat: 49.2827,
    lng: -123.1207,
  },
  {
    slug: "chauffeur-service-whistler",
    city: "Whistler",
    region: "Sea-to-Sky",
    description: "Luxury chauffeur service between Vancouver and Whistler via the Sea-to-Sky Highway. Scenic transfers in the fully-electric Cadillac Escalade IQ.",
    longDescription: "Seven Star Chauffeurs provides luxury private transfers between Vancouver and Whistler, one of North America's premier mountain resort destinations. The journey along the Sea-to-Sky Highway is one of the most scenic drives in the world, passing through the Howe Sound coastline, Shannon Falls, and the Tantalus Range. Our signature vehicle for this route is the fully-electric Cadillac Escalade IQ, offering zero-emission luxury with commanding presence and near-silent operation. We provide door-to-door service to all Whistler hotels and residences, including the Four Seasons Resort, Fairmont Chateau Whistler, Nita Lake Lodge, and private homes throughout Whistler and Pemberton. Ski-season transfers include equipment handling.",
    highlights: ["Whistler Village", "Four Seasons Resort Whistler", "Fairmont Chateau Whistler", "Whistler Blackcomb ski resort", "Nita Lake Lodge", "Pemberton"],
    popularServices: ["Vancouver to Whistler transfer", "Whistler to Vancouver transfer", "Scenic Sea-to-Sky experience", "Ski-season transfers", "Wedding transfers"],
    landmarks: ["Whistler Village", "Shannon Falls", "Sea-to-Sky Gondola", "Tantalus Lookout", "Brandywine Falls"],
    seoTitle: "Chauffeur Service Whistler | Vancouver to Whistler Transfer",
    seoDescription: "Luxury private transfer Vancouver to Whistler. Fully-electric Cadillac Escalade IQ, scenic Sea-to-Sky stopovers. Seven Star Chauffeurs.",
    lat: 50.1163,
    lng: -122.9574,
  },
  {
    slug: "chauffeur-service-west-vancouver",
    city: "West Vancouver",
    region: "North Shore",
    description: "Luxury chauffeur service in West Vancouver. From the British Properties to Horseshoe Bay, Seven Star serves the North Shore's most exclusive neighbourhoods.",
    longDescription: "Seven Star Chauffeurs provides luxury chauffeur service throughout West Vancouver, home to some of the most exclusive residential neighbourhoods in Canada. The British Properties, Chartwell, Altamont, and Sentinel Hill are among the most prestigious addresses in Metro Vancouver, and Seven Star's fleet is a natural fit for residents and visitors in these communities. We provide airport transfers from YVR to West Vancouver (approximately 35-45 minutes), corporate chauffeur service for executives commuting to downtown Vancouver, and event transportation to venues throughout the North Shore. Our vehicles also service Horseshoe Bay for BC Ferries connections to Vancouver Island and the Sunshine Coast.",
    highlights: ["British Properties", "Chartwell", "Altamont", "Horseshoe Bay", "Dundarave Village", "Ambleside"],
    popularServices: ["Airport transfers from YVR", "Corporate commute to downtown", "Horseshoe Bay ferry connections", "Event transportation", "Hourly charter"],
    landmarks: ["Park Royal Shopping Centre", "Lighthouse Park", "Cypress Mountain", "Horseshoe Bay Terminal", "West Vancouver Yacht Club"],
    seoTitle: "Chauffeur Service West Vancouver",
    seoDescription: "Luxury chauffeur service in West Vancouver. British Properties, Horseshoe Bay, North Shore. Rolls-Royce, Maybach. Seven Star Chauffeurs.",
    lat: 49.3280,
    lng: -123.1600,
  },
  {
    slug: "chauffeur-service-north-vancouver",
    city: "North Vancouver",
    region: "North Shore",
    description: "Luxury chauffeur service in North Vancouver. From Lonsdale Quay to Deep Cove, Seven Star covers the entire North Shore.",
    longDescription: "Seven Star Chauffeurs provides luxury chauffeur service throughout North Vancouver, from the vibrant Lonsdale waterfront to the serene beauty of Deep Cove. North Vancouver is home to a growing number of corporate offices, luxury residences, and world-class outdoor attractions, making it an important service area for Seven Star. We provide airport transfers from YVR to North Vancouver, corporate chauffeur service for executives, and scenic transfers to attractions like the Capilano Suspension Bridge, Grouse Mountain, and Lynn Canyon. The Lions Gate Bridge connects North Vancouver to downtown in approximately 15-20 minutes, making it an ideal base for executives who want proximity to nature without sacrificing access to the city centre.",
    highlights: ["Lonsdale Quay", "Deep Cove", "Edgemont Village", "Lynn Valley", "Lower Lonsdale", "Dollarton"],
    popularServices: ["Airport transfers from YVR", "Corporate chauffeur", "Scenic transfers to Grouse Mountain", "Event transportation", "Hourly charter"],
    landmarks: ["Capilano Suspension Bridge", "Grouse Mountain", "Lonsdale Quay Market", "Lynn Canyon Park", "Seymour Mountain"],
    seoTitle: "Chauffeur Service North Vancouver",
    seoDescription: "Luxury chauffeur service in North Vancouver. Lonsdale, Deep Cove, Grouse Mountain. Rolls-Royce, Maybach. Seven Star Chauffeurs.",
    lat: 49.3200,
    lng: -123.0724,
  },
  {
    slug: "chauffeur-service-burnaby",
    city: "Burnaby",
    region: "Metro Vancouver",
    description: "Luxury chauffeur service in Burnaby. Corporate transfers to Metrotown, the BCIT campus, and Burnaby's business districts.",
    longDescription: "Seven Star Chauffeurs provides luxury chauffeur service throughout Burnaby, Metro Vancouver's geographic centre and a major corporate hub. Burnaby is home to the Metropolis at Metrotown (Western Canada's largest shopping centre), the BCIT campus, and a growing number of corporate headquarters and tech companies along the Lougheed Highway corridor. Seven Star provides airport transfers from YVR to Burnaby, corporate chauffeur service for executives, and event transportation to venues including the Hilton Metrotown, the Grand Villa Casino, and Burnaby Mountain. Our vehicles navigate Burnaby's key corridors — Kingsway, Hastings, and the Trans-Canada Highway — with the discretion and comfort expected of a luxury chauffeur service.",
    highlights: ["Metrotown", "Burnaby Heights", "Brentwood", "Deer Lake", "SFU campus", "Burnaby Mountain"],
    popularServices: ["Airport transfers from YVR", "Corporate chauffeur", "Event transportation", "Hourly charter"],
    landmarks: ["Metropolis at Metrotown", "Deer Lake Park", "Simon Fraser University", "Burnaby Village Museum", "Central Park"],
    seoTitle: "Chauffeur Service Burnaby",
    seoDescription: "Luxury chauffeur service in Burnaby. Metrotown, Brentwood, SFU. Corporate transfers, airport pickups. Seven Star Chauffeurs.",
    lat: 49.2488,
    lng: -122.9805,
  },
  {
    slug: "chauffeur-service-richmond",
    city: "Richmond",
    region: "Metro Vancouver",
    description: "Luxury chauffeur service in Richmond. YVR airport transfers, casino events, and corporate transport in Vancouver's gateway city.",
    longDescription: "Seven Star Chauffeurs provides luxury chauffeur service throughout Richmond, the gateway to Metro Vancouver and home to Vancouver International Airport (YVR). Richmond's proximity to YVR makes it a natural hub for airport transfer services, and Seven Star's fleet is stationed to provide rapid response to all YVR terminals. Beyond airport transfers, Richmond is home to the River Rock Casino Resort, the Richmond Olympic Oval, and a thriving business district along No. 3 Road. Seven Star provides corporate chauffeur service, event transportation, and hourly charter throughout Richmond, including Steveston Village, the Richmond Centre area, and the Terra Nova waterfront.",
    highlights: ["YVR Airport", "Steveston Village", "Richmond Centre", "River Rock Casino", "Terra Nova", "Bridgeport"],
    popularServices: ["YVR airport transfers", "Casino event transportation", "Corporate chauffeur", "Hourly charter"],
    landmarks: ["Vancouver International Airport (YVR)", "River Rock Casino Resort", "Richmond Olympic Oval", "Steveston Fisherman's Wharf", "Aberdeen Centre"],
    seoTitle: "Chauffeur Service Richmond BC",
    seoDescription: "Luxury chauffeur service in Richmond BC. YVR airport transfers, casino events, corporate transport. Seven Star Chauffeurs.",
    lat: 49.1666,
    lng: -123.1336,
  },
  {
    slug: "chauffeur-service-surrey",
    city: "Surrey",
    region: "Metro Vancouver",
    description: "Luxury chauffeur service in Surrey. Corporate transfers, wedding chauffeur, and event transportation across BC's second-largest city.",
    longDescription: "Seven Star Chauffeurs provides luxury chauffeur service throughout Surrey, British Columbia's second-largest city and one of Metro Vancouver's fastest-growing business centres. Surrey's diverse communities — from the emerging City Centre to the established neighbourhoods of South Surrey and White Rock border — represent a growing market for luxury transportation. Seven Star provides airport transfers from YVR to all Surrey neighbourhoods, corporate chauffeur service for the growing number of executives based in Surrey's business parks, wedding chauffeur service for venues throughout the Fraser Valley, and event transportation. The Rolls-Royce Cullinan Black Badge is a popular choice for Surrey weddings, while the Ghost Series II serves the corporate corridor.",
    highlights: ["Surrey City Centre", "South Surrey", "Cloverdale", "Fleetwood", "Newton", "Guildford"],
    popularServices: ["Airport transfers from YVR", "Wedding chauffeur", "Corporate chauffeur", "Event transportation"],
    landmarks: ["Surrey Civic Plaza", "Bear Creek Park", "Historic Cloverdale", "Guildford Town Centre", "Surrey Arts Centre"],
    seoTitle: "Chauffeur Service Surrey BC",
    seoDescription: "Luxury chauffeur service in Surrey BC. Weddings, corporate transfers, airport pickups. Rolls-Royce, Maybach. Seven Star Chauffeurs.",
    lat: 49.1913,
    lng: -122.8490,
  },
  {
    slug: "chauffeur-service-langley",
    city: "Langley",
    region: "Fraser Valley",
    description: "Luxury chauffeur service in Langley. Wine country tours, wedding chauffeur, and corporate transfers in the Fraser Valley.",
    longDescription: "Seven Star Chauffeurs provides luxury chauffeur service throughout Langley, the gateway to British Columbia's Fraser Valley wine country. Langley's combination of rural charm and growing urban sophistication makes it an increasingly important market for luxury transportation. The Township of Langley is home to award-winning wineries, equestrian estates, and some of the Fraser Valley's most sought-after wedding venues, while the City of Langley offers a compact urban centre with growing corporate activity. Seven Star provides airport transfers from YVR to Langley, wedding chauffeur service for Fraser Valley venues, wine-country tours with the Mercedes-Maybach GLS 600, and corporate chauffeur service for executives commuting to Vancouver. The Rolls-Royce Cullinan Black Badge is the signature vehicle for Langley weddings, while the Maybach GLS 600 is the preferred choice for wine-country charter.",
    highlights: ["Fort Langley", "Willowbrook", "Walnut Grove", "Murrayville", "Brookswood", "Aldergrove"],
    popularServices: ["Wine country tours", "Wedding chauffeur", "Airport transfers from YVR", "Corporate chauffeur", "Hourly charter"],
    landmarks: ["Fort Langley National Historic Site", "Campbell Valley Regional Park", "Langley Events Centre", "Willowbrook Shopping Centre", "Fraser Valley wineries"],
    seoTitle: "Chauffeur Service Langley BC",
    seoDescription: "Luxury chauffeur service in Langley BC. Wine country tours, weddings, airport transfers. Rolls-Royce, Maybach. Seven Star Chauffeurs.",
    lat: 49.1044,
    lng: -122.6615,
  },
  {
    slug: "chauffeur-service-white-rock",
    city: "White Rock",
    region: "South Surrey",
    description: "Luxury chauffeur service in White Rock. Oceanfront events, cross-border transfers, and wedding chauffeur on the Semiahmoo Peninsula.",
    longDescription: "Seven Star Chauffeurs provides luxury chauffeur service in White Rock, the picturesque oceanfront community on the Semiahmoo Peninsula. White Rock's stunning beachfront promenade, upscale dining scene, and proximity to the US border make it a unique service area for luxury transportation. Seven Star provides airport transfers from YVR to White Rock, wedding chauffeur service for oceanfront venues, cross-border transfers to Bellingham and Seattle via the Peace Arch crossing, and hourly charter for exploring the South Surrey and White Rock area. The community's relaxed luxury lifestyle and growing number of high-end residences make it a natural market for Seven Star's fleet. The Rolls-Royce Phantom is a popular choice for White Rock arrivals, while the Escalade IQ serves cross-border transfers with its commanding electric presence.",
    highlights: ["White Rock Beach", "Marine Drive", "Five Corners", "Semiahmoo Peninsula", "Peace Arch Border Crossing", "Crescent Beach"],
    popularServices: ["Airport transfers from YVR", "Cross-border transfers to Seattle", "Wedding chauffeur", "Oceanfront event transport", "Hourly charter"],
    landmarks: ["White Rock Pier", "White Rock Beach", "Peace Arch Provincial Park", "Semiahmoo Bay", "Marine Drive restaurants"],
    seoTitle: "Chauffeur Service White Rock BC",
    seoDescription: "Luxury chauffeur service in White Rock BC. Oceanfront events, cross-border transfers, weddings. Rolls-Royce, Maybach. Seven Star Chauffeurs.",
    lat: 49.0253,
    lng: -122.8029,
  },
  {
    slug: "chauffeur-service-sea-to-sky",
    city: "Sea-to-Sky Corridor",
    region: "Sea-to-Sky",
    description: "Luxury chauffeur service along the Sea-to-Sky Corridor. Squamish, Britannia Beach, and the highway between Vancouver and Whistler.",
    longDescription: "Seven Star Chauffeurs provides luxury chauffeur service along the entire Sea-to-Sky Corridor, from Horseshoe Bay to Pemberton. This 150-kilometre stretch of Highway 99 is one of the most scenic drives in the world, passing through Britannia Beach, Squamish, and the Tantalus Range before arriving in Whistler. Seven Star's Cadillac Escalade IQ is the signature vehicle for Sea-to-Sky transfers, offering fully-electric luxury with zero emissions — an important consideration when travelling through some of British Columbia's most pristine natural landscapes. We provide transfers to all Sea-to-Sky destinations, including the Sea-to-Sky Gondola in Squamish, Shannon Falls, Brackendale, and the growing number of luxury residences and corporate retreats along the corridor.",
    highlights: ["Squamish", "Britannia Beach", "Brackendale", "Furry Creek", "Lions Bay", "Pemberton"],
    popularServices: ["Vancouver to Whistler transfer", "Squamish transfers", "Scenic highway experience", "Corporate retreat transport", "Wedding transfers"],
    landmarks: ["Sea-to-Sky Gondola", "Shannon Falls", "Stawamus Chief", "Britannia Mine Museum", "Tantalus Lookout"],
    seoTitle: "Chauffeur Service Sea-to-Sky Corridor",
    seoDescription: "Luxury chauffeur service along the Sea-to-Sky Corridor. Vancouver to Whistler, Squamish, scenic transfers. Seven Star Chauffeurs.",
    lat: 49.7016,
    lng: -123.1558,
  },
  {
    slug: "chauffeur-service-okanagan",
    city: "Okanagan",
    region: "Interior BC",
    description: "Luxury chauffeur service to the Okanagan. Wine country transfers, resort transport, and private tours from Vancouver.",
    longDescription: "Seven Star Chauffeurs provides luxury chauffeur service between Vancouver and the Okanagan, British Columbia's premier wine country and lake resort destination. The Okanagan Valley — home to Kelowna, Penticton, and the world-renowned wineries of the Naramata Bench — is approximately 4 hours from Vancouver by road. Seven Star offers private transfers in the Mercedes-Maybach GLS 600 or Rolls-Royce Ghost, transforming the journey into a first-class experience. In the Okanagan, we provide wine-tour charter service, resort transfers, and event transportation. Whether you are visiting Mission Hill Family Estate, Quails' Gate, or the Sparkling Hill Resort, Seven Star delivers you in the luxury and discretion that matches the destination.",
    highlights: ["Kelowna", "West Kelowna", "Penticton", "Naramata Bench", "Summerland", "Vernon"],
    popularServices: ["Vancouver to Okanagan transfer", "Wine tour charter", "Resort transfers", "Event transportation", "Multi-day engagements"],
    landmarks: ["Mission Hill Family Estate", "Quails' Gate Winery", "Sparkling Hill Resort", "Okanagan Lake", "Naramata Bench wineries"],
    seoTitle: "Chauffeur Service Okanagan | Vancouver to Kelowna Transfer",
    seoDescription: "Luxury chauffeur service to the Okanagan from Vancouver. Wine tours, resort transfers, Kelowna. Maybach, Rolls-Royce. Seven Star Chauffeurs.",
    lat: 49.8863,
    lng: -119.4966,
  },
];
