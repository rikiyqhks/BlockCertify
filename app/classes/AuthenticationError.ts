import { CustomBaseError } from '@/app/classes/CustomBaseError'

export class AuthenticationError extends CustomBaseError {
  constructor(errorCode: string, e?: Error) {
    super(errorCode, e)
    this.fatalLogin()
  }

  private fatalLogin() {
    console.error('IDまたはパスワードが違います。')
  }
}