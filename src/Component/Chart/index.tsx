import React, { ChangeEvent, useState } from "react";
import { Result } from "../../interface/staticInterface";
import LineChart from "../LineChart";
import Input from "../Input";
import SearchIcon from "@mui/icons-material/Search";
import ReportIcon from "@mui/icons-material/Report";
import Joi from "joi";

type Props = {
  statsicsData: Result[];
};

const Chart: React.FC<Props> = ({ statsicsData }) => {
  const [isFirstInput, setIsFirstInput] = useState(false);
  const [errorField, setErrorField] = useState<string[]>([]);
  const [Date, setDate] = useState({
    From: "",
    To: "",
  });

  const [chartData, setChartData] = useState({
    formData: {
      year: 0,
      month: 0,
      deaths: 0,
      _id: "",
    },
    toData: {
      year: 0,
      month: 0,
      deaths: 0,
      _id: "",
    },
  });

  const [chartSecondData, setSecondChartData] = useState({
    formData: {
      year: 0,
      month: 0,
      deaths: 0,
      _id: "",
    },
    toData: {
      year: 0,
      month: 0,
      deaths: 0,
      _id: "",
    },
  });

  /**
   * change Handler
   */
  type formData = keyof typeof Date;
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setDate({ ...Date, [e.target.name as formData]: e.target.value });
  };
  /**
   * validation
   */
  const validationForm = () => {
    let schema = Joi.object({
      From: Joi.string()
        .required()
        .pattern(new RegExp(/^(2020|2021|2022|2023|2024)\/(1[0-2]|[1-9])$/))
        .messages({
          "string.pattern.base": "From Date format is invalid, example: 2020/1",
        }),
      To: Joi.string()
        .required()
        .pattern(new RegExp(/^(2020|2021|2022|2023|2024)\/(1[0-2]|[1-9])$/))
        .messages({
          "string.pattern.base": "To Date format is invalid, example: 2020/1",
        }),
    });
    return schema.validate(Date, { abortEarly: false });
  };

  /**
   * submit Handler to return chartData
   */
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    let formValidate = validationForm();
    if (formValidate.error) {
      setErrorField(formValidate.error.details.map((item) => item.message));
    } else {
      const yearFrom = parseInt(Date.From.split("/")[0]);
      const yearTo = parseInt(Date.To.split("/")[0]);
      const monthFrom = parseInt(Date.From.split("/")[1]);
      const monthTo = parseInt(Date.To.split("/")[1]);

      const formData = statsicsData
        .flatMap((item) => item.imageId.years)
        .find((el) => el.year === yearFrom && el.month === monthFrom) || {
        year: 0,
        month: 0,
        deaths: 0,
        _id: "",
      };

      const toData = statsicsData
        .flatMap((item) => item.imageId.years)
        .find((el) => el.year === yearTo && el.month === monthTo) || {
        year: 0,
        month: 0,
        deaths: 0,
        _id: "",
      };

      /**
       * save the value in setSecondChartData or setChartData to make chart
       */
      const finalData = { formData, toData };
      setIsFirstInput(true);

      if (isFirstInput) {
        setSecondChartData(finalData);

        setIsFirstInput(false);
      } else {
        setChartData(finalData);
      }
    }
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <p className="text-muted p-0 m-0">
          <ReportIcon />
          Valid years are from 2020 to 2024 & Date format ex : 2020/1
        </p>
        <div className="from d-flex justify-content-between">
          <div className="w-50 m-2">
            <Input
              holder={"From"}
              value={Date.From}
              changeHandler={changeHandler}
              name={"From"}
            />
            <div>
              {errorField && (
                <p
                  style={{
                    fontSize: "13px",
                    color: "red",
                    marginLeft: "15px",
                    marginTop: "5px",
                  }}
                >
                  {errorField.find((item) => item.includes("From"))}
                </p>
              )}
            </div>
          </div>
          <div className="w-50 m-2 ">
            <Input
              holder={"To"}
              value={Date.To}
              name={"To"}
              changeHandler={changeHandler}
            />
            <div>
              {errorField && (
                <p
                  style={{
                    fontSize: "13px",
                    color: "red",
                    marginLeft: "15px",
                    marginTop: "5px",
                  }}
                >
                  {errorField.find((item) => item.includes("To"))}
                </p>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="btn"
            style={{
              marginTop: "-35px",
            }}
          >
            <SearchIcon />
          </button>
        </div>
      </form>
      <LineChart chartData={chartData} chartSecondData={chartSecondData} />
    </>
  );
};

export default Chart;
