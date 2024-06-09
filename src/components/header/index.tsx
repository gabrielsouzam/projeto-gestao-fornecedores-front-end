'use client'

import { Button } from 'antd'
import Link from 'next/link'
import { useState } from 'react'
import { NewSupplierModal } from '../new-supplier-modal'

export function Header() {
  const [newSupplierModalVisible, setNewSupplierModalVisible] = useState(false)

  function showNewSupplierModal() {
    setNewSupplierModalVisible(true)
  }

  function setVisibilityModal(visility: boolean) {
    setNewSupplierModalVisible(visility)
  }

  return (
    <>
      <header className="px-52 py-6 bg-zinc-100 border-2 border-b-1 border-zinc-200">
        <nav className="flex justify-between items-center">
          <Link
            href={'/'}
            className="text-zinc-950 hover:text-zinc-600 text-lg"
          >
            Fornecedores
          </Link>

          <Button size="large" onClick={showNewSupplierModal}>
            Adicionar fornecedor
          </Button>
        </nav>
      </header>

      <NewSupplierModal
        openModal={newSupplierModalVisible}
        setVisibilityModal={setVisibilityModal}
      />
    </>
  )
}
