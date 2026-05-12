import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Conflict from '../models/Conflict.js';

dotenv.config();

const conflicts = [
    {
        title: "Russia vs Ukraine",
        startDate: "2022-02-24",
        status: "Active",
        type: "War",
        riskLevel: "Critical",
        riskMeter: 95,
        intensity: 98,
        casualties: "500,000+ (Est.)",
        region: "Eastern Europe",
        coordinates: { lat: 48.3794, lng: 31.1656 },
        overview: "Large-scale invasion of Ukraine by Russia, representing the largest conventional military conflict in Europe since WWII.",
        situationSummary: "High-intensity trench warfare, massive drone usage, and ongoing shelling of urban centers.",
        whyItExists: "Long-standing geopolitical tensions, NATO expansion concerns, and disputes over Ukrainian sovereignty and territory.",
        involvedParties: {
            mainActors: ["Russia", "Ukraine"],
            supporters: ["USA", "EU", "UK", "North Korea", "Iran"],
            alliances: ["NATO (Supporting Ukraine)"],
            proxyGroups: ["Wagner Group (Formerly)", "International Legion"],
            internationalStance: "Majority of UN GA condemns invasion; Western nations providing heavy military aid."
        },
        militaryStats: {
            sideA: {
                name: "Russia",
                troops: "1,300,000+",
                tanks: "12,000+",
                aircraft: "4,000+",
                naval: "600+",
                nuclear: true,
                budget: "$100B+"
            },
            sideB: {
                name: "Ukraine",
                troops: "800,000+",
                tanks: "2,000+",
                aircraft: "200+",
                naval: "Limited",
                nuclear: false,
                budget: "$40B+ (Internal) + Huge Foreign Aid"
            }
        },
        economicImpact: {
            oilGasImpact: "Huge disruption in European energy supplies; global price spikes.",
            tradeDisruption: "Black Sea grain corridors blocked; global food security risk.",
            sanctions: "Widespread Western sanctions on Russian banking, energy, and tech.",
            refugees: "6M+ internally displaced; 8M+ fled abroad.",
            charts: [
                { label: "Energy Price Index", value: 85, trend: "Rising" },
                { label: "Food Security Risk", value: 70, trend: "Stable High" }
            ]
        },
        timeline: [
            { date: "2022-02-24", event: "Full-scale Invasion", description: "Russian forces enter from North, East, and South.", isMilestone: true },
            { date: "2022-09-01", event: "Kharkiv Counteroffensive", description: "Ukraine reclaims significant territory in the Northeast.", isMilestone: true },
            { date: "2023-01-01", event: "Bakhmut Grind", description: "Transition to attritional warfare in the Donbas.", isMilestone: false }
        ],
        latestUpdates: [
            { content: "Intense drone strikes reported in Odesa port facilities.", isBreaking: true },
            { content: "Frontline stability remains unchanged despite heavy localized shelling.", isBreaking: false }
        ]
    },
    {
        title: "Israel vs Palestine",
        startDate: "1948 (Current escalation: Oct 2023)",
        status: "Escalating",
        type: "War / Civil War",
        riskLevel: "Critical",
        riskMeter: 92,
        intensity: 95,
        casualties: "30,000+ (Est. in Gaza)",
        region: "Middle East",
        coordinates: { lat: 31.0461, lng: 34.8516 },
        overview: "Long-running territorial and sovereignty dispute intensified by the Oct 7 attacks and subsequent military operations in Gaza.",
        situationSummary: "Ground operations in Gaza, border skirmishes with Hezbollah, and extreme humanitarian crisis.",
        whyItExists: "Decades of territorial disputes, holy site access, and self-determination claims.",
        involvedParties: {
            mainActors: ["Israel", "Hamas", "Palestine Authority"],
            supporters: ["USA", "Germany", "Iran", "Hezbollah"],
            alliances: ["Axis of Resistance (Anti-Israel)"],
            proxyGroups: ["Hezbollah", "Houthis"],
            internationalStance: "Deeply divided; urgent calls for ceasefire from UN and Arab nations."
        },
        militaryStats: {
            sideA: {
                name: "Israel",
                troops: "170,000 Active / 300,000+ Reserve",
                tanks: "2,200",
                aircraft: "600",
                naval: "60",
                nuclear: true,
                budget: "$25B+"
            },
            sideB: {
                name: "Hamas / Paramilitary",
                troops: "30,000 - 40,000 (Guerilla)",
                tanks: "N/A",
                aircraft: "N/A (Drones only)",
                naval: "N/A",
                nuclear: false,
                budget: "$1B (Est. Foreign/Internal)"
            }
        },
        economicImpact: {
            oilGasImpact: "Regional stability risk to Suez and energy flow.",
            tradeDisruption: "Tourism in the Levant halted; Red Sea trade under threat.",
            sanctions: "Targeted sanctions on Hamas leaders; calls for BDS against Israel.",
            refugees: "1.9M+ displaced in Gaza.",
            charts: [
                { label: "Gaza Infrastructure Loss", value: 90, trend: "Rising" },
                { label: "Middle East Instability", value: 80, trend: "Critical" }
            ]
        },
        timeline: [
            { date: "2023-10-07", event: "Hamas Attacks", description: "Large scale assault on Southern Israel.", isMilestone: true },
            { date: "2023-10-27", event: "Gaza Ground Invasion", description: "IDF enters Gaza Strip to dismantle Hamas infra.", isMilestone: true }
        ],
        latestUpdates: [
            { content: "Humanitarian aid convoys face extreme difficulty reaching Northern Gaza.", isBreaking: true }
        ]
    },
    {
        title: "South China Sea Disputes",
        startDate: "Various (Escalating since 2012)",
        status: "Escalating",
        type: "Border Dispute",
        riskLevel: "High",
        riskMeter: 75,
        intensity: 60,
        casualties: "Minimal (Direct)",
        region: "Indo-Pacific",
        coordinates: { lat: 15.0000, lng: 115.0000 },
        overview: "Multi-party territorial dispute over islands and maritime claims in the South China Sea, primarily driven by China's 'Nine-Dash Line'.",
        situationSummary: "Frequent water cannon incidents, vessel collisions, and militarization of artificial islands.",
        whyItExists: "Strategic shipping lanes, potential oil/gas reserves, and regional hegemony.",
        involvedParties: {
            mainActors: ["China", "Philippines", "Vietnam", "Taiwan"],
            supporters: ["USA", "Japan", "Australia"],
            alliances: ["ASEAN (Discordant)", "AUKUS (Indirect)"],
            proxyGroups: ["Maritime Militia"],
            internationalStance: "UNCLOS ruling (2016) rejected Chinese claims; China ignores ruling."
        },
        militaryStats: {
            sideA: {
                name: "China",
                troops: "2M+",
                tanks: "5,000+",
                aircraft: "3,000+",
                naval: "350+ (World's largest by count)",
                nuclear: true,
                budget: "$230B+"
            },
            sideB: {
                name: "ASEAN Claimants (Combined)",
                troops: "800,000+",
                tanks: "1,500",
                aircraft: "500",
                naval: "200",
                nuclear: false,
                budget: "$30B (Combined est.)"
            }
        },
        economicImpact: {
            oilGasImpact: "Potential disruption to $5T in annual global trade.",
            tradeDisruption: "Highly critical global shipping route.",
            sanctions: "Targeted tech sanctions on Chinese maritime firms.",
            refugees: "N/A",
            charts: [
                { label: "Trade Flow Risk", value: 45, trend: "Rising" },
                { label: "Maritime Incidents", value: 65, trend: "Rising" }
            ]
        },
        timeline: [
            { date: "2012-04", event: "Scarborough Shoal Standoff", description: "China takes effective control of the shoal.", isMilestone: true },
            { date: "2016-07", event: "Hague Ruling", description: "Arbitral tribunal rules against China's historical claims.", isMilestone: true }
        ],
        latestUpdates: [
            { content: "New standoff reported near Second Thomas Shoal today.", isBreaking: true }
        ]
    },
    {
        title: "India vs Pakistan",
        startDate: "1947",
        status: "Frozen",
        type: "Border Dispute",
        riskLevel: "Moderate",
        riskMeter: 55,
        intensity: 40,
        casualties: "Thousands (Historical Over Decades)",
        region: "South Asia",
        coordinates: { lat: 34.0837, lng: 74.7973 },
        overview: "Ongoing dispute over the Kashmir region and historical rivalry between the two nuclear-armed neighbors.",
        situationSummary: "Periodic ceasefire violations at the Line of Control (LoC) and high diplomatic hostility.",
        whyItExists: "Partition of British India in 1947; cross-border terrorism concerns.",
        involvedParties: {
            mainActors: ["India", "Pakistan"],
            supporters: ["Russia", "Israel", "China", "USA (Variable)"],
            alliances: ["SCO (Both members)"],
            proxyGroups: ["Various separatist/militant groups"],
            internationalStance: "UN observers still present; India considers it a bilateral issue."
        },
        militaryStats: {
            sideA: {
                name: "India",
                troops: "1.4M Active",
                tanks: "4,600",
                aircraft: "2,000",
                naval: "150",
                nuclear: true,
                budget: "$73B"
            },
            sideB: {
                name: "Pakistan",
                troops: "650,000 Active",
                tanks: "2,500",
                aircraft: "1,200",
                naval: "50",
                nuclear: true,
                budget: "$10B"
            }
        },
        economicImpact: {
            oilGasImpact: "Limited direct energy impact; high opportunity cost.",
            tradeDisruption: "Direct trade nearly non-existent; SAARC stagnation.",
            sanctions: "Localized bans on cross-border items.",
            refugees: "Thousands in border camps.",
            charts: [
                { label: "Defense Budget Drain", value: 60, trend: "Stable" },
                { label: "Bilateral Trade", value: 5, trend: "Lowest" }
            ]
        },
        timeline: [
            { date: "1999-05", event: "Kargil War", description: "Direct military encounter in high altitude territory.", isMilestone: true },
            { date: "2019-02", event: "Balakot Airstrike", description: "First aerial skirmish in decades; high risk of escalation.", isMilestone: true }
        ],
        latestUpdates: [
            { content: "Diplomatic backchannels reportedly exploring trade resumption.", isBreaking: false }
        ]
    }
    ,
    {
        title: "Iran vs Israel Tensions",
        startDate: "Ongoing (Escalating 2024)",
        status: "Escalating",
        type: "Proxy War",
        riskLevel: "High",
        riskMeter: 88,
        intensity: 75,
        casualties: "N/A (Indirect)",
        region: "Middle East",
        coordinates: { lat: 32.4279, lng: 53.6880 },
        overview: "Long-standing shadow war between Iran and Israel, involving proxy groups, cyberattacks, and direct missile exchanges.",
        situationSummary: "Heightened alert following direct strikes; increased proxy activity in Lebanon and Yemen.",
        whyItExists: "Ideological opposition, regional hegemony, and nuclear program disputes.",
        involvedParties: {
            mainActors: ["Iran", "Israel"],
            supporters: ["USA", "UK", "Russia", "Hezbollah"],
            alliances: ["Axis of Resistance"],
            proxyGroups: ["Hezbollah", "Houthis", "Hamas"],
            internationalStance: "Global concerns over regional escalation and oil supply disruptions."
        },
        militaryStats: {
            sideA: {
                name: "Iran",
                troops: "600,000+",
                tanks: "2,000",
                aircraft: "500",
                naval: "200",
                nuclear: false, // Potential breakout
                budget: "$10B - $20B (Est.)"
            },
            sideB: {
                name: "Israel",
                troops: "170,000+",
                tanks: "2,200",
                aircraft: "600",
                naval: "60",
                nuclear: true,
                budget: "$25B+"
            }
        },
        economicImpact: {
            oilGasImpact: "Critical risk to Strait of Hormuz.",
            tradeDisruption: "Potential closure of key maritime routes.",
            sanctions: "Heavy US/EU sanctions on Iranian economy.",
            refugees: "N/A",
            charts: [
                { label: "Oil Price Volatility", value: 75, trend: "Rising" }
            ]
        },
        timeline: [
            { date: "2024-04", event: "Direct Strike", description: "First direct missile exchange between the two nations.", isMilestone: true }
        ],
        latestUpdates: [
            { content: "Satellite imagery shows increased activity at regional military bases.", isBreaking: true }
        ]
    },
    {
        title: "North Korea Missile Tensions",
        startDate: "1953 (Ongoing)",
        status: "Escalating",
        type: "Proxy War / Border Dispute",
        riskLevel: "High",
        riskMeter: 80,
        intensity: 55,
        casualties: "N/A",
        region: "Indo-Pacific",
        coordinates: { lat: 40.3399, lng: 127.5101 },
        overview: "Ongoing tensions on the Korean Peninsula driven by North Korean nuclear and missile tests and military exercises by the US and South Korea.",
        situationSummary: "Increased frequency of ICBM tests and aggressive rhetoric from Pyongyang.",
        whyItExists: "Unresolved Korean War; nuclear deterrence strategy.",
        involvedParties: {
            mainActors: ["North Korea", "South Korea", "USA"],
            supporters: ["China", "Russia", "Japan"],
            alliances: ["US-ROK Alliance"],
            proxyGroups: ["N/A"],
            internationalStance: "UN SC sanctions remain in place; China/Russia calling for dialogue."
        },
        militaryStats: {
            sideA: {
                name: "North Korea",
                troops: "1.2M",
                tanks: "6,000",
                aircraft: "900",
                naval: "500",
                nuclear: true,
                budget: "$5B - $10B (Est.)"
            },
            sideB: {
                name: "South Korea + USA",
                troops: "600,000 (ROK) + 30k (US)",
                tanks: "2,500",
                aircraft: "1,500",
                naval: "200",
                nuclear: true, // (via USA)
                budget: "$50B (ROK) + Global (US)"
            }
        },
        economicImpact: {
            oilGasImpact: "Regional market volatility.",
            tradeDisruption: "Potential disruption to East Asian shipping lanes.",
            sanctions: "Extreme diplomatic and economic isolation.",
            refugees: "N/A",
            charts: [
                { label: "Regional Defense Spending", value: 90, trend: "Rising" }
            ]
        },
        timeline: [
            { date: "2024-01", event: "Artillery Fire", description: "Exchange of fire near the maritime border.", isMilestone: false }
        ],
        latestUpdates: [
            { content: "New missile test detected near coastal region.", isBreaking: true }
        ]
    },
    {
        title: "Arctic Sovereignty Dispute",
        startDate: "Various (Escalating since 2007)",
        status: "Active",
        type: "Border Dispute",
        riskLevel: "Moderate",
        riskMeter: 45,
        intensity: 30,
        casualties: "N/A",
        region: "Europe / North America",
        coordinates: { lat: 80.0000, lng: 0.0000 },
        overview: "Strategic competition over territory, shipping lanes, and seabed resources in the Arctic Circle between Russia and NATO members.",
        situationSummary: "Increased military activity, new base construction, and competing continental shelf claims.",
        whyItExists: "Melting ice opening new trade routes and access to massive oil/gas reserves.",
        involvedParties: {
            mainActors: ["Russia", "USA", "Canada", "Norway", "Denmark"],
            supporters: ["China (Near-Arctic State claim)"],
            alliances: ["NATO"],
            proxyGroups: ["N/A"],
            internationalStance: "Regulated by Arctic Council; Russia increasing unilateral military presence."
        },
        militaryStats: {
            sideA: {
                name: "Russia (Northern Fleet)",
                troops: "Various (Arctic specialized)",
                tanks: "N/A",
                aircraft: "Su-34, MiG-31",
                naval: "Icebreakers (World's largest fleet)",
                nuclear: true,
                budget: "Highly Classified"
            },
            sideB: {
                name: "NATO (Joint Arctic Force)",
                troops: "Varies per nation",
                tanks: "N/A",
                aircraft: "F-35, P-8 Poseidon",
                naval: "US/Canadian Coast Guard & Navy",
                nuclear: true,
                budget: "Billion-dollar modernization"
            }
        },
        economicImpact: {
            oilGasImpact: "Estimated 25% of world's remaining hydrocarbons.",
            tradeDisruption: "Potential shortcut for global shipping (Northern Sea Route).",
            sanctions: "Restrictions on deep-water drilling tech to Russia.",
            refugees: "Indigenous community displacement.",
            charts: [
                { label: "Ice Melt Rate", value: 75, trend: "Rising" }
            ]
        },
        timeline: [
            { date: "2007", event: "Flag Planting", description: "Russia plants flag on the North Pole seabed.", isMilestone: true }
        ],
        latestUpdates: [
            { content: "Exercise 'Cold Response' begins in Northern Norway.", isBreaking: true }
        ]
    },
    {
        title: "Balkans Escalation (Kosovo/Serbia)",
        startDate: "1998 (Current tension: Ongoing)",
        status: "Escalating",
        type: "Ethnic Conflict / Border Dispute",
        riskLevel: "High",
        riskMeter: 70,
        intensity: 50,
        casualties: "Hundreds (Historical thousands)",
        region: "Europe",
        coordinates: { lat: 42.6026, lng: 20.9030 },
        overview: "Lingering ethnic tensions and sovereignty disputes between Kosovo and Serbia, frequently leading to border blockades and clashes.",
        situationSummary: "Heavy military buildup on borders; frequent civil unrest in Northern Kosovo.",
        whyItExists: "Unresolved status of Kosovo independence; ethnic minority rights disputes.",
        involvedParties: {
            mainActors: ["Kosovo", "Serbia"],
            supporters: ["USA", "EU", "Russia", "China"],
            alliances: ["NATO (KFOR)", "EU Integration"],
            proxyGroups: ["Local paramilitary factions"],
            internationalStance: "West recognizes Kosovo; Russia/Serbia/China do not."
        },
        militaryStats: {
            sideA: {
                name: "Serbia",
                troops: "28,000 Active",
                tanks: "200+",
                aircraft: "MiG-29",
                naval: "N/A",
                nuclear: false,
                budget: "$1.5B"
            },
            sideB: {
                name: "Kosovo (FSK) + NATO (KFOR)",
                troops: "5,000 (Local) + 4,500 (KFOR)",
                tanks: "Light Armor",
                aircraft: "N/A",
                naval: "N/A",
                nuclear: false,
                budget: "$150M"
            }
        },
        economicImpact: {
            oilGasImpact: "Minimal",
            tradeDisruption: "Frequent closure of primary trade routes in the Balkans.",
            sanctions: "EU threats of asset freezing if tensions escalate.",
            refugees: "Internal displacement risk.",
            charts: [
                { label: "Ethnic Tension Index", value: 85, trend: "Rising" }
            ]
        },
        timeline: [
            { date: "2023-09", event: "Banjska Standoff", description: "Armed clash near monastery raises war fears.", isMilestone: true }
        ],
        latestUpdates: [
            { content: "EU High Representative calls for urgent de-escalation dialogue.", isBreaking: true }
        ]
    },
    {
        title: "Mexican Cartel Insurgency",
        startDate: "2006",
        status: "Active",
        type: "Drug War / Internal Conflict",
        riskLevel: "Critical",
        riskMeter: 90,
        intensity: 85,
        casualties: "350,000+ (Est.)",
        region: "Americas",
        coordinates: { lat: 23.6345, lng: -102.5528 },
        overview: "Low-intensity internal war between Mexican security forces and trans-national criminal organizations over territory and trade routes.",
        situationSummary: "Urban warfare, political assassinations, and mass displacement in Western and Northern states.",
        whyItExists: "Global demand for narcotics; proliferation of small arms; institutional fragility.",
        involvedParties: {
            mainActors: ["Mexican Government", "Sinaloa Cartel", "CJNG"],
            supporters: ["USA (DEA/Merida Initiative)"],
            alliances: ["Security Pacts"],
            proxyGroups: ["Self-defense militias"],
            internationalStance: "Primarily domestic but recognized as a major regional stability threat."
        },
        militaryStats: {
            sideA: {
                name: "Mexican State (SEDENA/GN)",
                troops: "350,000+",
                tanks: "N/A (Light Armor)",
                aircraft: "Limited specialized ops",
                naval: "Coastal monitoring",
                nuclear: false,
                budget: "$8B"
            },
            sideB: {
                name: "Cartels (Combined Assets)",
                troops: "175,000 (Armed personnel)",
                tanks: "Monstruos (Improvised)",
                aircraft: "Private transport / Drones",
                naval: "Narco-subs",
                nuclear: false,
                budget: "$20B+ (Shadow economy)"
            }
        },
        economicImpact: {
            oilGasImpact: "Fuel theft (Huachicoleo) costing billions.",
            tradeDisruption: "Supply chain risks to US-Mexico manufacturing corridor.",
            sanctions: "Treasury sanctions on financial networks.",
            refugees: "Record levels of asylum seekers/migrants.",
            charts: [
                { label: "Violence Index", value: 95, trend: "Rising" }
            ]
        },
        timeline: [
            { date: "2006-12", event: "War Declaration", description: "Calderón deploys army to Michoacán.", isMilestone: true }
        ],
        latestUpdates: [
            { content: "Breakdown of truce in Culiacán leads to new waves of violence.", isBreaking: true }
        ]
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB for Seeding...");

        await Conflict.deleteMany({});
        console.log("Existing conflicts cleared.");

        const created = await Conflict.insertMany(conflicts);
        console.log(`Successfully seeded ${created.length} complex conflicts.`);

        process.exit();
    } catch (error) {
        console.error("Seeding Error:", error);
        process.exit(1);
    }
};

seedDB();
