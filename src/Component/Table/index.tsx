import React from "react";
import { Result } from "../../interface/staticInterface";
import style from "./Table.module.scss";
import useFormatNumber from "../../customHooks/useFormatNumber";

interface StatsicsProps {
  statsicsData: Result[];
  filtereditem: (_id: string) => void;
  worldCases: string;
  worldDeath: string;
  worldRecover: string;
}

const Table: React.FC<StatsicsProps> = ({
  statsicsData,
  filtereditem,
  worldCases,
  worldDeath,
  worldRecover,
}) => {
  const formatNumber = useFormatNumber();

  return (
    <table className={`${style.myTable} table`}>
      <thead>
        <tr>
          <th></th>
          <th className="font-sm">Cases</th>
          <th className="font-sm">Deaths</th>
          <th className="font-sm">Recovered</th>
        </tr>
      </thead>
      <thead>
        <tr>
          <th>WorldWide</th>
          <th>{worldCases}</th>
          <th>{worldDeath}</th>
          <th>{worldRecover}</th>
        </tr>
      </thead>
      <tbody>
        {statsicsData.map((item) => (
          <tr
            key={item._id}
            className="curusor_pointer "
            onClick={() => filtereditem(item._id)}
          >
            <td className="w-25">
              <img
                src={item.image}
                alt={item.imageId.name}
                className={`${style.img}`}
              />
            </td>
            <td>{formatNumber(item.imageId.cases)}</td>
            <td>{formatNumber(item.imageId.death)}</td>
            <td>{formatNumber(item.imageId.recover)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
