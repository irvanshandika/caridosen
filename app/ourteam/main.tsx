import React from "react";
import teamMembers, { TeamMember } from "@src/data/TeamData";

const OurTeam: React.FC = () => {
  return (
    <>
      <section className="bg-white">
        <div className="container px-6 py-[15vh] mx-auto">
          <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl">WillPower Team</h1>

          <p className="max-w-2xl mx-auto my-6 text-center text-gray-500">
            Ayo Berkenalan Dengan Orang-Orang Keren Pembuat <span className="text-blue-500 font-bold underline-offset-2 underline decoration-solid decoration-blue-400">CariDosen</span>
          </p>

          <div className="grid gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {teamMembers.map((member: TeamMember) => (
              <div key={member.name} className="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
                <div className="flex items-end justify-end w-full h-[350px] bg-cover" style={{ backgroundImage: `url(${member.imgSrc})` }}>
                  <button className="px-3 py-1 bg-gray-800 text-white text-sm rounded-md m-2"> {member.role} </button>
                </div>

                <div className="px-5 py-3">
                  <h3 className="text-gray-700 uppercase">{member.name}</h3>
                  <span className="text-gray-500 mt-2"> {member.role} </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default OurTeam;