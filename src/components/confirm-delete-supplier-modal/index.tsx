import { SuppliersContext } from '@/context/SuppliersContext'
import { Button, Modal } from 'antd'
import { useContext } from 'react'

interface ConfirmDeleteSupplierModalProps {
  openModal: boolean
  supplierCnpj: string | null
  setVisibilityModal: (state: boolean) => void
}

export function ConfirmDeleteSupplierModal({
  openModal,
  setVisibilityModal,
  supplierCnpj,
}: ConfirmDeleteSupplierModalProps) {
  const { deleteSupplier } = useContext(SuppliersContext)

  function handleCancelDelete() {
    setVisibilityModal(false)
  }

  function handleConfirmDelete() {
    if (supplierCnpj) {
      deleteSupplier(supplierCnpj)
      setVisibilityModal(false)
    }
  }

  return (
    <Modal
      title="Deseja realmente excluir esse fornecedor? "
      open={openModal}
      onCancel={handleCancelDelete}
      footer={[
        <Button key="back" onClick={handleCancelDelete}>
          Cancelar
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={handleConfirmDelete}
          danger
        >
          Confirmar
        </Button>,
      ]}
    ></Modal>
  )
}
