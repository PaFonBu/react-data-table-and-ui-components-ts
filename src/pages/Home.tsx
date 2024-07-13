import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Home: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/data-table");
  }, []);

  return <></>;
};
