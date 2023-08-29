import './index.scss';


function Cabecalho () {

    return (
        <main className='Cabecalho'>
            <img src="/assets/logo.png" alt="" />

            <nav>
                <p>Home</p>
                <p>Personagens</p>
                <p>Quadrinhos</p>
                <p>Eventos</p>
                <p>Contato</p>
                <img src="/assets/user.png" alt="" />
            </nav>
        </main>
    )
}
export default Cabecalho;