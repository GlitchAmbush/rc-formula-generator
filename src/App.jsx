import { useState } from 'react'
import './App.css'

function App() {
  const [name, setName] = useState()
  const [assistant, setAssistant] = useState([{ assistant: '' }])
  const [displayAssistant, setDisplayAssistant] = useState()
  const [itemName, setItemName] = useState()
  const [intention, setIntention] = useState()
  const [tools, setTools] = useState()

  const displayList = dictionary => {
    var list = ""
    var i = 0
    
    for (var key of dictionary) {
      i++
      if (i == dictionary.length) {
        list = list.concat(`${Object.values(key)}`)
      } else {
        list = list.concat(`${Object.values(key)}, `)
      }
    }

    return list
  }
  
  const handleFormChange = (index, event) => {
    let data = [...assistant]
    data[index][event.target.name] = event.target.value
    setAssistant(data)
  }


  const submit = (e) => {
    e.preventDefault()
    setName((name) => document.getElementById("name").value)
    setDisplayAssistant((displayAssistant) => displayList(assistant))
    setItemName((itemName) => document.getElementById("item").value)

  }

  const addAssistantFields = () => {
    let newField = { assistant: '' }
    
    setAssistant([...assistant, newField])
  }
  
  const removeFields = (index) => {
    let data = [...assistant]

    if (index != 0) {
      data.splice(index, 1)
      setAssistant(data)
    }
  }

  return (
    <div className="App">
      <div className="row">

        <div className='col'>
          <div className='form-container'>
            <p className='header'>Your Character Name</p>
            <input placeholder='Character Name' id="name"></input>
          </div>

          <div className='form-container'>
            <p>Research Assistant Name(s)</p>
            
            {assistant.map((input, index) => {
              if (index == 0) {
                return (
                  <div key={index}>
                  <input
                    className="assistant-input"
                    name="assistant"
                    placeholder='Assistant Name'
                    value={input.assistant}
                    onChange={event => handleFormChange(index, event)}
                  />
                </div>
                )
              }
              
              return (
                <div key={index}>
                  <input
                    className="assistant-input"
                    name="assistant"
                    placeholder='Assistant Name'
                    value={input.assistant}
                    onChange={event => handleFormChange(index, event)}
                  />
                  <button className='remove' onClick={() => removeFields(index)}>Remove</button>
                </div>
              )
            })}
            <button className="add-input" onClick={addAssistantFields}>Add Assistant</button>
          </div>

          <div className='form-container'>
            <p>Item Being Researched</p>
            <input placeholder='Item Name' id="item"></input>
          </div>

          <button onClick={submit}>Update</button>
        </div>




        <div className='col'>
          <b>Formula Development Permit Request</b> <br />
          <i>Your Character Name:</i> {name} <br />
          <i>Name of Research Assistant:</i> {displayAssistant}<br />
          <i>Item being researched:</i> {itemName}<br />
          <i>Craft Intention:</i> <br />
          <br />
          <b>FORMULA</b> <br />
          <u>Tools</u> <br />
          <li>Tool, Tool?, Skill</li> <br />

          <u>Materials</u>
          <ul>
            <li><i>Exotic:</i> Monster from the books, no Homebrew (CR #)</li>
            <li>#### gp (Material flavor)</li>
          </ul>

          <br />

          <u>Directions</u><br />
          <ol>
            <li>Example of crafting directions.</li>
            <li>It is mostly RP flavor but do what you think fits well</li>
            <li>Make it relate to the materials!</li>
            <li>Add your little special twists, it can be more steps.</li>
          </ol>

          <br />

          <b>Item Name</b><br />
          <i>Item Type, Rarity (requires attunement?)</i><br />
          Flavor description (Please don't go overboard)<br />
          <br />
          Item description, mechanics, etc etc.<br />
        </div>
      </div>
    </div>
  )
}

export default App
