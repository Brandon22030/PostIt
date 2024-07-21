<template>
  <div>
    <!-- component -->
    <section class="bg-white dark:bg-gray-900">
      <div class="container px-[10rem] py-10 mx-auto">
        <GoBack />

        <div class="brutalist-card h-auto w-auto">
          <div class="brutalist-card__header">
            <div class="brutalist-card__alert">
              <p>
                <div v-if="loarder" >
                  <loader/>
                </div>
                <span v-else>
                  {{ noteStore.note.title }}
                </span>
              </p>
              <div class="text-xl text-red-600 flex justify-center">{{ errors }}</div>
            </div>
          </div>
          <div v-if="loarder" >
                  <loader/>
                </div>
                
          <div v-else class="brutalist-card__message break-all text-lg">
            {{ noteStore.content }}
          </div>
          <div class="brutalist-card__actions flex justify-between">
            <!-- UPDATE BUTTON -->
            <router-link :to="'/note/update/' + noteStore.note._id">
              <p class="brutalist-card__button brutalist-card__button--mark w-[10rem]">EDIT</p>
            </router-link>

            <!-- DELETE BUTTON -->
            <div @click="() => deletePost(noteStore.note._id)">
              <p
                class="brutalist-card__button brutalist-card__button--read cursor-pointer w-[10rem]"
              >
                delete
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// import ShowPosts from '../ShowPosts.vue';
import router from '@/router'
import loader from '@/components/loader.vue'
// import UpdateButton from '../CRUD/UpdateButton.vue'
import GoBack from './GoBack.vue'
import { useNoteStore } from '@/stores/NoteStore'

import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const loarder = ref(true)

const route = useRoute()

const errors = ref('')

const note_id = route.params.id

const noteStore = useNoteStore()

onMounted(async () => {

  try{

    await noteStore.fetchNote(note_id)

  }catch(error){

errors.value = `Failed to submit form: ${error.message}`

}

  // console.log(noteStore)

  loarder.value = false

  //   if (noteStore.fetchNotes()) {
  //     is_spinner.value = false
  //   }
})

// DELETE POSTIT
const deletePost = (id) => {
  noteStore.deleteNote(id)

  if (noteStore.deleteNote(id)) {

    router.push('/')
  
  }
}

// console.log(this.$route.params.id)

// onMounted(async () => {
//   await showPost(note_id)
// })
</script>

<style lang="scss" scoped>

</style>