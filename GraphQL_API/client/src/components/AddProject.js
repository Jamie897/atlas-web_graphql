import { useState } from 'react';
import { addProjectMutation, getProjectsQuery } from '../queries/queries.js';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';


function AddProject(props) {

  const [inputsProject, setInputsProject] = useState({
    title: '',
    weight: 1,
    description: ''

  });

  const handleChange = (e) => {
    const newInputsProject = {
      ...inputsProject,
      [e.target.name]: e.target.name === "weight" ? parseInt(e.target.value, 10) : e.target.value
    };
    setInputsProject(newInputsProject);
  }

  const submitForm1 = (e) => {
    e.preventDefault();
    props.addProjectMutation({
      variables: {
        title: inputsProject.title,
        weight: inputsProject.weight,
        description: inputsProject.description,
      },
      refetchQueries: [{ query: getProjectsQuery }],
    }).then(({ data }) => {
      console.log('Project added:', data);
      // Optionally update UI instantly here if needed
    }).catch((error) => {
      console.error('Error adding project:', error);
    });
  };


  return(
  <form className = "project" id = "add-project" onSubmit = { submitForm1 } >
    <div className = "field" >
    <label> Project title: </label>
    <input
    type = "text"
    name = "title"
    onChange = {handleChange}
    value = {inputsProject.title}
    />
    </div >
    <div className = "field" >
    <label > Weight: </label>
    <input
    type = "number"
    name = "weight"
    onChange = {handleChange}
    value = {inputsProject.weight}
    / >
    </div >
    <div className = "field" >
    <label > description: </label>
    <textarea name = "description"
    onChange = {handleChange}
    value = {inputsProject.description}
    / >
    </div >
    <button > + </button>
    </form >
  );
}

export default compose(
  graphql(addProjectMutation, { name: "addProjectMutation" }),
  graphql(getProjectsQuery, { name: "getProjectsQuery" })
)(AddProject);
