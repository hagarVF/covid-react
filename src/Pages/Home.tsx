import React, { useEffect, useMemo, useState } from "react";
import Statsics from "../Component/Statsics";
import ChartLine from "../Component/Chart";
import Country from "../Component/Country";
import Loading from "../Component/Loading";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { filteredCity, getAllStatsics, setLoading } from "../store/covid.slice";
import { useDebounce } from "../customHooks/usedeponce";

const Home = () => {
  const dispatch = useAppDispatch();
  const [selectedCity, setSelectedCity] = useState<boolean>(false);

  const { country, countries, isLoading } = useAppSelector(
    (state) => state.countriesSlice
  );
  const debouncedIsLoading = useDebounce(200, isLoading);
  const worldCases = useMemo(
    () => countries.reduce((acc, curr) => acc + curr.imageId.cases, 0),
    [countries]
  ).toLocaleString();

  const worldDeath = useMemo(
    () => countries.reduce((acc, curr) => acc + curr.imageId.death, 0),
    [countries]
  ).toLocaleString();

  const worldRecover = useMemo(
    () => countries.reduce((acc, curr) => acc + curr.imageId.recover, 0),
    [countries]
  ).toLocaleString();

  const cityData = useMemo(
    () => (country ? [country] : countries),
    [country, countries]
  );
  /**
   * find and selects a specific country by its ID.
   * Dispatches an action to update the country state in the Redux
   */
  const filtereditem = (_id: string) => {
    if (!selectedCity) {
      setSelectedCity(true);
    }
    dispatch(filteredCity(_id));
  };
  /**
   * Dispatch loading to true before fetching data.
   * Fetch data using getAllStatsics.
   * Dispatch loading to false after data has been fetched.
   */
  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true));
      await dispatch(getAllStatsics());
      dispatch(setLoading(false));
    };
    fetchData();
  }, [dispatch]);

  return (
    <>
      {debouncedIsLoading ? (
        <Loading />
      ) : (
        <section>
          <div className="container">
            {selectedCity ? (
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
                    statsicsData={cityData}
                    filtereditem={filtereditem}
                    worldCases={worldCases}
                    worldDeath={worldDeath}
                    worldRecover={worldRecover}
                  />
                  <ChartLine statsicsData={cityData} />
                </div>
              </div>
            ) : (
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
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default Home;
