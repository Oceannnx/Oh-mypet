import { createClient } from '@supabase/supabase-js'
import { nanoid } from 'nanoid'

const supabaseUrl = import.meta.env.VITE_REACT_APP_SUPABASE_KEY
const supabaseAnonKey = import.meta.env.VITE_REACT_APP_ANON_KEY
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const uploadImage = async (path, file) => {
  const fileName = `${path}/` + nanoid()

  const { error } = await supabase.storage.from('images').upload(fileName, file)
  if (error) {
    throw error
  }
  const { data } = await supabase.storage.from('images').getPublicUrl(fileName)
  return data.publicUrl
}
