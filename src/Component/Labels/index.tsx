import React from "react";
import style from "./index.module.scss";
import { Result } from "../../interface/staticInterface";
import useFormatNumber from "../../customHooks/useFormatNumber";

type Props = {
  filteredData: Result | undefined;
};

const Labels: React.FC<Props> = ({ filteredData }) => {
  const formatNumber = useFormatNumber();
  return (
    <div className={`${style.Label_box}`}>
      <div className={`${style.Label_info}`}>
        <div className={`${style.label_title}`}>
          <img src={filteredData?.image} alt={filteredData?.imageId.name} />
          <p>{filteredData?.imageId.name}</p>
        </div>
        <p>Cases: {formatNumber(filteredData?.imageId.cases)}</p>
        <p>Recover: {formatNumber(filteredData?.imageId.recover)}</p>
        <p>Death: {formatNumber(filteredData?.imageId.death)}</p>
      </div>
    </div>
  );
};

export default Labels;
