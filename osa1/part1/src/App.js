// const Hello = ({ name, age }) => {
// 	console.log('Hello props', name, age)

// 	const bornYear = () => new Date().getFullYear() - age;

// 	return (
// 		<div>
// 			<p>Hello {name}, you are {age} years old</p>
// 			<p>So you were probably born {bornYear()}</p>
// 		</div>
// 	)
// }

// const App = () => {
// 	const nimi = 'Pekka';
// 	const ika = 10;

// 	return (
// 		<div>
// 			<h1>Greetings</h1>
// 			<Hello name='Maya' age={26 + 10} />
// 			<Hello name={nimi} age={ika} />
// 		</div>
// 	)
// }



// import { useState } from 'react';

// const Display = ({ counter }) => {
// 	return (
// 		<div>{counter}</div>
// 	)
// }

// const Button = ({ handleClick, text }) => {
// 	return (
// 		<button onClick={handleClick}>
// 			{text}
// 		</button>
// 	)
// }

// const App = () => {
// 	const [counter, setCounter] = useState(0);
// 	console.log('rendering with counter value', counter)

// 	const increaseByOne = () => {
// 		console.log('increasing, value before', counter)
// 		setCounter(counter + 1);
// 	}

// 	const decreaseByOne = () => {
// 		console.log('decreasing, value before', counter)
// 		setCounter(counter - 1);
// 	}
// 	const setToZero = () => {
// 		console.log('resetting to zero, value before', counter)
// 		setCounter(0);
// 	}

// 	return (
// 		<div>
// 			<Display counter={counter} />
// 			<Button
// 				handleClick={increaseByOne}
// 				text='plus'
// 			/>
// 			<Button
// 				handleClick={setToZero}
// 				text='zero'
// 			/>
// 			<Button
// 				handleClick={decreaseByOne}
// 				text='minus'
// 			/>
// 		</div>
// 	)
// }

import { useState } from 'react';

const History = (props) => {
	if (props.allClicks.length === 0) {
		return (
			<div>
				the app is used by pressing the buttons
			</div>
		)
	}

	return (
		<div>
			button press histry: {props.allClicks.join(' ')}
		</div>
	)
}

const Button = (props) => {
	console.log('button props', props)
	const { handleClick, text } = props
	return (
		<button onClick={handleClick}>
			{text}
		</button>
	)
}

const App = () => {
	const [left, setLeft] = useState(0);
	const [right, setRight] = useState(0)
	const [allClicks, setAll] = useState([]);

		const handleLeftClick = () => {
			setAll(allClicks.concat('L'));
			setLeft(left + 1);
		}

		const handleRightClick = () => {
			setAll(allClicks.concat('R'));
			setRight(right + 1);
		}

	return (
		<div>
			<div>
				{left}
				<Button handleClick={handleLeftClick} text='left' />
				<Button handleClick={handleRightClick} text='right' />
				{right}
				<History allClicks={allClicks} />
			</div>
		</div>
	)
}

export default App;
