'use strict';

const e = React.createElement;

async function getElements() {
    const response = await fetch('/api')
}

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

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    // if (this.state.liked) {
    //   return 'You liked this.';
    // }

    // return e(
    //     'button',
    //     { onClick: () => this.setState({ liked: true }) },
    //     'Like'
    //   );

    //return (<button>Test</button>);

    const rows = this.props.elements.map(element => e('div', {}, 
        e('label', {}, [element.type == 'radio' ? element.legend : element.label, 
            element.type != 'radio' ? e('input', {key: element.id, id: element.id, name: element.name, value: element.value}) :
            e('select', {key: element.id, id: element.id, name: element.name}, element.options.map(option => 
                e('option', {key: element.id+'-'+option.id, id: option.id, value: option.value}, option.label)
                ))
            ])
        ));
        rows.push(e('input', { onClick: (e) => this.submit(e), type: 'submit'}));
    return e(
      'div',
      {},
      rows
    );
  }

  submit(e) {
    e.preventDefault();
    const url = 'https://putsreq.com/RWhI8ht10y5kqfmemrML';
    fetch(url, [
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
      ]).then(resp => resp.text(j => console.log('Got', j))).catch(error => console.error('Error: ', error));
  }
}
// Your application goes here
const domContainer = document.querySelector('#form_container');
const root = ReactDOM.createRoot(domContainer);
root.render(e(Form, {elements: ELEMENTS} ));