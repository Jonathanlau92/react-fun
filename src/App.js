import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person'

class App extends Component {
  // state only works for class which extends component
  state = {
    persons: [
      {id: 'sudh', name: 'Jonathan', age: 28},
      {id: 'sjhd', name: 'An', age: 24},
      {id: 'sdcm', name: 'Tim', age: 28},
    ],
    otherState: 'some other value',
    showPersons: false
  }

  // switchName is up to you, but good practice to have handler at the back if thats the case.
  // switchNameHandler = (newName) =>{
  //   // console.log("was clicked");
  //   // DONT DO THIS: this.state.persons[0].name = "Jon";
  //   this.setState({persons: [
  //     {name: newName, age: 28},
  //     {name: 'An', age: 24},
  //     {name: 'Tim', age: 21}]
  //   })
  // }

  nameChangedHandler = (event, id) => {
    // Check if the person is what we are looking for
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    })
    // This is a copy of the object, instead of the original object, due to the spread operator
    const person = {
      ...this.state.persons[personIndex]
    }

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({persons: persons});
  }

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  render() {
    let persons = null;
    if (this.state.showPersons){
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person 
              name={person.name} 
              age={person.age} 
              click={() => this.deletePersonHandler(index)}
              key={person.id}
              changed={(event) => this.nameChangedHandler(event, person.id)}
              />
          })}
        </div> 
      )
    }

    let classes = [];
    if (this.state.persons.length <= 2){
      classes.push('red');
    }
    if (this.state.persons.length <= 1){
      classes.push('bold');
    }

    return (
      <div className="App">
        <h1> Hi, I'm a React app! </h1>
        <p className={classes.join(' ')}> This is working </p>
        <button onClick={this.togglePersonsHandler}>Switch name</button>
        {persons}
      </div>
    );
  }
}

export default App;

