/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference types="next-images" />

declare module '*.scss' {
  const content: { [className: string]: string }
  export = content
}
