import { Component } from "react";

class Inputs extends Component {
    constructor(props) {
        super(props);
    }
    state = { 
        grades : [],
        cur_name: '',
        cur_grade: '1',
        cur_weight: '0',
       }
    componentDidUpdate() {
        // check if props and state are sync, if not pass new grades into state
        if (this.state.grades != this.props.grades) {
            this.setState({ grades: this.props.grades });
        }
    }

    NameInputHandler = (e) => {
        e.preventDefault();
        this.setState({ cur_name: e.target.value });
    }
    GradeInputHandler = (e) => {
        e.preventDefault();
        this.setState({ cur_grade: e.target.value });
    }
    WeightInputHandler = (e) => {
        e.preventDefault();
        if (e.target.value > 0){
         this.setState({cur_weight: e.target.value})
        } else {
            alert('You cannot have negative or zero weight of grade');
            this.refs.weight_input.value = null;
        }
    }

    generateFreeID = () => {
        var id = 0;
        this.state.grades.every((grade) => {
            if (id === grade.id) {
                id = grade.id + 1;
                return true;
            }
        });
        return id;
    }

    submitHandler = (e) => {
        e.preventDefault();
        if (this.state.cur_name != ''){
            this.setState({ cur_name: '' });
            this.refs.name_input.value = '';
            this.refs.weight_input.value = null;
            var new_id = this.generateFreeID();
            var grades = [...this.state.grades, {'id': new_id, 'name': this.state.cur_name, 'grade': this.state.cur_grade, 'weight': this.state.cur_weight}]
            this.setState({ grades: grades });
            this.props.data.setGrades(grades);
            this.props.data.saveToLocalStorage(grades)
       }
      }
    
    render() { 
        return ( <div>
                    <form onSubmit={(event) => {console.log(event)}}>
                        <div className="flex justify-center">
                            <input type="text" className="text-center rounded-xl" placeholder="Name of course" ref="name_input"  onChange={this.NameInputHandler} />
                                <select className="rounded-xl" id="grades_input" onChange={this.GradeInputHandler}>
                                <option value='1' default>A</option>
                                <option value='1.5'>B</option>
                                <option value='2'>C</option>
                                <option value='2.5'>D</option>
                                <option value='3'>E</option>
                                <option value='4'>FX</option>
                                </select>
                        </div>
                        <div className="flex justify-center py-2">
                            <input type="number" className="text-center rounded-xl" min="1" ref="weight_input" placeholder="Weight of grade" onChange={this.WeightInputHandler}/>
                        </div>
                        <div className="flex justify-center py-2">
                            <button type="button" className="text-2xl rounded-xl border-4 border-black p-2" onClick={this.submitHandler}>Add Grade</button>
                        </div>
                    </form>
        </div> );
    }
}
 
export default Inputs;