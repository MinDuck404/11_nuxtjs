// plugins/fontawesome.client.js
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Import brand icons
import { 
  faTwitter, 
  faFacebookF, 
  faDribbble,
  faInstagram,
  faYoutube
} from '@fortawesome/free-brands-svg-icons'

// Import solid icons
import { 
  faKeyboard, 
  faUser, 
  faTrophy 
} from '@fortawesome/free-solid-svg-icons'

// This is important, we are going to let Nuxt worry about the CSS
config.autoAddCss = false

// Add icons to library
library.add(
  // Brand icons
  faTwitter, 
  faFacebookF, 
  faDribbble,
  faInstagram,
  faYoutube,
  // Solid icons
  faKeyboard, 
  faUser, 
  faTrophy
)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('FontAwesomeIcon', FontAwesomeIcon)
})