import { useEffect, useState } from "react";
import Header from "../Components/HomePage/Header";

const FeatureSection = ({ title, description, imgSrc, index }: { 
  title: string; 
  description: string; 
  imgSrc: string; 
  index: number; 
}) => {
  const reverse = index % 2 !== 0;
  const sectionId = `feature-${index}`;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById(sectionId);
      if (section) {
        const rect = section.getBoundingClientRect();
        const inViewport = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
        setIsVisible(inViewport);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionId]);
  
  return (
    <div 
      id={sectionId}
      className={`relative lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-24 lg:px-8 transition-all duration-700 ${
        reverse ? "lg:grid-flow-col-dense lg:col-start-2" : ""
      } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
    >
      {!reverse && (
        <div className="mx-auto max-w-xl px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0">
          <h2 className="text-3xl font-bold tracking-tight text-white">{title}</h2>
          <p className="mt-4 text-lg text-gray-300">{description}</p>
        </div>
      )}
      <div className="mt-12 sm:mt-16 lg:mt-0">
        <img
          loading="lazy"
          className="w-full rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5"
          src={imgSrc}
          alt={title}
        />
      </div>
      {reverse && (
        <div className="mx-auto max-w-xl px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0">
          <h2 className="text-3xl font-bold tracking-tight text-white">{title}</h2>
          <p className="mt-4 text-lg text-gray-300">{description}</p>
        </div>
      )}
    </div>
  );
};

const AboutUs = () => {
  const features = [
    { title: "Our Mission", description: "Future Aim Company is committed to leveraging AI technology to help students make informed decisions about their education.", imgSrc: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc" },
    { title: "What is Smart Enrol?", description: "Smart Enrol is an AI Agent that provides up-to-date admissions information and personalized recommendations based on student interests and abilities.", imgSrc: "https://images.unsplash.com/photo-1531297484001-80022131f5a1" },
    { title: "How It Works", description: "Students input their preferences and scores, and AI suggests suitable schools, calculates admission probabilities, and provides tailored advice.", imgSrc: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f" },
    { title: "Why Choose Smart Enrol?", description: "Smart Enrol offers real-time updates, personalized suggestions, and a seamless user experience on web and mobile platforms.", imgSrc: "https://images.unsplash.com/photo-1556761175-129418cb2dfe" },
    { title: "Meet the Team", description: "Our passionate and experienced team works tirelessly to bring the best AI-driven admissions consulting experience to students worldwide.", imgSrc: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5" },
    { title: "What Students Say", description: "Hear from students who have successfully navigated their admissions journey with Smart Enrol.", imgSrc: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4" },
  ];

  return (
    <>
    <Header/>
    <div className="relative overflow-hidden bg-gray-900 pt-16 pb-32">
      <div className="text-center px-6">
        <h1 className="text-5xl font-extrabold text-white">About Future Aim & Smart Enrol</h1>
        <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
          Smart Enrol - AI Admission Consultant: Personalized, Fast, and Always Updated.
        </p>
      </div>

      {features.map((feature, index) => (
        <FeatureSection key={index} index={index} {...feature} />
      ))}
    </div>
    </>
  );
};

export default AboutUs;
