import "./index.scss";
import { Cabecalho, Loading } from "../../components/";
import { useState, useEffect } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

function Marvel() {
  const [nome, setNome] = useState("");
  const [lista, setLista] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (nome) pesquisarPersonagem();
    }, 3000);

    return () => clearTimeout(delayDebounceFn);

    // eslint-disable-next-line
  }, [nome]);
  const onLoad = (index) => {
    if (index === lista.length - 1) {
      setLoading(false);
    }
  };
  async function pesquisarPersonagem() {
    try {
      let url2 =
        "http://gateway.marvel.com/v1/public/" +
        "characters?" +
        "apikey=b6e994a04a4629815eac0dc35cff8dbd&" +
        "ts=1691883341&" +
        "hash=27f631e5a9cb824bbc4200720c6d726d&" +
        "nameStartsWith=" +
        nome;
      setLoading(true);
      let resp = await axios.get(url2);
      setLista([...resp.data.data.results]);
    } catch (err) {
      toast.info("Ocorreu algum erro! " + err);
    }
  }
  console.log(lista);
  return (
    <main>
      <ToastContainer />
      <Cabecalho />
      <main className="principal-marvel">
        <article className="descricao-principal">
          <div className="titulo-descricao">
            <h1>
              Personagens <br />
              da MARVEL
            </h1>
          </div>

          <div className="descricao-total">
            <h5>
              Bem-vindo à página dedicada aos icônicos personagens da Marvel!
              Explore perfis detalhados e envolventes dos heróis, vilões e suas
              histórias inesquecíveis. De superpoderes épicos a dilemas morais,
              mergulhe no universo que cativou fãs em todo o mundo. Descubra as
              origens, habilidades e momentos marcantes que tornaram esses
              personagens lendas. Seja você um fã de longa data ou um novato,
              embarque nesta jornada emocionante pelos corações e mentes dos
              personagens da Marvel.
            </h5>

            <div className="input-pesquisa">
              <img
                src="/assets/Union.png"
                alt=""
                onClick={pesquisarPersonagem}
              />
              <input
                type="text"
                placeholder="Nome do personagem"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
          </div>
        </article>

        <section className="personagens-marvel">
          {loading && (
            <div className="center">
              <Loading />
            </div>
          )}
          {lista.map((item, index) => {
            return (
              <article
                className="card"
                key={index}
                style={loading ? { display: "none" } : {}}
              >
                <img
                  src={item.thumbnail?.path + "." + item.thumbnail?.extension}
                  alt=""
                  onLoad={() => onLoad(index)}
                />
                <h1>{item.name} </h1>
                <div className="descricao-personagem">
                  <p>
                    {item.description === "" || item.description === " "
                      ? "NÃO HÁ DESCRICAO DISPONIVEL"
                      : item.description}
                  </p>
                </div>
              </article>
            );
          })}
        </section>
      </main>
    </main>
  );
}

export default Marvel;
