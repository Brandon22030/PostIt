<template>
  <div class="bg-[#F3F4F6]">
    <div class="py-16 min-h-screen flex items-center justify-center">
      <div class="bg-white w-auto m-auto brutalist-card  overflow-y-hidden pb-8">
        <div class="text-center pt-8">
          <h1 class="text-9xl font-bold text-blue-400">404</h1>
          <h1 class="text-6xl font-medium py-8">oops! Page not found</h1>
          <p class="text-2xl pb-8 px-12 font-medium">
            Oops! The page you are looking for does not exist. It might have been moved or deleted.
          </p>
          <button 
            class="brutalist-card__actions "
          >
          <router-link to="/">
              <p class="brutalist-card__button brutalist-card__button--mark w-[10rem]">HOME</p>
            </router-link>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
