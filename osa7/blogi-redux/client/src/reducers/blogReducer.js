const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_BLOG":
      return [...state, action.payload];
    case "ADD_LIKE":
      return state.map((blog) =>
        blog.id === action.payload.id
          ? { ...blog, likes: action.payload.likes }
          : blog
      );
    default:
      return state;
  }
};

export default blogReducer;
