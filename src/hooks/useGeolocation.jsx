import { useState } from "react";

function useGeolocation(defaultPosition = null) {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState(defaultPosition);
  const [error, setError] = useState(null);

  function getPosition() {
    if (!navigator.geolocation)
      return setError("Your browser doesn't support geolocation");

    setIsLoading(true);
    // navigator.geolocation is asynchronous
    //so using setLoading out the function won't work
    navigator.geolocation.getCurrentPosition(
      (location) => {
        console.log(location);
        setPosition({
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }

  return { position, error, isLoading, getPosition };
}

export { useGeolocation };
