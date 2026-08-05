
import './App.css'
import { ChartExample } from './components/example-charts'
import Layout from './layout'

function App() {
  

  return (
    <>
    <Layout>
      <div className="flex flex-col gap-4 p-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        
        {/* Your chart container */}
        <div className="w-full max-w-2xl rounded-xl border p-4 shadow-sm">
          <ChartExample />
        </div>
      </div>
    </Layout>
    </>
  )
}

export default App
