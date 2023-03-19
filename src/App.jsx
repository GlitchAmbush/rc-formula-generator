import { useState } from 'react'
import './App.css'
import { toolOptions, skillOptions } from './resources/options'

function App() {
  // Sets/States
  const [name, setName] = useState()
  const [assistant, setAssistant] = useState([{ assistant: '' }])
  const [displayAssistant, setDisplayAssistant] = useState()
  const [itemName, setItemName] = useState()
  const [intention, setIntention] = useState()
  const [tools, setTools] = useState([{tool: ''}])

  // Functions
  const makeOption = (item) => {
    return <option key={item} value={item}>{item}</option>
  }
  
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

  const checkRadio = () => {
    var getSelected = document.querySelector('input[name="intention"]:checked')
    if (getSelected != null) {
      if (getSelected.value == "") {
        return document.getElementById('other-intention').value
      }
      
      return getSelected.value
    }
  }

  const submit = (e) => {
    e.preventDefault()
    setName((name) => document.getElementById("name").value)
    setDisplayAssistant((displayAssistant) => displayList(assistant))
    setItemName((itemName) => document.getElementById("item").value)
    setIntention((intention) => checkRadio())
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


  // Main App
  return (
    <div className="App">
      <div className="row">
        <div className='col'>
          <div>
            <p className='header'>Your Character Name</p>
            <input className='text-input' placeholder='Character Name' id="name" autoComplete='off' />
          </div>

          <div>
            <p>Research Assistant Name(s)</p>
            {assistant.map((input, index) => {
              if (index == 0) {
                return (
                  <div key={index}>
                  <input
                    className="text-input modular-input"
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
                    className="text-input modular-input"
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

          <div>
            <p>Item Being Researched</p>
            <input className='text-input' placeholder='Item Name' id="item" />
          </div>

          <div>
            <p>Crafting Intention</p>
            <input type="radio" name="intention" id="one-off" value="One-Off" /> One-Off <br/>
            <input type="radio" name="intention" id="patent" value="Patent" /> Patent <br/>
            <input type="radio" name="intention" id="sell" value="Sell / Quantity" /> Sell / Quantity <br/>
            <input type="radio" name="intention" id="public" value="Public Use" /> Public Use <br/>
            <input type="radio" name="intention" id="other" value="" /> Other:<input className='small-input' id='other-intention' /><br />
          </div>

          <div>
            <p>Tools</p>
            <select className="text-input modular-input" id="tools">{toolOptions.map(makeOption)}</select><br />
            <select className="text-input modular-input" id="tools">{skillOptions.map(makeOption)}</select><br />
            
            {tools.map((input, index) => {
              if (index == 0) {
                return (
                  <div key={index}>
                    <select className="text-input modular-input" id="tools" value={input.tools}>{toolOptions.map(makeOption)}</select>
                  </div>
                )
              }

              return (
                <div key={index}>
                  <select className="text-input modular-input" id="tools" value={input.tools}>{toolOptions.map(makeOption)}</select>
                  <button className='remove'>Remove</button>
                </div>
              )
            })}

            <button className="add-input">Add Tool</button>
            <button className="add-input" style={{marginLeft: "5px"}}>Add Skill</button>
          </div>
          <button onClick={submit}>Update</button>
        </div>




        <div className='col'>
          <b>Formula Development Permit Request</b> <br />
          <i>Your Character Name:</i> {name} <br />
          <i>Name of Research Assistant:</i> {displayAssistant}<br />
          <i>Item being researched:</i> {itemName}<br />
          <i>Craft Intention:</i> {intention}<br />
          <br />
          <b>FORMULA</b> <br />
          <u>Tools</u> <br />
          <li>Tool, Tool?, Skill</li> <br />

          <u>Materials</u>
          <ul>
            <li><i>Exotic:</i> Monster from the books, no Homebrew (CR #)</li>
            <li>#### gp (Material flavor)</li>
          </ul>

          <u>Directions</u><br />
          <ol>
            <li>Example of crafting directions.</li>
            <li>It is mostly RP flavor but do what you think fits well</li>
            <li>Make it relate to the materials!</li>
            <li>Add your little special twists, it can be more steps.</li>
          </ol>

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
