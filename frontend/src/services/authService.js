
export const getCurrentUser = async () => {
  try {
    const res = await fetch(
      "http://localhost:5000/api/auth/me",
      {
        credentials: "include"
      }
    );

    const data = await res.json();

    return data;

  } catch (error) {
    console.log(error);
    return null;
  }
};