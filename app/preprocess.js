const fs = require('fs')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))
const CDN_URL = "https://raw.githubusercontent.com/PMDCollab/SpriteCollab/master"
const DISCORD_APP_URL = 'https://cdn.discordapp.com/attachments/'
const {DataFrame} = require('dataframe-js')

const flatMetadata = {}
const mappedCredits = {}
const mappedContacts = {}
const mappedEmotionIndex = {}
const mappedIndexEmotion = {}
const mappedActionIndex = {}
const mappedIndexAction = {}


async function preprocess(){
    const confResponse = await fetch(`${CDN_URL}/sprite_config.json`)
    const spriteConfig = await confResponse.json()

    spriteConfig.emotions.forEach((e, i)=>{
        mappedEmotionIndex[e.toString()] = i
        mappedIndexEmotion[i] = e.toString()
    })

    const le = spriteConfig.emotions.length

    spriteConfig.emotions.forEach((e, i)=>{
        mappedEmotionIndex[e + '^'] = i + le
        mappedIndexEmotion[i + le] = e + '^'
    })

    spriteConfig.actions.forEach((a, i) => {
        mappedActionIndex[a] = i
        mappedIndexAction[i] = a
    })

    const response = await fetch(`${CDN_URL}/tracker.json`)
    const metadata = await response.json()

    function flattenMetadata(info, infoKey, infoName){
        if((info.sprite_files && Object.keys(info.sprite_files).length > 0) || (info.portrait_files && Object.keys(info.portrait_files).length > 0)){
            flatMetadata[infoKey] = {}
            flatMetadata[infoKey].r = []
            flatMetadata[infoKey].pm = info.portrait_modified
            flatMetadata[infoKey].n = infoName
            flatMetadata[infoKey].sm = info.sprite_modified
            flatMetadata[infoKey].pc = {}
            flatMetadata[infoKey].pc.p = info.portrait_credit.primary
            flatMetadata[infoKey].pc.s = info.portrait_credit.secondary
            flatMetadata[infoKey].pf = Object.keys(info.portrait_files).map(k => mappedEmotionIndex[k.toString()])
            flatMetadata[infoKey].sc = {}
            flatMetadata[infoKey].sc.p = info.sprite_credit.primary
            flatMetadata[infoKey].sc.s = info.sprite_credit.secondary
            flatMetadata[infoKey].sf = Object.keys(info.sprite_files).map(k => mappedActionIndex[k.toString()])
            flatMetadata[infoKey].pl = info.portrait_link.split(DISCORD_APP_URL)[1]
            flatMetadata[infoKey].prl = info.portrait_recolor_link.split(DISCORD_APP_URL)[1]
            flatMetadata[infoKey].sl = info.sprite_link.split(DISCORD_APP_URL)[1]
            flatMetadata[infoKey].srl = info.sprite_recolor_link.split(DISCORD_APP_URL)[1]
        }
        if(info.subgroups){
            Object.keys(info.subgroups).forEach(s =>{
                const split = info.subgroups[s].name.split('\\').join(',').split('-').join(',').split(' ').join(',').split('_').join(',').split(',')
                let name = ''
                split.forEach(spl => {if(!infoName.includes(spl)){name += ' ' + spl}})
                flattenMetadata(info.subgroups[s], `${infoKey}/${s}`, `${infoName} ${name}`)
            })
        }
    }

    console.log('flatten metadata', Object.keys(metadata).length)

    Object.keys(metadata).forEach(k=>{
        flattenMetadata(metadata[k],k, metadata[k].name, [{id: k, name: metadata[k].name}])
    })

    console.log('add related id to flatten metadata', Object.keys(flatMetadata).length)

    Object.keys(flatMetadata).forEach(k=>{
        Object.keys(flatMetadata).forEach(l=>{
            if(l.split('/')[0] === k.split('/')[0]){
                flatMetadata[k].r.push(l)
            }
        })
    })

    console.log('sort related id to flatten metadata', Object.keys(flatMetadata).length)

    Object.keys(flatMetadata).forEach(k=>{
        flatMetadata[k].r.sort((a,b) => a.length - b.length)
    })

    console.log('map authors to their ds id', Object.keys(flatMetadata).length)
    
    const df = await DataFrame.fromText(`${CDN_URL}/credit_names.txt`,'\t',true)
    const dict = await df.toDict()
    for (let i = 0; i < dict.Discord.length; i++) {
        mappedCredits[dict.Discord[i]] = {discord: dict.Discord[i], name: dict.Name[i], contact:dict.Contact[i]}
        mappedContacts[dict.Name[i]] = dict.Contact[i]
    }

    console.log('replace ids with names in flatten metada', Object.keys(flatMetadata).length)

    Object.keys(flatMetadata).forEach(k =>{
        if(mappedCredits[flatMetadata[k].pc.p]?.name){
            flatMetadata[k].pc.p = mappedCredits[flatMetadata[k].pc.p].name
        }

        if(mappedCredits[flatMetadata[k].sc.p]?.name){
            flatMetadata[k].sc.p = mappedCredits[flatMetadata[k].sc.p].name
        }

        flatMetadata[k].sc.s.forEach((s, i)=>{
            if(mappedCredits[s].name){
                flatMetadata[k].sc.s[i] = mappedCredits[s].name
            }
        })

        flatMetadata[k].pc.s.forEach((s, i)=>{
            if(mappedCredits[s].name){
                flatMetadata[k].pc.s[i] = mappedCredits[s].name
            }
        })
    })
    fs.writeFileSync('./src/tracker.json', JSON.stringify(flatMetadata,null,0))
    fs.writeFileSync('./src/mappedContacts.json', JSON.stringify(mappedContacts,null,0))
    fs.writeFileSync('./src/mappedEmotions.json', JSON.stringify(mappedIndexEmotion,null,0))
    fs.writeFileSync('./src/mappedActions.json', JSON.stringify(mappedIndexAction,null,0))
}

preprocess()