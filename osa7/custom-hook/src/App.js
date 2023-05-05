import { useState } from "react";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return { type, value, onChange };
};

const App = () => {
  // const [name, setName] = useState("");
  // const [born, setBorn] = useState("");
  // const [height, setHeight] = useState("");

  const name = useField("text");
  const born = useField("date");
  const height = useField("number");

  return (
    <div>
      <form>
        name:
        <input {...name} />
        {/* <input type={name.type} value={name.value} onChange={name.onChange} /> */}
        <br />
        birthdate:
        <input {...born} />
        {/* <input
          type="date"
          value={born}
          onChange={(event) => setBorn(event.target.value)}
        /> */}
        <br />
        height:
        <input {...height} />
        {/* <input
          type="number"
          value={height}
          onChange={(event) => setHeight(event.target.value)}
        /> */}
      </form>
      <div>
        {name.value} {born.value} {height.value}
      </div>
    </div>
  );
};

export default App;
