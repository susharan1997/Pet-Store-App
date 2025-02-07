import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledCard = styled.div`
  width: 500px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border: 1px solid black;
  margin: 20px;
`;

type petProps = {
  id: number;
  name: string;
  animal: string;
  breed: string;
  location: string;
  images: string[];
};

export default function Pet(props: petProps) {
  var defaultImg = "http://pets-images.dev-apis.com/pets/none.jpg";
  if (props.images.length) {
    defaultImg = props.images[0];
  }
  return (
    <StyledCard key={props.id}>
      <Link to={`details/${props.id}`}>
        <div>
          <img src={defaultImg} alt={props.name} width="300px" height="200px" />
        </div>
        <div>
          <h2>{props.name}</h2>
          <h3>`{`${props.animal} - ${props.breed} = ${props.location}`}</h3>
        </div>
      </Link>
    </StyledCard>
  );
}
