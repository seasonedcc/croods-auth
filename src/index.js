import Authorize from './Authorize'
import aH from './authHeaders'
import uCU from './useCurrentUser'
import uSI from './useSignIn'
import uSU from './useSignUp'
import uSO from './useSignOut'
import uDA from './useDeleteAccount'
import uEP from './useEditProfile'
import uFP from './useForgotPassword'
import uRP from './useResetPassword'

export const Auth = Authorize
export const authHeaders = aH
export const useCurrentUser = uCU
export const useSignIn = uSI
export const useSignUp = uSU
export const useSignOut = uSO
export const useDeleteAccount = uDA
export const useEditProfile = uEP
export const useForgotPassword = uFP
export const useResetPassword = uRP

export default {
  Auth,
  authHeaders,
  useCurrentUser,
  useSignIn,
  useSignUp,
  useSignOut,
  useEditProfile,
  useDeleteAccount,
  useForgotPassword,
  useResetPassword,
}
