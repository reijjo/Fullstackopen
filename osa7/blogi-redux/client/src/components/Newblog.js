import { useState } from "react";

const Newblog = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    });
    setNewTitle("");
    setNewAuthor("");
    setNewUrl("");
  };

  return (
    <div>
      <h2>create new</h2>

      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            id="title"
            type="text"
            value={newTitle}
            name="Title"
            placeholder="Note Title"
            onChange={(event) => setNewTitle(event.target.value)}
          />
        </div>
        <div>
          author:
          <input
            id="author"
            type="text"
            value={newAuthor}
            name="Author"
            placeholder="Note Author"
            onChange={(event) => setNewAuthor(event.target.value)}
          />
        </div>
        <div>
          url:
          <input
            id="url"
            type="text"
            value={newUrl}
            name="Url"
            placeholder="Note Url"
            onChange={(event) => setNewUrl(event.target.value)}
          />
        </div>
        <button id="createButton" type="submit">
          create
        </button>
      </form>
    </div>
  );
};

export default Newblog;
