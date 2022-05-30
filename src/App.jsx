import { Component } from "react";
import Grade from "./Components/Grade";
import Inputs from "./Components/Inputs";
import Average from "./Components/Average";
class App extends Component {
  constructor(props) {
    super(props);
  }
  state = { 
    grades : [],
   }


   componentDidMount = () => {
      // load data from localstorage
      var fetched_grades = JSON.parse(localStorage.getItem("grades") || "[]");
      this.setState({ grades: fetched_grades  });
   }

   // save new state into localstorage
   saveToLocalStorage = (new_state) => {
    localStorage.clear()
    localStorage.setItem('grades', JSON.stringify(new_state))
   }
   /* function to pass new array into state from childs */
   setGrades = (item) => {
     this.setState({ grades: item });
   }

  render() { 
    return ( 
    <div className="min-h-screen bg-gradient-to-tl from-slate-50 to-slate-100">
      <div className="flex h-screen justify-center items-center">
      <div className="grid grid-cols-1">
        <Grade data={
            {
              saveToLocalStorage: this.saveToLocalStorage.bind(this),
              setGrades: this.setGrades.bind(this)
            }
          } grade={this.state.grades} />
          <Inputs data={
            {
              saveToLocalStorage: this.saveToLocalStorage.bind(this),
              setGrades: this.setGrades.bind(this)
            }
          } grades={this.state.grades}
          />
        <div className="flex justify-center text-5xl py-5">
          <Average grades={this.state.grades} />
        </div>
      </div>
        
      </div>
    </div>
    );
  }
}
 
export default App;