<template>
  <section class="bg-white dark:bg-gray-900">
    <div class="px-[10rem] py-10">
      <!-- <div
        class="min-h-screen flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      > -->
      <!-- <GoBack /> -->

      <div>
        <router-link :to="'/note/show/' + $route.params.id">
          <button class="Btn border-2 border-black mb-[2rem]">
            <div class="sign">
              <svg viewBox="0 0 512 512">
                <path
                  d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
                ></path>
              </svg>
            </div>

            <div class="text">BACK</div>
          </button>
        </router-link>
      </div>

      <!-- Modal body -->

      <div class="p-4">
        <form @submit.prevent="update">
          <div class="brutalist-card h-auto w-auto">
            <div class="brutalist-card__alert text-center mb-[2rem]">EDIT A POSTIT</div>

            <!-- <div class="brutalist-card__header"> -->
            <div class="brutalist-card__alert">
              <div class="col-span-full">
                <!-- <label for="title" class="block text-sm font-medium leading-6 text-gray-900"
              >Postit Title</label
            > -->
                <input
                  type="title"
                  v-model="title"
                  name="title"
                  id="title"
                  placeholder="Postit Title"
                  class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                  required
                />
                <span v-if="error.title" class="text-red-600 text-[1rem]">{{ error.title }}</span>

              </div>
            </div>
            <!-- </div> -->

            <div class="brutalist-card__message">
              <div class="col-span-full">
                <div class="mt-2">
                  <textarea
                    id="content"
                    v-model="content"
                    name="about"
                    rows="3"
                    class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                    required
                  ></textarea>
                  <span v-if="error.content" class="text-red-600">{{ error.content }}</span>
                </div>
              </div>
            </div>
            <div class="brutalist-card__actions">
              <input
                type="submit"
                class="brutalist-card__button brutalist-card__button--mark"
                value="Update Post"
              />
            </div>
            <div v-if="formError">{{ formError }}</div>
          </div>
        </form>
      </div>
      <!-- </div> -->
    </div>
  </section>

  <!-- <p>{{ post.title }}</p> -->
</template>

<script setup>
// import router from '@/router';
import { onMounted, ref } from 'vue'
import router from '@/router'
import { useRoute } from 'vue-router'
import { useNoteStore } from '@/stores/NoteStore'
const error = ref({ title: '', content: '' })

const formError = ref('')

// import GoBack from './GoBack.vue'
const noteStore = useNoteStore()
const route = useRoute()

const note_id = route.params.id

const validateTitle = () => {
  if (!title.value.trim()) {
    error.value.title = 'Title is required and cannot be blank spaces.'
  } else if (title.value.length < 2) {
    error.value.title = 'Title must be at least 3 characters.'
  } else {
    error.value.title = ''
  }
}

const validateContent = () => {
  
  if (!content.value.trim()) {
  
    error.value.content = 'Content is required and cannot be blank spaces.'
  
  } else if (content.value.length < 5) {
  
    error.value.content = 'content must be at least 5 characters.'
  
  } else {
  
    error.value.content = ''
  
  }

}

onMounted(async () => {
  await noteStore.fetchNote(note_id)
})

const title = ref(noteStore.note.title)

const content = ref(noteStore.note.content)

const update = async () => {
  validateTitle()

  validateContent()

  if (!error.value.title && !error.value.content) {
    formError.value = ''

    try {
      noteStore.updateNote(title.value, [content.value], note_id)

      if (noteStore.updateNote(title.value, [content.value], note_id)) {
        await noteStore.fetchNote(note_id)

        router.push(`/note/show/${note_id}`)
      }
    } catch (error) {
      formError.value = `Failed to submit message: ${error.message}`
    }
  }
}
</script>

<style lang="scss" scoped>
.Btn {
  --black: #000000;
  --ch-black: #141414;
  --eer-black: #1b1b1b;
  --night-rider: #2e2e2e;
  --white: #ffffff;
  --af-white: #f3f3f3;
  --ch-white: #e1e1e1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 45px;
  height: 45px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition-duration: 0.3s;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
  background-color: var(--af-white);
}

/* plus sign */
.sign {
  width: 100%;
  transition-duration: 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sign svg {
  width: 17px;
}

.sign svg path {
  fill: var(--night-rider);
}
/* text */
.text {
  position: absolute;
  right: 0%;
  width: 0%;
  opacity: 0;
  color: var(--night-rider);
  font-size: 1.2em;
  font-weight: 600;
  transition-duration: 0.3s;
}
/* hover effect on button width */
.Btn:hover {
  width: 125px;
  border-radius: 5px;
  transition-duration: 0.3s;
}

.Btn:hover .sign {
  width: 30%;
  transition-duration: 0.3s;
  padding-left: 20px;
}
/* hover effect button's text */
.Btn:hover .text {
  opacity: 1;
  width: 70%;
  transition-duration: 0.3s;
  padding-right: 10px;
}
/* button click effect*/
.Btn:active {
  transform: translate(2px, 2px);
}
</style>
