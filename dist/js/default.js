'use strict';

class Api {
    url = '/api';
    //url = 'https://putsreq.com/RWhI8ht10y5kqfmemrML';

    async getElements() {
      //const response = await fetch(this.url);
      const response = await fetch('/api');
      const result = await response.json();
      console.log('Loaded', result);
      return result;
    }
};

const api = new Api();

const e = React.createElement;

function Radio(props) {
    //console.log('Select.props', props);
    const element = props.element;
    const options = element.options;
    return (
        <label>
            {element.legend}
            <select id={element.id} name={element.name}>
                {options.map(option => 
                    (<option key={element.id+'-'+option.id} id={option.id} value={option.value}>{option.label}</option>)
                )}
            </select>
        </label>
    );
}

function Input(props) {
    const element = props.element;
    if (element.type == 'radio') return (<Radio element={element}></Radio>);
    let ValidInput = () => (<input type={element.type} name={element.name} value={element.value}></input>);
    if (element.required)
      ValidInput = () => (<input type={element.type} name={element.name} value={element.value} required></input>);
    if (element.pattern) 
      ValidInput = () => (<input type={element.type} name={element.name} value={element.value} pattern={element.pattern}></input>)
    return (
        <label>
            {element.label}
            <ValidInput></ValidInput>
        </label>
    );
}


class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: '' };
  }

  render() {
    return (<form onSubmit={(e) => this.submit(e)}>
        <label>{this.state.message}</label>

        {
            this.props.elements.map(element => {
                //console.log('element', element);
                return (
                    <div key={element.id}>
                        <Input element={element}></Input>
                    </div>
                );
            })
        }
        <button >Submit</button>
      </form>);
  }

  DATA = [
    {
      "name": "nameFirst",
      "value": "Jane"
    },
    {
      "name": "nameLast",
      "value": "Doe"
    },
    {
      "name": "contactPhone",
      "value": "9999999999"
    },
    {
      "name": "contactEmail",
      "value": "jd@email.com"
    },
    {
      "name": "contactPreferred",
      "value": "phone"
    }
  ];

  send(url, form) {
    fetch(url, form).then((response) => {
      if (response.status >= 400 && response.status < 600) {
        console.log('Bad Response', response)
        throw new Error("Bad response from server: " + response.status);
      }
      return response;
    }).then((returnedResponse) => {
      // Your response to manipulate
      console.log('Response', returnedResponse);
      this.setState({
        message: 'Submitted successfully!'
      });
    }).catch((error) => {
      // Your error is here!
      console.log('Caught', error);
      this.setState({
        message: 'Error during form submission'
      });
    });
  }

  handleError(e) {
    console.log('Error', e);
    this.state.message = e;
  }

  submit(e) {
    e.preventDefault(); 
    this.send(api.url, this.DATA);
  }
}
// Form Elements

const ELEMENTS = [
  {
    "id": "1111",
    "label": "First Name",
    "name": "nameFirst",
    "type": "text",
    "required": 1
  },
  {
    "id": "2222",
    "label": "Last Name",
    "name": "nameLast",
    "type": "text",
    "required": 1
  },
  {
    "id": "3333",
    "label": "Your Phone Number",
    "name": "contactPhone",
    "type": "tel",
    "pattern": "[0-9]{10}",
    "required": 0
  },
  {
    "id": "4444",
    "label": "Your Email",
    "name": "contactEmail",
    "type": "email",
    "required": 0
  },
  {
    "id": "5555",
    "legend": "Your preferred contact",
    "name": "contactPreferred",
    "type": "radio",
    "required": 1,
    "options": [
      {
        "id": "5555-1",
        "label": "Phone",
        "value": "phone"
      },
      {
        "id": "5555-2",
        "label": "Email",
        "value": "email"
      }
    ]
  }
];
// Your application goes here
const domContainer = document.querySelector('#form_container');
const root = ReactDOM.createRoot(domContainer);
root.render(e(Form, {elements: []} ));
api.getElements().then((result) => root.render(e(Form, {elements: result} )));