import { Link } from 'react-router-dom'
import type { Trip } from '../types'

type TripCardProps = {
  trip: Trip
}

export function TripCard({ trip }: TripCardProps) {
  return (
    <Link className="trip-card" to={`/trip/${trip.id}`}>
      <div className="trip-card__image-wrap">
        <img
          className="trip-card__image"
          src={trip.coverImage}
          alt={trip.title}
          loading="lazy"
        />
      </div>
      <div className="trip-card__body">
        <p className="trip-card__eyebrow">{trip.year}</p>
        <h2>{trip.title}</h2>
        <p>{trip.description}</p>
      </div>
    </Link>
  )
}
