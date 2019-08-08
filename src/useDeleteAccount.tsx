import { useCroods } from 'croods'
import getBaseOpts from './getBaseOpts'
import { clearHeaders } from './headersHelpers'
import { useMounted, useOnUnmount } from './hooks'
import {
  ActionOptions,
  InstanceOptions,
} from 'croods/dist/types/typeDeclarations'
import { AxiosResponse } from 'axios'
import { DeleteAccountState } from './typeDeclarations'

function useDeleteAccount(
  options: ActionOptions = {},
): [DeleteAccountState, (t?: object) => Promise<any>] {
  const afterSuccess = (response: AxiosResponse) => {
    clearHeaders(options)
    options.afterSuccess && options.afterSuccess(response)
    mounted && setInfo(null, false)
  }
  const opts = { ...getBaseOpts(options, 'deleteAccount'), afterSuccess }
  const mounted = useMounted()
  const [
    { info: currentUser, destroying: deleting, destroyError: error },
    { destroy, setInfo, resetState },
  ] = useCroods(opts as InstanceOptions)

  useOnUnmount(resetState, !!(deleting || error))

  const id = currentUser ? (currentUser as any).id : undefined

  return [{ deleting: !!deleting, error }, destroy({ id })]
}

export default useDeleteAccount
