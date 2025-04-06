'use client'

import { url } from 'inspector'
import { Copy, Download, Trash2, Unlink } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { z } from 'zod'

interface Url {
  id: string
  url: string
  hash: string
  url_short: string
  createdAt: string
}

export function YourLinks() {
  const [urls, setUrls] = useState<Url[]>([])

  const handleAllLinks = async () => {
    const response = await fetch(
      'https://backend-url-six.vercel.app/url/get-all'
    )
    const data = await response.json()
    setUrls(data)
  }

  useEffect(() => {
    handleAllLinks()
  }, [])

  const deleteLink = async (id: string) => {
    await fetch(`https://backend-url-six.vercel.app/url/delete/${id}`, {
      method: 'DELETE'
    }).then(response => {
      if (response.status === 200) {
        toast.success('Link deletado com sucesso!')
      } else {
        toast.error('Erro ao deletar link')
      }
    })
    handleAllLinks()
  }
  return (
    <div className="min-h-[200px] flex bg-zinc-800 rounded-md border border-zinc-700">
      <div className="w-full flex flex-col gap-4  px-4 py-8">
        <div className="flex items-center justify-between gap-2 border-b border-zinc-700 pb-3">
          <label className="uppercase text-md text-zinc-400 tracking-wider">
            meus links
          </label>
          <button className="flex items-center gap-2 bg-zinc-700 hover:bg-zinc-600 transition-colors duration-300 cursor-pointer px-2 py-1 text-md rounded-md">
            <Download size={16} />
            Baixar CSV
          </button>
        </div>
        {urls.length > 0 ? (
          urls.map(item => {
            return (
              <div
                key={item.id}
                className="flex flex-col md:flex-row items-center justify-between gap-2 border-b border-zinc-700 pb-3"
              >
                <a
                  href={item.url_short}
                  target="_blank"
                  className="text-lg text-zinc-100 cursor-pointer hover:underline"
                >
                  {item.url_short}
                </a>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-2 bg-zinc-700 hover:bg-zinc-600 transition-colors duration-300 cursor-pointer px-2 py-1 text-md rounded-md">
                    <Copy size={16} />
                    Copiar
                  </button>
                  <button
                    onClick={() => deleteLink(item.id)}
                    className="flex items-center gap-2 bg-zinc-700 hover:bg-zinc-600 transition-colors duration-300 cursor-pointer px-2 py-1 text-md rounded-md"
                  >
                    <Trash2 size={16} />
                    Excluir
                  </button>
                </div>
              </div>
            )
          })
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <span className="text-zinc-400 flex items-center gap-2">
              <Unlink size={16} /> Nenhum link encontrado
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
