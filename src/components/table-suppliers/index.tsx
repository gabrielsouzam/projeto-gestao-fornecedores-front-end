'use client'

import { DataSupplierType, SuppliersContext } from '@/context/SuppliersContext'
import { Button, Space, Table } from 'antd'
import { Pen, Trash } from 'lucide-react'
import { useContext, useState } from 'react'
import { UpdateSupplierModal } from '../update-supplier-modal'
import { ConfirmDeleteSupplierModal } from '../confirm-delete-supplier-modal'

export function TableSuppliers() {
  const [updateSupplierModalVisible, setUpdateSupplierModalVisible] =
    useState(false)
  const [confirmDeleteSupplierVisible, setConfirmDeleteSupplierVisible] =
    useState(false)
  const [currentSupplier, setCurrentSupplier] =
    useState<DataSupplierType | null>(null)

  const [supplierCnpj, setSupplierCnpj] = useState<string | null>(null)

  function showUpdateSupplierModal(updatedSupplier: DataSupplierType) {
    setCurrentSupplier(updatedSupplier)
    setUpdateSupplierModalVisible(true)
  }

  function showDeleteSupplierModal(supplierToDeleteCnpj: string) {
    setSupplierCnpj(supplierToDeleteCnpj)
    setConfirmDeleteSupplierVisible(true)
  }

  function setVisibilityUpdateSupplierModal(visibility: boolean) {
    setUpdateSupplierModalVisible(visibility)
    if (!visibility) {
      setCurrentSupplier(null)
    }
  }

  function setVisibilitConfirmDeleteSupplierModal(visibility: boolean) {
    setConfirmDeleteSupplierVisible(visibility)
  }

  const { suppliersVisibles } = useContext(SuppliersContext)

  const columns = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'CNPJ',
      dataIndex: 'cnpj',
      key: 'cnpj',
    },
    {
      title: 'E-mail',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Telefone',
      dataIndex: 'cellphone',
      key: 'cellphone',
    },
    {
      title: 'Descrição',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '',
      key: 'action',
      render: (_: any, record: DataSupplierType) => (
        <>
          <Space size="small">
            <Button
              icon={<Pen size={16} />}
              size="small"
              type="text"
              onClick={() => showUpdateSupplierModal(record)}
            >
              Editar
            </Button>
            <Button
              icon={<Trash size={16} />}
              size="small"
              type="text"
              danger
              onClick={() => showDeleteSupplierModal(record.cnpj)}
            >
              Excluir
            </Button>
          </Space>
        </>
      ),
    },
  ]

  return (
    <>
      <Table columns={columns} dataSource={suppliersVisibles} />
      {currentSupplier && (
        <UpdateSupplierModal
          openModal={updateSupplierModalVisible}
          setVisibilityModal={setVisibilityUpdateSupplierModal}
          updatedSupplier={currentSupplier}
        />
      )}
      {supplierCnpj && (
        <ConfirmDeleteSupplierModal
          openModal={confirmDeleteSupplierVisible}
          setVisibilityModal={setVisibilitConfirmDeleteSupplierModal}
          supplierCnpj={supplierCnpj}
        />
      )}
    </>
  )
}
