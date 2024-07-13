import httpStatus from 'http-status'
import AppError from '../../errors/appError'
import { ILoginUser, IUser } from './user.interface'
import { User } from './user.model'

const createUserIntoDB = async (payload: IUser) => {
  // checkn if the user alreday exists
  const user = await User.isUserExists(payload?.email)
  if (user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User alreday exists')
  }
  await User.create(payload)
  const result = await User.findOne({ email: payload?.email })
  return result
}

const loginUserIntoDB = async (payload: ILoginUser) => {
  const user = await User.isUserExists(payload?.email as string)
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This User is not found!')
  }

  // checking if the user is already deleted
  const isDeleted = user?.isDeleted
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This User is deleted!')
  }
  // check user status
  if (user?.status === 'blocked') {
    throw new AppError(httpStatus.NOT_FOUND, 'This User is blocked!')
  }
  const filterUser = await User.findOne({ email: payload.email }).select(
    'password',
  )
  if (filterUser) {
    const userPassword = filterUser.password

    // matched email and password
    if (!(await User.isPasswordMatched(payload?.password, userPassword))) {
      throw new AppError(httpStatus.FORBIDDEN, 'password do not matched!')
    }
  }

  const result = await User.findOne({ email: payload.email })
  return { result }
}

export const UserServices = {
  createUserIntoDB,
  loginUserIntoDB,
}
