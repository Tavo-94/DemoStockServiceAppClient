import { Button, Image, Spinner } from '@nextui-org/react'
import axios from 'axios'
import { base, div, head, img, section } from 'framer-motion/client'
import React, { useCallback, useEffect, useState } from 'react'
import { set } from 'react-hook-form'
import { useStocksAbmStore } from '../stores/stocksAbmStore'
import StocksAbmTableComponent from '../components/StocksAbmTableComponent'
import bannerByma from '../assets/img/banner-byma.jpg'

const StocksAbmPage = () => {


    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    const estado = useStocksAbmStore((state) => state.estado)

    const setStocks = useStocksAbmStore((state) => state.setStocks)
    const setLabels = useStocksAbmStore((state) => state.setLabels)

    const addStock = useStocksAbmStore((state) => state.addStock)

    const removeStock = useStocksAbmStore((state) => state.removeStock)

    const editStock = useStocksAbmStore((state) => state.editStock)

    const fetchStocksData = useCallback(async () => {

        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/stock/`);
            console.log(response);
            const data = response.data
            console.log(response.data, "FETCHED DATA");

            setStocks(response.data);

            if (response.data.length > 0) {
                console.log(Object.keys(data[0]), "LABELS");
                const labels = Object.keys(data[0]).map((key, index) => {
                    return { name: key.toUpperCase(), uuid: key }
                })

                labels.push({ name: "ACTIONS", uuid: "actions" })

                setLabels(labels)
            } else {
                setLabels([
                    { name: "ID", uuid: "id" },
                    { name: "NAME", uuid: "name" },
                    { name: "PRICE", uuid: "price" },
                    { name: "DIVIDEND", uuid: "dividend" },
                    { name: "ACTIONS", uuid: "actions" }
                ])
            }
        
            setIsLoading(false);

            setIsError(false);


        } catch (error) {
            alert(`Error: ${JSON.stringify(error.message, null, 2) || 'Ha ocurrido un error al cargar los stock.'}`);
            setIsLoading(false);

            setIsError(true);
            console.log(error);
        }
    }, [setStocks, setIsError, setLabels, setStocks])

    useEffect(() => {


        setTimeout(() => {
            fetchStocksData()

        }, 3000, [])


    }, [fetchStocksData, isError])

    console.log(estado.stocks, "STORED DATA");
    console.log(estado.labels, "STORED LABELS");
    return (
        <>
            <section className='relative max-h-72 overflow-hidden'>

                <Image radius='none' className='w-screen max-h-full z-0' src={bannerByma} alt='Byma'></Image>
                <div className='absolute inset-0 flex backdrop-blur-sm justify-center items-center'>
                    <h2 className='text-8xl font-bold text-white z-10'>ABM Stocks</h2>
                </div>
            </section>

            {

                isLoading ? (
                    <section className='min-h-screen flex flex-row justify-center items-center'>

                        <Spinner color="primary" labelColor="primary" size="xl" label="Loading stocks..." />
                    </section>
                ) : (

                    isError ? (
                        <section className='min-h-screen flex flex-col justify-center items-center'>
                            <h2 className='text-8xl font-bold'>Error fetching stocks</h2>
                            <Button color="primary" size='lg' onPress={() => {
                                setIsLoading(true)
                                setIsError(false)
                            }}>Try again</Button>
                        </section>
                    ) : (
                        <StocksAbmTableComponent />
                    )
                    //<div>tabla</div>
                )
            }
        </>
    )
}

export default StocksAbmPage