import { NumericFormat } from 'react-number-format'

const calculateItemRequirements = (event) => {
    var cr = ''
    var goldCost = ''
    var dc = 11
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

    switch (value) {
        case 'common':
            dc = 11
            break
        case 'uncommon':
            dc = 13
            break
        case 'rare':
            dc = 15
            break
        case 'very rare':
            dc = 17
            break
        default:
            dc = 11
            break
    }

    return { gp: goldCost, challenge: cr, difficult: dc, rarity: value}
}

const makeOption = (item) => {
    return <option key={item} value={item}>{item}</option>
}

const makeCROption = () => {
    var crArray = []
    for (var i = 1; i <= 18; i++) {
        crArray.push(`CR ${i}`)
    }
    return crArray
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

const calculateBudget = (materials, budget) => {
    for (const key in materials) {
        budget -= materials[key]["gold"]
    }

    return budget
}

const printMaterials = (materials) => {
    var inserts = []
    
    for (const key in materials) {
        inserts.push(<li key={key}>{materials[key]["material"]} worth <NumericFormat value={materials[key]["gold"]} displayType='text' thousandSeparator=' ' />gp</li>)
    }

    return inserts
}

const printDirections = (directions) => {
    var inserts = []
    
    for (const key in directions) {
        inserts.push(<li key={key}>{directions[key]["direction"]}</li>)
    }

    return inserts
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

export {
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
}