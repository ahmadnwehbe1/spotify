import axios from "axios";
export const verifyToken = async (accessToken) => {
  try {
    const { data } = await axios.get("https://api.spotify.com/v1/me", {
      headers: { Authorization: "Bearer " + accessToken },
    });
    if (data) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
