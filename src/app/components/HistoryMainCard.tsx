import { MainCard } from './little_components/MainCard'

export default function HistoryMainCard() {
  return (
    <MainCard>
      <div className="flex justify-between rounded-s border-b-4 border-gray-400">
        <div>
          <h3 className="text-lg">ATIVIDADE ( 00:00 )</h3>
          <p className="font-light">Inicio 28 / 10 / 2022</p>
          <h1 className="text-xl font-extrabold">VÁLIDO</h1>
        </div>
        <div className="flex flex-col items-end justify-between py-3">
          <h1 className="text-xl text-blue-800">(Task ID#)</h1>
          <button>Teste</button>
        </div>
      </div>
    </MainCard>
  )
}
