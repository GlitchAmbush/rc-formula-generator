import { useState, useEffect } from 'react'
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
  printMaterials,
  printDirections,
  calculateItemRequirements
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
  const [directions, setDirections] = useState([{ direction: '' }])
  const [directionDisplay, setDirectionDisplay] = useState(<li>Dip pan in bowl of gold</li>)
  const [itemType, setItemType] = useState('wonderous item (pan)')
  const [itemRarity, setItemRarity] = useState('common')
  const [itemDesc, setItemDesc] = useState('Pan with a lustorous gold.')
  const [itemMechanics, setItemMechanics] = useState('It really hurts people.')
  const [attunement, setAttunement] = useState()
  const [goldCost, setGoldCost] = useState(100)
  const [crRange, setCRRange] = useState("1 to 3")
  const [cr, setCR] = useState("CR 1")
  const [dc, setDC] = useState(11)

  const handleRarityChange = (event) => {
    setItemRarity(calculateItemRequirements(event).rarity)
    setGoldCost(calculateItemRequirements(event).gp)
    setCRRange(calculateItemRequirements(event).challenge)
    setDC(calculateItemRequirements(event).difficult)
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

  const handleDirectionChange = (index, event) => {
    let data = [...directions]
    data[index][event.target.name] = event.target.value
    setDirections(data)
  }

  const addDirectionFields = () => {
    let newField = { direction: '' }

    setDirections([...directions, newField])
  }

  const removeDirectionFields = (index) => {
    let data = [...directions]
    if (index != 0) {
        data.splice(index, 1)
        setDirections(data)
    }
  }

  const copyToClipboard = () => {
    var materialList = ``
    var directionList = ``
    var desc = ``
    var i = 0

    for (const key in material) {
      materialList = materialList.concat(`\n\t- ${material[key]["material"]} worth ${material[key]["gold"]}gp`)
    }

    for (const key in directions) {
      i++
      directionList = directionList.concat(`\n\t${i}. ${directions[key]["direction"]}`)
    }
    
    if (itemDesc != '') {
      desc = `\n>>> ${itemDesc}\n\n${itemMechanics}`
    } else {
      desc = `\n>>> ${itemMechanics}`
    }

    var formula = `**Formula Development Permit Request**` +
      `\n*Your Character Name:* ${name}` +
      `\n*Name of Research Assistant(s):* ${displayAssistant}` +
      `\n*Item being researched:* ${itemName}` +
      `\n*Crafting Intention:* ${checkRadio()}` +
      `\n\n**FORMULA**` +
      `\n__Tools__` +
      `\n\t- ${toolSkill}` +
      `\n\n__Materials__` +
      `\n\t- *Exotic:* ${exotic} (${cr})` +
      materialList + 
      `\n\n__Directions__` +
      directionList +
      `\n\n**${itemName}**` +
      `\n*${itemType}, ${itemRarity}${getCheck(document.getElementById("attunement").checked)}*` +
      desc

    navigator.clipboard.writeText(formula)
    alert("Formula copied to clipboard!")
  }

  const submit = (event) => {
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
    setDirectionDisplay((directionDisplay) => printDirections(directions))
    setItemDesc((itemDesc) => document.getElementById("flavor").value)
    setItemMechanics((itemMechanics) => document.getElementById("mechanics").value)
    event.preventDefault()
  }

  // Main App
  return (
    <div className="App">
      <h1 style={{textAlign: "center"}}>Runecrest Formula Generator</h1>
      <div className="row">
        <form className='col' method='post' autoComplete='off' onSubmit={submit}>
          <div>
            <p className='header'>Your Character Name</p>
            <input className='text-input' placeholder='Character Name' id="name" required/>
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
            <input className='text-input' placeholder='Item Name' id="item" required/>
            <div style={{ paddingTop: "10px" }}>
              <input className='small-input' id='itemType' style={{marginLeft: "0px", marginRight: "20px", width: "35%"}} placeholder='Item Type' required/>
              Rarity: 
              <select
                className='small-input'
                style={{ marginRight: "20px" }}
                id="rarity"
                onChange={event => handleRarityChange(event)}
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
            <input type="radio" name="intention" id="one-off" value="One-Off" required/> One-Off <br/>
            <input type="radio" name="intention" id="patent" value="Patent" /> Patent <br/>
            <input type="radio" name="intention" id="sell" value="Sell / Quantity" /> Sell / Quantity <br/>
            <input type="radio" name="intention" id="public" value="Public Use" /> Public Use <br/>
            <input type="radio" name="intention" id="other" value="" /> Other:<input className='small-input' id='other-intention' /><br />
          </div>

          <div>
            <p>Tools / Skills </p>
            Note: Use CTRL/CMD to select multiple.
            <select className="text-input modular-input" id="tools" multiple required>{toolOptions.map(makeOption)}</select><br />
            <select className="text-input modular-input" id="skills" multiple required>{skillOptions.map(makeOption)}</select><br />
          </div>

          <div>
            <p>Materials</p>
            Recommended Exotic CR: {crRange} <br />
            Gold Cost: <NumericFormat value={goldCost} displayType='text' thousandSeparator=' ' />gp <br />
            Current Budget: <NumericFormat value={calculateBudget(material, goldCost)} displayType='text' thousandSeparator=' ' />gp <br />
            <input className='text-input' id="exotic" style={{width: "45%", marginRight: "5px"}} placeholder='Exotic: Monster from Books, no HB' required/>
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
                      required
                    />
                    <input
                      type="number"
                      className='text-input'
                      name="gold"
                      placeholder='Gold Cost (GP)'
                      style={{ width: "20%" }}
                      value={input.gold}
                      onChange={event => handleMaterialChange(index, event)}
                      required
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
                    required
                  />
                  <input
                    type="number"
                    className='text-input'
                    name="gold"
                    placeholder='Gold Cost (GP)'
                    style={{ width: "20%" }}
                    value={input.gold}
                    onChange={event => handleMaterialChange(index, event)}
                    required
                  />
                  <button className='remove' onClick={() => removeMaterialFields(index)}>Remove</button>
                </div>
              )
            })}
            <button className="add-input" style={{marginTop: "10px"}} onClick={addMaterialFields}>Add Material</button>
          </div>

            <div>
              <p>Directions</p>
              Mostly RP flavor. Make it related to materials!<br/>
              {directions.map((input, index) => {
                if (index == 0) {
                  return (
                    <div key={index}>
                      <input
                        className="text-input modular-input"
                        name="direction"
                        placeholder={`Step ${index+1}`}
                        value={input.direction}
                        onChange={event => handleDirectionChange(index, event)}
                        required
                      />
                    </div>
                  )
                }
                
                return (
                  <div key={index}>
                    <input
                      className="text-input modular-input"
                      name="direction"
                      placeholder={`Step ${index+1}`}
                      value={input.direction}
                      onChange={event => handleDirectionChange(index, event)}
                      required
                    />
                    <button className='remove' onClick={() => removeDirectionFields(index)}>Remove</button>
                  </div>
                )
              })}
            </div>
            <button className="add-input" onClick={addDirectionFields}>Add Direction</button>

          <div>
            <p>Flavor</p>
            <textarea id='flavor' placeholder="Flavor Descrption. Please don't go overboard."/>
          </div>
          
          <div>
            <p>Mechanics</p>
            Item save DC based on rarity: DC {dc}
            <textarea id='mechanics' placeholder="Mechanic description, mechanics, etc." required/>
          </div>
          
          <input type="submit" className='float' value='Update' />
        </form>
        




        <div className='col'>
          <b>Formula Development Permit Request</b> <br />
          <i>Your Character Name:</i> {name} <br />
          <i>Name of Research Assistant(s):</i> {displayAssistant}<br />
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
          <ol id="directionList">
            {directionDisplay}
          </ol>

          <b>{itemName}</b><br />
          <i>{itemType}, {itemRarity}{attunement}</i>
          <pre style={{fontFamily: 'inherit'}}>{itemDesc}</pre>
          <pre style={{fontFamily: 'inherit'}}>{itemMechanics}</pre>
        </div>
      </div>

      <button className='float-secondary' onClick={copyToClipboard}>Copy Formula</button>
    </div>
  )
}

export default App
