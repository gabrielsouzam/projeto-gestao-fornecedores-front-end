import { SuppliersContext } from '@/context/SuppliersContext'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input, Modal } from 'antd'
import { useContext, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

interface NewSupplierModalProps {
  openModal: boolean
  setVisibilityModal: (state: boolean) => void
}

function formatCnpjWithoutMask(cnpj: string) {
  const cleaned = cnpj.replace(/\D/g, '')
  return cleaned.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    '$1.$2.$3/$4-$5',
  )
}

const newSupplierFormValidationSchema = z.object({
  name: z.string().min(1, 'O campo nome não pode estar vazio'),
  cnpj: z
    .string()
    .min(14, 'O CNPJ deve conter 14 dígitos')
    .transform((cnpj) => formatCnpjWithoutMask(cnpj)),
  email: z.string().email('Formato de e-mail inválido'),
  cellphone: z.string().min(1, 'O campo telefone não pode estar vazio'),
  description: z.string().min(1, 'O capo descrição não pode estar vazio'),
})

type newSupplierFormInput = z.input<typeof newSupplierFormValidationSchema>
type newSupplierFormOutput = z.output<typeof newSupplierFormValidationSchema>

export function NewSupplierModal({
  openModal,
  setVisibilityModal,
}: NewSupplierModalProps) {
  const { addSupplier } = useContext(SuppliersContext)

  const [onSubmitting, setOnSubmitting] = useState(false)

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<newSupplierFormInput, any, newSupplierFormOutput>({
    resolver: zodResolver(newSupplierFormValidationSchema),
    defaultValues: {
      name: '',
      cellphone: '',
      cnpj: '',
      description: '',
      email: '',
    },
  })

  function handleCancelSubmit() {
    setVisibilityModal(false)
  }

  function handleCreateSupplier(data: newSupplierFormOutput) {
    setOnSubmitting(true)
    setTimeout(() => {
      addSupplier(data)
      reset()
      setVisibilityModal(false)
      setOnSubmitting(false)
    }, 1000)
  }

  function handleCnpjChange(
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: string) => void,
  ) {
    const value = e.target.value.replace(/\D/g, '')
    if (value.length <= 14) {
      onChange(value)
    }
  }

  return (
    <Modal
      title="Adicionar Fornecedor"
      open={openModal}
      onCancel={handleCancelSubmit}
      footer={[]}
    >
      <form className="space-y-5" onSubmit={handleSubmit(handleCreateSupplier)}>
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
              CNPJ:{' '}
            </label>
            <Controller
              name="cnpj"
              control={control}
              render={({ field }) => (
                <Input
                  id="cnpj"
                  {...field}
                  status={errors.cnpj ? 'error' : ''}
                  placeholder="Digite apenas os números"
                  onChange={(e) => handleCnpjChange(e, field.onChange)}
                />
              )}
            />
          </div>

          {errors.cnpj && (
            <span className="mt-1 text-sm text-right text-red-500 block ml-auto">
              {errors.cnpj.message}
            </span>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <label htmlFor="email" className="w-20 text-right">
              E-mail:{' '}
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
            Criar
          </Button>
        </div>
      </form>
    </Modal>
  )
}
