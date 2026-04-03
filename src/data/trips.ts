import tripData from './trips.json'
import type { Trip, TripSource } from '../types'

const createImagePath = (
  folder: string,
  size: 'thumbs' | 'full',
  index: number,
) => `/images/${folder}/${size}/${index}.webp`

export const trips: Trip[] = (tripData as TripSource[]).map((trip) => ({
  id: trip.id,
  title: trip.title,
  year: trip.year,
  description: trip.description,
  diary: trip.diary,
  coverImage: createImagePath(trip.imageFolder, 'thumbs', 1),
  images: Array.from({ length: trip.imageCount }, (_, index) => {
    const imageNumber = index + 1

    return {
      thumb: createImagePath(trip.imageFolder, 'thumbs', imageNumber),
      full: createImagePath(trip.imageFolder, 'full', imageNumber),
    }
  }),
}))

export const getTripById = (id: string) => trips.find((trip) => trip.id === id)
