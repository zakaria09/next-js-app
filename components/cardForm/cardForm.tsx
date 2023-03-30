import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, TextField } from '@mui/material';
import ImageUploading from "react-images-uploading";
import Block from 'react-color/lib/components/block/Block';

const CardForm = ({ newCard }: {newCard: (value: any) => void}) => {
  const [images, setImages] = React.useState([]);

  const initialValues = {
    heading: "",
    text: "",
    img: null,
    bgColour: "#905A27",
  };

  const validate = (values: any) => {
    const errors: any = {};
    if (!values.heading) {
      errors.heading = 'Required';
    }
    if (!values.text) {
      errors.text = 'Required';
    }
    return errors;
  };

  const handleSubmit = (values: any, { resetForm }: any) => {
    newCard(values);
    resetForm()
    setImages([]);
  };


  const handleImageUpload = (imageList: any, setFieldValue: any) => {
    setImages(imageList);
    setFieldValue("img", imageList[0].dataURL);
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={handleSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        setFieldValue,
        isSubmitting,
      }) => (
        <Form>
          <div className="flex">
            <div className="w-full">
              <Field
                name="heading"
                as={TextField}
                label="Heading"
                variant="outlined"
                fullWidth
                error={Boolean(touched.heading && errors.heading)}
                helperText={touched.heading && errors.heading}
              />
              <Field
                name="text"
                as={TextField}
                label="Card Text"
                variant="outlined"
                fullWidth
                multiline
                rows={10}
                error={Boolean(touched.text && errors.text)}
                helperText={touched.text && errors.text}
              />
            </div>
            <div className="w-full">
              <div>
                <ImageUploading
                  value={images}
                  onChange={(event) => handleImageUpload(event, setFieldValue)}
                  maxNumber={1}
                >
                  {({ imageList, onImageUpload }) => (
                    <>
                      {imageList.map((image, ind) => (
                        <img
                          key={ind}
                          src={image.dataURL}
                          alt=""
                          className="w-full"
                        />
                      ))}
                      <Button
                        variant="contained"
                        component="span"
                        startIcon={<i className="ri-file-upload-fill"></i>}
                        onClick={onImageUpload}
                      >
                        Upload Image
                      </Button>
                    </>
                  )}
                </ImageUploading>
              </div>
            </div>
          </div>
          <div>
            <h4>Background Colour</h4>
            <Block
              color={values.bgColour}
              onChange={(color) => setFieldValue("bgColour", color.hex)}
              triangle="hide"
              colors={[
                "#AA6B2F",
                "#C79450",
                "#7B6535",
                "#474027",
                "#131A18",
                "#1E241F",
                "#905A27",
              ]}
            />
          </div>
          <div className='border-4 border-red-900 border-solid w-full'>
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
            >
              Add
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default CardForm;