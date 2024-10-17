import { Button, Modal, ModalBody, ModalContent, ModalHeader, Tooltip, useDisclosure } from '@nextui-org/react'
import React from 'react'
import StockForm from './StockForm';
import { LuPencil, LuPlus } from 'react-icons/lu';

const StockFormModal = ({ isEdit = false, stock }) => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    return (
        <>
            <Tooltip color={isEdit ? 'warning' : 'primary'} aria-label={isEdit ? 'Editar Stock' : 'Crear Stock'} content={isEdit ? 'Editar Stock' : 'Crear Stock'}>
                <Button onPress={onOpen} isIconOnly color={isEdit ? 'warning' : 'primary'}>{isEdit ? <LuPencil /> : <LuPlus />}</Button>

            </Tooltip>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>

                <ModalContent>
                    {
                        (onClose) => {

                            return (
                                <>
                                    <ModalHeader>{isEdit ? <h2 className='text-2xl font-bold'>Editar Stock</h2> : <h2 className='text-2xl font-bold'>Crear Stock</h2>}</ModalHeader>
                                    <ModalBody>
                                        <StockForm isEdit={isEdit} stock={stock} onClose={onClose} />
                                    </ModalBody>
                                </>
                            )
                        }
                    }
                </ModalContent>
            </Modal>
        </>
    )
}

export default StockFormModal