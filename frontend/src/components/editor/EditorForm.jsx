import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

import { LessonsService } from 'apis/LessonsService';
import { BaseDetailsValidationSchema } from './BaseDetailsValidationSchema';
import BaseDetailsForm from './BaseDetailsForm';
import PagesList from './PagesList';

import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import CloseIcon from '@mui/icons-material/Close';

const EditorForm = ({ lesson, initialLessonNumber }) => {
  const [pages, setPages] = useState(
    lesson ? lesson.pages : [{ contents: '<h1>Page 1</h1>' }]
  );
  const navigate = useNavigate();

  useEffect(() => {
    const confirmNavigation = (e) => {
      // If there are unsaved changes, show a confirmation message

      e.preventDefault();
      e.returnValue = ''; // This is necessary for Chrome
      return 'You have unsaved changes. Are you sure you want to leave this page?';
    };

    // Listen for the beforeunload event to trigger the confirmation message
    window.addEventListener('beforeunload', confirmNavigation);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('beforeunload', confirmNavigation);
    };
  }, []);

  const formikBase = useFormik({
    initialValues: {
      lessonNumber: lesson ? lesson.lessonNumber : initialLessonNumber,
      title: lesson ? lesson.title : '',
      subtitle: lesson ? lesson.subtitle : ''
    },
    validationSchema: BaseDetailsValidationSchema,
    onSubmit: async (values) => {
      try {
        const data = {
          lessonNumber: values.lessonNumber,
          title: values.title,
          subtitle: values.subtitle,
          pages: pages
        };
        console.log('data', data);
        // TODO: add error handling
        if (lesson) {
          const response = await LessonsService.update(lesson.id, data);
          console.log('Updateresponse', response);
        } else {
          const response = await LessonsService.create(data);
          console.log('Createresponse', response);
        }
        navigate('/', { replace: true });
      } catch (error) {
        console.log('error', error);
      }
    }
  });

  const handleClose = useCallback(() => {
    const confirmed = window.confirm(
      'Are you sure you want to go back to the dashboard? Any unsaved changes will be lost.'
    );
    if (confirmed) {
      console.log('handleClose');
      navigate('/', { replace: true });
    }
  }, []);

  return (
    <Container component='main'>
      <Box component='form' onSubmit={formikBase.handleSubmit} my={4}>
        <Stack divider={<Divider flexItem />} spacing={2}>
          <Box display='flex' justifyContent='space-between'>
            <Typography variant='h4'>
              {lesson
                ? `Editing Lesson ${lesson.lessonNumber}`
                : 'Create a New Lesson'}
            </Typography>
            <Button onClick={handleClose} endIcon={<CloseIcon />}>
              Dashboard
            </Button>
          </Box>
          <Box mt={4}>
            <BaseDetailsForm formikBase={formikBase} />
          </Box>
          <Box mt={4}>
            <PagesList pages={pages} setPages={setPages} />
          </Box>
          <Box>
            <Button type='submit' fullWidth size='large' variant='contained'>
              {lesson ? 'Save Changes' : 'Create Lesson'}
            </Button>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
};

export default EditorForm;
