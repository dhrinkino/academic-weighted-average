import { Component } from "react";

class Average extends Component {
    constructor(props) {
        super(props);
    }
    state = { grades: [] }
    
    componentDidUpdate() {
        // check if props and state are sync, if not pass new grades into state
        if (this.state.grades != this.props.grades) {
            this.setState({ grades: this.props.grades });
        }
    }
    calcAverage = () => {
        if (!this.state.grades || this.state.grades.length < 1){
          return '';
        }
        var w_grade = 0;
        var weight = 0;
        this.state.grades.map(obj => {
           w_grade = parseFloat(w_grade) + (parseFloat(obj.grade) * parseFloat(obj.weight) );
           weight = parseFloat(weight) + parseFloat(obj.weight);
           }
         )
       return (w_grade / weight).toFixed(2);
    }

    render() { 
        return ( <div>
            {this.calcAverage()}
        </div> );
    }
}
 
export default Average;