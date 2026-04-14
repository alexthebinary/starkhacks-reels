import CardOne from './components/CardOne'
import CardTwo from './components/CardTwo'
import CardThree from './components/CardThree'
import CardFour from './components/CardFour'
import CardFive from './components/CardFive'
import CardSix from './components/CardSix'

export default function App() {
  return (
    <div
      className="min-h-screen flex items-center justify-center overflow-auto py-10"
      style={{
        backgroundImage: 'url(/bg.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div
        className="shrink-0"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 270px)',
          gap: '20px',
        }}
      >
        <CardOne />
        <CardTwo />
        <CardThree />
        <CardFour />
        <CardFive />
        <CardSix />
      </div>
    </div>
  )
}
