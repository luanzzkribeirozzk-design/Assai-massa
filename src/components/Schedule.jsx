import { SCHEDULE } from '../constants'
import './Schedule.css'

export default function Schedule() {
  return (
    <section id="horarios" className="section schedule">
      <div className="container schedule__grid">
        <div>
          <p className="eyebrow">Horário de funcionamento</p>
          <h2 className="section-title">
            Treine no horário <em>que funciona pra você.</em>
          </h2>
          <p className="section-lede">
            Abrimos cedo e fechamos tarde durante a semana para caber na sua rotina, com
            atendimento também aos sábados, domingos e feriados.
          </p>
        </div>

        <ul className="schedule__list">
          {SCHEDULE.map((row) => (
            <li key={row.day}>
              <span className="schedule__day">{row.day}</span>
              <span className="neon-line schedule__line" />
              <span className="schedule__hours">{row.hours}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
