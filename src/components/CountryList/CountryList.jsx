import Spinner from "../Spinner/Spinner";
import styles from "./CountryList.module.css";
import CountryItem from "../CountryItem/CountryItem";
import Message from "../Message/Message";

function CountryList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  const countries = cities.reduce((arr, curr) => {
    if (!arr.map((item) => item.country).includes(curr.country))
      return [...arr, { country: curr.country, emoji: curr.emoji }];
    else return arr;
  }, []);

  return (
    <div className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </div>
  );
}

export default CountryList;
