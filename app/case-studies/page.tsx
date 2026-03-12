import type { Metadata } from "next";
import CaseStudiesPage from "./CaseStudiesPage";

export const metadata: Metadata = {
  title: "Case Studies | Riverstone Labs",
  description: "See how we've helped Australian businesses implement AI solutions that deliver measurable ROI. Real results, real businesses.",
};

export default function CaseStudies() {
  return <CaseStudiesPage />;
}
