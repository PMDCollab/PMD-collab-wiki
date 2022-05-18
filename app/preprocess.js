const fs = require('fs')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))
const CDN_URL = "https://raw.githubusercontent.com/PMDCollab/SpriteCollab/master"
const {DataFrame} = require('dataframe-js')

const flatMetadata = {}
const mappedCredits = {}
const mappedContacts = {}

async function preprocess(){
    const response = await fetch(`${CDN_URL}/tracker.json`)
    const metadata = await response.json()

    function flattenMetadata(info, infoKey, infoName){
        if(info.portrait_files && Object.keys(info.portrait_files).length > 0){
            flatMetadata[infoKey] = {}
            flatMetadata[infoKey].related = []
            flatMetadata[infoKey].portrait_modified = info.portrait_modified
            flatMetadata[infoKey].name = infoName
            flatMetadata[infoKey].sprite_modified = info.sprite_modified
            flatMetadata[infoKey].portrait_credit = info.portrait_credit
            flatMetadata[infoKey].portrait_files = info.portrait_files
            flatMetadata[infoKey].sprite_credit = info.sprite_credit
            flatMetadata[infoKey].sprite_files = info.sprite_files
        }
        if(info.subgroups){
            Object.keys(info.subgroups).forEach(s =>{
                const split = info.subgroups[s].name.split(' ').join(',').split('_').join(',').split(',')
                let name = ''
                split.forEach(spl => {if(!infoName.includes(spl)){name += ' ' + spl}})
                flattenMetadata(info.subgroups[s], `${infoKey}/${s}`, `${infoName} ${name}`)
            })
        }
    }

    Object.keys(metadata).forEach(k=>{
        flattenMetadata(metadata[k],k, metadata[k].name, [{id: k, name: metadata[k].name}])
    })

    Object.keys(flatMetadata).forEach(k=>{
        Object.keys(flatMetadata).forEach(l=>{
            if(l.split('/')[0] === k.split('/')[0]){
                flatMetadata[k].related.push(l)
            }
        })
    })

    Object.keys(flatMetadata).forEach(k=>{
        flatMetadata[k].related.sort((a,b) => a.length - b.length)
    })
    
    const df = await DataFrame.fromText(`${CDN_URL}/credit_names.txt`,'\t',true)
    const dict = await df.toDict()
    for (let i = 0; i < dict.Discord.length; i++) {
        mappedCredits[dict.Discord[i]] = {discord: dict.Discord[i], name: dict.Name[i], contact:dict.Contact[i]}
        mappedContacts[dict.Name[i]] = dict.Contact[i]
    }

    Object.keys(flatMetadata).forEach(k =>{
        if(mappedCredits[flatMetadata[k].portrait_credit.primary]?.name){
            flatMetadata[k].portrait_credit.primary = mappedCredits[flatMetadata[k].portrait_credit.primary].name
        }

        if(mappedCredits[flatMetadata[k].sprite_credit.primary]?.name){
            flatMetadata[k].sprite_credit.primary = mappedCredits[flatMetadata[k].sprite_credit.primary].name
        }

        flatMetadata[k].sprite_credit.secondary.forEach((s, i)=>{
            if(mappedCredits[s].name){
                flatMetadata[k].sprite_credit.secondary[i] = mappedCredits[s].name
            }
        })

        flatMetadata[k].portrait_credit.secondary.forEach((s, i)=>{
            if(mappedCredits[s].name){
                flatMetadata[k].portrait_credit.secondary[i] = mappedCredits[s].name
            }
        })
    })
    fs.writeFileSync('./src/tracker.json', JSON.stringify(flatMetadata,null,0))
    fs.writeFileSync('./src/mappedContacts.json', JSON.stringify(mappedContacts,null,0))
}

preprocess()