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
                const editResponse = await axios.put(`${import.meta.env.VITE_BASE_URL}/stock/${data.id}`, data);
                console.log(editResponse);
                editStock(editResponse.data);

            } catch (error) {
                
                if (error.status < 200 || error.status >= 300) {
                    alert(`Error: ${JSON.stringify(error.response.data, null, 2) || 'Ha ocurrido un error al editar el stock.'}`);
                }
                console.log(error);
            }
        } else {

            try {
                const addResponse = await axios.post(`${import.meta.env.VITE_BASE_URL}/stock/`, data);
                console.log(addResponse);
                addStock(addResponse.data);

            } catch (error) {
                
                console.log(error.response.data);
                if (error.status < 200 || error.status >= 300) {
                    alert(`Error: ${JSON.stringify(error.response.data, null, 2) || 'Ha ocurrido un error al editar el stock.'}`);
                }
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
                        render={({ field }) => <Input {...field} label="ID" type="number" placeholder='ID' className='hidden' />}
                    />

                    <Controller
                        control={control}
                        name="name"
                        render={({ field }) => <Input {...field} label="Name" type="text" placeholder="Name" />}
                    />
                    <Controller
                        control={control}
                        name="price"
                        render={({ field }) => <Input {...field} label="Price" type="number" placeholder='Price' pace="0.01" />}
                    />
                    <Controller
                        control={control}
                        name="dividend"
                        render={({ field }) => <Input {...field} label="Dividend" type="number" placeholder='Price' pace="0.01" />}
                    />
                    <div className='flex gap-4'>
                        <Button variant='solid' color='success' type="submit">Submit</Button>
                        <Button onPress={() => onClose()} variant='solid' color='default' type="button">Go back</Button>

                    </div>
                </div>


            </form>
        </>
    )
}

export default StockForm