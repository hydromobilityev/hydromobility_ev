import { toast } from "react-toastify";
import { GOOGLE_MAPS_API_KEY } from "../constants/constant";

export const fetchAddress = async (lat, lng) => {
  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`,
    );

    const json = await res.json();

    if (json.status !== "OK") {
      toast.error("Unable to fetch address");
      return { lat, lng, address: "", pinCode: "" };
    }

    const result = json.results?.[0];

    let address = result?.formatted_address || "";
    let pinCode = "";

    const postal = result?.address_components?.find((c) =>
      c.types.includes("postal_code"),
    );

    if (postal) pinCode = postal.long_name;

    return { lat, lng, address, pinCode };
  } catch (error) {
    toast.error("Reverse geocode failed");
    return { lat, lng, address: "", pinCode: "" };
  }
};
