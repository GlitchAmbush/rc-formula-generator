import { useState } from 'react'
import { NumericFormat } from 'react-number-format'
import './App.css'
import { toolOptions, skillOptions } from './resources/options'
import {
  makeOption,
  makeCROption,
  displayNames,
  displayToolSkill,
  checkRadio,
  getSelect,
  getCheck,
  calculateBudget,
  printMaterials
} from './resources/functions.jsx'

function App() {
  // Sets/States
  const [name, setName] = useState("Asfi Angelis")
  const [assistant, setAssistant] = useState([{ assistant: '' }])
  const [displayAssistant, setDisplayAssistant] = useState('Alisha, Lumina')
  const [itemName, setItemName] = useState('The Golden Pan')
  const [intention, setIntention] = useState("One-Off")
  const [toolSkill, setToolSkill] = useState("Smith's tools; Arcana")
  const [exotic, setExotic] = useState("Clockwork Defender Head")
  const [material, setMaterial] = useState([{ material: '', gold: '' }])
  const [materialDisplay, setMaterialDisplay] = useState(<li>Pan worth 100gp</li>)
  const [directions, setDirections] = useState([{ direction: ''}])
  const [itemType, setItemType] = useState('wonderous item (pan)')
  const [itemRarity, setItemRarity] = useState('common')
  const [itemDesc, setItemDesc] = useState()
  const [attunement, setAttunement] = useState()
  const [goldCost, setGoldCost] = useState(100)
  const [crRange, setCRRange] = useState("1 to 3")
  const [cr, setCR] = useState("CR 1")

  const calculateItemRequiremenets = (event) => {
    var cr = ''
    var goldCost = ''
    var value = event.target.value

    switch (value) {
      case 'common':
        goldCost = 100
        break
      case 'uncommon':
        goldCost = 400
        break
      case 'rare':
        goldCost = 4000
        break
      case 'very rare':
        goldCost = 20000
        break
      default:
        goldCost = 100
        break
    }
    
    switch (value) {
      case 'common':
        cr = "1 to 3"
        break
      case 'uncommon':
        cr = "4 to 8"
        break
      case 'rare':
        cr = "9 to 12"
        break
      case 'very rare':
        cr = "13 to 18"
        break
      default:
        cr = "1 to 3"
        break
    }

    setCRRange(cr)
    setGoldCost(goldCost)
  }

  const handleAssistantChange = (index, event) => {
    let data = [...assistant]
    data[index][event.target.name] = event.target.value
    setAssistant(data)
  }

  const addAssistantFields = () => {
    let newField = { assistant: '' }
    
    setAssistant([...assistant, newField])
  }

  const removeAssistantFields = (index) => {
    let data = [...assistant]
    if (index != 0) {
        data.splice(index, 1)
        setAssistant(data)
    }
  }

  const handleMaterialChange = (index, event) => {
    let data = [...material]
    data[index][event.target.name] = event.target.value
    setMaterial(data)
  }

  const addMaterialFields = () => {
    let newField = { material: '', gold: '' }
    
    setMaterial([...material, newField])
  }

  const removeMaterialFields = (index) => {
    let data = [...material]
    if (index != 0) {
        data.splice(index, 1)
        setMaterial(data)
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
    setItemType((itemType) => document.getElementById("itemType").value)
    setCR((cr) => document.getElementById("cr").value)
    setExotic((exotic) => document.getElementById("exotic").value)
    setMaterialDisplay((materialDisplay) => printMaterials(material))

    console.log(material[0])
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
                      onChange={event => handleAssistantChange(index, event)}
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
                    onChange={event => handleAssistantChange(index, event)}
                  />
                  <button className='remove' onClick={() => removeAssistantFields(index)}>Remove</button>
                </div>
              )
            })}
            <button className="add-input" onClick={addAssistantFields}>Add Assistant</button>
          </div>

          <div>
            <p>Item Being Researched</p>
            <input className='text-input' placeholder='Item Name' id="item" />
            <div style={{ paddingTop: "10px" }}>
              <input className='small-input' id='itemType' style={{marginLeft: "0px", marginRight: "20px", width: "35%"}} placeholder='Item Type' />
              Rarity: 
              <select
                className='small-input'
                style={{ marginRight: "20px" }}
                id="rarity"
                onChange={event => calculateItemRequiremenets(event)}
              >
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
            <p>Tools / Skills </p>
            <p style={{fontSize: "15px", fontWeight: 1}}>Note: Use CTRL/CMD to select multiple.</p>
            <select className="text-input modular-input" id="tools" multiple>{toolOptions.map(makeOption)}</select><br />
            <select className="text-input modular-input" id="skills" multiple>{skillOptions.map(makeOption)}</select><br />
          </div>

          <div>
            <p>Materials</p>
            Exotic CR: {crRange} <br />
            Gold Cost: <NumericFormat value={goldCost} displayType='text' thousandSeparator=' ' />gp <br />
            Current Budget: <NumericFormat value={calculateBudget(material, goldCost)} displayType='text' thousandSeparator=' ' />gp <br />
            <input className='text-input' id="exotic" style={{width: "45%", marginRight: "5px"}} placeholder='Exotic: Monster from Books, no HB' />
            <select className='text-input' id="cr" style={{ width: "24%" }}>{makeCROption().map(makeOption)}</select>
          
            {material.map((input, index) => {
              if (index == 0) {
                return (
                  <div key={index}>
                    <input
                      className='text-input'
                      name="material"
                      placeholder='Flavor; Material Name'
                      style={{ width: "45%", marginRight: "5px", marginTop: "10px" }}
                      value={input.material}
                      onChange={event => handleMaterialChange(index, event)}
                    />
                    <input
                      className='text-input'
                      name="gold"
                      placeholder='Gold Cost (GP)'
                      style={{ width: "20%" }}
                      value={input.gold}
                      onChange={event => handleMaterialChange(index, event)}
                    />
                  </div>
                )
              }

              return (
                <div key={index}>
                  <input
                    className='text-input'
                    name="material"
                    placeholder='Flavor; Material Name'
                    style={{ width: "45%", marginRight: "5px", marginTop: "10px" }}
                    value={input.material}
                    onChange={event => handleMaterialChange(index, event)}
                  />
                  <input
                    className='text-input'
                    name="gold"
                    placeholder='Gold Cost (GP)'
                    style={{ width: "20%" }}
                    value={input.gold}
                    onChange={event => handleMaterialChange(index, event)}
                  />
                  <button className='remove' onClick={() => removeMaterialFields(index)}>Remove</button>
                </div>
              )
            })}
            <button className="add-input" onClick={addMaterialFields}>Add Material</button>
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
          <ul id="materialList">
            <li><i>Exotic:</i> {exotic} ({cr})</li>
            {materialDisplay}
          </ul>

          <u>Directions</u><br />
          <ol>
            <li>Example of crafting directions.</li>
            <li>It is mostly RP flavor but do what you think fits well</li>
            <li>Make it relate to the materials!</li>
            <li>Add your little special twists, it can be more steps.</li>
          </ol>

          <b>{itemName}</b><br />
          <i>{itemType}, {itemRarity} {attunement}</i><br />
          Flavor description (Please don't go overboard)<br />
          <br />
          Item description, mechanics, etc etc.<br />
        </div>
      </div>
    </div>
  )
}

export default App
