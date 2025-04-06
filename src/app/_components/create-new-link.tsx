'use client'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { set, z } from 'zod'

const UrlSchema = z.object({
  url_original: z.string().url()
})

export function CreateNewLink() {
  const [url, setUrl] = useState('')
  const [disabled, setDisabled] = useState(false)

  const handleCreateNewLink = async () => {
    setDisabled(true)
    if (!url) {
      toast.error('Preencha o campo de URL')
      return
    }

    const validationResult = UrlSchema.safeParse({ url_original: url })

    if (!validationResult.success) {
      toast.error('Por favor, insira uma URL válida')
      return
    }
    const data = {
      url_original: url
    }

    await fetch('https://backend-url-six.vercel.app/url/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => {
      if (response.status === 201) {
        setUrl('')
        toast.success('Link criado com sucesso!')
        window.location.reload()
      } else {
        toast.error('Erro ao criar link')
      }
    })
    setDisabled(false)
  }

  const deleteLink = async () => {}
  return (
    <div className="min-h-[200px] flex bg-zinc-800 rounded-md border border-zinc-700">
      <div className="w-full flex flex-col gap-4  px-4 py-8">
        <div className="flex flex-col gap-2">
          <label className="uppercase text-md text-zinc-400 tracking-wider">
            criar link encurtado
          </label>
          <input
            type="text"
            value={url}
            placeholder="Enter a link"
            onChange={e => setUrl(e.target.value)}
            className=" w-full bg-zinc-700 px-3 py-2 rounded-md outline-none"
          />
        </div>
        <button
          disabled={disabled}
          onClick={handleCreateNewLink}
          className="bg-blue-700 hover:bg-blue-600 transition-colors duration-300 cursor-pointer uppercase tracking-wider font-semibold text-xl px-3 py-2 rounded-md"
        >
          Criar link
        </button>
      </div>
      <ToastContainer
        closeButton={false}
        position="top-right"
        autoClose={3000}
      />
    </div>
  )
}
