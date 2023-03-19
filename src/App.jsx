import { useState } from 'react'
import './App.css'
import { toolOptions, skillOptions } from './resources/options'

function App() {
  // Sets/States
  const [name, setName] = useState()
  const [assistant, setAssistant] = useState([{ assistant: '' }])
  const [displayAssistant, setDisplayAssistant] = useState('[ If Applicable ]')
  const [itemName, setItemName] = useState('Item Name')
  const [intention, setIntention] = useState()
  const [toolSkill, setToolSkill] = useState('Tool, Tool; Skill')
  const [exotic, setExotic] = useState()
  const [material, setMaterial] = useState()
  const [directions, setDirections] = useState()
  const [itemType, setItemType] = useState()
  const [itemRarity, setItemRarity] = useState()
  const [itemDesc, setItemDesc] = useState()
  const [attunement, setAttunement] = useState()

  // Functions
  const makeOption = (item) => {
    return <option key={item} value={item}>{item}</option>
  }
  
  const displayNames = dictionary => {
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

  const displayToolSkill = (toolArray, skillArray) => {
    var list = ""
    for (var i = 0, len = toolArray.length; i < len; i++) {
      if (i == toolArray.length-1) {
        if (skillArray[0] == "None") {
          list = list.concat(`${toolArray[i]}`)
        } else {
          list = list.concat(`${toolArray[i]}; `)
        }
      } else {
        list = list.concat(`${toolArray[i]}, `)
      }
    }

    if (skillArray[0] != "None") {
      for (var i = 0, len = skillArray.length; i < len; i++) {
        if (i == skillArray.length-1) {
          list = list.concat(`${skillArray[i]}`)
        } else {
          list = list.concat(`${skillArray[i]}, `)
        }
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

  const getSelect = (select) => {
    var result = []
    var options = select && select.options
    var opt

    for (var i = 0, len = options.length; i < len; i++) {
      opt = options[i]

      if (opt.selected) {
        result.push(opt.value || opt.text)
      }
    }

    return result
  }

  const getCheck = (check) => {
    if (check) {
      return ' (requires attunement)'
    } 

    return ""
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

  const submit = (e) => {
    e.preventDefault()
    const toolList = getSelect(document.getElementById('tools'))
    const skillList = getSelect(document.getElementById('skills'))

    setName((name) => document.getElementById("name").value)
    setDisplayAssistant((displayAssistant) => displayNames(assistant))
    setItemName((itemName) => document.getElementById("item").value)
    setIntention((intention) => checkRadio())
    setToolSkill((toolSkill) => displayToolSkill(toolList, skillList))
    setAttunement((attunement) => getCheck(document.getElementById("attunement").checked))
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
            <div style={{paddingTop: "10px"}}>
              Rarity: <select className='small-input' style={{marginRight: "20px"}} id="rarity">
                <option value="common">Common</option>
                <option value="uncommon">Uncommon</option>
                <option value="rare">Rare</option>
                <option value="very rare">Very Rare</option>
              </select>
              Attunement? <input type="checkbox" id="attunement"/>
            </div>
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
            <p>Tools / Skills</p>
            <p style={{fontSize: "15px", fontWeight: 1}}>Note: Use CTRL/CMD to select multiple.</p>
            <select className="text-input modular-input" id="tools" multiple>{toolOptions.map(makeOption)}</select><br />
            <select className="text-input modular-input" id="skills" multiple>{skillOptions.map(makeOption)}</select><br />
          </div>

          <div>
            <p>Exotic</p>
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
          <ul>
            <li>{toolSkill}</li>
          </ul>

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

          <b>{itemName}</b><br />
          <i>Item Type, Rarity{attunement}</i><br />
          Flavor description (Please don't go overboard)<br />
          <br />
          Item description, mechanics, etc etc.<br />
        </div>
      </div>
    </div>
  )
}

export default App
