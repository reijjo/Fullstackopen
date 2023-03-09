const Part = ({ course }) => {
  //console.log('PART', course)
  return (
    <div>
      {course.name} {course.exercises}
    </div>
  )
}

const Total = ({ course }) => {
  const total = course.parts.reduce((sum, part) => {
    return sum + part.exercises
  }, 0)
  return (
    <div>
      <b>total of {total} exercises</b>
    </div>
  )
}

const Content = ({ course }) => {
  //console.log('Content', course)
  return (
    <div>
      {course.parts.map(kurssi =>
        <Part key={kurssi.id} course={kurssi} />
      )}
    </div>
  )
}

const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Course = ({ course }) => {
  //console.log('koko course', course)

  return (
    <>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </>
  )
}

export default Course
