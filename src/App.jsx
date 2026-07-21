import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Plans from './components/Plans'
import Gallery from './components/Gallery'
import Schedule from './components/Schedule'
import Location from './components/Location'
import Footer from './components/Footer'
import FloatingWhatsApp from './components/FloatingWhatsApp'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Plans />
        <Gallery />
        <Schedule />
        <Location />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}
