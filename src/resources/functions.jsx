import { NumericFormat } from 'react-number-format'

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
        inserts.push(<li>{materials[key]["material"]} worth <NumericFormat value={materials[key]["gold"]} displayType='text' thousandSeparator=' ' />gp</li>)
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
        return '(requires attunement)'
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
    printMaterials
}