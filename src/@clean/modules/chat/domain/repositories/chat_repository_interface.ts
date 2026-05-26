export interface IChatRepository {
  createChat(question: string): Promise<string>
  getUploadUrl(
    fileName: string
  ): Promise<{ uploadUrl: string; message: string }>
  uploadFile(uploadUrl: string, file: File): Promise<void>
}
