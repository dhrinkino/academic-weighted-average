import { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
  }
  state = { 
    grades : [],
    cur_name: '',
    cur_grade: '1',
    cur_weight: '0'
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
   submitHandler = () => {
     if (this.state.cur_name != ''){
      $("#name_input").val('');
      var new_id = this.generateFreeID();
      var new_state = [...this.state.grades, {'id': new_id, 'name': this.state.cur_name, 'grade': this.state.cur_grade, 'weight': this.state.cur_weight}]
      this.setState(prevState => {
        return { grades: new_state };
      });
      this.saveToLocalStorage(new_state)
      this.setState({ cur_name: '' });
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

   componentDidMount = () => {
      // load data from localstorage
      var fetched_grades = JSON.parse(localStorage.getItem("grades") || "[]");
      this.setState({ grades: fetched_grades  });
   }

   calcAverage = () => {
     if (this.state.grades.length < 1){
       return '';
     }
     var w_grade = 0;
     var weight = 0;
     this.state.grades.map(obj => {
        w_grade = parseFloat(w_grade) + (parseFloat(obj.grade) * parseFloat(obj.weight) );
        weight = parseFloat(weight) + parseFloat(obj.weight);
        }
      )
    return w_grade / weight;
   }

   saveToLocalStorage = (new_state) => {
    localStorage.clear()
    localStorage.setItem('grades', JSON.stringify(new_state))
   }

   removeByID = (id) => {
     var grades = this.state.grades;
     grades = grades.filter(el => el.id !== id)
     this.setState({ grades: grades });
     this.saveToLocalStorage(grades)
   }

   generateFreeID = () => {
     // yes this is very dirty method, but i need temporary UID
    return Math.floor(Math.random() * Date.now())
   }

   printGrades = () => {
     if (this.state.grades.length < 1){
       return;
      }
     
      return this.state.grades.map(
       (obj) => 
       <p key={obj.name+obj.grade} className='text-xl'>
         {obj.name} {this.convertToLetter(obj.grade)}  
         <button className="px-1 text-red-500" onClick={() => this.removeByID(obj.id)}>X</button>
       </p>
      )
   }
  render() { 
    return ( 
    <div className="min-h-screen bg-gradient-to-tl from-slate-50 to-slate-100">
      <div className="flex h-screen justify-center items-center">
      <div className="grid grid-cols-1">
        <div className="flex justify-center py-10">
          <ul>
              {this.printGrades() }
          </ul>
        </div>
        <div className="flex justify-center">
          <input type="text" className="rounded-xl" id="name_input" onChange={this.NameInputHandler} />
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
          <span className="px-2">Weight</span> <input type="number" className="rounded-xl" id="weight_input" onChange={this.WeightInputHandler}/>
        </div>
        <div className="flex justify-center py-2">
          <button className="text-2xl rounded-xl border-4 border-black p-2" onClick={this.submitHandler}>Add Grade</button>
        </div>
        <div className="flex justify-center text-5xl py-5">
          {this.calcAverage()}
        </div>
      </div>
        
        
      </div>
    </div>
    );
  }
}
 
export default App;