import React from 'react';
import {
  Grid, Card, CardContent, Typography
} from '@material-ui/core';
import GenericForm from '../elements/GenericForm';
import CenterLayoutPage from '../BasePages/CenterLayoutPage';
import moment from 'moment';

const schema = {
  parameters: {
    exampleText: {
      label: 'Text Input field',
      type: 'text',
      required: true,
      rules: {
        minSize: 5,
        maxSize: 10
      }
    },
    duplicateExampleText: {
      label: 'Duplicate',
      type: 'text',
      required: true,
      rules: {
        match: 'exampleText'
      }
    },
    datePicker: {
      label: 'Date Picker',
      type: 'date'
    },
    timePicker: {
      label: 'Time Picker',
      type: 'time'
    },
    someDropDown: {
      label: 'Some Drop Down',
      type: 'dropdown',
      elements: {
        'first_option': 'First Option',
        'second_option': 'Second Option',
        'third_option': 'Third Option'
      }
    },
    wantSomething: {
      label: 'Want Something?',
      type: 'boolean',
    }
  }
}

const ExamplePage = () => {

  const sourceData = {
    exampleText: 'foo',
    duplicateExampleText: '',
    wantSomething: true,
    datePicker: moment(),
    timePicker: moment()
  }

  function submit(data) {
    console.log(data);
  }

  return (
    <CenterLayoutPage>
      <Card style={{ maxWidth: 600 }}>
        <CardContent>
          <Typography
            variant='h5'
            gutterBottom
            align='center'
          >
            Example Form
          </Typography>
          <GenericForm
            initialDataSet={sourceData}
            schema={schema}
            handleSubmit={data => submit(data)}
          />
        </CardContent>
      </Card>
    </CenterLayoutPage>
  );
}

export default ExamplePage;