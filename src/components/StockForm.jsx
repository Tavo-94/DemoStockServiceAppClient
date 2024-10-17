import { Button, Input } from '@nextui-org/react'
import axios from 'axios'
import { a } from 'framer-motion/client'
import { useCallback, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useStocksAbmStore } from '../stores/stocksAbmStore'
const StockForm = ({ isEdit = false, stock, onClose }) => {

    const addStock = useStocksAbmStore((state) => state.addStock)
    const editStock = useStocksAbmStore((state) => state.editStock)

    const { control, formState, handleSubmit, setValue } = useForm({
        mode: 'all',
        defaultValues: {
            id: 0,
            name: '',
            price: 0,
            dividend: 0
        }
    })

    const setFormValuesCallBack = useCallback((stock) => {
        setValue('id', stock?.id ?? 0)
        setValue('name', stock?.name ?? '')
        setValue('price', stock?.price ?? 0)
        setValue('dividend', stock?.dividend ?? 0)
    }, [])

    useEffect(() => {
        if (isEdit) {
            setFormValuesCallBack(stock)
        }
    }, [isEdit, stock, setFormValuesCallBack])


    const onSubmitAxiosCallBack = useCallback(async (data) => {
        if (isEdit) {

            try {
                const editResponse = await axios.put(`${import.meta.env.VITE_BASE_URL}/stocks/${data.id}`, data);
                console.log(editResponse);
                editStock(editResponse.data);

            } catch (error) {
                console.log(error);
            }
        } else {

            try {
                const addResponse = await axios.post(`${import.meta.env.VITE_BASE_URL}/stocks`, data);
                console.log(addResponse);
                addStock(addResponse.data);

            } catch (error) {
                console.log(error);
            }
        }

    }, [])


    return (
        <>
            <form onSubmit={handleSubmit((data) => {
                console.log(data);
                onSubmitAxiosCallBack(data);
                onClose();
            })}>
                <div className='flex flex-col gap-6'>

                    <Controller
                        control={control}
                        name="id"
                        render={({ field }) => <Input {...field} type="number" placeholder='ID' className='hidden' />}
                    />

                    <Controller
                        control={control}
                        name="name"
                        render={({ field }) => <Input {...field} type="text" placeholder="Nombre" />}
                    />
                    <Controller
                        control={control}
                        name="price"
                        render={({ field }) => <Input {...field} type="number" placeholder='Precio' pace="0.01" />}
                    />
                    <Controller
                        control={control}
                        name="dividend"
                        render={({ field }) => <Input {...field} type="number" placeholder='Dividendo' pace="0.01" />}
                    />
                    <div>
                        <Button variant='solid' color='success' type="submit">Enviar</Button>
                        <Button onPress={() => onClose()} variant='solid' color='default' type="button">Volver Atras</Button>

                    </div>
                </div>


            </form>
        </>
    )
}

export default StockForm