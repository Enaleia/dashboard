
// Global
export const dateChoices = ["All time", "Last year", "This year"]

export const locationTypes = ["See all", "Port", "Recycler", "Manufacturer"]

export const vesselTypes = ["See all", "Trawler", "Seiner", "Other"]

export const viewTypes = ["List", "Map"]

export const sortByOptions = ["Most to least active", "Least to most active", "Name A-Z", "Name Z-A", "Country A-Z", "Country Z-A", "Type A-Z", "Type Z-A"]

export const statDescriptions: Record<string, Record<string, string>> = {
  home_page_statistics: {
    waste_removed_kg: "Collection containing plastic, metal, fishing nets, etc.",
    active_vessels: "Fishers that participate in our actions.",
    actions_performed: "Fishing for litter, prevention, beach clean-up & more.",
    locations: "Ports, recyclers, and manufacturing sites.",
    countries: "Countries participating within the Mediterranean area."
  },
  location_main_page_statistics: {
    locations_counts: "From all the countries that participate.",
    ports: "Ports that receive fisherman’s waste collection.",
    recycler: "Companies that participate in plastic sorting and pelletization.",
    manufacturer: "Producers of consumer products using recycled plastics."
  },
  vessel_main_page_statistics: {
    vessel_count: "From all the countries that participate.",
    trawler: "A type of fishing vessel specifically designed to catch fish by dragging a large net.",
    purse_seiner: "A type of fishing vessel used to catch schools of fish, particularly species that swim near the surface, such as tuna, mackerel, and sardines.",
    other: "Includes caique, swordfish boat, trechantiri and more."
  }
}

export const partnerDetailInfo = {
  "Vessel": {heading: "Waste removed by this vessel", description: ""},
  "Port": {heading: "Waste removed by actions at this location", description: "As a coordinated port, it receives and weighs waste from fishers, ensuring accurate tracking and supporting various actions at the location."},
  "Recycler": {heading: "Action performed at this location", description: "As a key recycling facility, it receives and weighs waste from ocean clean-ups, sorting materials like PET, HDPE, and PP to ensure proper processing and repurposing."},
  "Manufacturer": {heading: "Action performed at this location", description: "As a sustainable manufacturer, it receives sorted ocean plastic, weighed and categorized by type (PET, HDPE, PP), to transform into high-quality consumer products, supporting a sustainable future."} 
}

export const attestationDescriptions = {
  "Vessel": "Each time a fisherman delivers waste, the port coordinator weighs it, records the data via a mobile app, and submits it to a blockchain for secure, transparent tracking.",
  "Port": "Each time a fisherman delivers waste, the port coordinator weighs it, records the data via a mobile app, and submits it to a blockchain for secure, transparent tracking.",
  "Recycler": "Each time the recycling company receives a container, it is weighed on a bridge, issued a proof of weight slip, and then sorted for repurposing.",
  "Manufacturer": "Production may not be as frequent as desired, which is normal since not all waste can be repurposed into new products. As a result, there are often long intervals between production cycles."
}

export const materialsChartLegendDescriptions = {
  "plastics": "All types of plastics, from beverage packaging to light weight plastics.",
  "nets": "Used fishing gear and nets, collected from fishers to prevent disposal in the sea.",
  "metal": "All types of metal collected from the ocean. Often these metals can be reused elsewhere.",
  "rubber": "Mainly tires and other rubber material. This category has been recently added to the platform."
}

export const activitesChartLegendDescriptions = {
  "fishingForLitter": "Plastic collected from the sea by fishers or fishing vessels, through both active and passive efforts.",
  "adHoc": "Waste gathered through large-scale, one-off cleanup projects, often requiring divers for underwater efforts.",
  "prevention": "Used fishing gear, primarily nets, collected from fishers to prevent disposal in the sea.",
  "beach cleanup": "Waste collected during occasional beach cleanups where fishers are not involved; tracked separately."
}

export const activitesChartLegendHeading = {
  title: "What are the actions, and why do they matter?",
  description: "While fishing for litter is most common, sponsors also request ad-hoc clean-ups in neglected areas like abandoned fish farms. Tracking waste per action helps evaluate performance, allocate resources, and ensure transparency in combating marine pollution."
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
  heroDescription: 'We collaborate with fishing communities across the Mediterranean, empowering them to adopt sustainable fishing practices while incentivizing the collection of plastic bycatch. By bringing this waste back to port, fishers play a crucial role in addressing marine plastic pollution and protecting the health of our oceans.'
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
    image: 'turtle_rings',
    title: 'Log waste collection at the port',
    description: 'Using the mobile app, each port coordinator records and submits data directly to the blockchain. The mobile app operates as a distributed node, with each user having their own account (wallet) to interact securely with the blockchain.<br/><br/>The mobile app is currently in testing phase. If you are interested to learn more about our code, please visit the <a href="" style="font-weight: bold">repository</a>.',
  },
  {
    image: 'fish',
    title: 'Tag physical items with unique tracking codes',
    description: 'Waste collected by the fisher community is sent to recyclers with a unique 6-digit tag for traceability.<br/><br/> As the waste is processed, it is tracked through each stage to its final destination. Enaleia supports a <a href="" style="font-weight: bold">circular economy</a>—learn more about the products created from our efforts.',
  },
  {
    image: 'octopus',
    title: 'Immutably attest to collected data',
    description: 'Each data submission by port coordinators is stored on the blockchain in a human-readable format. This ensures that future marine scientists or environmentalists can reference historical data for research.<br/><br/> We use <a href="" style="font-weight: bold">Ethereum Attestation Service</a> to certify the authenticity of this data. How to read the data we attested? Learn more about our <a href="" style="font-weight: bold">attestation scheme</a>.',
  },
  {
    image: 'crab',
    title: 'Demonstrate transparency',
    description: 'Our public dashboard is a critical tool for showcasing transparency and highlighting the impact of our efforts.<br/><br/> All data visualizations are backed by attestations, and public users can verify them via the <a href="" style="font-weight: bold">blockchain explorer</a>.',
  }
]

export const aboutPageLinks = [
  {
    text: 'Propose idea in Github forum',
    url: ''
  },
  {
    text: 'Chat with us on Discord',
    url: ''
  },
  {
    text: 'Follow updates on X',
    url: ''
  }
]