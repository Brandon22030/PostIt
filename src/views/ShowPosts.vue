<template>
  <header class="bg-[#F3F4F6]">
    <nav class="flex w-auto bg-black h-[10rem] shadow-2xl justify-between md:h-16">
      <div class="flex w-full justify-between items-center mx-[2rem]">
        <div
          class="flex text-white px-6 w-1/2 text-2xl items-center font-semibold md:w-1/5 md:px-1 md:flex md:items-center md:justify-center"
        >
          <router-link to="/">POSTIT</router-link>
        </div>
        <!-- SEARCH BAR -->
        <div class="form">
          <button>
            <svg
              width="17"
              height="16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-labelledby="search"
            >
              <path
                d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
                stroke="currentColor"
                stroke-width="1.333"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </button>
          <input
            class="input"
            v-model="query"
            placeholder="Type your text"
            required=""
            type="text"
          />
          <button class="reset" type="reset">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  </header>

  <div class="bg-[#F3F4F6] pt-[5rem]">
    <div>
      <!-- component -->
      <link rel="stylesheet" href="https://cdn.tailgrids.com/tailgrids-fallback.css" />

      <!-- ====== Cards Section Start -->
      <section class="px-[2rem] overflow-x-hidden">
        <div class="grid gap-10 grid-cols-3 -mx-4">
          <!-- Add Postit -->

          <form @submit.prevent="addNewNote" class="ml-[2rem]">
            <div class="brutalist-card">
              <div class="brutalist-card__header">
                <div class="brutalist-card__alert lowercase">
                  <!-- <div :class="{ 'input-container': true, 'input-error': error.title }"> -->
                  <input
                    type="title"
                    v-model="title"
                    @blur="validateTitle"
                    name="title"
                    id="title"
                    placeholder="Postit Title"
                    class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                  />
                  <span v-if="error.title" class="text-red-600 text-[1rem]">{{ error.title }}</span>
                  <!-- </div> -->
                </div>
              </div>

              <div class="brutalist-card__message">
                <div class="col-span-full">
                  <!-- <div class="mt-2" :class="{ 'input-container': true, 'input-error': error.content }"> -->
                  <textarea
                    id="content"
                    v-model="content"
                    @blur="validateContent"
                    name="about"
                    rows="3"
                    class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                    required
                  ></textarea>
                  <span v-if="error.content" class="text-red-600">{{ error.content }}</span>
                  <!-- </div> -->
                </div>
              </div>
              <div class="brutalist-card__actions">
                <input
                  type="submit"
                  class="brutalist-card__button brutalist-card__button--mark"
                  value="create post"
                />
                <!-- SHOW MORE BUTTON -->
                <!-- <router-link :to="'/note/show/' + note._id"> -->
                <!-- <p class="brutalist-card__button brutalist-card__button--mark cursor-pointer">
                  create post
                </p> -->
                <!-- </router-link> -->
              </div>
              <div v-if="formError">{{ formError }}</div>
            </div>
          </form>

          <!-- Is Spinner -->
          <div v-if="is_spinner">
            <svg
              viewBox="0 0 512 512"
              style="color: #000"
              xmlns="http://www.w3.org/2000/svg"
              class="h-[200px] w-[200px]"
            >
              <rect
                width="100"
                height="100"
                x="0"
                y="0"
                rx="212"
                fill="transparent"
                stroke="transparent"
                stroke-width="0"
                stroke-opacity="100%"
                paint-order="stroke"
              ></rect>
              <svg
                width="auto"
                height="auto"
                viewBox="0 0 24 24"
                fill="#ccc"
                x="0"
                y="0"
                role="img"
                style="display: inline-block; vertical-align: middle"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="#ccc">
                  <g>
                    <circle cx="12" cy="3" r="1" fill="currentColor">
                      <animate
                        id="svgSpinners12DotsScaleRotate0"
                        attributeName="r"
                        begin="0;svgSpinners12DotsScaleRotate2.end-0.5s"
                        calcMode="spline"
                        dur="0.6s"
                        keySplines=".27,.42,.37,.99;.53,0,.61,.73"
                        values="1;2;1"
                      />
                    </circle>
                    <circle cx="16.5" cy="4.21" r="1" fill="currentColor">
                      <animate
                        id="svgSpinners12DotsScaleRotate1"
                        attributeName="r"
                        begin="svgSpinners12DotsScaleRotate0.begin+0.1s"
                        calcMode="spline"
                        dur="0.6s"
                        keySplines=".27,.42,.37,.99;.53,0,.61,.73"
                        values="1;2;1"
                      />
                    </circle>
                    <circle cx="7.5" cy="4.21" r="1" fill="currentColor">
                      <animate
                        id="svgSpinners12DotsScaleRotate2"
                        attributeName="r"
                        begin="svgSpinners12DotsScaleRotate4.begin+0.1s"
                        calcMode="spline"
                        dur="0.6s"
                        keySplines=".27,.42,.37,.99;.53,0,.61,.73"
                        values="1;2;1"
                      />
                    </circle>
                    <circle cx="19.79" cy="7.5" r="1" fill="currentColor">
                      <animate
                        id="svgSpinners12DotsScaleRotate3"
                        attributeName="r"
                        begin="svgSpinners12DotsScaleRotate1.begin+0.1s"
                        calcMode="spline"
                        dur="0.6s"
                        keySplines=".27,.42,.37,.99;.53,0,.61,.73"
                        values="1;2;1"
                      />
                    </circle>
                    <circle cx="4.21" cy="7.5" r="1" fill="currentColor">
                      <animate
                        id="svgSpinners12DotsScaleRotate4"
                        attributeName="r"
                        begin="svgSpinners12DotsScaleRotate6.begin+0.1s"
                        calcMode="spline"
                        dur="0.6s"
                        keySplines=".27,.42,.37,.99;.53,0,.61,.73"
                        values="1;2;1"
                      />
                    </circle>
                    <circle cx="21" cy="12" r="1" fill="currentColor">
                      <animate
                        id="svgSpinners12DotsScaleRotate5"
                        attributeName="r"
                        begin="svgSpinners12DotsScaleRotate3.begin+0.1s"
                        calcMode="spline"
                        dur="0.6s"
                        keySplines=".27,.42,.37,.99;.53,0,.61,.73"
                        values="1;2;1"
                      />
                    </circle>
                    <circle cx="3" cy="12" r="1" fill="currentColor">
                      <animate
                        id="svgSpinners12DotsScaleRotate6"
                        attributeName="r"
                        begin="svgSpinners12DotsScaleRotate8.begin+0.1s"
                        calcMode="spline"
                        dur="0.6s"
                        keySplines=".27,.42,.37,.99;.53,0,.61,.73"
                        values="1;2;1"
                      />
                    </circle>
                    <circle cx="19.79" cy="16.5" r="1" fill="currentColor">
                      <animate
                        id="svgSpinners12DotsScaleRotate7"
                        attributeName="r"
                        begin="svgSpinners12DotsScaleRotate5.begin+0.1s"
                        calcMode="spline"
                        dur="0.6s"
                        keySplines=".27,.42,.37,.99;.53,0,.61,.73"
                        values="1;2;1"
                      />
                    </circle>
                    <circle cx="4.21" cy="16.5" r="1" fill="currentColor">
                      <animate
                        id="svgSpinners12DotsScaleRotate8"
                        attributeName="r"
                        begin="svgSpinners12DotsScaleRotatea.begin+0.1s"
                        calcMode="spline"
                        dur="0.6s"
                        keySplines=".27,.42,.37,.99;.53,0,.61,.73"
                        values="1;2;1"
                      />
                    </circle>
                    <circle cx="16.5" cy="19.79" r="1" fill="currentColor">
                      <animate
                        id="svgSpinners12DotsScaleRotate9"
                        attributeName="r"
                        begin="svgSpinners12DotsScaleRotate7.begin+0.1s"
                        calcMode="spline"
                        dur="0.6s"
                        keySplines=".27,.42,.37,.99;.53,0,.61,.73"
                        values="1;2;1"
                      />
                    </circle>
                    <circle cx="7.5" cy="19.79" r="1" fill="currentColor">
                      <animate
                        id="svgSpinners12DotsScaleRotatea"
                        attributeName="r"
                        begin="svgSpinners12DotsScaleRotateb.begin+0.1s"
                        calcMode="spline"
                        dur="0.6s"
                        keySplines=".27,.42,.37,.99;.53,0,.61,.73"
                        values="1;2;1"
                      />
                    </circle>
                    <circle cx="12" cy="21" r="1" fill="currentColor">
                      <animate
                        id="svgSpinners12DotsScaleRotateb"
                        attributeName="r"
                        begin="svgSpinners12DotsScaleRotate9.begin+0.1s"
                        calcMode="spline"
                        dur="0.6s"
                        keySplines=".27,.42,.37,.99;.53,0,.61,.73"
                        values="1;2;1"
                      />
                    </circle>
                    <animateTransform
                      attributeName="transform"
                      dur="6s"
                      repeatCount="indefinite"
                      type="rotate"
                      values="360 12 12;0 12 12"
                    />
                  </g>
                </g>
              </svg>
            </svg>
          </div>

          <div v-else v-for="note in filterPostit()" class="md:max-lg:flex" :key="note">
            <div class="brutalist-card ml-[2rem]">
              <div class="brutalist-card__header">
                <div class="brutalist-card__alert">
                  <p v-if="note.title.length > 20">
                    {{ note.title.substring(0, 10) + ' ...' }}
                  </p>
                  <p v-else class="break-all">
                    {{ note.title }}
                  </p>
                </div>
              </div>

              <div class="brutalist-card__message break-all">
                <p>
                  {{ note.content[0].substring(0, 50) + ' ...' }}
                </p>
              </div>

              <div class="brutalist-card__actions">
                <!-- SHOW MORE BUTTON -->
                <router-link :to="'/note/show/' + note._id">
                  <p class="brutalist-card__button brutalist-card__button--mark">Show More</p>
                </router-link>

                <!-- DELETE BUTTON -->
                <div @click="() => deletePost(note._id)">
                  <p class="brutalist-card__button brutalist-card__button--read cursor-pointer">
                    delete
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="item error" v-if="query && !filterPostit().length">
            <p>No results found!</p>
          </div>
          <div class="text-xl text-red-600 flex justify-center">{{ errors }}</div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useNoteStore } from '../stores/NoteStore'
// import router from '@/router'
// import UpdateButton from './CRUD/UpdateButton.vue';

const title = ref('')

let query = ref('')

const content = ref('')

const is_spinner = ref(true)

const errors = ref('')

const error = ref({ title: '', content: '' })

const formError = ref('')

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

// const id = router().params.id
const noteStore = useNoteStore()

//DISPLAY POSTIT
onMounted(async () => {
  try {
    await noteStore.fetchNotes()
  } catch (error) {
    errors.value = `Failed to submit form: ${error.message}`
  }

  // if(noteStore.deleteNote())

  is_spinner.value = false
})

// SEARCH BAR FUNCTION
function filterPostit() {
  return noteStore.notes.filter((note) =>
    note.title.toLowerCase().includes(query.value.toLowerCase())
  )
}

// ADD POSTIT
const addNewNote = async () => {
  validateTitle()

  validateContent()

  if (!error.value.title && !error.value.content) {
    formError.value = ''

    try {
      noteStore.addNote(title.value, [content.value])
    } catch (error) {
      formError.value = `Failed to submit message: ${error.message}`
    }
  }
}
// DELETE POSTIT

const deletePost = (id) => {
  try {
    noteStore.deleteNote(id)
  } catch (error) {
    console.log(error.message)
  }
}
</script>

<style>
.brutalist-card {
  width: 320px;
  border: 4px solid #000;
  background-color: #fff;
  padding: 1.5rem;
  box-shadow: 10px 10px 0 #000;
  font-family: 'Arial', sans-serif;
}

.brutalist-card__header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  border-bottom: 2px solid #000;
  padding-bottom: 1rem;
}

.brutalist-card__icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000;
  padding: 0.5rem;
}

.brutalist-card__icon svg {
  height: 1.5rem;
  width: 1.5rem;
  fill: #fff;
}

.brutalist-card__alert {
  font-weight: 900;
  color: #000;
  font-size: 1.5rem;
  text-transform: uppercase;
}

.brutalist-card__message {
  margin-top: 1rem;
  color: #000;
  font-size: 1rem;
  line-height: 1.4;
  border-bottom: 2px solid #000;
  padding-bottom: 1rem;
  font-weight: 600;
}

.brutalist-card__actions {
  margin-top: 1rem;
}

.brutalist-card__button {
  display: block;
  width: 100%;
  padding: 0.75rem;
  text-align: center;
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  border: 3px solid #000;
  background-color: #fff;
  color: #000;
  position: relative;
  transition: all 0.2s ease;
  box-shadow: 5px 5px 0 #000;
  overflow: hidden;
  text-decoration: none;
  margin-bottom: 1rem;
}

.brutalist-card__button--read {
  background-color: #000;
  color: #fff;
}

.brutalist-card__button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: all 0.6s;
}

.brutalist-card__button:hover::before {
  left: 100%;
}

.brutalist-card__button:hover {
  transform: translate(-2px, -2px);
  box-shadow: 7px 7px 0 #000;
}

.brutalist-card__button--mark:hover {
  background-color: #296fbb;
  border-color: #296fbb;
  color: #fff;
  box-shadow: 7px 7px 0 #004280;
}

.brutalist-card__button--read:hover {
  background-color: #ff0000;
  border-color: #ff0000;
  color: #fff;
  box-shadow: 7px 7px 0 #800000;
}

.brutalist-card__button:active {
  transform: translate(5px, 5px);
  box-shadow: none;
}

.form button {
  border: none;
  background: none;
  color: #8b8ba7;
}
/* styling of whole input container */
.form {
  --timing: 0.3s;
  --width-of-input: auto;
  --height-of-input: 40px;
  --border-height: 2px;
  --input-bg: #fff;
  --border-color: #2f2ee9;
  --border-radius: 30px;
  --after-border-radius: 1px;
  position: relative;
  width: var(--width-of-input);
  height: var(--height-of-input);
  display: flex;
  align-items: center;
  padding-inline: 0.8em;
  border-radius: var(--border-radius);
  transition: border-radius 0.5s ease;
  background: var(--input-bg, #fff);
}
/* styling of Input */
.input {
  font-size: 0.9rem;
  background-color: transparent;
  width: 100%;
  height: 100%;
  padding-inline: 0.5em;
  padding-block: 0.7em;
  border: none;
}
/* styling of animated border */
.form:before {
  content: '';
  position: absolute;
  background: var(--border-color);
  transform: scaleX(0);
  transform-origin: center;
  width: 100%;
  height: var(--border-height);
  left: 0;
  bottom: 0;
  border-radius: 1px;
  transition: transform var(--timing) ease;
}
/* Hover on Input */
.form:focus-within {
  border-radius: var(--after-border-radius);
}

input:focus {
  outline: none;
}
/* here is code of animated border */
.form:focus-within:before {
  transform: scale(1);
}
/* styling of close button */
/* == you can click the close button to remove text == */
.reset {
  border: none;
  background: none;
  opacity: 0;
  visibility: hidden;
}
/* close button shown when typing */
input:not(:placeholder-shown) ~ .reset {
  opacity: 1;
  visibility: visible;
}
/* sizing svg icons */
.form svg {
  width: 17px;
  margin-top: 3px;
}
</style>
