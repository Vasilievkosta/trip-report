import { trips } from '../data/trips'
import { TripCard } from '../ui/TripCard'

export function HomePage() {
  return (
    <div className="home-page">
      <section className="hero">
        <p className="hero__eyebrow">Воспоминания в кадрах</p>
        <h1>Походы, к которым хочется возвращаться тихо и неспешно.</h1>
        <p className="hero__lead">
          Здесь нет ленты новостей и спешки. Только маршруты, фотографии и
          ощущение дороги, которое можно пересмотреть спустя время.
        </p>
      </section>

      <section className="trip-grid" aria-label="Список походов">
        {trips.map((trip) => (
          <TripCard key={trip.id} trip={trip} />
        ))}
      </section>
    </div>
  )
}
