import { useState, useEffect } from "react";
import { CountryDetail } from "../api/index.js";

const CountryDetails = ({ countrySelected }) => {
  const [countryDetail, setCountryDetail] = useState();

  useEffect(() => {
    const unsub = async () => {
      const data = await CountryDetail(countrySelected);
      setCountryDetail(data[0]);
    };
    unsub();
  }, [countrySelected]);

  // separate the data into different variables
  const countryName = countryDetail?.name.common || "Country Name";
  const flag = countryDetail?.flags.svg;
  const Capital = countryDetail?.capital[0];

  //   currency variables
  const currencyObject = countryDetail?.currencies;
  const currency = Object.keys(currencyObject ?? {})[0];
  const CurrencySign = currencyObject?.[currency]?.symbol;
  const CurrencyName = currencyObject?.[currency]?.name;

  // other variables
  const Population = countryDetail?.population;
  const Latlang = countryDetail?.capitalInfo.latlng;
  const Languages = Object.entries(countryDetail?.languages ?? {});
  const Language = [];

  // loop through the languages and push them into an array if multiple languages
  Languages.map((item) => {
    Language.push(item[1]);
  });

  const Area = countryDetail?.area;
  const Timezone = countryDetail?.timezones[0];
  const Region = countryDetail?.region;

  return (
    <div className="details">
      <div className="countrydetail">{countryName}</div>
      <img src={flag} />
      <div className="countrydetail">
        <b>Capital</b> {Capital}
      </div>
      <div className="countrydetail">
        <b>Currency</b> {`${CurrencySign}, ${currency}, ${CurrencyName}`}
      </div>
      <div className="countrydetail">
        <b>Population</b> {Population}
      </div>
      <div className="countrydetail">
        <b>Latlang</b> {Latlang}
      </div>
      <div className="countrydetail">
        <b>Language</b> {Language}
      </div>
      <div className="countrydetail">
        <b>Area</b> {Area}
      </div>
      <div className="countrydetail">
        <b>Timezone</b> {Timezone}
      </div>
      <div className="countrydetail">
        <b>Region</b> {Region}
      </div>
    </div>
  );
};

export default CountryDetails;
