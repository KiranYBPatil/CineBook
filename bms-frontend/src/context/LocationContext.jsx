import { createContext, useContext, useEffect, useState } from "react";

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // ─── Method 1: Browser Geolocation → OpenStreetMap reverse geocode ───
    const fetchLocationFromCoords = async (latitude, longitude) => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        const data = await res.json();
        const userLocation = data?.address?.state || null;
        setLocation(userLocation);
      } catch (err) {
        // If reverse geocoding fails, try IP-based fallback
        await fetchLocationFromIP();
      } finally {
        setLoading(false);
      }
    };

    // ─── Method 2: IP-based geolocation (works on HTTP, no permission needed) ───
    // Try multiple services in case one blocks cloud/EC2 IPs
    const fetchLocationFromIP = async () => {
      const services = [
        { url: "http://ip-api.com/json/", extract: (d) => d?.regionName || d?.city },
        { url: "https://ipapi.co/json/", extract: (d) => d?.region || d?.city },
        { url: "https://ipinfo.io/json", extract: (d) => d?.region || d?.city },
      ];

      for (const svc of services) {
        try {
          const res = await fetch(svc.url);
          const data = await res.json();
          const userLocation = svc.extract(data);
          if (userLocation) {
            setLocation(userLocation);
            setLoading(false);
            return;
          }
        } catch {
          // Try next service
        }
      }
      setError("Failed to detect location");
      setLoading(false);
    };

    // Geolocation API requires HTTPS (secure context).
    // On plain HTTP deployments, navigator.geolocation is undefined in Chrome.
    if (navigator.geolocation && window.isSecureContext) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchLocationFromCoords(latitude, longitude);
        },
        () => {
          // Permission denied or error → fall back to IP
          fetchLocationFromIP();
        }
      );
    } else {
      // Not HTTPS or geolocation not supported → use IP-based location
      fetchLocationFromIP();
    }
  }, []);

  return (
    <LocationContext.Provider value={{ location, loading, error }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => useContext(LocationContext);