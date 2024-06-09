'use client'

import { ReactNode, createContext, useState } from 'react'

export interface DataSupplierType {
  name: string
  cnpj: string
  email: string
  cellphone: string
  description: string
}

interface SuppliersContextType {
  suppliersVisibles: DataSupplierType[]
  addSupplier: (newSupplier: DataSupplierType) => void
  deleteSupplier: (supplierCnpj: string) => void
  updateSupplier: (updatedSupplier: DataSupplierType) => void
  searchSuppliers: (query: string, type: keyof DataSupplierType) => void
}

interface SuppliersContextProviderProps {
  children: ReactNode
}

export const SuppliersContext = createContext({} as SuppliersContextType)

export function SuppliersContextProvider({
  children,
}: SuppliersContextProviderProps) {
  const [suppliers, setSuppliers] = useState<DataSupplierType[]>([
    {
      name: 'Distribuidora 1',
      cnpj: '11.111.111/1111-11',
      email: 'distribuidora1@example.com',
      cellphone: '9999-9999',
      description: 'Distribuidora de alimentos 1',
    },
    {
      name: 'Distribuidora 2',
      cnpj: '22.222.222/2222-22',
      email: 'distribuidora2@example.com',
      cellphone: '8888-8888',
      description: 'Distribuidora de alimentos 2',
    },
    {
      name: 'Distribuidora 3',
      cnpj: '33.333.333/3333-33',
      email: 'distribuidora3@example.com',
      cellphone: '7777-7777',
      description: 'Distribuidora de alimentos 3',
    },
    {
      name: 'Distribuidora 4',
      cnpj: '44.444.444/4444-44',
      email: 'distribuidora4@example.com',
      cellphone: '6666-6666',
      description: 'Distribuidora de alimentos 4',
    },
    {
      name: 'Distribuidora 5',
      cnpj: '55.555.555/5555-55',
      email: 'distribuidora5@example.com',
      cellphone: '5555-5555',
      description: 'Distribuidora de alimentos 5',
    },
    {
      name: 'Distribuidora 6',
      cnpj: '66.666.666/6666-66',
      email: 'distribuidora6@example.com',
      cellphone: '4444-4444',
      description: 'Distribuidora de alimentos 6',
    },
    {
      name: 'Distribuidora 7',
      cnpj: '77.777.777/7777-77',
      email: 'distribuidora7@example.com',
      cellphone: '3333-3333',
      description: 'Distribuidora de alimentos 7',
    },
    {
      name: 'Distribuidora 8',
      cnpj: '88.888.888/8888-88',
      email: 'distribuidora8@example.com',
      cellphone: '2222-2222',
      description: 'Distribuidora de alimentos 8',
    },
    {
      name: 'Distribuidora 9',
      cnpj: '99.999.999/9999-99',
      email: 'distribuidora9@example.com',
      cellphone: '1212-1212',
      description: 'Distribuidora de alimentos 9',
    },
    {
      name: 'Distribuidora 10',
      cnpj: '11.110.100/1100-11',
      email: 'distribuidora10@example.com',
      cellphone: '1010-1010',
      description: 'Distribuidora de alimentos 10',
    },
  ])

  const [suppliersVisibles, setSuppliersVisibles] =
    useState<DataSupplierType[]>(suppliers)

  function addSupplier(newSupplier: DataSupplierType) {
    const newSuppliers = [...suppliers, newSupplier]
    setSuppliers(newSuppliers)
    setSuppliersVisibles(newSuppliers)
  }

  function deleteSupplier(supplierCnpj: string) {
    const newSuppliers = suppliers.filter(
      (supplier) => supplier.cnpj !== supplierCnpj,
    )
    setSuppliers(newSuppliers)
    setSuppliersVisibles(newSuppliers)
  }

  function updateSupplier(updatedSupplier: DataSupplierType) {
    const newSuppliers = suppliers.map((supplier) =>
      supplier.cnpj === updatedSupplier.cnpj ? updatedSupplier : supplier,
    )
    setSuppliers(newSuppliers)
    setSuppliersVisibles(newSuppliers)
  }

  function searchSuppliers(query: string, type: keyof DataSupplierType) {
    const filteredSuppliers = suppliers.filter((supplier) =>
      supplier[type].toLowerCase().includes(query.toLowerCase()),
    )
    setSuppliersVisibles(filteredSuppliers)
  }

  const contextValue: SuppliersContextType = {
    suppliersVisibles,
    addSupplier,
    deleteSupplier,
    updateSupplier,
    searchSuppliers,
  }

  return (
    <SuppliersContext.Provider value={contextValue}>
      {children}
    </SuppliersContext.Provider>
  )
}
