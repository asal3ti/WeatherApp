const apiKey = "7b26c92417fd3678d52eac12dc870222";

const fetchByOneCall = async (lat, lon) => {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );
    if (!response.ok)
      throw new Error("Failed to fetch OneCall data. Please try again.");
    return await response.json();
  } catch (error) {
    console.error("Error fetching OneCall data:", error);
    throw new Error("An error occurred while fetching OneCall data.");
  }
};

export const fetchByLocation = async (lat, lon) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );
    if (!response.ok)
      throw new Error("Failed to fetch location data. Please try again.");
    const data = await response.json();
    const oneData = await fetchByOneCall(data.coord.lat, data.coord.lon);
    data.daily = oneData.daily;
    return data;
  } catch (error) {
    console.error("Error fetching data by location:", error);
    throw new Error("An error occurred while fetching data by location.");
  }
};

export const fetchById = async (id) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${apiKey}&units=metric`
    );
    if (!response.ok)
      throw new Error("Failed to fetch data by ID. Please try again.");
    const data = await response.json();
    const oneData = await fetchByOneCall(data.coord.lat, data.coord.lon);
    data.hourly = oneData.hourly;
    data.daily = oneData.daily;
    return data;
  } catch (error) {
    console.error("Error fetching data by ID:", error);
    throw new Error("An error occurred while fetching data by ID.");
  }
};

export const fetchBySearch = async (input) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/find?q=${input}&appid=${apiKey}&units=metric&cnt=6`
    );
    if (!response.ok)
      throw new Error("Failed to fetch data by search. Please try again.");
    const data = await response.json();
    await Promise.all(
      data.list.map(async (item) => {
        const oneData = await fetchByOneCall(item.coord.lat, item.coord.lon);
        item.daily = oneData.daily;
        item.timezone = oneData.timezone_offset;
      })
    );
    return data.list;
  } catch (error) {
    console.error("Error fetching data by search:", error);
    throw new Error("An error occurred while fetching data by search.");
  }
};
