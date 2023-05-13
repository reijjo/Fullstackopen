export const setMessage = (message) => {
  return {
    type: "SET_MESSAGE",
    payload: message,
  };
};

export const clearMessage = () => {
  return {
    type: "CLEAR_MESSAGE",
  };
};

export const addBlog = (blogObject) => {
  return {
    type: "ADD_BLOG",
    payload: blogObject,
  };
};

export const addBlogLike = (blogObject) => {
  return {
    type: "ADD_LIKE",
    payload: blogObject,
  };
};
