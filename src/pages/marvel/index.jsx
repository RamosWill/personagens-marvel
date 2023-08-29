import './index.scss'
import Cabecalho from '../../components/cabecalho'
import { useState } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';


function Marvel () {

    const [nome, setNome] = useState('');
    const [lista, setLista] = useState([]);

    async function pesquisarPersonagem () {
        try {
            let url2 = 'http://gateway.marvel.com/v1/public/' +
                    'characters?' +
                    'apikey=b6e994a04a4629815eac0dc35cff8dbd&' +
                    'ts=1691883341&' +
                    'hash=27f631e5a9cb824bbc4200720c6d726d&' +
                    'nameStartsWith=' + nome;
            let resp = await axios.get(url2);

            setLista([...resp.data.data.results])
            console.log(lista)
            setNome('')
            } catch (err) {
            toast.info('Ocorreu algum erro! ' + err)
        }
        
    }

    return (
        <main >
            <ToastContainer />
            <Cabecalho />
        <main className='principal-marvel'>

        
            <article className='descricao-principal'>
                <div className='titulo-descricao'>
                    <h1>Personagens <br />
                        da MARVEL</h1>
                </div>

                <div className='descricao-total'>
                    <h5>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elementum augue ut ligula malesuada blandit. Quisque tempor ex quis congue malesuada. Pellentesque est eros, aliquam non malesuada et, molestie ut purus.
                    </h5>

                    <div className='input-pesquisa'>
                        <img src="/assets/Union.png" alt="" onClick={pesquisarPersonagem}/>
                        <input type="text" placeholder='Nome do personagem' value={nome} onChange={(e) => setNome(e.target.value)}/>
                    </div>
                </div>
            </article>

            <section 
                className='personagens-marvel'

            >
                {lista.map(item => {return (
                    <article className='card'>
                        <img src={item.thumbnail?.path + '.' + item.thumbnail?.extension} alt="" />
                        <h1>{item.name} </h1>
                        <div className='descricao-personagem'>
                            <p>
                                {item.description === "" || item.description === " " ?
                                 "NÃO HÁ DESCRICAO DISPONIVEL" :
                                 item.description}
                            </p>
                        </div>
                    </article>
                )})}
            </section>
            </main>
        </main>
    )
}

export default Marvel;