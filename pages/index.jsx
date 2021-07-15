import React from "react";
import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet,
} from "../src/lib/AlurakutCommons";
import {
  CreateProfiles,
  ProfileRelationsBoxWrapper,
} from "../src/components/ProfileRelations";

function ProfileSidebar(propriedades) {
  return (
    <Box>
      <img
        src={`https://github.com/${propriedades.githubUser}.png`}
        style={{ borderRadius: "8px" }}
      />
      <hr />
      <p>
        <a
          className="boxLink"
          href={`https://github.com/${propriedades.githubUser}`}
        >
          @{propriedades.githubUser}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

export default function Home() {
  const [comunidades, setComunidades] = React.useState([]);
  const usuarioAleatorio = "framires";
  const pessoasFavoritas = [
    { name: "lucasgomesoficial",image: "https://github.com/lucasgomesoficial.png"},
    { name: "felipeFramires", image: "https://github.com/felipeFramires.png" },
    { name: "marvini-ml", image: "https://github.com/marvini-ml.png" },
    { name: "jupereira97", image: "https://github.com/jupereira97.png" },
    { name: "wmouraml", image: "https://github.com/wmouraml.png" },
    { name: "roqueribeiro", image: "https://github.com/roqueribeiro.png" },
  ];

  const [seguidores, setSeguidores] = React.useState([]);

  React.useEffect(function () {
    fetch("https://api.github.com/users/framires/followers")
      .then(function (respostaServidor) {
        return respostaServidor.json();
      })
      .then(function (jsonConvertido) {
        let remap = jsonConvertido.map( x => {
          return { name: x.login,image: x.avatar_url}
        });
        setSeguidores(remap);
      });
  }, []);

  return (
    <>
      <AlurakutMenu githubUser={usuarioAleatorio} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSidebar githubUser={usuarioAleatorio} />
        </div>
        <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 className="title">Bem vindo(a)</h1>
            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2 className="subTitle"> O que voce deseja fazer?</h2>
            <form
              onSubmit={function handleCriaComunidade(e) {
                e.preventDefault();
                const dadosForm = new FormData(e.target);
                var comunidadeObject = {
                  name: dadosForm.get("title"),
                  image: dadosForm.get("image"),
                };
                setComunidades([...comunidades, comunidadeObject]);
              }}
            >
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de capa !"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa !"
                  type="text"
                />
              </div>
              <button>Criar Comunidade</button>
            </form>
          </Box>
        </div>
        <div
          className="profileRelationsArea"
          style={{ gridArea: "profileRelationsArea" }}
        >
          <ProfileRelationsBoxWrapper>
            <CreateProfiles
              listItem={seguidores}
              title={`Seguidores`}
              gitImgDefault={false}
            />
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <CreateProfiles
              listItem={comunidades}
              title={`Minhas Comunidades`}
              gitImgDefault={false}
            />
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <CreateProfiles
              listItem={pessoasFavoritas}
              title={`Pessoas da Comunidade`}
              gitImgDefault={false}
            />
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}
