import Head from 'next/head'
import { Button, Container, Snackbar, TextField } from '@mui/material';
import * as Yup from "yup";
import { useFormik } from 'formik';
import siginIn from '@/lib/signin';
import { useRouter } from 'next/router';

export default function Admin() {

  const router = useRouter()

  const validationSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const { email, password } = values;
      siginIn(email, password)
        .then(res => {
          if (res.result) router.push("/about");
          else {
            <Snackbar
              open={true}
              autoHideDuration={6000}
              message={'Invalid email or password'}
            />
          }
        })
    },
  });

  return (
    <>
      <Head>
        <title>Zulu Vision</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section>          
        <Container >
          <form
              onSubmit={formik.handleSubmit}
              >
              <div className='flex justify-center h-screen'>
              <div className='my-auto grid grid-rows-2'>

                <TextField 
                  label="Email" 
                  variant="outlined"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}/>
                <TextField 
                  label="Password" 
                  type="password" 
                  variant="outlined"
                  id="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                  />
                <div className='my-2'>
                  <Button type='submit' variant="contained">Login</Button>
                </div>
              </div>
            </div>
          </form>
        </Container>
      </section>
    </>
  )
}