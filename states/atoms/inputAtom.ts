import { atom } from 'recoil'
import InputFormType from '@/lib/inputForm.types'

export const inputState = atom<InputFormType>({
  key: 'input',
  default: {
    uid: '',
    submitdate: '',
    firstname: '',
    lastname: '',
    dob: '',
    university: '',
    schoolid: '',
    studentid: '',
    department: '',
    admissionyear: '',
    graduationyear: '',
    gpa: '',
    email: '',
    phonenumber: '',
    transactionid: '',
    verified: false,
  }
})