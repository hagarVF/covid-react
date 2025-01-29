import React, { useEffect, useState } from "react";
import Statsics from "../Component/Statsics";
import ChartLine from "../Component/Chart";
import Country from "../Component/Country";
import Loading from "../Component/Loading";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { filteredCity, getAllStatsics, setLoading } from "../store/covid.slice";
import useDeponce from "../customHooks/usedeponce";

const Home = () => {
  const dispatch = useAppDispatch();
  const [selectedCity, setSelectedCity] = useState<boolean>(false);
  const { country, countries, isLoading } = useAppSelector(
    (state) => state.countriesSlice
  );

  const worldCases = countries
    .reduce((acc, curr) => acc + curr.imageId.cases, 0)
    .toLocaleString();

  const worldDeath = countries
    .reduce((acc, curr) => acc + curr.imageId.death, 0)
    .toLocaleString();
  const worldRecover = countries
    .reduce((acc, curr) => acc + curr.imageId.recover, 0)
    .toLocaleString();
  /**
   * custom hook for debonce
   * dispatch an action to set isLoading state to false.
   */
  const debouncedLoading = useDeponce(2000, () => {
    dispatch(setLoading(false));
  });
  /**
   * find and selects a specific country by its ID.
   * Dispatches an action to update the country state in the Redux
   */
  const filtereditem = (_id: string) => {
    dispatch(filteredCity(_id));
    setSelectedCity(true);
  };

  useEffect(() => {
    dispatch(getAllStatsics()).then(() => debouncedLoading);
  }, [dispatch, debouncedLoading]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <section>
          <div className="container">
            {!selectedCity ? (
              <div>
                <Country statsicsData={countries} filtereditem={filtereditem} />
                <Statsics
                  title={"CoronaVirus World Statsics"}
                  statsicsData={countries}
                  filtereditem={filtereditem}
                  worldCases={worldCases}
                  worldDeath={worldDeath}
                  worldRecover={worldRecover}
                />
              </div>
            ) : (
              <div className="d-flex">
                <div className="static w-50">
                  <Country
                    statsicsData={countries}
                    filtereditem={filtereditem}
                  />
                  <Statsics
                    title={"CoronaVirus World Statsics"}
                    statsicsData={countries}
                    filtereditem={filtereditem}
                    worldCases={worldCases}
                    worldDeath={worldDeath}
                    worldRecover={worldRecover}
                  />
                </div>

                <div className="chart w-50">
                  <Statsics
                    title={"CoronaVirus Statsics"}
                    statsicsData={country ? [country] : []}
                    filtereditem={filtereditem}
                    worldCases={worldCases}
                    worldDeath={worldDeath}
                    worldRecover={worldRecover}
                  />
                  <ChartLine statsicsData={country ? [country] : []} />
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default Home;
