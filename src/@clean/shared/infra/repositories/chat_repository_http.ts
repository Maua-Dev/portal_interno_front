import 'reflect-metadata'
import { decorate, injectable } from 'inversify'
import { AxiosInstance } from 'axios'
import axios from 'axios'
import { IChatRepository } from '../../../modules/chat/domain/repositories/chat_repository_interface'

export class ChatRepositoryHttp implements IChatRepository {
  constructor(private http: AxiosInstance) {}

  async createChat(question: string): Promise<string> {
    const token = localStorage.getItem('idToken')
    if (!token) throw new Error('Token não encontrado no localStorage')

    try {
      const response = await this.http.post<{ answer: string }>(
        '/create-chat',
        { question },
        {
          headers: {
            Authorization: token
          }
        }
      )
      return response.data.answer
    } catch (error: any) {
      console.error('Erro no createChat:', error)
      const errorMsg = error.response?.data?.message || error.message
      throw new Error(`Erro ao enviar pergunta para a IA: ${errorMsg}`)
    }
  }

  async getUploadUrl(
    fileName: string
  ): Promise<{ uploadUrl: string; message: string }> {
    const token = localStorage.getItem('idToken')
    if (!token) throw new Error('Token não encontrado no localStorage')

    try {
      const response = await this.http.get<{
        upload_url: string
        message: string
      }>('/get-upload-url', {
        params: { file_name: fileName },
        headers: {
          Authorization: token
        }
      })
      return {
        uploadUrl: response.data.upload_url,
        message: response.data.message
      }
    } catch (error: any) {
      console.error('Erro no getUploadUrl:', error)
      const errorMsg = error.response?.data?.message || error.message
      throw new Error(`Erro ao gerar link de upload: ${errorMsg}`)
    }
  }

  async uploadFile(uploadUrl: string, file: File): Promise<void> {
    try {
      await axios.put(uploadUrl, file, {
        headers: {
          'Content-Type': 'application/octet-stream'
        }
      })
    } catch (error: any) {
      console.error('Erro no uploadFile para o S3:', error)
      throw new Error(`Erro ao subir arquivo para o S3: ${error.message}`)
    }
  }
}

decorate(injectable(), ChatRepositoryHttp)
