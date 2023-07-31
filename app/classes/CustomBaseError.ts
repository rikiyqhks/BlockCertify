import { ErrorMessageMapping } from '@/app/classes/ErrorMessageMapping'

export abstract class CustomBaseError extends Error {
  private errorCode: string
  private moduleError: Error | undefined

  constructor(errorCode: string, e?: Error) {
    super()
    this.errorCode = errorCode
    this.moduleError = e
    this.message = this.getMessageByErrorCode()

    this.describeMessage()
  }

  private describeMessage(){
    const errorCode = this.errorCode
    const errorType = this.constructor.name
    const errorCategory = this.moduleError ? 'ModuleError' : 'ApplicationError'
    const moduleErrorMessage =  this.moduleError ? this.moduleError.message : ''
    const errorMessage =  this.message

    console.error('エラーコード: ' + errorCode)
    console.error('エラータイプ: ' + errorType)
    console.error('エラーカテゴリ: ' + errorCategory)
    console.error('モジュールエラーメッセージ: ' + moduleErrorMessage)
    console.error('エラーメッセージ: ' + errorMessage)
  }

  private getMessageByErrorCode(): string {
    // メンバ変数にしてコンストラクタ内での初期化などもOK
    const errorMessageMapping = new ErrorMessageMapping()

    return errorMessageMapping.getErrorMessage(this.errorCode)
  }
}