import { PartnerType } from "@/types"

// Global
export const dateChoices = ["All time", "Last 12 months", "Last 6 months"]

export const locationTypes: PartnerType[] = ["See all", "Port", "Recycler", "Manufacturer"]

export const vesselTypes: PartnerType[] = ["See all", "Trawler", "Small vessel", "Purse seiner", "Other"]

export const viewTypes = ["List", "Map"]

export const statDescriptions: Record<string, Record<string, string>> = {
  Home: {
    waste_removed: "Collection containing plastic, metal, fishing nets, etc.",
    active_vessels: "Fishers that participate in our actions.",
    actions_performed: "Fishing for litter, prevention, beach cleanup & more.",
    locations: "Ports, recyclers, and manufacturing sites.",
    countries: "Countries participating within the Mediterranean area."
  },
  Locations: {
    total_locations: "All participating countries, spanning multiple countries.",
    ports: "Ports that receive fisherman’s waste collection.",
    recyclers: "Companies that participate in plastic sorting and processing ocean-sourced plastics.",
    manufacturers: "Companies that create consumer products from ocean-sourced recycled plastics."
  },
  Vessels: {
    total_vessels: "All the collectors contributing to our impact.",
    trawlers: "Robust fishing vessels with wide decks and gear for towing heavy nets.",
    small_vessels: "Compact vessels designed for close-to-shore operations and light tasks.",
    purse_seiners: "Vessels with a wide deck and equipment for deploying large encircling nets.",
    others: "Includes caique, swordfish vessel, trechantiri, and more."
  }
}

interface PartnerDetail {
  heading: string;
  description?: string;
  statSubtitle?: string;
  statDescription?: string;
}

export const partnerDetailInfo: Record<string, PartnerDetail> = {
  "Vessel": {heading: "Impact created by this collector", statSubtitle: "What are the actions, and why do they matter?", statDescription: "While Fishing for Litter is the most common activity, sponsors also request ad-hoc cleanups in neglected areas like abandoned fish farms. Tracking waste per action helps evaluate performance, allocate resources, and ensure transparency in combating marine pollution."},
  "Port": {heading: "The impact at this location", description: "As a coordinated port, it receives and weighs waste from fishers, ensuring accurate tracking and supporting various actions at the location.", statSubtitle: "What are the actions, and why do they matter?", statDescription: "While Fishing for Litter is the most common activity, sponsors also request ad-hoc cleanups in neglected areas like abandoned fish farms. Tracking waste per action helps evaluate performance, allocate resources, and ensure transparency in combating marine pollution." },
  "Recycler": {heading: "The impact at this location", description: "As a recycling company, it processes waste containers received from nearby ports, verifies their weight, sorts various materials, and produces plastic pellets for manufacturers. However, some recyclers may not perform all types of processes (such as pelletizing) which could result in certain data fields being left blank.", statSubtitle: "Why the weight is different after pelletizing?", statDescription: "Ocean-sourced plastics lose several viable properties due to prolonged exposure to sunlight and seawater. To ensure product quality and consistency, only about 10% of pelletized plastic can be derived from ocean sources."},
  "Manufacturer": {heading: "The impact at this location", description: "As a manufacturing company, it receives pellets from recyclers and uses them in the production of various goods, incorporating sustainable materials into its manufacturing process."} 
}

export const attestationDescriptions = {
  "Vessel": "Each time a fisherman delivers waste, the port coordinator weighs it, records the data via a mobile app, and submits it to a blockchain for secure, transparent tracking.",
  "Port": "Each time a fisherman delivers waste, the port coordinator weighs it, records the data via a mobile app, and submits it to a blockchain for secure, transparent tracking.",
  "Recycler": "Each time the recycling company receives a container, it is weighed on a bridge, issued a proof of weight slip, and then sorted for repurposing.",
  "Manufacturer": "Production may not be as frequent as desired, which is normal since not all waste can be repurposed into new products. As a result, there are often long intervals between production cycles.",
  "Product": "Blockchain attestations for this product batch, attested by Enaleia or its community."
}

export const materialsChartLegendDescriptions = {
  "mixedPlastic": "Represents a collection that mainly contains plastics but can also contains other materials such as metals, rubbers, ocean floor debris and water.",
  "metal": "All types of metal collected from the ocean. Often these metals can be reused elsewhere.",
  "rubber": "Mainly tires and other rubber material. This category has been recently added to the platform.",
  "preventionNet": "Used fishing gear, such as fishing nets, collected from fishers to prevent disposal in the sea.",
  "ghostNet": "Ghost nets are abandoned, lost, or discarded fishing nets that continue to drift through oceans and waterways. They trap fish, turtles, seabirds, and marine mammals, often causing injury or death.",
  "rope": "Used fishing gear, collected from fishers to prevent disposal in the sea.",
  "other": "Used fishing gear, such as fishing nets, collected from fishers to prevent disposal in the sea."
}

export const activitesChartLegendDescriptions = {
  "fishingForLitter": "Plastic collected from the sea by fishers or fishing vessels, through both active and passive efforts.",
  "adHoc": "Waste gathered through large-scale, one-off cleanup projects, often requiring divers for underwater efforts.",
  "prevention": "Used fishing gear, primarily nets, collected from fishers to prevent disposal in the sea.",
  "beach cleanup": "Waste collected during occasional beach cleanups where fishers are not involved; tracked separately."
}


// Home page
export const homePageTexts = {
  heroTitle: 'Working together with fishers for a sustainable marine ecosystem',
  heroDescription: 'Welcome to the ENALEIA Hub—a dashboard that tracks the environmental efforts and impacts made by our community and partners. Our mission is to create a sustainable marine ecosystem by promoting circular and social economy solutions.',
  impactSectionTitle: 'Our impact at a glance',
  impactSectionDescription: 'Since 2023, we’ve partnered with local fishers to promote a healthier marine environment. Alongside our professional training programs, we empower fishers to be active stewards of the ocean by incentivizing sustainable practices and marine conservation efforts.',
  wasteChartTitle: 'Waste collection insights',
  wasteChartDescription: 'Plastic waste makes up the majority of what our community collects. Various factors, such as tourism and fishing seasons, influence the trends in our data. Explore how these dynamics shape our collection efforts over time.',
  collabSectionTitle: 'ENALEIA partners with environmentally conscious organizations and companies dedicated to closing the loop on waste and promoting sustainability.',
  collabSectionDescription: 'Collaboration is essential for a successful transition to circularity. ENALEIA partners with certified recycling and upcycling organizations that are transforming collected marine plastic into valuable resources, seamlessly integrating it into the circular economy.'
}


// Locations page
export const locationsPageTexts = {
  heroTitle: 'We are a global effort with focus on the Mediterranean Sea',
  heroDescription: 'Our journey began in Greece, and we are now expanding to other Mediterranean countries. United by a shared mission and values, our partners are making impactful contributions in these regions to protect our common waters and marine ecosystems.'
}


// Vessels page
export const vesselsPageTexts = {
  heroTitle: 'Vessels and fishers on the frontline of the marine plastic pollution crisis',
  heroDescription: 'We collaborate with fishing communities and other collectors across the Mediterranean, empowering them to adopt sustainable fishing practices while incentivizing the collection of plastic bycatch. By bringing this waste back to port, fishers play a crucial role in addressing marine plastic pollution and protecting the health of our oceans.'
}


// About page
export const aboutPageTexts = {
  heroTitle: 'Transparency. Accountability. Open source data on a distributed network.',
  heroDescription: 'Enaleia Hub is a step toward sustainable innovation and fostering trust in the data that drives ocean clean-up efforts.',
  hubFlowSectionTitle: 'How does Enaleia Hub work?',
  hubFlowSectionDescription: 'The Hub is a data visualization and traceability platform built to streamline operational workflows for Enaleia. By leveraging blockchain technology, it enhances transparency and efficiency in tracking and managing environmental efforts. The Hub integrates multiple interfaces, including a backend to store data and a custom connector to support the internal operations team in submitting data as attestations. It empowers all stakeholders—whether part of Enaleia or external partners—to contribute to data submission seamlessly.',
  collabSectionTitle: 'Collaboration for impact',
  collabSectionDescription1: 'This first release has been developed by Pollen Labs to accelerate collaboration and innovation.  Our vision extends beyond Enaleia, as this platform aims to inspire similar organizations to adopt public blockchain technology, aligning with Ethereum’s values. While designed for decentralized applications, Ethereum also offers powerful enterprise solutions, providing instant data transparency and accountability. We envision that any enterprise striving for transparency can easily adopt and replicate this solution—because ultimately, it’s for the environment we all share.',
  collabSectionDescription2: 'There are many ways to collaborate and strengthen this solution. We invite you to join our conversation.'
}

export const aboutCardInfo = [
  {
    image: 'turtle',
    title: 'Log waste collection at the port',
    description: 'Using the mobile app, each port coordinator records and submits data directly to the blockchain. The mobile app operates as a distributed node, with each user having their own account (wallet) to interact securely with the blockchain.<br/><br/>The mobile app is currently in testing phase. If you are interested to learn more about our code, please visit the <a href="https://github.com/Enaleia" target="_blank" rel="noopener noreferrer" style="font-weight: bold">repository</a>.',
  },
  {
    image: 'fish',
    title: 'Tag physical items with unique tracking codes',
    description: 'Waste collected by the fisher community is sent to recyclers with a unique 6-digit tag for traceability.<br/><br/> As the waste is processed, it is tracked through each stage to its final destination. Enaleia supports a circular economy — learn more about product tracing with the example below:<br></br><a href="https://deploy-preview-59--celebrated-stardust-8d673c.netlify.app/products/3411" style="font-weight: bold">Kayak by Enaleia x Nelo</a>',
  },
  {
    image: 'octopus',
    title: 'Immutably attest to collected data',
    description: 'Each data submission by port coordinators is stored on the blockchain in a human-readable format. This ensures that future marine scientists or environmentalists can reference historical data for research.<br/><br/> We use <a href="https://attest.org/" target="_blank" rel="noopener noreferrer"style="font-weight: bold">Ethereum Attestation Service</a> to certify the authenticity of this data. How to read the data we attested? Learn more about our <a href="" target="_blank" rel="noopener noreferrer" style="font-weight: bold">attestation scheme</a>.',
  },
  {
    image: 'crab',
    title: 'Demonstrate transparency',
    description: 'Our public dashboard is a critical tool for showcasing transparency and highlighting the impact of our efforts.<br/><br/> All data visualizations are backed by attestations, and public users can verify them via the <a href="" target="_blank" rel="noopener noreferrer" style="font-weight: bold">blockchain explorer</a>.',
  }
]

export const aboutPageLinks = [
  {
    text: 'Propose idea in Github forum',
    url: 'https://github.com/orgs/Enaleia/discussions/categories/ideas'
  },
  {
    text: 'Chat with us on Discord',
    url: 'https://discord.gg/5B3jP2sgWS'
  },
  {
    text: 'Follow updates on X',
    url: 'https://x.com/PollenLabs_'
  }
]