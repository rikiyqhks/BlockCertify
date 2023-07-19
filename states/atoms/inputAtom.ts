import { atom } from 'recoil'
import InputFormType from '@/lib/inputForm.types'

export const inputState = atom<InputFormType>({
  key: 'input',
  default: {
    submitDate: '',
    firstName: '',
    lastName: '',
    DOB: '',
    university: '',
    schoolID: '',
    studentID: '',
    department: '',
    admissionYear: '',
    graduationYear: '',
    GPA: '',
    email: '',
    phoneNumber: '',
    transactionID: '',
    verified: false,
  }
})