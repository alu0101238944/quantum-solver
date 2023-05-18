
import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";

const API = process.env.REACT_APP_API;

type Algorithm = {
  'id': number,
  'name': number,
  'description': number,
  'parameters': number
};

export function AlgorithmPage() {
  const navigate = useNavigate();
  const [state, setState] = useState({'algorithms': [], 'current_algorithm': ''});
  const goToMenu = () => {
    navigate('/menu', {replace: true});
  }
  useEffect(() => { 
    (async () => {
      const token = window.sessionStorage.getItem('token') || '';
      const result = await fetch(`${API}/get-algorithms`, {
        method: 'GET',
        headers: {token}
      });
      const data = await result.json();
      setState(data);
    })();
  }, []);
  const selectAlgorithm = (event: React.ChangeEvent<HTMLSelectElement>) => {
    state['current_algorithm'] = event.target.value;
  }
  const setAlgorithm = async () => {
    const token = window.sessionStorage.getItem('token') || '';
    const result = await fetch(`${API}/set-algorithm`, {
      method: 'POST',
      body: JSON.stringify({'id': state['current_algorithm']}),
      headers: {'Content-Type': 'application/json', token}
    });
    const data = await result.json();
    console.log('setAlgorithm: ', data);
    if (!data.err) {
      goToMenu();
    }
  }
  const getOptions = state['algorithms'].map((item: Algorithm, i: number) => {
    return <option key={i} value={item.id}>
      {item.name}
    </option>
  });
  return (
    <div>
    <h1>Select Algorithm</h1>
    <select name='algorithms' onChange={selectAlgorithm}>
      <option value="" hidden>Choose an algorithm here</option>
      {getOptions} 
    </select>
    <button className='button' id='okBtn' onClick={setAlgorithm}>
      <span>OK</span>
    </button>
    </div>
  )
}
