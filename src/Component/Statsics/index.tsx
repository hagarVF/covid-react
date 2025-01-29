import { Result } from "../../interface/staticInterface";
import Title from "../Title";
import Table from "../Table";
import React from "react";

interface StatsicsProps {
  statsicsData: Result[];
  filtereditem: (id: string) => void;
  title: string;
  worldCases: string;
  worldDeath: string;
  worldRecover: string;
}

const Statsics: React.FC<StatsicsProps> = ({
  statsicsData,
  filtereditem,
  title,
  worldCases,
  worldDeath,
  worldRecover,
}) => {
  return (
    <section className="">
      <div>
        <Title title={title} />
        <Table
          statsicsData={statsicsData}
          filtereditem={filtereditem}
          worldCases={worldCases}
          worldDeath={worldDeath}
          worldRecover={worldRecover}
        />
      </div>
    </section>
  );
};

export default Statsics;
