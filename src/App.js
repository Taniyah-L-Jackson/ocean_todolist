import React, { useState } from 'react'

function List(props) {

  // map over list
  const listItems = props.items.map(tasks => {
    return (
      //the text is placed in the input tag
      //the input tag allows the list to be updated
      <div key={tasks.key}>
        <p className='secondBox'>
          
          <input 
          type="text"
          id={tasks.key} //stores key for task in list
          value={tasks.text} //holds text for task in list
          className='secondInput'
          onChange={(e) => {props.updateItem(e.target.value, tasks.key)}}/> {/*allows you to type in input box*/}

          <span>
            <i 
              className="far fa-trash-alt delete"
              onClick={() => props.deleteItem(tasks.key)}> {/* delete button */}
            </i>
          </span>

        </p>
      </div>
    )
  })
  return (
    <>{listItems}</> //show items in list
  )
}

function App() {

  const [todoList, setTodoList] = useState([]) //holds item list
  const [task, setTask] = useState({ //gets current item 
    text: '', //item text
    key: '' //date item was added
  })

  //read current item
  const handleChange = (e) => {

    const { value } = e.target //e.target = event.target

    // update task
    setTask(prevTask => {
      return{...prevTask, text: value, key: Date.now()}
    })
    
  }

  //update list
  const updateItem = (text, key) => {

    const updated = todoList //get list
    updated.map(item => { //map over list
      if(item.key === key) { //find matching key
        item.text = text 
      }
      return item
    })
    setTodoList([...updated]) //update list
  }

  const addItem = (e) => {
    e.preventDefault() //prevents refresh

    if (task.text !== '') { 
      const newItems = [...todoList, task]//copy original list and update list
      setTodoList(newItems)
      setTask({key: '', text: ''}) //clear out for next task
    }
  }

  //delete task
  const deleteItem = (key) => {
    const filterItems = todoList.filter(item => item.key !== key) //remove items that have the same key as the key passed
    setTodoList(filterItems) //update list
  }


  return (
    <div className='adjust'>
      <div className='firstBox'>
        <form onSubmit={addItem}>  {/* add items to list */}
          <input 
            type="text" 
            name="text"
            className = 'firstInput'
            placeholder='Enter Text' 
            value={task.text}
            onChange={handleChange} //edit text
          />
          <button className='addItem'>Add</button>
        </form>
        <div className='border'>
            <List items={todoList} deleteItem={deleteItem} updateItem={updateItem}/> {/* passed functions that allow the list that can be shown and edited in the List function */}
        </div>

      </div>
    </div>
  )
}

export default App

// NOTE: 
// Using a value prop without an onChange handler will render a read-only field. Meaning that you cannot type in the input field
// After handleSubmit fires, everything else after that is outside the return is ignored