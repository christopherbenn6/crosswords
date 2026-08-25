import Button from '../components/generateButton'
import HomeBottom from '../components/homeBottom'

export default function Home ({callback}) {
    return <main className="main">
        <h1><span>Random</span> Crosswords</h1>
        <Button callback={callback}></Button>
        <HomeBottom></HomeBottom>
    </main>  
}