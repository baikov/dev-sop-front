<template>
  <NuxtLink tag="a" :to="{ name: 'index' }" class="flex items-center gap-2">
    <NuxtPicture
      src="logo.png"
      sizes="sm:150px md:200px lg:200px"
      alt="СПЕЦОПТТОРГ"
      title="СПЕЦОПТТОРГ"
      :img-attrs="{ class: 'py-2 cursor-pointer' }"
    />
  </NuxtLink>
</template>
