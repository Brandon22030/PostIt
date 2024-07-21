// import { ref } from "vue";


// const notes = []
// SHOW ALL POSTIT


export const fetchNotes = async(page = 1, limit = 5) => {
    
    const response = await fetch(`${'https://post-it.epi-bluelock.bj/notes'}?page=${page}&limit=${limit}`)
    
    const datas = await response.json()    
    // .then(data => data.notes)

    return datas.notes

};

// SHOW ONE POSTIT
export const fetchNote = async(noteId) => {
    
    const response = await fetch(`https://post-it.epi-bluelock.bj/notes/${noteId}`)
    
    const data = await response.json()

    return data
    
}

// UPDATE ONE POSTIT
export const updateNote = async(title, content, noteId) =>  {
    
    await fetch(`https://post-it.epi-bluelock.bj/notes/${noteId}`, {
    
        method: 'PUT',
    
        headers: { 'Content-Type': 'application/json' },
    
        body: JSON.stringify({title, content})
    
    })
    // const index = this.notes.findIndex(n => n.id === note.id)
    // if (index !== -1) {

    //     this.notes.splice(index, 1, note)

    // }
}

// ADD A POSTIT
export const addNote = async(title, content) => {
    
    const response = await fetch('https://post-it.epi-bluelock.bj/notes', {
    
        method: 'POST',
    
        headers: { 'Content-Type': 'application/json' },
    
    
        body: JSON.stringify({ title, content })
    })

    if(!response.ok){

        throw new Error(`Error: ${response.statusText}`)

    }

    const data = await response.json()

    return data

}


export const deleteNote = async(noteId) => {
    
    await fetch(`https://post-it.epi-bluelock.bj/notes/${noteId}`, {
    
        method: 'DELETE'
    
    })


    // router.push('/')

}