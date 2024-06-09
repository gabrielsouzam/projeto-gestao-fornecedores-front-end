'use client'

import { TableSuppliers } from '@/components/table-suppliers'
import { SuppliersContext } from '@/context/SuppliersContext'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input, Select } from 'antd'
import { CircleAlert, Search } from 'lucide-react'
import { useContext, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

const searchSupplierFormValidationSchema = z.object({
  query: z.string(),
  typeOfSearch: z.enum(['name', 'cnpj'], {
    message: 'Selecione alguma forma de busca',
  }),
})

type SearchSupplierFormData = z.infer<typeof searchSupplierFormValidationSchema>

export default function Home() {
  const [onSubmitting, setOnSubmitting] = useState(false)

  const { searchSuppliers } = useContext(SuppliersContext)

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SearchSupplierFormData>({
    resolver: zodResolver(searchSupplierFormValidationSchema),
  })

  function handleSearchForSupplier(data: SearchSupplierFormData) {
    setOnSubmitting(true)
    setTimeout(() => {
      searchSuppliers(data.query, data.typeOfSearch)
      setOnSubmitting(false)
    }, 1000)
  }

  return (
    <main className="mx-auto w-full max-w-[1120px]">
      <form
        className="mt-14 mb-12"
        onSubmit={handleSubmit(handleSearchForSupplier)}
      >
        <div className="w-full flex gap-3 mb-2">
          <Controller
            name="query"
            control={control}
            render={({ field }) => (
              <Input placeholder="Busque por uma empresa" {...field} />
            )}
          />

          <Controller
            name="typeOfSearch"
            control={control}
            render={({ field }) => (
              <Select
                placeholder="Forma de busca"
                optionFilterProp="children"
                onChange={field.onChange}
                value={field.value}
                status={errors.typeOfSearch ? 'error' : ''}
                options={[
                  {
                    value: 'name',
                    label: 'Nome',
                  },
                  {
                    value: 'cnpj',
                    label: 'CNPJ',
                  },
                ]}
              />
            )}
          />

          <Button type="primary" htmlType="submit" loading={onSubmitting}>
            <Search size={16} />
            Buscar
          </Button>
        </div>

        {errors.typeOfSearch && (
          <div className="mt-1 text-sm text-red-500 flex justify-end items-baseline gap-1">
            <CircleAlert size={12} />
            <span>{errors.typeOfSearch.message}</span>
          </div>
        )}
      </form>

      <TableSuppliers />
    </main>
  )
}
