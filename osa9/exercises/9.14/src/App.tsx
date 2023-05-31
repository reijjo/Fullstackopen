const App = () => {
  const courseName = "Half Stack application development";

  interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }

  interface CoursePartDesc extends CoursePartBase {
    description: string;
  }

  interface CoursePartBasic extends CoursePartDesc {
    // interface CoursePartBasic extends CoursePartBase {
    // description: string;
    kind: "basic";
  }

  interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group";
  }

  interface CoursePartBackgruond extends CoursePartDesc {
    // interface CoursePartBackgruond extends CoursePartBase {
    // description: string;
    backgroundMaterial: string;
    kind: "background";
  }

  interface CoursePartSpecial {
    name: string;
    exerciseCount: number;
    description: string;
    requirements: string[];
    kind: "special";
  }

  type CoursePart =
    | CoursePartBasic
    | CoursePartGroup
    | CoursePartBackgruond
    | CoursePartSpecial;

  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group",
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial:
        "https://type-level-typescript.com/template-literal-types",
      kind: "background",
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special",
    },
  ];

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  // courseParts.forEach((part) => {
  //   switch (part.kind) {
  //     case "basic":
  //       console.log(part.name, part.description, part.exerciseCount);
  //       break;
  //     case "group":
  //       console.log(part.name, part.exerciseCount, part.groupProjectCount);
  //       break;
  //     case "background":
  //       console.log(part.backgroundMaterial);
  //       break;
  //     default:
  //       return assertNever(part);
  //   }
  // });

  const Part = (props: { part: CoursePart }): JSX.Element => {
    switch (props.part.kind) {
      case "basic":
        return (
          <div>
            <div>
              <strong>
                {props.part.name} {props.part.exerciseCount}
              </strong>
            </div>
            <div>
              <em>{props.part.description}</em>
            </div>
          </div>
        );
      case "group":
        return (
          <div>
            <h3>{props.part.name}</h3>
            <p>Exercise Count: {props.part.exerciseCount}</p>
            <p>Group Project Count: {props.part.groupProjectCount}</p>
          </div>
        );
      case "background":
        return (
          <div>
            <h3>{props.part.name}</h3>
            <p>Exercise Count: {props.part.exerciseCount}</p>
            <p>Background Material: {props.part.backgroundMaterial}</p>
          </div>
        );
      case "special":
        return (
          <div>
            <br />
            <div>
              <strong>{props.part.name}</strong>
            </div>
            <em>{props.part.description}</em>
            <p>required skills:{props.part.requirements.join(", ")}</p>
          </div>
        );
      default:
        return assertNever(props.part);
    }
  };

  interface HeaderProps {
    courseName: string;
  }

  interface ContentProps {
    parts: CoursePart[];
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
          <Part key={part.name} part={part} />
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
