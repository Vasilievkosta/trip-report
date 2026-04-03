export type Trip = {
  id: string
  title: string
  year: number
  description: string
  diary: string
  coverImage: string
  images: {
    thumb: string
    full: string
  }[]
}

export type TripSource = {
  id: string
  title: string
  year: number
  description: string
  diary: string
  imageFolder: string
  imageCount: number
}
