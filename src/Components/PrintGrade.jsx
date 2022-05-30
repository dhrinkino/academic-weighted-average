import { Component } from "react";

class PrintGrade extends Component {
    constructor(props) {
        super(props);
    }
    state = {  }
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
    render() { 
        return ( <p className='text-xl'>
        <span className="px-3">{this.props.grade.name} {this.convertToLetter(this.props.grade.grade)}</span>
        <button className="p-1 text-red-500 rounded-full border-4 border-red-500" onClick={() => this.props.data.removeByID(this.props.grade.id)}>X</button>
      </p>  );
    }
}
 
export default PrintGrade;