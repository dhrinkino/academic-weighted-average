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
        this.setState({ cur_name: e.target.value });
    }
    GradeInputHandler = (e) => {
        this.setState({ cur_grade: e.target.value });
    }
    WeightInputHandler = (e) => {
         this.setState({cur_weight: e.target.value})
    }

    generateFreeID = () => {
        // yes this is very dirty method, but i need temporary UID
       return Math.floor(Math.random() * Date.now())
    }

    submitHandler = () => {
        if (this.state.cur_name != ''){
            this.refs.name_input.value = '';
            var new_id = this.generateFreeID();
            var grades = [...this.state.grades, {'id': new_id, 'name': this.state.cur_name, 'grade': this.state.cur_grade, 'weight': this.state.cur_weight}]
            this.setState({ grades: grades });
            this.props.data.setGrades(grades);
            this.props.data.saveToLocalStorage(grades)
       }
      }
    
    render() { 
        return ( <div>
            <div className="flex justify-center">
                <input type="text" className="text-center rounded-xl" ref="name_input"  onChange={this.NameInputHandler} />
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
                <span className="px-2">Weight</span> <input type="number" className="text-center rounded-xl" id="weight_input" onChange={this.WeightInputHandler}/>
            </div>
            <div className="flex justify-center py-2">
                <button className="text-2xl rounded-xl border-4 border-black p-2" onClick={this.submitHandler}>Add Grade</button>
            </div>
        </div> );
    }
}
 
export default Inputs;