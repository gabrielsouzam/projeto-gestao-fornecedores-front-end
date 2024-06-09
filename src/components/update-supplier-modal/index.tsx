import { DataSupplierType, SuppliersContext } from '@/context/SuppliersContext'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input, Modal } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

interface UpdateSupplierModalProps {
  openModal: boolean
  setVisibilityModal: (state: boolean) => void
  updatedSupplier: DataSupplierType | null
}

const updateSupplierFormValidationSchema = z.object({
  name: z.string().min(1, 'O campo nome não pode estar vazio'),
  cnpj: z.string(),
  email: z.string().email('Formato de e-mail inválido'),
  cellphone: z.string().min(1, 'O campo telefone não pode estar vazio'),
  description: z.string().min(1, 'O capo descrição não pode estar vazio'),
})

type UpdateSupplierFormData = z.infer<typeof updateSupplierFormValidationSchema>

export function UpdateSupplierModal({
  openModal,
  setVisibilityModal,
  updatedSupplier,
}: UpdateSupplierModalProps) {
  const { updateSupplier } = useContext(SuppliersContext)

  const [onSubmitting, setOnSubmitting] = useState(false)

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<UpdateSupplierFormData>({
    resolver: zodResolver(updateSupplierFormValidationSchema),
    defaultValues: {
      name: updatedSupplier?.name,
      cnpj: updatedSupplier?.cnpj,
      cellphone: updatedSupplier?.cellphone,
      email: updatedSupplier?.email,
      description: updatedSupplier?.description,
    },
  })

  useEffect(() => {
    if (updatedSupplier) {
      reset(updatedSupplier)
    }
  }, [updatedSupplier, reset])

  function handleCancelSubmit() {
    setVisibilityModal(false)
  }

  function handleUpdateSupplier(data: UpdateSupplierFormData) {
    setOnSubmitting(true)
    setTimeout(() => {
      updateSupplier(data)
      setVisibilityModal(false)
      setOnSubmitting(false)
    }, 1000)
  }

  return (
    <Modal
      title="Editar Fornecedor"
      open={openModal}
      onCancel={handleCancelSubmit}
      footer={[]}
    >
      <form className="space-y-5" onSubmit={handleSubmit(handleUpdateSupplier)}>
        <div>
          <div className="flex items-center gap-2">
            <label htmlFor="name" className="w-20 text-right">
              Nome:
            </label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  id="name"
                  {...field}
                  status={errors.name ? 'error' : ''}
                />
              )}
            />
          </div>
          {errors.name && (
            <span className="mt-1 text-sm text-right text-red-500 block ml-auto">
              {errors.name.message}
            </span>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <label htmlFor="cnpj" className="w-20 text-right">
              CNPJ:
            </label>
            <Controller
              name="cnpj"
              control={control}
              render={({ field }) => <Input id="cnpj" {...field} disabled />}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <label htmlFor="email" className="w-20 text-right">
              E-mail:
            </label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  id="email"
                  {...field}
                  status={errors.email ? 'error' : ''}
                />
              )}
            />
          </div>

          {errors.email && (
            <span className="mt-1 text-sm text-right text-red-500 block ml-auto">
              {errors.email.message}
            </span>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <label htmlFor="cellphone" className="w-20 text-right">
              Telefone:
            </label>
            <Controller
              name="cellphone"
              control={control}
              render={({ field }) => (
                <Input
                  id="cellphone"
                  {...field}
                  status={errors.cellphone ? 'error' : ''}
                />
              )}
            />
          </div>
          {errors.cellphone && (
            <span className="mt-1 text-sm text-right text-red-500 block ml-auto">
              {errors.cellphone.message}
            </span>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <label htmlFor="description" className="w-20 text-right">
              Descrição:
            </label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Input.TextArea
                  id="description"
                  {...field}
                  status={errors.description ? 'error' : ''}
                />
              )}
            />
          </div>
          {errors.description && (
            <span className="mt-1 text-sm text-right text-red-500 block ml-auto">
              {errors.description.message}
            </span>
          )}
        </div>

        <div className="flex justify-end gap-1">
          <Button key="back" onClick={handleCancelSubmit}>
            Cancelar
          </Button>
          <Button htmlType="submit" type="primary" loading={onSubmitting}>
            Editar
          </Button>
        </div>
      </form>
    </Modal>
  )
}
