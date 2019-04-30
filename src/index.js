import uCU from './useCurrentUser'
import uSI from './useSignIn'
import uSU from './useSignUp'
import uSO from './useSignOut'
import uDA from './useDeleteAccount'
import uFP from './useForgotPassword'
import uRP from './useResetPassword'

export const useCurrentUser = uCU
export const useSignIn = uSI
export const useSignUp = uSU
export const useSignOut = uSO
export const useDeleteAccount = uDA
export const useForgotPassword = uFP
export const useResetPassword = uRP

export default {
  useCurrentUser,
  useSignIn,
  useSignUp,
  useSignOut,
  useDeleteAccount,
  useForgotPassword,
  useResetPassword,
}
