import { Component } from "react";
import { useEffect } from "react";
class Grade extends Component {
    constructor(props) {
        super(props);
        
    }
    state = { grades: [] }

    componentDidUpdate(props) {

        if (this.props.grade != this.state.grades){
            this.setState({ grades: this.props.grade });
        }
    }
    convertToLetter = (number) => {
        switch (number) {
         case '1':
           return 'A';
         case '1.5':
           return 'B';
         case '2':
           return 'C';
         case '2.5':
           return 'D'
         case '3':
           return 'E'
          default:
            return 'FX';
        }
      }

    printGrades = () => {
        if (this.state.grades.length < 1){
          return;
         }
        
         return this.state.grades.map(
          (obj) => 
          <p key={obj.name+obj.grade} className='text-xl'>
            <span className="px-3">{obj.name} {this.convertToLetter(obj.grade)}</span>
            <button className="p-1 text-red-500 rounded-full border-4 border-red-500" onClick={() => this.removeByID(obj.id)}>X</button>
          </p>
         )
      }

      removeByID = (id) => {
        var grades = this.state.grades;
        grades = grades.filter(el => el.id !== id)
        console.log(grades)
        this.setState({ grades: grades });
        this.props.data.setGrades(grades);
        this.props.data.saveToLocalStorage(grades)
      }


    render() { 
        return (
            <div className="flex justify-center py-10">
                <ul>
                    {this.printGrades() }
                </ul>
        </div> );
    }
}
 
export default Grade;