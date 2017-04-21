import React from 'react'

// const TestApi = React.createClass({
//   render () {
//     // const var
//     return (
//       <div>
//         <h1>Hello from TestApi Component</h1>
//       </div>
//     )
//   }
// })

class TestApi extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    // const var
    return (
      <div>
        <h1>Hello from TestApi Component</h1>
      </div>
    )
  }
}

// module.exports = TestApi
export default TestApi
