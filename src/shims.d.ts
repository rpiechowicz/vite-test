declare interface Window {}

declare module '*.md' {
  import { ComponentOptions } from 'vue'
  const component: ComponentOptions
  export default component
}
