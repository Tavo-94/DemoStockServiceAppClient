import { Button, ButtonGroup, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from '@nextui-org/react';
import React, { useCallback } from 'react'
import { useStocksAbmStore } from '../stores/stocksAbmStore';
import { LuTrash } from 'react-icons/lu';
import axios from 'axios';
import StockFormModal from './StockFormModal';
const StocksAbmTableComponent = () => {

    const estado = useStocksAbmStore((state) => state.estado)

    const removeStock = useStocksAbmStore((state) => state.removeStock)

    const rederCell = useCallback((stock, columnKey) => {
        const cellValue = stock[columnKey];

        switch (columnKey) {
            case "id":
                return cellValue;
                break;

            case "name":
                return cellValue;

                break;

            case "price":
                return cellValue;

                break;

            case "dividend":
                return cellValue;

                break;

            case "actions":
                return (
                    <ButtonGroup>
                        <StockFormModal stock={stock} isEdit={true} />

                        <Tooltip color="danger" content="Eliminar">
                            <Button isIconOnly color="danger" onPress={() => onDeletePressCallBack(stock)}><LuTrash /></Button>
                        </Tooltip>
                    </ButtonGroup>
                );
            default:
                return cellValue;
                break;
        }
    }, [])

    const onDeletePressCallBack = useCallback(async (stock) => {
        console.log(stock);

        try {
            const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/stocks/${stock.id}`);

            removeStock(stock.id);
            console.info(response);
        } catch (error) {
            console.error(error);
        }
    }, [])

    return (
        <>
            <section className='min-h-screen container mx-auto flex flex-col justify-center items-center'>
                <Table
                    isStriped
                    aria-label="Stocks table"
                    topContent={
                        <div className='grid grid-cols-12 place-items-center px-4'>
                            <div className='col-span-3 md:col-span-2 justify-self-start'>
                                <StockFormModal isEdit={false} />

                            </div>
                            <div className='col-span-9 md:col-span-10 justify-self-end'>
                                <span className='text-xl font-bold'>Total stocks: {estado.stocks.length}</span>
                            </div>
                        </div>
                    }
                >
                    <TableHeader columns={estado.labels}>
                        {(label) => <TableColumn align='center' key={label.uuid}>{label.name}</TableColumn>}
                    </TableHeader>
                    <TableBody
                        emptyContent={"No hay stocks para mostrar"}
                        items={estado.stocks}
                    >
                        {(stock) => (
                            <TableRow key={stock.id}>
                                {(columnKey) => <TableCell>{rederCell(stock, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </section>

        </>
    )
}

export default StocksAbmTableComponent