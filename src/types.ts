export type Trip = {
  id: string
  title: string
  year: number
  description: string
  coverImage: string
  images: {
    thumb: string
    full: string
  }[]
}
