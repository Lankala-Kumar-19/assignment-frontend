import React from "react";
import {
  ArrowTrendingUpIcon,
  PencilIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

const AboutUsSection = () => {
  const features = [
    {
      title: "High ROI",
      text:
        "We focus on long-term value creation, ensuring every recommendation delivers sustainable financial growth.",
      icon: ArrowTrendingUpIcon,
    },
    {
      title: "Smart Design",
      text:
        "Designs that balance aesthetics, usability, and emotional connection with real customer needs.",
      icon: PencilIcon,
    },
    {
      title: "Ethical Marketing",
      text:
        "Transparent strategies that attract the right audience without misleading promises.",
      icon: ShieldCheckIcon,
    },
    {
      title: "Data Driven",
      text: "Decisions backed by research, insights, and real market analysis.",
      icon: ChartBarIcon,
    },
    {
      title: "Client Trust",
      text: "We build relationships, not transactions. Trust is our foundation.",
      icon: UserGroupIcon,
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-10">Why Choose Us</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 px-4">
        {features.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="border rounded-lg shadow-sm p-6 text-center bg-white hover:shadow-lg transition transform hover:-translate-y-2"
            >
              <div className="flex justify-center mb-4">
                <Icon className="h-10 w-10 text-orange-500" />
              </div>
              <h3 className="font-semibold mb-3">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.text}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AboutUsSection;
