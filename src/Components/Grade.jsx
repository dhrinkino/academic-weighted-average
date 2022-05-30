import { Component } from "react";
import { useEffect } from "react";
import PrintGrade from "./PrintGrade";
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

    printGrades = () => {
        if (this.state.grades.length < 1){
          return;
         }
        
         return this.state.grades.map(
          (grade) => <PrintGrade key={grade.id} grade={grade} data={{removeByID: this.removeByID.bind(this)}} />
         )
      }

      removeByID = (id) => {
        var grades = this.state.grades;
        grades = grades.filter(el => el.id !== id)
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