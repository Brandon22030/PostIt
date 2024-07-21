// import router from '@/router'
import { defineStore } from 'pinia'
// import { Connect } from 'vite'
// import router from '@/router'

import { updateNote, addNote, fetchNotes, deleteNote, fetchNote } from '@/api'

export const useNoteStore = defineStore('noteStore', {
  state: () => ({
    notes: [],
    note:'',
    content:'',
    currentPage: 1,
    totalPages: 1,
    postPerPage: 1
    // title:'',
    // content:'',
  }),
  actions: {
    
    async fetchNotes() {
      
      this.notes = await fetchNotes()

    },

    async fetchNote(noteId) {
      
      this.note = await fetchNote(noteId)

      this.content = this.note.content[0]

    },

    async addNote(title, content){

      await addNote(title, content)

      this.notes.unshift({ title: title, content: content })

      await this.fetchNotes()

    },

    async updateNote(title, content, noteId){

      await updateNote(title, content, noteId)

      if(updateNote(title, content, noteId)){

        await this.fetchNote(noteId)

      }


    },

    async deleteNote(noteId){

      await deleteNote(noteId)

      this.notes = this.notes.filter(note => note.id !== noteId)

      await this.fetchNotes()

    }




  }
})
