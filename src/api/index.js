import axios from "axios";

export const getAdverts = async (options) => {
  try {
    const { data } = await axios.post(
      "https://server.autohunt.by/all_advts",
      options
    );

    return { adverts: data.advts, count: data.count };
  } catch (e) {
    throw new Error(e);
  }
};

export const getOptionCarNames = async () => {
  try {
    const { data } = await axios.get(
      "https://server.autohunt.by/get_static_filter_advts_data"
    );

    return data;
  } catch (e) {
    throw new Error(e);
  }
};

export const getSeries = async (model) => {
  try {
    const { data } = await axios.post(
      "https://server.autohunt.by/get_series_car_names",
      {
        model,
      }
    );

    return { series: data };
  } catch (e) {
    throw new Error(e);
  }
};

export const getGenerations = async (options) => {
  try {
    const { data } = await axios.post(
      "https://server.autohunt.by/get_generation_car_names",
      options
    );

    return { generations: data };
  } catch (e) {
    throw new Error(e);
  }
};

export const getNews = async (options) => {
  try {
    const { data } = await axios.post(
      "https://server.autohunt.by/all_news",
      options
    );

    return { news: data.news, count: data.count };
  } catch (e) {
    throw new Error(e);
  }
};
