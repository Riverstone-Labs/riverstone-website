import type { Metadata } from "next";
import ServicesPage from "./ServicesPage";

export const metadata: Metadata = {
  title: "Our Services | Riverstone Labs",
  description: "Comprehensive AI services including strategy, implementation, retainers, and training. End-to-end solutions for Australian SMBs seeking measurable ROI.",
};

export default function Services() {
  return <ServicesPage />;
}
