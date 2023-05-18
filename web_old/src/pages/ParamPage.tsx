
import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";

const API = process.env.REACT_APP_API;

type Param = {
  'type': string,
  'description': string,
  'constraint': string
};

export function ParamPage() {
  const navigate = useNavigate();
  const [state, setState] = useState({'params': [], 'params_values': ['']});
  const goToMenu = () => {
    navigate('/menu', {replace: true});
  }
  useEffect(() => {
    (async () => {
      const token = window.sessionStorage.getItem('token') || '';
      const result = await fetch(`${API}/get-params`, {
        method: 'GET',
        headers: {token}
      });
      const data = await result.json();
      setState(data);
    })();
  }, []);
  const setParamsValues = async () => {
    const token = window.sessionStorage.getItem('token') || '';
    const result = await fetch(`${API}/set-params-values`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json', token},
      body: JSON.stringify({'params_values': state['params_values']})
    });
    const data = await result.json();
    console.log('setParamsValues: ', data);
    if (!data.err) {
      goToMenu();
    } else {
      alert('Error checking parameters: Read carefully the constraints and try again');
    }
  }
  const changeParams = (event: React.ChangeEvent<HTMLInputElement>) => {
    state['params_values'][parseInt(event.target.id)] = event.target.value;
  }
  const getInputs = state['params'].map((item: Param, i: number) => {
    let type: string = '';
    switch (item.type) {
      case 'int':
      case 'float':
        type = 'number';
        break;
    
      default:
        type = 'text';
        break;
    }
    return (
      <div key={'Param' + i}>
        <div><label>{item.description}</label></div>
        <div><label>Constraint: {item.constraint}</label></div>
        <div><input type={type} id={i.toString()} required onChange={changeParams}/></div>
      </div>
    )
  });
  return (
    <div>
    <h1>Set Parameters Values</h1>
    {getInputs} 
    <button className='button' id='okBtn' onClick={setParamsValues}>
      <span>OK</span>
    </button>
    </div>
  )
}
