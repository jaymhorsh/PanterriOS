import type { StaticImageData } from "next/image";
import event1 from "@/assets/images/article/article1.jpg";
import event2 from "@/assets/images/article/article2.jpg";
import event3 from "@/assets/images/article/article3.jpg";
import event4 from "@/assets/images/article/article4.jpg";

export type EventStatus = "published" | "ai-discovered" | "submitted";

export type EventSource = "EventBrite" | "AI" | "Submitted";

export interface EventRecord {
  id: number;
  title: string;
  description: string;
  dateLabel: string;
  monthLabel: string;
  time: string;
  location: string;
  attendees: string;
  price: string;
  tags: string[];
  badges: string[];
  type: "Physical" | "Virtual" | "Hybrid";
  category: string;
  status: EventStatus;
  featured: boolean;
  coverImage: StaticImageData | string;
}

export interface EventReviewRecord {
  id: number;
  title: string;
  location: string;
  date: string;
  time: string;
  price: string;
  email?: string;
  organizerLabel: string;
  organizerValue: string;
  category: string;
  source: EventSource;
}

export interface EventRecordRow {
  id: number;
  name: string;
  organizer: string;
  date: string;
  time: string;
  location: string;
  category: string;
  type: "Virtual" | "Physical" | "Hybrid";
  source: EventSource;
  price: string;
  featured: boolean;
}




export const eventsData: EventRecord[] = [
  {
    id: 1,
    title: "Nigerian Real Estate Investment Summit 2026",
    description:
      "Nigeria's largest real estate investment conference bringing together developers, investors, and industry leaders. Topics include sustainable housing and urban growth.",
    dateLabel: "27",
    monthLabel: "MAR",
    time: "10:00 AM",
    location: "Eko Hotels, Lagos",
    attendees: "450/500",
    price: "Free",
    tags: ["Investment", "Networking", "Policy"],
    badges: ["AI Discovered"],
    type: "Virtual",
    category: "Investment",
    status: "published",
    featured: true,
    coverImage: event1,
  },
  {
    id: 2,
    title: "Real Estate Law & Compliance Seminar",
    description:
      "Comprehensive legal and compliance training for real estate professionals covering property laws, regulations, and best practices.",
    dateLabel: "27",
    monthLabel: "MAR",
    time: "9:00 AM",
    location: "Landmark Centre, Lagos",
    attendees: "120/150",
    price: "From N25,000",
    tags: ["Legal", "Compliance", "Training"],
    badges: ["AI Discovered"],
    type: "Physical",
    category: "Education",
    status: "ai-discovered",
    featured: false,
    coverImage: event2,
  },
  {
    id: 3,
    title: "Property Technology Innovation Workshop",
    description:
      "Hands-on workshop exploring the latest PropTech innovations, digital tools, and technology solutions transforming the real estate industry.",
    dateLabel: "27",
    monthLabel: "MAR",
    time: "2:00 PM",
    location: "Four Points by Sheraton, Lagos",
    attendees: "200/250",
    price: "From N15,000",
    tags: ["Technology", "Innovation", "Workshop"],
    badges: ["Submitted"],
    type: "Hybrid",
    category: "Technology",
    status: "submitted",
    featured: true,
    coverImage: event3,
  },
  {
    id: 4,
    title: "Affordable Housing Development Forum",
    description:
      "Strategic forum discussing solutions, financing models, and government policies for affordable housing development across Nigeria.",
    dateLabel: "15",
    monthLabel: "APR",
    time: "10:00 AM",
    location: "Transcorp Hilton, Abuja",
    attendees: "180/200",
    price: "Free",
    tags: ["Housing", "Policy", "Development"],
    badges: ["Submitted"],
    type: "Physical",
    category: "Policy",
    status: "published",
    featured: true,
    coverImage: event4,
  },
];

export const eventTabCounts = {
  published: eventsData.filter((event) => event.status === "published").length,
  aiDiscovered: eventsData.filter((event) => event.status === "ai-discovered")
    .length,
  submitted: eventsData.filter((event) => event.status === "submitted").length,
};

export const aiDiscoveredReviewItems: EventReviewRecord[] = [
  {
    id: 101,
    title: "Lagos Property Investment Summit 2026",
    location: "Eko Hotels, Lagos",
    date: "15/06/2026",
    time: "10:00 AM",
    price: "From N15,000",
    organizerLabel: "Organizer",
    organizerValue: "Nigerian Real Estate Association",

    category: "Investment",
    source: "EventBrite",
  },
  {
    id: 102,
    title: "Real Estate Tech Conference",
    location: "Eko Hotels, Lagos",
    date: "15/06/2026",
    time: "10:00 AM",
    price: "From N15,000",
    organizerLabel: "Organizer",
    organizerValue: "Nigerian Real Estate Association",

    category: "Investment",
    source: "EventBrite",
  },
];

export const submittedReviewItems: EventReviewRecord[] = [
  {
    id: 201,
    title: "Lagos Property Investment Summit 2026",
    location: "Landmark Centre, Lagos",
    date: "28/08/2026",
    time: "10:00 AM",
    price: "From N15,000",
    organizerLabel: "Submitter",
    organizerValue: "External Organizer",
    email: "jaji.moshodo@example.com",

    category: "Expo",
    source: "Submitted",
  },
  {
    id: 202,
    title: "Lagos Property Investment Summit 2026",
    location: "Landmark Centre, Lagos",
    date: "28/08/2026",
    time: "10:00 AM",
    price: "From N15,000",
    organizerLabel: "Submitter",
    organizerValue: "External Organizer",
    email: "jaji.moshodo@example.com",
    category: "Expo",
    source: "Submitted",
  },
  {
    id: 203,
    title: "Lagos Property Investment Summit 2026",
    location: "Landmark Centre, Lagos",
    date: "28/08/2026",
    time: "10:00 AM",
    price: "From N15,000",
    organizerLabel: "Submitter",
    organizerValue: "External Organizer",
    email: "moshoodadisa@gmail.com",
    category: "Expo",
    source: "Submitted",
  },
];

export const eventsRecordRows: EventRecordRow[] = [
  {
    id: 1,
    name: "Nigerian Real Estate Investment Summit 2026",
    organizer: "Nigerian Real Estate Association",
    date: "Mar 27, 2026",
    time: "10:00 AM",
    location: "Eko Hotels, Lagos",
    category: "Investment",
    type: "Virtual",
    source: "Submitted",
    price: "Free",
    featured: true,
  },
  {
    id: 2,
    name: "Property Technology Innovation Workshop",
    organizer: "PropTech Nigeria",
    date: "Mar 27, 2026",
    time: "2:00 PM",
    location: "Four Points by Sheraton",
    category: "Technology",
    type: "Hybrid",
    source: "Submitted",
    price: "N15,000",
    featured: true,
  },
  {
    id: 3,
    name: "Real Estate Law & Compliance Seminar",
    organizer: "Legal Associates",
    date: "Mar 27, 2026",
    time: "9:00 AM",
    location: "Landmark Centre, Lagos",
    category: "Education",
    type: "Physical",
    source: "AI",
    price: "N25,000",
    featured: false,
  },
  {
    id: 4,
    name: "Real Estate Finance & Investment Analysis",
    organizer: "Real Estate Finance Institute",
    date: "May 18, 2026",
    time: "1:00 PM",
    location: "Virtual Event",
    category: "Finance",
    type: "Virtual",
    source: "AI",
    price: "N12,000",
    featured: false,
  },
  {
    id: 5,
    name: "Affordable Housing Development Forum",
    organizer: "Ministry of Housing",
    date: "Apr 15, 2026",
    time: "10:00 AM",
    location: "Transcorp Hilton, Abuja",
    category: "Policy",
    type: "Physical",
    source: "Submitted",
    price: "Free",
    featured: false,
  },
];
