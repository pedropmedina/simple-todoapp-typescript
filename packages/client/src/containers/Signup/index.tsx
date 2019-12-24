import React from 'react';
import { Formik, Form, FormikHelpers, useField } from 'formik';
import * as Yup from 'yup';
import { Container, TextField, Grid, Button } from '@material-ui/core';
import { Send } from '@material-ui/icons';
/* @jsx jsx */
import { css, jsx } from '@emotion/core'; // eslint-disable-line

import { SignupInitialValues } from '../../types/SignupInitialValues';

interface InputProps {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
}

const CustomTextInput = ({ label, ...props }: InputProps) => {
  const [field, meta] = useField(props);
  return (
    <TextField
      error={!!(meta.touched && meta.error)}
      label={label}
      variant='filled'
      helperText={meta.touched && meta.error}
      fullWidth={true}
      {...field}
      {...props}
    />
  );
};

export const Signup: React.FC<{}> = () => {
  const initialValues: SignupInitialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .max(15)
      .required(),
    lastName: Yup.string()
      .max(20)
      .required(),
    email: Yup.string()
      .email()
      .required(),
    password: Yup.string().required()
  });

  const handleSubmit = (
    values: SignupInitialValues,
    actions: FormikHelpers<SignupInitialValues>
  ): void => {
    console.log({ values, actions });
    actions.setSubmitting(false);
  };

  return (
    <Container
      maxWidth='sm'
      css={css`
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        box-shadow: 0 5px 10px 5px rgba(0, 0, 0, 0.1);
        padding: 50px;
        border-radius: 5px;
      `}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <Grid container spacing={3}>
              <Grid
                item
                xs={12}
                container
                spacing={2}
                justify='space-between'
                css={css`
                  margin: 0;

                  > * {
                    :first-of-type {
                      padding-left: 0 !important;
                    }
                    :last-of-type {
                      padding-right: 0 !important;
                    }
                  }
                `}
              >
                <Grid item sm={6} xs={12}>
                  <CustomTextInput name='firstName' label='firstName' />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <CustomTextInput name='lastName' label='lastName' />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <CustomTextInput name='email' label='email' />
              </Grid>
              <Grid item xs={12}>
                <CustomTextInput
                  name='password'
                  label='password'
                  type='password'
                />
              </Grid>
              <Grid item>
                <Button
                  variant='contained'
                  color='secondary'
                  type='submit'
                  endIcon={<Send />}
                  size='large'
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  );
};
