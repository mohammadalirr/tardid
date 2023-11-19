import { LoginAttributes, RegisterAttributes } from '~/data/entities/User'
import BaseRepository from './BaseRepository'

const repo = new BaseRepository({ endpoint: '/auth' })

class AuthRepository {
  public static api = repo.api

  /**
   *
   * @param formData
   * @returns
   */
  public static async login(formData: LoginAttributes) {
    const response = await repo.api.post('/auth/login', formData)
    return response
  }

  /**
   *
   * @param formData
   * @returns
   */
  public static async signup(formData: RegisterAttributes) {
    const response = await repo.api.post('/auth/signup', formData)
    return response
  }

  /**
   *
   * @param formData
   * @returns
   */
  public static async logout(formData: any) {
    const response = await repo.api.post('/logout', formData)
    return response
  }
}

export default AuthRepository