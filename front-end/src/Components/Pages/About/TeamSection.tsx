import { User } from "lucide-react";
import image1 from "../../../assets/Profiles/Kaji-Hussain 2.jpg";
import image2 from "../../../assets/Profiles/Tanvir-Hira (1).avif";
import image3 from "../../../assets/Profiles/Javed-Laher.avif";
import image4 from "../../../assets/Profiles/Untitled.avif";

import bgImage from "../../../assets/Home/Group 1171275022.png";

const TeamSection = () => {
  const team = [
    {
      name: "Kaji Hussain",
      role: "Founder",
      image: image1,
    },
    {
      name: "Tanvir Alam Hira",
      role: "Senior Product/UX Designer",
      image: image2,
    },
    {
      name: "Javed Laher",
      role: "AI Consultant",
      image: image3,
    },
    {
      name: "Shafi Saleh",
      role: "Full Stack Developer",
      image: image4,
    },
  ];

  return (
    <section className="relative w-full py-16 md:py-24 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-black/80">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url(${bgImage})`,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <h2 className="text-xl font-bold text-white text-center mb-12 md:mb-16">
          Meet the Minds Behind the Mission
        </h2>

        {/* Team Grid */}
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4 ">
          {team.map((member, index) => (
            <div
              key={index}
              className="group flex flex-col items-center text-center"
            >
              {/* Image Container */}
              <div className="relative w-[280px] h-[200px] object-cover object-center mb-6 rounded-2xl overflow-hidden bg-gray-800 shadow-2xl mx-auto">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                ) : (
                  <div className="w-full h-full object-cover object-center flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-800">
                    <User className="w-20 h-20 text-gray-600" />
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-100 group-hover:opacity-80 transition-opacity duration-300" />
              </div>

              {/* Name and Role */}
              <div className="space-y-1">
                <h3 className="text-lg md:text-xl font-bold text-white">
                  {member.name}
                </h3>
                <p className="text-sm md:text-base text-gray-400 font-medium">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
