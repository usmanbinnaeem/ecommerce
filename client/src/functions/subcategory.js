import axios from "axios";

export const createSubCategory = async (subCategory, authtoken) => {
  return await axios.post(`${process.env.REACT_APP_API}/sub-category`, subCategory, {
    headers: {
      authtoken,
    },
  });
};

export const getSubCategory = async (slug) => {
  return await axios.get(`${process.env.REACT_APP_API}/sub-category/${slug}`);
};

export const getSubCategories = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/sub-categories`);
};

export const updateSubCategory = async (slug, subCategory, authtoken) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/sub-category/${slug}`,
    subCategory,
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const delSubCategory = async (slug, authtoken) => {
  return await axios.delete(`${process.env.REACT_APP_API}/sub-category/${slug}`, {
    headers: {
      authtoken,
    },
  });
};
