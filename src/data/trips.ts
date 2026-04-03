import tripData from './trips.json'
import type { Trip } from '../types'

export const trips = tripData as Trip[]

export const getTripById = (id: string) => trips.find((trip) => trip.id === id)
