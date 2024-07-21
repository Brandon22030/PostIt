<template>
  <!-- Add Postit -->
  <div class="p-8 sm:p-9 md:p-7 xl:p-9 text-center">
    <div>
      <div class="rounded-lg overflow-hidden border-gray-200 bg-white">
        <div class="text-center my-6">
          <h1 class="text-3xl font-semibold text-gray-700">Add Postit</h1>
        </div>

        <div class="p-8 sm:p-9 md:p-7 xl:p-9 text-center">
          <form class="mb-4" @submit.prevent="addNewNote">
            <div :class="{ 'input-container': true, 'input-error': error.title }">
              <label for="title" class="block text-sm font-medium leading-6 text-gray-900">Postit Title</label>
              <input
                type="text"
                v-model="title"
                @blur="validateTitle"
                name="title"
                id="title"
                placeholder="Postit Title"
                class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
              />
              <span v-if="error.title" class="error-message">{{ error.title }}</span>
            </div>
            <div class="col-span-full">
              <label for="content" class="block text-sm font-medium leading-6 text-gray-900"
                >Postit Content</label
              >
              <div :class="{ 'input-container': true, 'input-error': error.content }">
                <input type="text" 
                  id="content"
                  v-model="content"
                  @blur="validateContent"
                  name="about"

                  class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                />
                <span v-if="error.content">{{ error.content }}</span>
              </div>
            </div>
            <div class="mt-6">
              <input
                type="submit"
                class="w-full px-3 py-4 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none duration-100 ease-in-out"
                value="Save"
              />
            </div>
            <div v-if="formError">{{ formError }}</div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import GoBack from './singlePostit/GoBack.vue'
import { useNoteStore } from '../stores/NoteStore'
const noteStore = useNoteStore()

// import router from '@/router';
import { ref } from 'vue'
// import router from '@/router';

const title = ref('')

const content = ref('')

const error = ref({ title: '', content: '' })

const formError = ref('')

const validateTitle = () => {
  if (!title.value.trim()) {
    error.value.title = 'Title is required and cannot be blank spaces.'
  } else if (title.value.length < 3) {
    error.value.title = 'Title must be at least 3 characters.'
  } else {
    error.value.title = ''
  }
}

const validateContent = () => {
  if (!content.value.trim()) {
    error.value.content = 'Content is required and cannot be blank spaces.'
  } else if (content.value.length < 5) {
    error.value.content = 'content must be at least 3 characters.'
  } else {
    error.value.content = ''
  }
}

// const navigationResult = await router.push('/')

const addNewNote = async () => {
  validateTitle();
  validateContent();

  if (!error.value.title && !error.value.content) {
    
    formError.value = '';

    try {
      
      noteStore.addNote(
      
      title.value,

      [content.value]

    )

  } catch (error) {

    formError.value = `Failed to submit message: ${error.message}`

  }

}
}

// console.log(title.value)
// console.log(content.value)
</script>

<style lang="scss" scoped></style>
