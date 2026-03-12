import type { Metadata } from "next";
import AboutPage from "./AboutPage";

export const metadata: Metadata = {
  title: "About Us | Riverstone Labs",
  description: "Learn about Riverstone Labs. Brisbane-based AI consultancy helping Australian SMBs implement AI solutions that deliver real ROI.",
};

export default function About() {
  return <AboutPage />;
}
