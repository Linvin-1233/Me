<template>
  <div
      :style="themeVariables"
      class="min-h-screen bg-poster-bg font-mono text-poster-text antialiased relative pb-16 selection:bg-poster-ice selection:text-black overflow-x-hidden transition-colors duration-500">

    <div class="fixed bottom-4 right-4 md:bottom-6 md:right-8 z-50 select-none">
      <button
          @click="toggleTheme"
          class="flex items-center gap-3 border-2 border-poster-line bg-poster-panel/90 backdrop-blur-md px-3.5 py-2 text-[10px] font-extrabold tracking-widest text-poster-ice hover:bg-poster-ice hover:text-poster-bg hover:border-poster-ice transition-all duration-300 shadow-[4px_4px_0px_var(--poster-shadow)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none group">

        <div class="relative w-5 h-5 flex items-center justify-center shrink-0">
          <svg
              class="absolute inset-0 w-full h-full text-poster-line group-hover:text-poster-bg transition-colors duration-300"
              :class="isDark ? 'animate-[spin_4s_linear_infinite]' : 'animate-[spin_10s_linear_infinite]'"
              viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.2" stroke-dasharray="4 3" />
          </svg>

          <svg class="absolute inset-0 w-full h-full opacity-60 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none">
            <path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="currentColor" stroke-width="0.8" />
          </svg>

          <svg class="w-2.5 h-2.5 transition-transform duration-500" :class="{ 'rotate-90': isDark }" viewBox="0 0 10 10" fill="none">
            <rect
                v-if="isDark"
                x="1.5" y="1.5" width="7" height="7"
                fill="none" stroke="currentColor" stroke-width="1.5"
                class="animate-[pulse_1.5s_infinite_ease-in-out]" />
            <polygon
                v-else
                points="5,0 10,5 5,10 0,5"
                fill="currentColor"
                class="animate-[ping_2s_infinite_steps(3)] origin-center scale-75" />
          </svg>
        </div>

        <span class="border-l border-poster-line/40 pl-2.5 group-hover:border-poster-bg/30 transition-colors">
          [ 状态 // {{ isDark ? 'DARK_&' : 'LIGHT_&' }} ]
        </span>
      </button>
    </div>




    <div class="fixed inset-0 z-0 pointer-events-none">
      <div class="absolute inset-0 blueprint-grid opacity-30 dark:opacity-40"></div>

      <svg
          :style="{ transform: `translate(var(--drift-x1, -10px), var(--drift-y1, 20px)) scale(${1 + scrollPercent * 0.005}) rotate(${scrollPercent * 0.2}deg)` }"
          class="absolute -top-20 -left-20 w-[40vw] h-[40vw] text-poster-line opacity-60 transition-transform duration-300 ease-out animate-[float-slow_20s_infinite_ease-in-out]"
          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">

        <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" stroke-width="0.5" stroke-dasharray="8 4" />
        <circle cx="100" cy="100" r="70" fill="none" stroke="var(--color-poster-ice)" stroke-width="0.3" opacity="0.4" />
        <path d="M100 0 L100 200 M0 100 L200 100" stroke="currentColor" stroke-width="0.3" />
      </svg>

      <svg
          :style="{ transform: `translate(${20 - scrollPercent * 0.5}px, ${-10 + scrollPercent * 0.2}px) rotate(${-scrollPercent * 0.1}deg)` }"
          class="absolute top-1/4 right-10 w-32 h-32 text-poster-ice opacity-30 animate-[float-fast_15s_infinite_ease-in-out]"
          viewBox="0 0 100 100">

        <path d="M10 50 L90 50 M50 10 L50 90" stroke="currentColor" stroke-width="0.5" />
        <rect x="35" y="35" width="30" height="30" fill="none" stroke="currentColor" stroke-width="0.5" stroke-dasharray="2 2" />
        <circle cx="50" cy="50" r="5" fill="currentColor" class="animate-pulse" />
      </svg>

      <svg
          :style="{ transform: `translate(var(--drift-x2, 0px), var(--drift-y2, 0px)) scale(${1 - scrollPercent * 0.008})` }"
          class="absolute bottom-1/3 left-1/3 w-[30vw] h-[30vw] text-poster-line opacity-40 animate-[float-reverse_25s_infinite_ease-in-out]"
          viewBox="0 0 200 200">

        <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" stroke-width="0.5" stroke-dasharray="20 10 5 10" />
        <polygon points="100,60 135,120 65,120" fill="none" stroke="currentColor" stroke-width="0.3" opacity="0.3" />
      </svg>

      <div
          :style="{ transform: `translateY(${scrollPercent * -0.8}px)` }"
          class="absolute bottom-10 right-12 w-48 h-48 border-r border-b border-poster-line opacity-70 animate-[float-slow_18s_infinite_ease-in-out]">

        <span class="absolute bottom-2 right-2 text-[9px] text-poster-text-muted tracking-widest">COORD_SYS_REF.04</span>
        <div class="absolute top-0 right-0 w-4 h-[1px] bg-poster-ice"></div>
        <div class="absolute bottom-0 left-0 w-[1px] h-4 bg-poster-ice"></div>
      </div>

      <div
          :style="spotlightStyle"
          class="absolute inset-0 backdrop-blur-[2px] pointer-events-none style-aperture">
      </div>
    </div>


    <div class="max-w-5xl mx-auto px-4 md:px-8 relative z-10">

      <section class="h-screen flex flex-col justify-center items-center text-center relative">
        <div class="space-y-4 relative z-10 w-full max-w-full px-4 mx-auto">
          <div class="absolute -top-7 left-1/2 -translate-x-1/2 text-[9px] text-poster-ice tracking-[0.2em] sm:tracking-[0.5em] opacity-60 uppercase animate-pulse whitespace-nowrap select-none">
            [ GRID_NODE_ONLINE ]
          </div>

          <h1 class="text-poster-title text-xl xs:text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-[0.12em] sm:tracking-[0.2em] md:tracking-[0.25em] uppercase leading-none select-none whitespace-nowrap transition-colors duration-300">
            LINVIN_<span class="text-poster-ice animate-[blink_1.5s_steps(2)_infinite]">1233</span>
          </h1>

          <p class="text-[9px] sm:text-[11px] md:text-xs tracking-[0.12em] sm:tracking-[0.25em] md:tracking-[0.4em] text-poster-text-muted uppercase font-bold block max-w-xs sm:max-w-none mx-auto whitespace-normal sm:whitespace-nowrap transition-colors duration-300">
            // SOLID BRUTALISM INTERACTIVE MODULE
          </p>
        </div>

        <div class="absolute bottom-12 flex flex-col items-center gap-2">
          <span class="text-[10px] text-poster-ice tracking-widest uppercase">▼ DRIFT_DOWNWARD</span>
          <div class="w-[1px] h-14 bg-poster-line relative overflow-hidden">
            <div class="absolute inset-x-0 top-0 h-4 bg-poster-ice animate-[scan_2s_infinite_linear]"></div>
          </div>
        </div>
      </section>


      <section class="min-h-[40vh] flex flex-col justify-center py-20 border-t-2 border-poster-line relative bg-poster-panel/20 backdrop-blur-xs px-6 my-12 border-x border-b shadow-[5px_5px_0px_var(--poster-shadow)] transition-all duration-300">
        <div class="absolute top-0 left-4 text-[10px] text-poster-ice font-bold bg-poster-bg px-2 translate-y-[-50%] flex items-center gap-1.5 transition-colors duration-300">
          <span class="inline-block w-1.5 h-1.5 bg-poster-ice rounded-none animate-pulse"></span>
          <span>[SEC_01 // INTRO_DATA]</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div class="md:col-span-4 space-y-1">
            <span class="text-[10px] text-poster-text-muted tracking-wider block">ID: 0x7F4A_CORE</span>
            <h2 class="text-poster-title text-2xl md:text-3xl font-extrabold tracking-tight uppercase transition-colors duration-300">
              INTRODUCTION
            </h2>
          </div>
          <div class="md:col-span-8 space-y-4 text-xs md:text-sm leading-relaxed text-poster-text-bright border-l border-poster-line pl-6 transition-colors duration-300">
            <p>
              你好！我是Linvin！一位mc玩家，对<span class="text-poster-ice font-bold">储电</span>稍有研究。
            </p>
            <p class="text-poster-text-muted text-xs flex items-center gap-1 transition-colors duration-300">
              <span>&gt; 对全栈，web开发也稍有钻研</span><span class="animate-[blink_1s_infinite] text-poster-ice">█</span>
            </p>
          </div>
        </div>
      </section>


      <section class="py-20 border-t-2 border-poster-line relative">
        <div class="absolute top-0 left-4 text-[10px] text-poster-ice font-bold bg-poster-bg px-2 translate-y-[-50%] flex items-center gap-1.5 transition-colors duration-300">
          <span class="inline-block w-1.5 h-1.5 bg-poster-ice rounded-none animate-pulse"></span>
          <span>[SEC_02 // PAYLOAD_MANIFEST]</span>
        </div>

        <div class="mb-8 flex justify-between items-end border-b border-poster-line pb-4">
          <div>
            <span class="text-[10px] text-poster-text-muted tracking-widest block">// ENCRYPTED_REPOS</span>
            <h2 class="text-xl font-extrabold text-poster-title uppercase transition-colors duration-300">我的项目</h2>
          </div>
          <span class="text-xs font-bold text-poster-ice">
            PAGINATION: 0{{ currentPage }} / 0{{ totalPages || 1 }}
          </span>
        </div>

        <div v-if="isLoading" class="border border-poster-line bg-poster-panel text-center py-24 text-poster-ice text-xs tracking-widest">
          &gt; BUFFERING_RAW_MARKDOWN_IMAGE_DATA...
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
              v-for="(project, index) in paginatedProjects"
              :key="index"
              class="border-2 border-poster-line bg-poster-panel/40 backdrop-blur-xs relative flex flex-col justify-between group hover:border-poster-ice transition-all duration-300 shadow-[4px_4px_0px_var(--poster-shadow)] hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] hover:bg-poster-panel overflow-hidden">

            <div class="absolute top-0 left-0 w-2 h-2 border-t border-l border-transparent group-hover:border-poster-ice group-hover:translate-x-1 group-hover:translate-y-1 transition-all duration-300"></div>
            <div class="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-transparent group-hover:border-poster-ice group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all duration-300"></div>

            <div v-if="project.Img" class="h-42 w-full bg-black relative overflow-hidden border-b border-poster-line">
              <img
                  :src="project.Img"
                  :alt="project.Name"
                  class="w-full h-full object-cover"
                  @error="project.Img = ''"/>
            </div>

            <div class="p-5 space-y-4 flex-1 flex flex-col justify-between">
              <div class="space-y-2">
                <div class="flex justify-between items-center text-[10px] text-poster-text-muted font-bold">
                  <span>SYS_REF // {{ index + 1 }}</span>
                  <span class="w-1.5 h-1.5 bg-poster-line group-hover:bg-poster-ice group-hover:animate-ping transition-colors"></span>
                </div>
                <h3 class="text-poster-title text-md font-extrabold group-hover:text-poster-ice transition-colors uppercase tracking-wide">
                  {{ project.Name }}
                </h3>
                <p class="text-xs text-poster-text-bright leading-relaxed line-clamp-3">
                  {{ project.Description }}
                </p>
              </div>

              <div class="border-t border-poster-line/60 pt-3 flex items-center justify-between">
                <div class="flex flex-wrap gap-1 max-w-[70%]">
                  <span v-for="tech in project.Techs" :key="tech" class="text-[9px] border border-poster-line bg-poster-bg text-poster-text px-1.5 py-0.5 uppercase transition-colors">
                    {{ tech.trim() }}
                  </span>
                </div>
                <a :href="project.Link || '#'" target="_blank" class="text-[11px] text-poster-ice font-extrabold hover:tracking-wider transition-all shrink-0">
                  CONNECT ↗
                </a>
              </div>
            </div>
          </div>
        </div>

        <div v-if="totalPages > 1" class="mt-8 pt-4 border-t border-poster-line flex justify-between items-center gap-2 select-none">
          <button
              @click="prevPage"
              :disabled="currentPage === 1"
              class="px-2.5 py-1.5 sm:px-4 sm:py-2 border-2 border-poster-line bg-poster-panel text-[11px] sm:text-xs font-extrabold uppercase tracking-wider transition-colors disabled:opacity-20 disabled:cursor-not-allowed enabled:hover:border-poster-ice enabled:hover:text-poster-title shrink-0">

            <span class="hidden sm:inline">[◄ PREV_NODE]</span>
            <span class="inline sm:hidden">[◄]</span>
          </button>

          <div class="flex flex-wrap justify-center gap-1.5 max-w-[45%] sm:max-w-none">
            <span
                for="p in totalPages"
                :key="p"
                @click="currentPage = p"
                :class="currentPage === p ? 'bg-poster-ice text-poster-bg border-poster-ice' : 'bg-poster-panel border-poster-line text-poster-text-muted hover:border-poster-text'"
                class="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-[10px] sm:text-xs border font-bold cursor-pointer transition-colors shrink-0">

              {{ p }}
            </span>
          </div>

          <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="px-2.5 py-1.5 sm:px-4 sm:py-2 border-2 border-poster-line bg-poster-panel text-[11px] sm:text-xs font-extrabold uppercase tracking-wider transition-colors disabled:opacity-20 disabled:cursor-not-allowed enabled:hover:border-poster-ice enabled:hover:text-poster-title shrink-0">

            <span class="hidden sm:inline">[NEXT_NODE ►]</span>
            <span class="inline sm:hidden">[►]</span>
          </button>
        </div>
      </section>


      <section class="py-20 border-t-2 border-poster-line relative grid grid-cols-1 md:grid-cols-12 gap-10">
        <div class="absolute top-0 left-4 text-[10px] text-poster-ice font-bold bg-poster-bg px-2 translate-y-[-50%] flex items-center gap-1.5 transition-colors duration-300">
          <span class="inline-block w-1.5 h-1.5 bg-poster-ice rounded-none animate-pulse"></span>
          <span>[SEC_03 // TERMINAL_ASSETS]</span>
        </div>

        <div class="md:col-span-7 space-y-4">
          <div>
            <span class="text-[10px] text-poster-text-muted tracking-widest block">// CORE_COMPILERS</span>
            <h3 class="text-sm font-extrabold text-poster-title uppercase transition-colors duration-300">我最常用的语言</h3>
          </div>

          <div class="space-y-4 border-2 border-poster-line bg-poster-panel p-6 shadow-[4px_4px_0px_var(--poster-shadow)] transition-all duration-300">
            <div class="space-y-1.5">
              <div class="flex justify-between text-xs">
                <span class="text-poster-text-bright font-bold">HTML</span>
                <span class="text-poster-ice font-bold animate-pulse">44.53%</span>
              </div>
              <div class="h-2 bg-poster-bg border border-poster-line relative overflow-hidden">
                <div class="h-full bg-poster-ice w-[44.53%] relative striped-loader"></div>
              </div>
            </div>
            <div class="space-y-1.5">
              <div class="flex justify-between text-xs">
                <span class="text-poster-text-bright font-bold">CSS</span>
                <span class="text-poster-ice font-bold animate-pulse">26.45%</span>
              </div>
              <div class="h-2 bg-poster-bg border border-poster-line relative overflow-hidden">
                <div class="h-full bg-poster-ice w-[26.45%] relative striped-loader"></div>
              </div>
            </div>
            <div class="space-y-1.5">
              <div class="flex justify-between text-xs">
                <span class="text-poster-text-bright font-bold">TypeScript</span>
                <span class="text-poster-ice font-bold animate-pulse">11.32%</span>
              </div>
              <div class="h-2 bg-poster-bg border border-poster-line relative overflow-hidden">
                <div class="h-full bg-poster-ice w-[11.32%] relative striped-loader"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="md:col-span-5 space-y-4">
          <div>
            <span class="text-[10px] text-poster-text-muted tracking-widest block">// SUBNET_LINKS</span>
            <h3 class="text-sm font-extrabold text-poster-title uppercase transition-colors duration-300">友好链接</h3>
          </div>

          <div class="space-y-3">
            <a
                v-for="friend in friends"
                :key="friend.name"
                :href="friend.url"
                target="_blank"
                class="block p-4 border-2 border-poster-line bg-poster-panel/60 hover:border-poster-ice hover:bg-poster-panel transition-all duration-300 group relative shadow-[3px_3px_0px_var(--poster-shadow)]">

              <div class="flex justify-between items-center text-xs font-bold text-poster-text-bright">
                <span class="group-hover:text-poster-ice group-hover:translate-x-1 transition-transform duration-300">{{ friend.name }}</span>
                <span class="text-[9px] text-slate-500 font-normal flex items-center gap-1">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  LIVE
                </span>
              </div>
              <p class="text-[11px] text-poster-text-muted font-light truncate mt-1.5">{{ friend.bio }}</p>
            </a>
          </div>
        </div>
      </section>

      <footer class="border-t border-poster-line py-8 flex flex-col sm:flex-row justify-between text-[11px] text-poster-text-muted gap-2 font-mono">
        <div class="flex items-center gap-1">
          <span class="inline-block w-1 h-1 bg-emerald-500 animate-pulse"></span>
          <span>SYS_STATUS: RENDER_PACKETS_STABLE</span>
        </div>
        <div>© 2026 Linvin // STRICT MONOSPACE HARDWARE POSTER</div>
      </footer>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const projects = ref([])
const isLoading = ref(true)
const scrollPercent = ref(0)
const currentPage = ref(1)
const itemsPerPage = 4
const isDark = ref(true)
let themeMedia = null
const mouseX = ref('50%')
const mouseY = ref('50%')
const isClicking = ref(false)

const friends = ref([
  { name: 'OpenST Portal', bio: 'Minecraft 优秀储电技术档案馆', url: 'https://openstmc.com' },
  { name: 'GTMC wiki', bio: 'Minecraft 高质量wiki', url: 'https://beta.techmc.wiki' }
])

const initTheme = () => {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme-preference')
    if (savedTheme) {
      isDark.value = savedTheme === 'dark'
    } else {
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
  }
}
initTheme()

const toggleTheme = () => {
  isDark.value = !isDark.value
  localStorage.setItem('theme-preference', isDark.value ? 'dark' : 'light')
}

const handleSystemThemeChange = (e) => {
  if (!localStorage.getItem('theme-preference')) {
    isDark.value = e.matches
  }
}

const spotlightStyle = computed(() => {
  const radius = isClicking.value ? 240 : 130
  const gradient = `radial-gradient(circle ${radius}px at ${mouseX.value} ${mouseY.value}, transparent 0%, rgba(0, 0, 0, 0.3) 65%, black 100%)`

  return {
    maskImage: gradient,
    WebkitMaskImage: gradient
  }
})

const handlePointerMove = (e) => {
  mouseX.value = `${e.clientX}px`
  mouseY.value = `${e.clientY}px`
}

const handlePointerDown = (e) => {
  mouseX.value = `${e.clientX}px`
  mouseY.value = `${e.clientY}px`
  isClicking.value = true
}

const handlePointerUp = () => {
  isClicking.value = false
}

const themeVariables = computed(() => {
  if (isDark.value) {
    return {
      '--color-poster-bg': '#03050a',
      '--color-poster-line': '#1e293b',
      '--color-poster-panel': '#0f172a',
      '--color-poster-ice': '#bfecff',
      '--color-poster-text': '#94a3b8',
      '--color-poster-text-bright': '#cbd5e1',
      '--color-poster-text-muted': '#576f8a',
      '--color-poster-title': '#ffffff',
      '--poster-shadow': 'rgba(0, 0, 0, 0.5)'
    }
  } else {
    return {
      '--color-poster-bg': '#f4f6f9',
      '--color-poster-line': '#cbd5e1',
      '--color-poster-panel': '#ffffff',
      '--color-poster-ice': '#00838f',
      '--color-poster-text': '#475569',
      '--color-poster-text-bright': '#1e293b',
      '--color-poster-text-muted': '#94a3b8',
      '--color-poster-title': '#0f172a',
      '--poster-shadow': 'rgba(148, 163, 184, 0.3)'
    }
  }
})

const handleScroll = () => {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  if (docHeight > 0) {
    scrollPercent.value = (scrollTop / docHeight) * 100
  }
}

const totalPages = computed(() => Math.ceil(projects.value.length / itemsPerPage))
const paginatedProjects = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return projects.value.slice(start, start + itemsPerPage)
})

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

const parseMarkdownProjects = async () => {
  try {
    const response = await fetch('/projects/project.md')
    if (!response.ok) throw new Error('ERR_FILE_NOT_FOUND')
    const text = await response.text()
    const blocks = text.split('---').map(b => b.trim()).filter(Boolean)

    projects.value = blocks.map(block => {
      const item = {}
      const lines = block.split('\n')
      lines.forEach(line => {
        const colonIndex = line.indexOf(':')
        if (colonIndex !== -1) {
          const key = line.substring(0, colonIndex).trim()
          const value = line.substring(colonIndex + 1).trim()
          item[key] = value
        }
      })
      item.Techs = item.Techs ? item.Techs.split(',') : ['CORE_SYS']
      return item
    })
  } catch (error) {
    console.error('CRITICAL_HALT // PARSER_FAILED:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  parseMarkdownProjects()

  window.addEventListener('pointermove', handlePointerMove, { passive: true })
  window.addEventListener('pointerdown', handlePointerDown, { passive: true })
  window.addEventListener('pointerup', handlePointerUp, { passive: true })

  themeMedia = window.matchMedia('(prefers-color-scheme: dark)')
  if (themeMedia.addEventListener) {
    themeMedia.addEventListener('change', handleSystemThemeChange)
  } else {
    themeMedia.addListener(handleSystemThemeChange)
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)

  window.removeEventListener('pointermove', handlePointerMove)
  window.removeEventListener('pointerdown', handlePointerDown)
  window.removeEventListener('pointerup', handlePointerUp)

  if (themeMedia) {
    if (themeMedia.removeEventListener) {
      themeMedia.removeEventListener('change', handleSystemThemeChange)
    } else {
      themeMedia.removeListener(handleSystemThemeChange)
    }
  }
})
</script>

<style scoped>
.style-aperture {
  transition: mask-image 0.25s cubic-bezier(0.25, 1, 0.5, 1),
  -webkit-mask-image 0.25s cubic-bezier(0.25, 1, 0.5, 1);
}

@keyframes float-slow {
  0%, 100% { --drift-x1: -15px; --drift-y1: 15px; }
  50% { --drift-x1: 10px; --drift-y1: -25px; }
}
@keyframes float-fast {
  0%, 100% { transform: translateY(0px) scale(1); }
  50% { transform: translateY(-15px) scale(1.05); }
}
@keyframes float-reverse {
  0%, 100% { --drift-x2: 20px; --drift-y2: -10px; }
  50% { --drift-x2: -15px; --drift-y2: 15px; }
}
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
@keyframes scan {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(350%); }
}
@keyframes slideStripes {
  0% { background-position: 0 0; }
  100% { background-position: 40px 0; }
}

.striped-loader {
  background-image: linear-gradient(
      45deg,
      rgba(3, 5, 10, 0.25) 25%,
      transparent 25%,
      transparent 50%,
      rgba(3, 5, 10, 0.25) 50%,
      rgba(3, 5, 10, 0.25) 75%,
      transparent 75%,
      transparent
  );
  background-size: 20px 20px;
  animation: slideStripes 1.5s linear infinite;
}
</style>