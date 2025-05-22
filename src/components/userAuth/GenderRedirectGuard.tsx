import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProfileStore } from '../../zustand/store'

const GenderRedirectGuard = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate()
  const gender = useProfileStore((state) => state.data?.gender)

  useEffect(() => {
    if (gender === 'male') {
      navigate('/no-friends-in-your-area')
    }
  }, [gender, navigate])

  return <>{children}</>
}

export default GenderRedirectGuard
