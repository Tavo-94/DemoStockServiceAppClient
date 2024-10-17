import { Button, Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react"
import { useNavigate } from "react-router-dom";

function IndexCard() {

  const navigate = useNavigate();

  return (
    <>
      <Card>
        <CardHeader>
          <h1 className='text-8xl font-bold'>Demo Stock Service App</h1>
        </CardHeader>
        <CardBody>
          <p>A continuacion pueden elegir una de las siguientes opciones:</p>
          <ul>
            <li>
              <a href='/HomePage'>Form Page sin validaciones</a>
            </li>
            <li>
              <a href='/FormPage'>Form Page con validaciones</a>
            </li>
          </ul>
        </CardBody>
        <CardFooter className="gap-4">
          <Button onPress={() => navigate('/free-form-page')} variant="bordered" color="success">Crear una nueva accion</Button>
          <Button onPress={() => navigate('/stocks-abm')} variant="bordered" color="default">ABM stocks</Button>

        </CardFooter>
      </Card>
    </>
  )
}

export default IndexCard
