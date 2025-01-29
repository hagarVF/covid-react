import React, { useState } from "react";
import { Result } from "../../interface/staticInterface";
import style from "./index.module.scss";
import Title from "../Title";
import Labels from "../Labels";

type Props = {
  statsicsData: Result[];
  filtereditem: (id: string) => void;
};

const Country: React.FC<Props> = ({ statsicsData, filtereditem }) => {
  const [filteredData, setFilteredData] = useState<Result | undefined>(
    undefined
  );

  /**
   * Handles the hover event for a specific country item.
   * sets the filtered data state to the matching item.
   */

  const onHoverHandle = (id: string) => {
    const filteredItem = statsicsData.find((el) => el._id === id);
    setFilteredData(filteredItem);
  };

  return (
    <div className={`${style.country} `}>
      <Title title={"CoronaVirus Map"} />
      <div className={`${style.Country_box} `}>
        {statsicsData.map((item) => (
          <div
            key={item.id}
            className={`${style.item_box} `}
            onClick={() => filtereditem(item._id)}
          >
            <div className={`${style.card_front}`}>
              <button
                className={`${style.Country_btn} btn btn-danger `}
                onMouseEnter={() => onHoverHandle(item._id)}
              >
                {item.imageId.name}
              </button>
            </div>
            <Labels filteredData={filteredData} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Country;
