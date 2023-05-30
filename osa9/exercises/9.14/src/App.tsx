const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
    },
  ];

  interface HeaderProps {
    courseName: string;
  }

  interface ContentProps {
    parts: {
      name: string;
      exerciseCount: number;
    }[];
  }

  interface TotalProps {
    parts: {
      exerciseCount: number;
    }[];
  }

  const Header = (props: HeaderProps): JSX.Element => {
    return <h1>{props.courseName}</h1>;
  };

  const Content = (props: ContentProps): JSX.Element => {
    return (
      <>
        {props.parts.map((part) => (
          <p key={part.name}>
            {part.name} {part.exerciseCount}
          </p>
        ))}
      </>
    );
  };

  const Total = (props: TotalProps): JSX.Element => {
    const totalExercises = props.parts.reduce(
      (carry, part) => carry + part.exerciseCount,
      0
    );
    return <p>Number of exercises {totalExercises}</p>;
  };

  return (
    <div>
      <Header courseName={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

export default App;
