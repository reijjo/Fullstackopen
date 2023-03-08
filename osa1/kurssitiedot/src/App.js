const Header = (props) => {
	console.log('HEADER props', props)
	return (
		<>
			<h1>{props.course}</h1>
		</>
	)
}

const Part = (props) => {
	console.log('PART PROPS', props)
	return (
		<>
			<p>{props.parts.name} {props.parts.exercises}</p>
		</>
	)
}

const Content = (props) => {
	console.log('Content props', props)
	return (
		<>
			<Part parts={props.parts[0]} />
			<Part parts={props.parts[1]} />
			<Part parts={props.parts[2]} />
		</>
	)
}

const Total = (props) => {
	console.log('TOTAL props', props)
	return (
		<p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
	)
}

const App = () => {
  const course = {
		name: 'Half Stack application development',
  	parts: [
		{
    	name: 'Fundamentals of React',
    	exercises: 10
  	},
  	{
   	 name: 'Using props to pass data',
   	 exercises: 7
  	},
  	{
    	name: 'State of a component',
    	exercises: 14
  	}
		]
	}

  return (
    <div>
			<Header course={course.name} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
	  </div>
  )
}

export default App