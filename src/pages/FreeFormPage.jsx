import { Button, Card, CardBody, CardHeader, Input } from '@nextui-org/react'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const FreeFormPage = () => {

  const { control, formState, handleSubmit } = useForm({
    mode: 'all',
    defaultValues: {
      name: '',
      price: 0,
      dividend: 0
    }
  })

  const navigate = useNavigate();


  return (
    <>
      <section className='min-h-screen flex flex-row justify-center items-center'>
        <Card>
          <CardHeader>
            <h2 className='text-8xl font-bold'>New Stock</h2>
          </CardHeader>
          <CardBody className='gap-4'>
            <form onSubmit={handleSubmit((data) => console.log(data))}>
              <div className='flex flex-col gap-6'>
                <Controller
                  control={control}
                  name="name"
                  render={({ field }) => <Input {...field} type="text" placeholder="Name" />}
                />
                <Controller
                  control={control}
                  name="price"
                  render={({ field }) => <Input {...field} type="number" pace="0.01" />}
                />
                <Controller
                  control={control}
                  name="dividend"
                  render={({ field }) => <Input {...field} type="number" pace="0.01" />}
                />
                <div>
                  <Button variant='solid' color='success' type="submit">Enviar</Button>
                  <Button onPress={() => navigate("/")} variant='solid' color='default' type="button">Volver Atras</Button>

                </div>
              </div>


            </form>
          </CardBody>
        </Card>
      </section>
    </>
  )
}

export default FreeFormPage