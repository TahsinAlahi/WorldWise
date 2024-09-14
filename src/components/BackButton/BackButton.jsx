import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";

function BackButton() {
  const navigate = useNavigate();
  return (
    <Button styleType="back" onClick={() => navigate(-1)}>
      &larr; Back
    </Button>
  );
}

export default BackButton;
