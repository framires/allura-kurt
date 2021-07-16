import styled from "styled-components";
import Box from "../Box";

export const ProfileRelationsBoxWrapper = styled(Box)`
  ul {
    display: grid;
    grid-gap: 8px;
    grid-template-columns: 1fr 1fr 1fr;
    max-height: 220px;
    list-style: none;
  }
  img {
    object-fit: cover;
    background-position: center center;
    width: 100%;
    height: 100%;
    position: relative;
  }
  ul li a {
    display: inline-block;
    height: 102px;
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    span {
      color: #ffffff;
      font-size: 10px;
      position: absolute;
      left: 0;
      bottom: 10px;
      z-index: 2;
      padding: 0 4px;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 100%;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    &:after {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      z-index: 1;
      background-image: linear-gradient(0deg, #00000073, transparent);
    }
  }
`;

export function CreateProfiles(props) {
  const listItem = props.listItem;
  const gitImgDefault = props.gitImgDefault ? props.gitImgDefault : false;
  const title = props.title;
  return (
    //fragments
    <>
      <h2 className="smallTitle">{title}  ({listItem.length})</h2>
      <ul>
            {gitImgDefault ? 
              ( 
                listItem.map((itemAtual, index) => {
                  return (
                    <li key={itemAtual.id}>
                      <a href={`/users/${itemAtual.creatorSlug}`}>
                        <img src={itemAtual.image}/>
                        <span>{itemAtual.title}</span>
                      </a>
                    </li>
                  );
                })
                ):( 
                  listItem.map((itemAtual, index) => {
                    return (
                      <li key={index}>
                        <a href={`/users/${itemAtual.name}`}>
                          <img src={itemAtual.image}/>
                          <span>{itemAtual.name}</span>
                        </a>
                      </li>
                    );
                  })
                )
            }
      </ul>
    </>
  );
}
